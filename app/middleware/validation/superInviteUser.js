const validator = require('validator');
const renders = require('../../controllers/renders');
const addErrorMessage = require('../../helpers/addErrorMessage');

module.exports = (req, res, next) => {
    if(validator.isEmpty(req.body.email) || !validator.isEmail(req.body.email)) {
        addErrorMessage(res, 'email', 'provide a valid email');
    }
    if(!res.locals.errors) {
        return next();
    } else {
        return renders.superInviteUser(req, res);
    }
};
