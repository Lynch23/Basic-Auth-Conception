const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);