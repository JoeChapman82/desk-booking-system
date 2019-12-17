const jwt = require('jsonwebtoken');

const redirects = require('../controllers/redirects');
const assignToken = require('./assignToken.js');
const config = require ('../config/main');

module.exports = (req, res, next) => {
    let token;
    if(req._parsedUrl.pathname === '/new-user' || req._parsedUrl.pathname === '/reset-password') {
        token = req.query.token;
        res.locals.tokenRaw = token;
    } else {
        token = req.signedCookies.leeds_one_room_booking;
    }
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err) {
                if(req.signedCookies.leeds_one_room_booking) {
                    res.clearCookie('leeds_one_room_booking');
                    return redirects.choose(req, res);
                } else {
                    redirects.choose(req, res);
                }
            } else {
                res.locals.userToken = decodedToken;
                next();
            }
        });
    } else {
        console.log('no valid token found');
        return redirects.choose(req, res);
    }

};
