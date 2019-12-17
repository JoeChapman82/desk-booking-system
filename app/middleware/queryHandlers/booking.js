module.exports = {
    create: require('./booking/create'),
    superCreate: require('./booking/superCreate'),
    findById: require('./booking/findById'),
    findDaysBookings: require('./booking/findDaysBookings'),
    findConflicts: require('./booking/findConflicts'),
    findDaysBookingsAllRooms: require('./booking/findDaysBookingsAllRooms'),
    findByParams: require('./booking/findByParams'),
    remove: require('./booking/remove'),
    clearHistoric: require('./booking/clearHistoric'),
    handleImport: require('./booking/handleImport'),
    updateOne: require('./booking/updateOne')
};
