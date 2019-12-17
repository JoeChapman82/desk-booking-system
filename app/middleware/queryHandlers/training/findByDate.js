const find = require('../../../model/training/read');
const dates = require('../../../config/trainingDates');

module.exports = (req, res, next) => {
    find.countByParams({nameOne: null, date: new Date(`${req.params.date.split('-').reverse().join('-')} 04:00`)})
    .then(response => {
        res.locals.sessionDate = req.params.date;
        res.locals.availableSpots = response;
        next();
    })
    .catch(error => redirects.goneWrong(req, res));
};
