const validator = require('validator');
const renders = require('../../controllers/renders');
const addErrorMessage = require('../../helpers/addErrorMessage');
const dates = require('../../config/trainingDates');

module.exports = (req, res, next) => {
    if(typeof req.body.nameOne === 'undefined' || validator.isEmpty(req.body.nameOne)) {
        addErrorMessage(res, 'nameOne', 'enter participant one');
    }
    if(typeof req.body.email === 'undefined' || validator.isEmpty(req.body.email) || !validator.isEmail(req.body.email)) {
        addErrorMessage(res, 'email', 'provide a valid email');
    }
    let located = false;
    dates.forEach((date) => {
        if(date.toString() === new Date(`${req.body.date.split('-').reverse().join('-')} 04:00`).toString()) {
            located = true
        }
    })
    if(!located) {
        addErrorMessage(res, 'date', 'invalid date');
    }
    if(!res.locals.errors) {
        return next();
    } else {
        return renders.trainingBook(req, res);
    }
};
