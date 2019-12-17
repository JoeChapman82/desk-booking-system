const createUser = require('../model/user/create');
const redirects = require('../controllers/redirects');

module.exports = (req, res, next) => {
    console.log('gere');
    if(res.locals.users.length === 0) {
        console.log('Creating initial user');
        createUser(process.env.INITIAL_USER_EMAIL, process.env.INITIAL_USER_PASSWORD, 'Super')
        .then((response) => {
            console.log(response);
            return next();
        })
        .catch((error) => {
            console.log('Error creating initial user');
            console.log(error);
            return redirects.goneWrong(req, res);
        });
    } else {
        console.log('Users already exist within the system');
        return next();
    }
};
