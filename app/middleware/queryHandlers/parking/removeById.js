const remove = require('../../../model/parking/delete');
const addErrorMessage = require('../../../helpers/addErrorMessage');
const redirects = require('../../../controllers/redirects');

module.exports = (req, res, next) => {
    remove.byId(req.body.id)
    .then(response => {
        res.locals.taken = true;
        res.locals.cancelled = true;
        next();
    })
    .catch(error => redirects.goneWrong(req, res));
};
