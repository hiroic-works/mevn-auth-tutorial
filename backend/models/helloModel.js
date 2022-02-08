const mongoose = require('mongoose')

const helloSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'textの値を追加してください']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Hello', helloSchema)