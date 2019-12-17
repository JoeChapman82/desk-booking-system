const find = require('../../../model/booking/read');
const addErrorMessage = require('../../../helpers/addErrorMessage');
const redirects = require('../../../controllers/redirects');
const addDays = require('../../../helpers/addDays');

module.exports = (req, res, next) => {
    let date = new Date().getTime();
    res.locals.bookings = [];
    const today = new Date(res.locals.today.date.getFullYear(), res.locals.today.date.getMonth(), res.locals.today.date.getDate());
    find.byDateRange(false, today, addDays(today, 1))
    .then(response => {
        res.locals.bookings = generateBookingsForView(8, 19, res.locals.rooms, response);
        return next();
    })
    .catch(error => {
        console.log(error);
        redirects.goneWrong(req, res);
    });
};

function generateBookingsForView(from, to, allRooms, foundBookings) {
    let rooms = {};

    for(let i = 0; i < allRooms.length; i++) {
        rooms[allRooms[i].name] = {id: allRooms[i]._id, hours: {}};
        for(var k = from; k < to; k++) {
            rooms[allRooms[i].name].hours[k] = [0, 0, 0, 0];
        }
    }

    foundBookings.forEach((booking) => {
        let start = {hours: booking.start.getHours(), minutes: booking.start.getMinutes()};
        let end = {hours: booking.end.getHours(), minutes: booking.end.getMinutes()};
        let lengthInQuarterHours = ((booking.end - booking.start) / 1000 / 60 / 60) * 4;
        let hoursArrayPosition = start.minutes === 0 ? 0 : start.minutes === 15 ? 1 : start.minutes === 30 ? 2 : 3;
        let hoursAmount = start.hours;
        if(hoursAmount >= from) {
        for(let i = 0; i < lengthInQuarterHours; i++) {
                rooms[booking.room.name].hours[hoursAmount][hoursArrayPosition] = 1;
                hoursArrayPosition++;
                if(hoursArrayPosition === 4) {
                    hoursArrayPosition = 0;
                    hoursAmount++;
                }
            }
        }
    });

    return rooms;

}
