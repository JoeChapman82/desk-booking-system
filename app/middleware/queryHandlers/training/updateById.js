const update = require('../../../model/training/update');
const dates = require('../../../config/trainingDates');

module.exports = (req, res, next) => {
    update.one({_id: req.params.id || req.body._id}, {nameOne: null, nameTwo: null})
    .then(response => {
        res.locals.cancelled = true;
        next();
    })
    .catch(error => redirects.goneWrong(req, res));
};
