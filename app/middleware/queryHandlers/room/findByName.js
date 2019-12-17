const find = require('../../../model/room/read');
const redirects = require('../../../controllers/redirects');
const addErrorMessage = require('../../../helpers/addErrorMessage');

module.exports = (req, res, next) => {
    let toQuery = res.locals.roomName ? res.locals.roomName : req.body.name;
    find.byName(toQuery)
    .then(response => {
        res.locals.room = response;
        res.locals.searchCriteria = response === null ? 'none' : response._id;
        next();
    })
    .catch(error => redirects.goneWrong(req, res));
};
