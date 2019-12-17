const find = require('../../../model/training/read');
const dates = require('../../../config/trainingDates');

module.exports = (req, res, next) => {
    let trainingSessions = {};
    find.all()
    .then(response => {
        response.forEach((item) => {
            trainingSessions[item.date] = trainingSessions[item.date] || [];
            trainingSessions[item.date].push(item);
        })
        res.locals.trainingSessions = trainingSessions;
        next();
    })
    .catch(error => redirects.goneWrong(req, res));
};
