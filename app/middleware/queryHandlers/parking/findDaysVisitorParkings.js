const find = require('../../../model/parking/read');
const formVisitorSpaces = require('../../../helpers/formVisitorSpaces');
const redirects = require('../../../controllers/redirects');
const addDays = require('../../../helpers/addDays');

module.exports = (req, res, next) => {
    const today = new Date(res.locals.today.date.getFullYear(), res.locals.today.date.getMonth(), res.locals.today.date.getDate());
    find.byDateRangeVisitor(today, addDays(today, 1))
    .then(response => {
        res.locals.visitorParkings = formVisitorSpaces(response);
        return next();
    })
    .catch(error => redirects.goneWrong(req, res));
};
