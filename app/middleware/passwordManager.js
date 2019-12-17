const bcrypt = require('bcrypt');
const redirects = require('../controllers/redirects');
const renders = require('../controllers/renders');
const saltRounds = require('../config/main').saltRounds;

module.exports = {
    hashPassword: (req, res, next) => {
        bcrypt.hash(req.body.password, saltRounds)
        .then((hash) =>  {
            res.locals.hash = hash;
            return next();
        })
        .catch((error) => {
            return redirects.goneWrong(req, res);
        });
    },
    comparePassword: (req, res, next) => {
        bcrypt.compare(req.body.password, res.locals.user.password)
        .then((response) => {
            if(response) {
                return next();
            } else {
                res.locals.errors = {
                    email: {msg: 'Provide a valid email'},
                    password: {msg: 'Provide a valid password'}
                };
                return renders.login(req, res);
            }
        })
        .catch((error) => {
            return redirects.goneWrong(req, res);
        });
    }
};
