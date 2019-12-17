const find = require('../../../model/parking/read');
const addErrorMessage = require('../../../helpers/addErrorMessage');
const redirects = require('../../../controllers/redirects');
const renders = require('../../../controllers/renders');
const addDays = require('../../../helpers/addDays');

module.exports = (req, res, next) => {
    const today = new Date(res.locals.today.date.getFullYear(), res.locals.today.date.getMonth(), res.locals.today.date.getDate());
    find.byDateRangeVisitor(today, addDays(today, 1), true, req.params.space)
    .then(response => {
        if(response.length > 0) {
            res.locals.alreadyTaken = true;
            return renders.parkingVisitorConfirm(req, res);
        } else {
            res.locals.space = req.params.space;
            return next();
        }
    })
    .catch(error => redirects.goneWrong(req, res));
};
