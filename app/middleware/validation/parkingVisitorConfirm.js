const validator = require('validator');
const renders = require('../../controllers/renders');
const redirects = require('../../controllers/redirects');
const addErrorMessage = require('../../helpers/addErrorMessage');
const hasConflictingTimes = require('../../helpers/hasConflictingTimes');
const visitorSpaces = require('../../config/safe').visitorParkingSpaces;

module.exports = (req, res, next) => {
    if(typeof req.params.space === 'undefined' || parseInt(req.params.space) > visitorSpaces || parseInt(req.params.space) <= 0) {
        return redirects.index(req, res);
    }
    if(req.method === 'GET') {
        return next();
    }
    if(typeof req.body.name === 'undefined' || validator.isEmpty(req.body.name)) {
        addErrorMessage(res, 'name', 'provide the visitors name');
    }
    if(typeof req.body.email === 'undefined' || validator.isEmpty(req.body.email) || !validator.isEmail(req.body.email)) {
        addErrorMessage(res, 'email', 'provide a valid email');
    }
    if(!res.locals.errors) {
        return next();
    } else {
        res.locals.space = req.params.space;
        return renders.parkingVisitorConfirm(req, res);
    }
};
