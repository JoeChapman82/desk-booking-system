const jwt = require('jsonwebtoken');
const config = require('../config/main');
const redirects = require('../controllers/redirects');

module.exports = {
    sessionToken: (req, res, next) => {
        let claims = {
            sub: res.locals.user._id,
            iss: process.env.JWT_ISSUER_URL,
            permissions: res.locals.user.role,
        };
        jwt.sign(claims, process.env.JWT_SECRET, {
            expiresIn: config.jwtLifespan
        }, (err, createdToken) => {
            if(err) {
                console.log('error');
                redirects.goneWrong(req, res);
            } else {
            // Send the the token in a cookie
            res.locals.tempToken = {
                sub: res.locals.user._id,
                permissions: res.locals.user.role,
            };
            res.cookie('leeds_one_room_booking', createdToken, { maxAge: config.cookieLifespan, httpOnly: true, signed: true, secure: false });
            next();
            }
        });
    },
    newUserToken: (req, res, next) => {
        let claims = {
            sub: {
                email: req.body.email,
            },
            iss: process.env.JWT_ISSUER_URL,
            permissions: {
                newUserRole: 'Admin'
            }
        };
        jwt.sign(claims, process.env.JWT_SECRET, {
            expiresIn: config.jwtLifespan
        }, (err, createdToken) => {
            if(err) {
                console.log(err);
                redirects.goneWrong(req, res);
            } else {
                res.locals.newUserToken = createdToken;
                next();
            }
        });
    },
};
