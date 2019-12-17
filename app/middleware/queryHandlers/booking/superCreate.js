const create = require('../../../model/booking/create');
const addErrorMessage = require('../../../helpers/addErrorMessage');

module.exports = (req, res, next) => {
    const booking = {
        room: res.locals.roomId,
        start: new Date(req.body.startDate),
        end: new Date(req.body.endDate),
        name: req.body.name,
        description: req.body.description
    };
    create(booking)
    .then((response) => {
        res.locals.booking = response;
        res.locals.bookedRoom = response._id;
        res.locals.booked = true;
        return next();
    })
    .catch((error) => {
        addErrorMessage(res, 'booking', 'error booking room');
        return next();
    });
};
