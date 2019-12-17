const find = require('../../../model/user/read');
const redirects = require('../../../controllers/redirects');
const addErrorMessage = require('../../../helpers/addErrorMessage');

module.exports = (req, res, next) => {
    let toQuery = req.body.userId;
    find.byId(toQuery)
    .then(response => {
        res.locals.user = response;
        next();
    })
    .catch(error => {
        addErrorMessage(res, 'userFind', 'error finding user');
        return next();
    });
};
