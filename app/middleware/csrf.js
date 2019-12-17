const csrf = require('csurf');
const config = require('../config/main');

module.exports = (app) => {

    app.use(csrf({cookie: {maxAge: config.csrfLifespan, httpOnly: true, signed: true, secure: false}}));

    app.use((req, res, next) => {
        res.locals._csrf = req.csrfToken();
        next();
    });

    app.use((err, req, res, next) => {
        if (err.code !== 'EBADCSRFTOKEN') {
            console.log('Bad csrf token on', req.url);
            return next(err);
        }
        console.log(err);
        res.clearCookie('_csrf');
        res.redirect('/');
    });

    return app;
};
