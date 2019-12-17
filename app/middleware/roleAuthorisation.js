const findHome = require('./findHome');

module.exports = {
    admin: (req, res, next) => {
        if(res.locals.userToken.permissions === 'Admin') {
            return next();
        } else {
            return findHome(req, res, next);
        }
    },
    super: (req, res, next) => {
        if(res.locals.userToken.permissions === 'Super') {
            return next();
        } else {
            return findHome(req, res);
        }
    }
};
