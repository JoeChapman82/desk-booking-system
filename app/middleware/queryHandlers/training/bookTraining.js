const update = require('../../../model/training/update');
const dates = require('../../../config/trainingDates');

module.exports = (req, res, next) => {
    update.one({
        date: new Date(`${req.body.date.split('-').reverse().join('-')} 04:00`),
        nameOne: null,
        nameTwo: null
    }, {
        nameOne: req.body.nameOne,
        nameTwo: req.body.nameTwo,
    })
    .then(response => {
        res.locals.booked = true;
        res.locals.trainingSession = response;
        next();
    })
    .catch(error => redirects.goneWrong(req, res));
};
