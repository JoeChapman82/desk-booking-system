const notify = require('../services/notify/notify');
const mainConfig = require('../config/main');

module.exports = (req, res, next) => {
    let param = encodeURIComponent(res.locals.trainingSession._id);
    const personalisation = {
        cancelLink: `${process.env.NODE_URI}/training-cancel/${param}`,
        name: req.body.nameOne,
        date: `${req.body.date}`
    };
    console.log(personalisation.cancelLink);
    notify.sendEmail(mainConfig.trainingTemplate, req.body.email, {personalisation: personalisation})
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
