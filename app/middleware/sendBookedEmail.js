const notify = require('../services/notify/notify');
const mainConfig = require('../config/main');

module.exports = (req, res, next) => {
    let param = encodeURIComponent(res.locals.booking._id);
    const personalisation = {
        cancelLink: `${process.env.NODE_URI}/cancel/${param}`,
        name: req.body.name,
        location: req.app.locals.siteLocation,
        roomName: res.locals.room.name,
        bookedDate: `${req.body.date[0]}/${req.body.date[1]}/${req.body.date[2]}`,
        bookedFrom: `${req.body.FromHours}:${req.body.FromMinutes}`,
        bookedUntil: `${req.body.UntilHours}:${req.body.UntilMinutes}`,
        bookingDescription: req.body.reason
    };
    console.log(personalisation.cancelLink);
    notify.sendEmail(mainConfig.bookedTemplate, req.body.email, {personalisation: personalisation})
    .then(response => {
        console.log(response.body.id);
        return next();
    })
    .catch(err => {
        console.log(err.message);
        res.locals.emailFailure = `Failure:<br />error: ${err.error.errors[0].message}`;
        return next();
    });
};
