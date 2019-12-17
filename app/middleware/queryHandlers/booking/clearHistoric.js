const remove = require('../../../model/booking/delete');
const addErrorMessage = require('../../../helpers/addErrorMessage');
const addDays = require('../../../helpers/addDays');
const redirects = require('../../../controllers/redirects');

module.exports = (req, res, next) => {
    const yesterday = addDays(new Date(), -1);
    remove.byHistoricDate(yesterday)
    .then(response => {
        res.locals.cleared = true;
        next();
    })
    .catch(error => redirects.goneWrong(req, res));
};
