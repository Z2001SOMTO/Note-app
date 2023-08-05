const mongoose = require('mongoose')

const authScheme = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        min: 8
    }
}, { timestamps: true})
// createdAt
// updatedAt

const authModel = mongoose.model("authTable", authScheme)
module.exports = authModel