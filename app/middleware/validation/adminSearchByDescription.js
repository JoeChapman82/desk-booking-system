const validator = require('validator');
const renders = require('../../controllers/renders');
const redirects = require('../../controllers/redirects');
const addErrorMessage = require('../../helpers/addErrorMessage');

module.exports = (req, res, next) => {
    if(typeof req.body.searchByDescription === 'undefined' || validator.isEmpty(req.body.searchByDescription)) {
        addErrorMessage(res, 'name', 'provide a room name');
    }
    if(!res.locals.errors) {
        res.locals.searchBy = 'description';
        res.locals.searchCriteria = req.body.searchByDescription;
        return next();
    } else {
        return redirects.adminNoResults(req, res);
    }
};
