const asyncHandler = require('express-async-handler')
const Hello = require('../models/helloModel')
const User = require('../models/userModel')

/**
 * @desc get hello
 * @route GET /api/hello
 * @access Private
 */
const getHello = asyncHandler(async (req, res) => {
    const hello = await Hello.find({user_id: req.user.id})
    res.status(200).json(hello)
})

/**
 * @desc set hello
 * @route POST /api/hello
 * @access Private
 */
 const setHello = asyncHandler(async (req, res) => {
     if(!req.body.text) {
        res.status(400)
        throw new Error('Bad Request: リクエストに「text」は必須だよ')
     }

     const hello = await Hello.create({
         text: req.body.text,
         user_id: req.user.id
     })

    res.status(200).json(hello)
})

/**
 * @desc update hello
 * @route PUT /api/hello/:id
 * @access Private
 */
 const updateHello = asyncHandler(async (req, res) => {
    const hello = await Hello.findById(req.params.id)
    if(!hello) {
        res.status(400)
        throw new Error('Bad Request: IDが見つからないよ')
    }

    // 認証ユーザー取得
    const user = await User.findById(req.user.id)

    // 存在してないユーザーの場合
    if(!user) {
        res.status(401)
        throw new Error('ユーザーが見つかりません')
    }

    // ログインユーザーとhelloしたデータのユーザーが一致してない場合
    if(hello.user_id.toString() !== user.id) {
        res.status(401)
        throw new Error('認証されてないユーザーのデータのため操作できません')
    }

    const updatedHello = await Hello.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedHello)
})

/**
 * @desc delete hello
 * @route DELETE /api/hello/:id
 * @access Private
 */
 const deleteHello = asyncHandler(async (req, res) => {
    const hello = await Hello.findById(req.params.id)
    if(!hello) {
        res.status(400)
        throw new Error('Bad Request: IDが見つからないよ')
    }

    // 認証ユーザー取得
    const user = await User.findById(req.user.id)

    // 存在してないユーザーの場合
    if(!user) {
        res.status(401)
        throw new Error('ユーザーが見つかりません')
    }

    // ログインユーザーとhelloしたデータのユーザーが一致してない場合
    if(hello.user_id.toString() !== user.id) {
        res.status(401)
        throw new Error('認証されてないユーザーのデータのため操作できません')
    }

    await hello.remove()

    res.status(200).json({ id: req.params.id })
})


module.exports = {
    getHello,
    setHello,
    updateHello,
    deleteHello
}