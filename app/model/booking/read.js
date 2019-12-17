const Booking = require('./booking');

module.exports = {
    all: () => Booking.find(),
    dump: () => Booking.find().populate({path: 'room', select: 'name'}),
    byId: (id) => Booking.findById(id),
    byParams: (params) => Booking.find(params).limit(50).populate({path: 'room', select: 'name'}),
    byDateRange: (id, start, end) => {
        if(id === false) {
            return Booking.find({start: {$gte: start}, end: {$lte: end}}).populate({path: 'room', select: 'name'});
        } else {
            return Booking.find({room: id, start: {$gte: start}, end: {$lte: end}});
        }
    },
    byRoom: (roomId) => Booking.find({room: roomId}).limit(50).populate({path: 'room', select: 'name'}),
};
