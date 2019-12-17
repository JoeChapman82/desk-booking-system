const find = require('../../../model/room/read');
const redirects = require('../../../controllers/redirects');
const addErrorMessage = require('../../../helpers/addErrorMessage');

module.exports = (req, res, next) => {
    find.all()
    .then(response => {
        res.locals.rooms = response;
        next();
    })
    .catch(error => {
        addErrorMessage(res, 'roomFind', 'error finding rooms');
        return next();
    });
};
