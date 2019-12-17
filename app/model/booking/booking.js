const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    start: {
        type: Date,
        required: true,
        index: true,
    },
    end: {
        type: Date,
        required: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'room',
    }
});

const Booking = mongoose.model('booking', BookingSchema);
module.exports = Booking;
