const redirects = require('../controllers/redirects');

module.exports = (req, res, next) => {
    if(!res.locals.tempToken && !res.locals.userToken) {
        return redirects.choose(req, res);
    }
    let token = res.locals.userToken || res.locals.tempToken;
    switch(token.permissions) {
        case 'Admin': {
            return redirects.adminHome(req, res);
        }
        case 'Super': {
            return redirects.superHome(req, res);
        }
        default: {
            return redirects.choose(req, res);
        }
    }
};
