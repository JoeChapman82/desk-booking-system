const validator = require('validator');
const renders = require('../../controllers/renders');
const redirects = require('../../controllers/redirects');
const addErrorMessage = require('../../helpers/addErrorMessage');

module.exports = (req, res, next) => {
    if(typeof req.body.searchByRoomName === 'undefined' || validator.isEmpty(req.body.searchByRoomName)) {
        addErrorMessage(res, 'name', 'provide a room name');
    }
    if(!res.locals.errors) {
        res.locals.searchBy = 'room';
        res.locals.roomName = req.body.searchByRoomName;
        return next();
    } else {
        return redirects.adminNoResults(req, res);
    }
};
