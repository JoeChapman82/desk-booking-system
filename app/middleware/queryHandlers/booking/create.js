const create = require('../../../model/booking/create');
const addErrorMessage = require('../../../helpers/addErrorMessage');

module.exports = (req, res, next) => {
        const booking = res.locals.apiBooking || {
            room: req.body.room,
            start: new Date(req.body.date[2], req.body.date[1] - 1, req.body.date[0], req.body.FromHours, req.body.FromMinutes),
            end: new Date(req.body.date[2], req.body.date[1] - 1, req.body.date[0], req.body.UntilHours, req.body.UntilMinutes),
            name: req.body.name,
            description: req.body.reason
        };
        create(booking)
        .then(response => {
            res.locals.booking = response;
            res.locals.bookings.push(response);
            res.locals.bookedRoom = response._id;
            res.locals.booked = true;
            return next();
        })
        .catch(error => {
            addErrorMessage(res, 'booking', 'error booking room');
            return next();
        });
};
