const validator = require('validator');

module.exports = (req, res, next) => {
    if(typeof req.params.id === 'undefined' || !validator.isMongoId(req.params.id)) {
        return res.status(400).json({message: 'Bad request'});
    } else {
        return next();
    }
};
