const find = require('../../../model/parking/read');
const addErrorMessage = require('../../../helpers/addErrorMessage');
const redirects = require('../../../controllers/redirects');

module.exports = (req, res, next) => {
    find.byId(req.params.id)
    .then(response => {
        if(response === null) {
            res.locals.noParking = true;
        }
        res.locals.parking = response;
        next();
    })
    .catch(error => {
        console.log(error);
        return redirects.goneWrong(req, res);
    });
};
