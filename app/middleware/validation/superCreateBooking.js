const validator = require('validator');
const renders = require('../../controllers/renders');
const addErrorMessage = require('../../helpers/addErrorMessage');

module.exports = (req, res, next) => {
    let validRoom = false;
    res.locals.rooms.forEach((room) => {
        if(room.name.toUpperCase() === req.body.roomName.toUpperCase()) {
            validRoom = true;
            res.locals.roomId = room._id;
        }
    });
    if(validator.isEmpty(req.body.startDate) || isNaN(new Date(req.body.startDate).getFullYear())) {
        addErrorMessage(res, 'startDate', 'provide a valid date');
    }
    if(validator.isEmpty(req.body.endDate) || isNaN(new Date(req.body.endDate).getFullYear())) {
        addErrorMessage(res, 'endDate', 'provide a valid date');
    }
    if(validator.isEmpty(req.body.roomName) || !validRoom) {
        addErrorMessage(res, 'roomName', 'provide a valid room');
    }
    if(validator.isEmpty(req.body.name)) {
        addErrorMessage(res, 'name', 'provide a name');
    }
    if(validator.isEmpty(req.body.description)) {
        addErrorMessage(res, 'description', 'provide a description');
    }
    if(!res.locals.errors) {
        return next();
    } else {
        return renders.superCreateBooking(req, res);
    }
};
