const validator = require('validator');
const renders = require('../../controllers/renders');
const redirects = require('../../controllers/redirects');
const addErrorMessage = require('../../helpers/addErrorMessage');
const hasConflictingTimes = require('../../helpers/hasConflictingTimes');

module.exports = (req, res, next) => {
        if(typeof req.body.name === 'undefined' || validator.isEmpty(req.body.name)) {
            addErrorMessage(res, 'name', 'provide your name');
        }
        if(typeof req.body.email === 'undefined' || validator.isEmpty(req.body.email) || !validator.isEmail(req.body.email)) {
            addErrorMessage(res, 'email', 'provide a valid email');
        }
        if(!validator.isMongoId(req.body.id)) {
            return redirects.index(req, res);
        }
    if(!res.locals.errors) {
        return next();
    } else {
        return renders.parkingTakeConfirm(req, res);
    }
};
