const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParkingSchema = new Schema({
    name: {
        type: String,
        required: true,
        },
    space: {
        type: String,
        required: true,
        },
    location: {
        type: String,
        enum: ['Outside', 'Basement'],
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    isVisitor: {
        type: Boolean,
        default: false,
        required: true,
    }
});

const Parking = mongoose.model('parking', ParkingSchema);
module.exports = Parking;
