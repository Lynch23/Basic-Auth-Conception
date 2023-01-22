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

userSchema.statics.findAndAuthenticate = async function (username, password) {
    const foundUser = await this.findOne({ username });
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid? foundUser : false;
}
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

module.exports = mongoose.model('User', userSchema);