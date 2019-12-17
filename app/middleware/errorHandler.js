const redirects = require('../controllers/redirects');

module.exports = (err, req, res, next) => {
    if(process.env.NODE_ENV !== 'production') {
        res.status(500).send(`Got an error:<br \>
            ${err}<br \>
            Stacktrace:<br \>
            ${err.stack}`);
    } else {
        redirects.goneWrong(req, res);
    }
};
