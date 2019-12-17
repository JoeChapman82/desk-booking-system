const validator = require('validator');
const renders = require('../../controllers/renders');
const redirects = require('../../controllers/redirects');
const addErrorMessage = require('../../helpers/addErrorMessage');

module.exports = (req, res, next) => {
        if(typeof req.body.dateDay === 'undefined' || validator.isEmpty(req.body.dateDay) || !validator.isInt(req.body.dateDay, {min: 1, max: 31})) {
            req.body.dateDay = undefined;
            addErrorMessage(res, 'dateDay', 'provide a valid date');
        }
        if(typeof req.body.dateMonth === 'undefined' || validator.isEmpty(req.body.dateMonth) || !validator.isInt(req.body.dateMonth, {min: 1, max: 12})) {
            req.body.dateMonth = undefined;
            addErrorMessage(res, 'dateMonth', 'provide a valid date');
        }
        if(typeof req.body.dateYear === 'undefined' || validator.isEmpty(req.body.dateYear) || !validator.isInt(req.body.dateYear, {min: 2000, max: 2030})) {
            req.body.dateYear = undefined;
            addErrorMessage(res, 'dateYear', 'provide a valid date');
        }
        if(!res.locals.errors) {
            return next();
        } else {
            if(req.url === '/overview') {
                let today = new Date();
                req.body.dateDay = today.getDate();
                req.body.dateMonth = today.getMonth() + 1;
                req.body.dateYear = today.getFullYear();
                return redirects.overview(req, res);
            } else if(req.url === '/parking-take') {
                return redirects.parkingTake(req, res);
            } else if(req.url === '/parking-visitor') {
                return redirects.parkingVisitor(req, res);
            } else {
                return redirects.book(req, res);
            }
        }
};
