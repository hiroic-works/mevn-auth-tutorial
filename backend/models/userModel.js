const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'nameの値を入力してください']
    },
    email: {
        type: String,
        required: [true, 'emailの値を入力してください'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'passwordの値を入力してください']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)