const validator = require('validator');
const renders = require('../../controllers/renders');
const redirects = require('../../controllers/redirects');
const addErrorMessage = require('../../helpers/addErrorMessage');
const hasConflictingTimes = require('../../helpers/hasConflictingTimes');

module.exports = (req, res, next) => {
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
        if(typeof req.body.dateDay === 'undefined' || validator.isEmpty(req.body.dateDay) || !validator.isInt(req.body.dateDay, {min: 1, max: 31})) {
            req.body.dateDay = undefined;
            addErrorMessage(res, 'dateDay', 'provide a valid date');
        }
        if(typeof req.body.dateMonth === 'undefined' || validator.isEmpty(req.body.dateMonth) || !validator.isInt(req.body.dateMonth, {min: 1, max: 12})) {
            req.body.dateMonth = undefined;
            addErrorMessage(res, 'dateMonth', 'provide a valid date');
        }
        if(typeof req.body.dateYear === 'undefined' || validator.isEmpty(req.body.dateYear) || !validator.isInt(req.body.dateYear, {min: 2000, max: 2030})) {
            req.body.dateYear = undefined;
            addErrorMessage(res, 'dateYear', 'provide a valid date');
        }
        if(!res.locals.errors) { // only run this checks if there are no errors so far
            if((parseInt(req.body.UntilHours) < parseInt(req.body.FromHours)) ||  (parseInt(req.body.UntilHours) === parseInt(req.body.FromHours) && parseInt(req.body.UntilMinutes) < parseInt(req.body.FromHours))) {
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
        }

    if(!res.locals.errors) {
        return next();
    } else {
        return renders.check(req, res);
    }
};
