module.exports = {
    choose: require('./validation/choose'),
    login: require('./validation/login'),
    check: require('./validation/check'),
    bookTraining: require('./validation/bookTraining'),
    parkingGive: require('./validation/parkingGive'),
    changeDate: require('./validation/changeDate'),
    requestBooking: require('./validation/requestBooking'),
    parkingTakeConfirm: require('./validation/parkingTakeConfirm'),
    parkingVisitorConfirm: require('./validation/parkingVisitorConfirm'),
    parkingCancel: require('./validation/parkingCancel'),
    adminCreateRoom: require('./validation/adminCreateRoom'),
    adminEditRoom: require('./validation/adminEditRoom'),
    adminEditBooking: require('./validation/adminEditBooking'),
    adminInviteUser: require('./validation/adminInviteUser'),
    adminSearchByDescription: require('./validation/adminSearchByDescription'),
    adminSearchByRoomName: require('./validation/adminSearchByRoomName'),
    superCreateBooking: require('./validation/superCreateBooking'),
    superCreateRoom: require('./validation/superCreateRoom'),
    superEditRoom: require('./validation/superEditRoom'),
    superInviteUser: require('./validation/superInviteUser'),
    newUser: require('./validation/newUser')
};
