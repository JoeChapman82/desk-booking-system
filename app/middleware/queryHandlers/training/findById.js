const find = require('../../../model/training/read');
const dates = require('../../../config/trainingDates');

module.exports = (req, res, next) => {
    find.byId(req.params.id)
    .then(response => {
        res.locals.trainingSession = response;
        next();
    })
    .catch(error => redirects.goneWrong(req, res));
};
