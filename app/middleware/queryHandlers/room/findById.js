const find = require('../../../model/room/read');
const redirects = require('../../../controllers/redirects');
const addErrorMessage = require('../../../helpers/addErrorMessage');

module.exports = (req, res, next) => {
    let toQuery = res.locals.booking ? res.locals.booking.room : req.params.id;
    find.byId(toQuery)
    .then(response => {
        res.locals.room = response;
        next();
    })
    .catch(error => redirects.goneWrong(req, res));
};
