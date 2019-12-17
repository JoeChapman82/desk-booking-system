const validator = require('validator');

module.exports = (req, res, next) => {
    const room = req.body.room || req.query.room;
    let foundRoom;
    let message = {
        failedValidation: []
    };
    if(typeof room === 'undefined' || !validator.isMongoId(room)) {
        message.failedValidation.push({field: 'Room', reason: 'Invalid room'});
    }
    res.locals.rooms.forEach((existingRoom) => {
        if(existingRoom._id.toString() === room) {
            foundRoom = existingRoom;
        }
    });
    if(typeof foundRoom === 'undefined') {
        message.failedValidation.push({field: 'Room', reason: 'Invalid room'});
    }
    if(message.failedValidation.length === 0) {
        res.locals.room = foundRoom;
        return next();
    } else {
        return res.status(400).json({message: message});
    }

};
