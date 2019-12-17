const create = require('../../../model/user/create');
const redirects = require('../../../controllers/redirects');
const addErrorMessage = require('../../../helpers/addErrorMessage');

module.exports = (req, res, next) => { 
    if(res.locals.user !== null) {
        res.locals.errors = {email: {msg: 'don\'t create duplicate accounts'}};
        return next();
    }
    create(req.body.email, res.locals.hash, 'Admin')
    .then((response) => {
        res.locals.userCreated = true;
        return next();
    })
    .catch((error) => {
        addErrorMessage(res, 'userCreation', 'error creating room');
        return next();
    });
};
