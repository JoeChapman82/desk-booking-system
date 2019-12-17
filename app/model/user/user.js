const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: true
        },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Admin', 'Super'],
        default: 'Admin'
    },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
