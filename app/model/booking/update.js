const Booking = require('./booking');

module.exports = {
    one: (find, update) => Booking.findOneAndUpdate(find, update),
};
