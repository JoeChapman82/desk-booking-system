const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
        },
    equipment: [{
        type: String,
    }],
    sitting: {
        type: String,
        required: true,
        default: ''
    },
    standing: {
        type: String,
        required: true,
        default: ''
    },
    message: {
        type: String,
    }
});

const Room = mongoose.model('room', RoomSchema);
module.exports = Room;
