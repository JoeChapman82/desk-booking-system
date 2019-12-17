const create = require('../../../model/room/create');
const redirects = require('../../../controllers/redirects');
const addErrorMessage = require('../../../helpers/addErrorMessage');

module.exports = (req, res, next) => {
    console.log('in create roon');
    if(res.locals.room !== null) {
        res.locals.errors = {name: {msg: 'don\'t create duplicate rooms'}};
        return next();
    }
    const room = {
        name: req.body.name,
        equipment: req.body.equipment,
        sitting: req.body.sitting,
        standing: req.body.standing
    };
    create(room)
    .then((response) => {
        res.locals.roomCreated = true;
        return next();
    })
    .catch((error) => {
        console.log(error);
        addErrorMessage(res, 'roomCreation', 'error creating room');
        return next();
    });
};
