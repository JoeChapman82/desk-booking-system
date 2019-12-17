module.exports = {
    create: require('./parking/create'),
    createVisitor: require('./parking/createVisitor'),
    findDaysParkings: require('./parking/findDaysParkings'),
    findDaysVisitorParkings: require('./parking/findDaysVisitorParkings'),
    checkForDoubleBooking: require('./parking/checkForDoubleBooking'),
    findById: require('./parking/findById'),
    removeById: require('./parking/removeById')
};
