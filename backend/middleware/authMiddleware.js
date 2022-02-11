const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async(req, res, next) => {
    let token

    // authorizationのリクエストヘッダーおよびBearerのトークンかどうか
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // トークン取得
            token = req.headers.authorization.split(' ')[1]

            // トークンの検証およびデコード
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // トークンに含めておいたユーザーIDからユーザーを検索。パスワードを除外したユーザー情報をリクエストヘッダーに含める
            req.user = await User.findById(decoded.id).select('-password')

            // 次の処理に移動
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('認証できませんでした')
        }
    }

    // トークンがなかったら
    if(!token) {
        res.status(401)
        throw new Error('トークンが不正のため認証できませんでした')
    }
})

module.exports = {
    protect
}