const create = require('../../../model/booking/create');
const addErrorMessage = require('../../../helpers/addErrorMessage');
const redirects = require('../../../controllers/redirects');

module.exports = (req, res, next) => {

    let bookings = JSON.parse(res.locals.jsonBookings);
    let writesMade = 0;
    let writesToMake = bookings.length;

    importBooking();

    function importBooking() {
        const booking = {
            room: res.locals.room._id,
            start: bookings[writesMade].start,
            end: bookings[writesMade].end,
            name: bookings[writesMade].description,
            description: bookings[writesMade].description
        };
        create(booking)
        .then((response) => {
            writesMade++;
            if(writesMade === writesToMake) {
                return next();
            } else {
                importBooking();
            }
        })
        .catch((error) => {
            console.log(error.message);
            return redirects.goneWrong(req, res);
        });
    }

};
