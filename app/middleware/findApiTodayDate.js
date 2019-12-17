const addDays = require('../helpers/addDays');
const isDateBeforeToday = require('../helpers/isDateBeforeToday');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

module.exports = (req, res, next) => {
    let start = req.body.start || req.query.start;
    let end = req.body.end || req.query.end;
    start = new Date(start);
    end = new Date(end);

    let message = {
        failedValidation: []
    };

    if(typeof start === 'undefined' || start.toString() === 'Invalid Date' || isNaN(start.getFullYear()) || isDateBeforeToday(start)) {
        message.failedValidation.push({field: 'Start', reason: 'A valid start date and time is required'});
    }
    if(typeof end === 'undefined' || end.toString() === 'Invalid Date' || isNaN(end.getFullYear()) || isDateBeforeToday(end)) {
        message.failedValidation.push({field: 'End', reason: 'A valid end date and time is required'});
    }

    if(message.failedValidation.length > 0) {
        return res.status(400).json({message: message});
    } else {
        res.locals.today = {
            date: start,
            dateYear: start.getFullYear(),
            dateMonth: start.getMonth() + 1,
            dateDay: start.getDate(),
            formattedDate: `${start.getDate()} ${months[start.getMonth()]} ${start.getFullYear()} `
        };
        return next();
    }

};
