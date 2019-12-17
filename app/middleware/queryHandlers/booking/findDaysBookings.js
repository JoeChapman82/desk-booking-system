const find = require('../../../model/booking/read');
const addErrorMessage = require('../../../helpers/addErrorMessage');
const redirects = require('../../../controllers/redirects');
const addDays = require('../../../helpers/addDays');

module.exports = (req, res, next) => {
    const today = new Date(res.locals.today.date.getFullYear(), res.locals.today.date.getMonth(), res.locals.today.date.getDate());
    find.byDateRange(res.locals.room._id, today, addDays(today, 1))
    .then(response => {
        res.locals.bookings = response;
        return next();
    })
    .catch(error => redirects.goneWrong(req, res));
};
