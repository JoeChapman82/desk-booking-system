// (StartA <= EndB) and (EndA >= StartB)
const find = require('../../../model/booking/read');
const addErrorMessage = require('../../../helpers/addErrorMessage');
const redirects = require('../../../controllers/redirects');

module.exports = (req, res, next) => {
    const fromDate = new Date(`${req.body.dateYear} ${req.body.dateMonth} ${req.body.dateDay} ${req.body.FromHours}:${req.body.FromMinutes}`);
    const untilDate = new Date(`${req.body.dateYear} ${req.body.dateMonth} ${req.body.dateDay} ${req.body.UntilHours}:${req.body.UntilMinutes}`);
    const queryObject = {start: {$lt: untilDate}, end: {$gt: fromDate}};
    find.byParams(queryObject)
    .then(response => {
        let bookedRooms = response.map((booking) => booking.room.name);
        let availableRooms = res.locals.rooms.filter((el) => !bookedRooms.includes(el.name));
        res.locals.availableRooms = availableRooms;
        res.locals.dateDay = req.body.dateDay;
        res.locals.dateMonth = req.body.dateMonth;
        res.locals.dateYear = req.body.dateYear;
        res.locals.from = `${req.body.FromHours}:${req.body.FromMinutes}`;
        res.locals.until = `${req.body.UntilHours}:${req.body.UntilMinutes}`;
        return next();
    })
    .catch(error => redirects.goneWrong(req, res));
};
