const Booking = require('./booking');

module.exports = (newBooking) => {
    const booking = new Booking({
        room: newBooking.room,
        start: newBooking.start,
        end: newBooking.end,
        name: newBooking.name,
        description: newBooking.description
    });
    return booking.save();
};
