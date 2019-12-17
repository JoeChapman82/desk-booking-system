const Booking = require('./booking');

module.exports = {
    byId: (id) => Booking.findByIdAndRemove(id),
    byHistoricDate: (date) => Booking.remove({start: {"$lte": date}})
};
