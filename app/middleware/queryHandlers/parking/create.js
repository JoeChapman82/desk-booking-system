const create = require('../../../model/parking/create');
const redirects = require('../../../controllers/redirects');
const addErrorMessage = require('../../../helpers/addErrorMessage');

module.exports = (req, res, next) => {
    const date = new Date(`${req.body.dateYear} ${req.body.dateMonth} ${req.body.dateDay} 12:00:00`);
    const newParking = {
        space: req.body.space,
        name: req.body.name,
        date: date,
        location: req.body.location,
    };
    create(newParking)
    .then((response) => {
        res.locals.giveSuccessful = true;
        return next();
    })
    .catch((error) => {
        addErrorMessage(res, 'space', 'an error occured');
        return next();
    });
};
