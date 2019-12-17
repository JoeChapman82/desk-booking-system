const notify = require('../services/notify/notify');
const mainConfig = require('../config/main');

module.exports = (req, res, next) => {
    let param = encodeURIComponent(res.locals.visitor._id);
    const personalisation = {
        cancelLink: `${process.env.NODE_URI}/cancel/${param}`,
        name: req.body.name,
        location: req.app.locals.siteLocation,
        date: `${req.body.dateDay}/${req.body.dateMonth}/${req.body.dateYear}`,
        space: req.body.space
    };
    console.log(personalisation.cancelLink);
    notify.sendEmail(mainConfig.parkingTemplate, req.body.email, {personalisation: personalisation})
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
