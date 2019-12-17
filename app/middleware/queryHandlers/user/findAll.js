const find = require('../../../model/user/read');
const redirects = require('../../../controllers/redirects');
const addErrorMessage = require('../../../helpers/addErrorMessage');

module.exports = (req, res, next) => {
    find.all()
    .then(response => {
        res.locals.users = response;
        next();
    })
    .catch(error => {
        addErrorMessage(res, 'userFind', 'error finding users');
        return next();
    });
};
