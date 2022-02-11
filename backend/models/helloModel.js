const mongoose = require('mongoose')

const helloSchema = mongoose.Schema({
    // 誰のデータなのかを保持するためUserモデルとリレーション。ユーザーのIDを格納する
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // どのモデル情報(DBコレクション)を参照するか
    },
    text: {
        type: String,
        required: [true, 'textの値を追加してください']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Hello', helloSchema)