const find = require('../../../model/training/read');
const addErrorMessage = require('../../../helpers/addErrorMessage');
const redirects = require('../../../controllers/redirects');
const dates = require('../../../config/trainingDates');

module.exports = (req, res, next) => {
    let calls = [];
    let availableSessions = [];
    dates.forEach((date) => {
        calls.push(find.countByParams({nameOne: null, date: date}));
    });
    Promise.all(calls)
    .then(responses => {
        responses.forEach((response, index) => {
            availableSessions.push({date: dates[index], amount: response});
        });
        res.locals.availableSessions = availableSessions;
        next();
    })
    .catch(error => redirects.goneWrong(req, res));
};
