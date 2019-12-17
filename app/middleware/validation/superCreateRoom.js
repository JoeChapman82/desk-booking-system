const validator = require('validator');
const renders = require('../../controllers/renders');
const addErrorMessage = require('../../helpers/addErrorMessage');

module.exports = (req, res, next) => {
    req.body.equipment = Array.isArray(req.body.equipment) ? req.body.equipment : [req.body.equipment];
    if(validator.isEmpty(req.body.name)) {
        addErrorMessage(res, 'name', 'provide a room name');
    }
    if(validator.isEmpty(req.body.sitting)) {
        addErrorMessage(res, 'sitting', 'provide sitting capacity');
    }
    if(validator.isEmpty(req.body.standing)) {
        addErrorMessage(res, 'standing', 'provide standing capacity');
    }
    if(!res.locals.errors) {
        return next();
    } else {
        return renders.superCreateRoom(req, res);
    }
};
