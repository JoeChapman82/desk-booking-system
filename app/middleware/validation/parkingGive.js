const validator = require('validator');
const renders = require('../../controllers/renders');
const addErrorMessage = require('../../helpers/addErrorMessage');

module.exports = (req, res, next) => {
        const validLocations = ['Outside', 'Basement'];
        if(typeof req.body.space === 'undefined' || validator.isEmpty(req.body.space)) {
            addErrorMessage(res, 'space', 'provide a space');
        }
        if(typeof req.body.name === 'undefined' || validator.isEmpty(req.body.name)) {
            addErrorMessage(res, 'name', 'provide your name');
        }
        if(typeof req.body.email === 'undefined' || validator.isEmpty(req.body.email) || !validator.isEmail(req.body.email)) {
            addErrorMessage(res, 'email', 'provide a valid email');
        }
        if(typeof req.body.location === 'undefined' || validator.isEmpty(req.body.location) || !validLocations.includes(req.body.location)) {
            addErrorMessage(res, 'location', 'provide a valid location');
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
    if(!res.locals.errors) {
        return next();
    } else {
        return renders.parkingGive(req, res);
    }
};
