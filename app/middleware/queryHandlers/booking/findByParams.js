const find = require('../../../model/booking/read');
const addErrorMessage = require('../../../helpers/addErrorMessage');
const redirects = require('../../../controllers/redirects');

module.exports = (req, res, next) => {
    if(req.query.search === 'none') {
        res.locals.results = [];
        return next();
    }
    if(req.query.by === 'description') {
        let regex = new RegExp(req.query.search, "i");
        let queryObject = {$or : [{name: regex}, {description: regex}]};
        find.byParams(queryObject)
        .then(response => {
            res.locals.results = response;
            return next();
        })
        .catch(error => redirects.goneWrong(req, res));
    } else if(req.query.by === 'room') {
        find.byRoom(req.query.search)
        .then(response => {
            res.locals.results = response;
            return next();
        })
        .catch(error => redirects.goneWrong(req, res));
    } else {
        return redirects.goneWrong(req, res);
    }
};
