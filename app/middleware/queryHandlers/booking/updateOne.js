const update = require('../../../model/booking/update');
const redirects = require('../../../controllers/redirects');
const addErrorMessage = require('../../../helpers/addErrorMessage');

module.exports = (req, res, next) => {
    const dateParts = req.body.date.split('/');
    const toFind = {
        _id: req.body.id
    };
    const toUpdate = {
        name: req.body.name,
        description: req.body.description,
        start: new Date(`${dateParts[2]} ${dateParts[1]} ${dateParts[0]} ${req.body.startTime}`),
        end: new Date(`${dateParts[2]} ${dateParts[1]} ${dateParts[0]} ${req.body.endTime}`),
    };
    if(req.body.room !== res.locals.room.name) {
        for(let i = 0; i < res.locals.rooms.length; i++) {
            if(req.body.room === res.locals.rooms[i].name) {
                res.locals.room = res.locals.rooms[i];
                toUpdate.room = res.locals.rooms[i]._id;
            }
        }
    }
    update.one(toFind, toUpdate)
    .then((response) => {
        res.locals.bookingEdited = true;
        return next();
    })
    .catch((error) => {
        addErrorMessage(res, 'bookingEdit', 'error editing booking');
        return next();
    });
};
