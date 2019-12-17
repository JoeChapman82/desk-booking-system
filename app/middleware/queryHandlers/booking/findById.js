const find = require('../../../model/booking/read');
const addErrorMessage = require('../../../helpers/addErrorMessage');
const redirects = require('../../../controllers/redirects');

module.exports = (req, res, next) => {
    find.byId(req.params.id)
    .then(response => {
        res.locals.booking = response;
        next();
    })
    .catch(error => redirects.goneWrong(req, res));
};
