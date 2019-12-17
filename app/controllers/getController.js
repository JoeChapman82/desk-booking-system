const redirects = require('./redirects');
const renders = require('./renders');
const populateDates = require('../middleware/populateDates');
const queryRoom = require('../middleware/queryHandlers/room');
const queryBooking = require('../middleware/queryHandlers/booking');
const queryParking = require('../middleware/queryHandlers/parking');
const queryTraining = require('../middleware/queryHandlers/training');
const queryUser = require('../middleware/queryHandlers/user');
const validate = require('../middleware/validate');
const handleInitialUser = require('../middleware/handleInitialUser');

module.exports = {
    // index: [redirects.choose],
    index: [renders.index],
    choose: [queryRoom.findAll, renders.choose],
    overview: [populateDates, queryRoom.findAll, queryBooking.findDaysBookingsAllRooms, renders.overview],
    check: [renders.check],
    book: [populateDates, queryRoom.findById, queryBooking.findDaysBookings, renders.book],
    cancel: [queryBooking.findById, queryRoom.findById, renders.cancel],
    cancelled: [renders.cancelled],
    parkingGive: [renders.parkingGive],
    parkingTake: [populateDates, queryParking.findDaysParkings, renders.parkingTake],
    parkingTakeConfirm: [queryParking.findById, renders.parkingTakeConfirm],
    parkingVisitor: [populateDates, queryParking.findDaysVisitorParkings, renders.parkingVisitor],
    parkingVisitorConfirm: [validate.parkingVisitorConfirm, populateDates, queryParking.checkForDoubleBooking, renders.parkingVisitorConfirm],
    parkingCancel: [validate.parkingCancel, queryParking.findById, renders.parkingCancel],
    login: [renders.login],
    trainingSession: [queryTraining.countAllAvailable, renders.trainingSession],
    trainingBook: [queryTraining.findByDate, renders.trainingBook],
    trainingCancel: [queryTraining.findById, renders.trainingCancel],
    goneWrong: [renders.goneWrong],

    // admin GETS
    adminHome: [renders.adminHome],
    adminBooking: [queryBooking.findById, queryRoom.findById, renders.adminBooking],
    adminCancelBooking: [queryBooking.remove, redirects.adminBookingCancelled],
    adminBookingCancelled: [renders.adminBookingCancelled],
    adminCreateRoom: [renders.adminCreateRoom],
    adminEditRoom: [queryRoom.findAll, renders.adminEditRoom],
    adminInviteUser: [renders.adminInviteUser],
    adminSearchResults: [queryBooking.findByParams, renders.adminSearchResults],
    adminTrainingOverview: [queryTraining.findAll, renders.adminTrainingOverview],
    adminNoResults: [renders.adminNoResults],

    // super GETS
    superHome: [renders.superHome],
    superSeed: [renders.superSeed],
    superInviteUser: [renders.superInviteUser],
    superCreateRoom: [renders.superCreateRoom],
    superEditRoom: [queryRoom.findAll, renders.superEditRoom],
    superCreateBooking: [renders.superCreateBooking],
    superManageUsers: [queryUser.findAll, renders.superManageUsers],
    superClearOldBookings: [renders.superClearOldBookings],

    // other GETS
    newUser: [renders.newUser],

    // initial GETS
    secret: [queryUser.findAll, handleInitialUser, redirects.index]

};
