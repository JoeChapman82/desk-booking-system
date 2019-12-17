const remove = require('../../../model/booking/delete');
const addErrorMessage = require('../../../helpers/addErrorMessage');
const redirects = require('../../../controllers/redirects');

module.exports = (req, res, next) => {
    const toRemove = req.body.bookedRoom ? req.body.bookedRoom : req.params.id;
    remove.byId(toRemove)
    .then(response => {
        res.locals.unbooked = true;
        next();
    })
    .catch(error => redirects.goneWrong(req, res));
};
