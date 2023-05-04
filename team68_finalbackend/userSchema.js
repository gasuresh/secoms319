const mongoose = require('mongoose')
const uuid = require('uuid');

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: uuid.v4
    },

    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    admin: {
        type: Boolean,
        default: false
    }

})

const User = mongoose.model('User', UserSchema)


module.exports = User
