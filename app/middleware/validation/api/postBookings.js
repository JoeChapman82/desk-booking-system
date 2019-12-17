const validator = require('validator');
const hasConflictingTimes = require('../../../helpers/hasConflictingTimes');

module.exports = (req, res, next) => {

    const room = req.body.room || req.query.room;
    const name = req.body.name || req.query.name;
    const email = req.body.email || req.query.email;
    const description = req.body.description || req.query.description;
    let start = req.body.start || req.query.start;
    let end = req.body.end || req.query.end;
    start = new Date(start);
    end = new Date(end);

    let message = {
        failedValidation: []
    };

    if(typeof room === 'undefined' || !validator.isMongoId(room)) {
        message.failedValidation.push({field: 'Room', reason: 'Invalid room'});
    }
    if(typeof name === 'undefined' || validator.isEmpty(name)) {
        message.failedValidation.push({field: 'Name', reason: 'Name is required'});
    }
    if(typeof description === 'undefined' || validator.isEmpty(description)) {
        message.failedValidation.push({field: 'Description', reason: 'A booking description is required'});
    }
    if(typeof email === 'undefined' || validator.isEmpty(email) || !validator.isEmail(email)) {
        message.failedValidation.push({field: 'Email', reason: 'A valid email is required'});
    }
    if(typeof start === 'undefined' || start.toString() === 'Invalid Date' || isNaN(start.getFullYear())) {
        message.failedValidation.push({field: 'Start', reason: 'A valid start date and time is required'});
    }
    if(typeof end === 'undefined' || end.toString() === 'Invalid Date' || isNaN(end.getFullYear())) {
        message.failedValidation.push({field: 'End', reason: 'A valid end date and time is required'});
    }

    if(message.failedValidation.length === 0) { // only run this checks if there are no errors so far
        if(end.getTime() < start.getTime()) {
            message.failedValidation.push({field: 'Start', reason: 'Start time before end time'});
        }
        if(end.getTime() === start.getTime()) {
            message.failedValidation.push({field: 'Start', reason: 'Start must be different from end'});
        }
        if(hasConflictingTimes({date: [start.getDate(), start.getMonth() + 1, start.getFullYear()], fromHours: start.getHours(), fromMinutes: start.getMinutes(), untilHours: end.getHours(), untilMinutes: end.getMinutes()}, res.locals.bookings)) {
            message.failedValidation.push({field: 'Room', reason: 'Booking conflicts with an existing booking'});
        }
    }

    if(message.failedValidation.length === 0) {
        res.locals.apiBooking = {room, name, start, end, description};
        return next();
    } else {
        return res.status(400).json({message: message});
    }


};
