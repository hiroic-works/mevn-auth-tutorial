const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

/**
 * @desc register user
 * @route POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    // 入力必須かどうかチェック
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('入力漏れ項目があります')
    }

    // 存在しているユーザーかどうかをユニーク項目（Eメール）で判定
    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error('すでに登録済みのユーザーです')
    }

    // パスワードハッシュ化
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // ユーザー登録
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    // 登録されたかチェック
    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('無効なユーザーデータのため登録できませんでした')
    }
})

/**
 * @desc Authenticate a user
 * @route POST /api/users/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    // 存在してるユーザーかどうか、かつ入力パスワードが登録ユーザーのパスワードと一致してるか
    const user = await User.findOne({email})
    const checkPassword = await bcrypt.compare(password, user.password)
    if( user && checkPassword ) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('無効なユーザーデータのためログインできませんでした')
    }
})

/**
 * @desc get my user data
 * @route GET /api/users/me
 * @access Private
 */
const getMe = asyncHandler(async (req, res) => {
    // リクエストヘッダーに含めたユーザーIDを元にDBからユーザー情報を取得
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email
    })
})

/**
 * @desc generate JWT
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d' // 30日間有効
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}