const validator = require('validator');
const renders = require('../../controllers/renders');
const redirects = require('../../controllers/redirects');
const addErrorMessage = require('../../helpers/addErrorMessage');
const hasConflictingTimes = require('../../helpers/hasConflictingTimes');

module.exports = (req, res, next) => {
    if(typeof req.params.id === 'undefined' || !validator.isMongoId(req.params.id)) {
        return redirects.index(req, res);
    } else {
        return next();
    }
};
