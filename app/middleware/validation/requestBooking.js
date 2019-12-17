const validator = require('validator');
const renders = require('../../controllers/renders');
const redirects = require('../../controllers/redirects');
const addErrorMessage = require('../../helpers/addErrorMessage');
const hasConflictingTimes = require('../../helpers/hasConflictingTimes');

module.exports = (req, res, next) => {
        if(typeof req.body.reason === 'undefined' || validator.isEmpty(req.body.reason)) {
            addErrorMessage(res, 'reason', 'provide a reason');
        }
        if(typeof req.body.name === 'undefined' || validator.isEmpty(req.body.name)) {
            addErrorMessage(res, 'name', 'provide your name');
        }
        if(typeof req.body.email === 'undefined' || validator.isEmpty(req.body.email) || !validator.isEmail(req.body.email)) {
            addErrorMessage(res, 'email', 'provide a valid email');
        }
        if(typeof req.body.FromHours === 'undefined' || validator.isEmpty(req.body.FromHours)) {
            addErrorMessage(res, 'FromHours', 'provide a valid time');
        }
        if(typeof req.body.UntilHours === 'undefined' || validator.isEmpty(req.body.UntilHours)) {
            addErrorMessage(res, 'UntilHours', 'provide a valid time');
        }
        if(typeof req.body.FromMinutes === 'undefined' || validator.isEmpty(req.body.FromMinutes)) {
            addErrorMessage(res, 'FromMinutes', 'provide a valid time');
        }
        if(typeof req.body.UntilMinutes === 'undefined' || validator.isEmpty(req.body.UntilMinutes)) {
            addErrorMessage(res, 'UntilMinutes', 'provide a valid time');
        }
        if(!validator.isMongoId(req.body.room)) {
            return redirects.index(req, res);
        }
        if(!res.locals.errors) { // only run this checks if there are no errors so far
            if((parseInt(req.body.UntilHours) < parseInt(req.body.FromHours)) ||  (parseInt(req.body.UntilHours) === parseInt(req.body.FromHours) && parseInt(req.body.UntilMinutes) < parseInt(req.body.FromMinutes))) {
                addErrorMessage(res, 'UntilMinutes', 'avoid negative times');
                addErrorMessage(res, 'UntilHours', '');
                addErrorMessage(res, 'FromHours', '');
                addErrorMessage(res, 'FromMinutes', '');
            }
            if(req.body.FromHours === req.body.UntilHours && req.body.FromMinutes === req.body.UntilMinutes) {
                addErrorMessage(res, 'UntilMinutes', 'provide different times');
                addErrorMessage(res, 'UntilHours', '');
                addErrorMessage(res, 'FromHours', '');
                addErrorMessage(res, 'FromMinutes', '');
            }
            if(hasConflictingTimes({date: req.body.date, fromHours: req.body.FromHours, fromMinutes: req.body.FromMinutes, untilHours: req.body.UntilHours, untilMinutes: req.body.UntilMinutes}, res.locals.bookings)) {
                addErrorMessage(res, 'UntilMinutes', 'avoid double booking');
                addErrorMessage(res, 'UntilHours', '');
                addErrorMessage(res, 'FromHours', '');
                addErrorMessage(res, 'FromMinutes', '');
            }
        }

    if(!res.locals.errors) {
        return next();
    } else {
        return renders.book(req, res);
    }
};
