const jsonResponses = require('./jsonResponses');
const queryRoom = require('../middleware/queryHandlers/room');
const queryBooking = require('../middleware/queryHandlers/booking');
const queryParking = require('../middleware/queryHandlers/parking');
const validateApi = require('../middleware/validateApi');
const findApiTodayDate = require('../middleware/findApiTodayDate');

module.exports = {

    getIndex: [jsonResponses.getIndex],
    getRooms: [queryRoom.findAll, jsonResponses.getRooms],
    getRoom: [validateApi.getRoom, queryRoom.findById, jsonResponses.getRoom],
    getBooking: [validateApi.getBooking, queryBooking.findById, jsonResponses.getBooking],
    postBookings: [findApiTodayDate, queryRoom.findAll, validateApi.isValidRoom, queryBooking.findDaysBookings, validateApi.postBookings, queryBooking.create, jsonResponses.postBookings],

    catchAll: [jsonResponses.catchAll]

};
