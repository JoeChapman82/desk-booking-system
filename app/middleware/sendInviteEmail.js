const notify = require('../services/notify/notify');
const mainConfig = require('../config/main');

module.exports = (req, res, next) => {
    if(res.locals.user !== null) {
        res.locals.errors = {email: {msg: 'User already has an account'}};
        return next();
    }
    let param = encodeURIComponent(res.locals.newUserToken);
    let link = `${process.env.NODE_URI}/new-user?token=${param}`;
    console.log(link);
    const personalisation = {
        link: link,
        location: req.app.locals.siteLocation
    };
    notify.sendEmail(mainConfig.inviteTemplate, req.body.email, {personalisation: personalisation})
    .then(response => {
        res.locals.invited = true;
        return next();
    })
    .catch(err => {
        console.log(err.message);
        res.locals.emailFailure = `Failure:<br />error: ${err.error.errors[0].message}`;
        return next();
    });
};
