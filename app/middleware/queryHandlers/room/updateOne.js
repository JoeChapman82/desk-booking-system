const update = require('../../../model/room/update');
const redirects = require('../../../controllers/redirects');
const addErrorMessage = require('../../../helpers/addErrorMessage');

module.exports = (req, res, next) => {
    const toFind = {
        _id: req.body.id
    };
    const toUpdate = {
        name: req.body.name,
        equipment: [req.body.equipment[0], req.body.equipment[1]],
        sitting: req.body.sitting,
        standing: req.body.standing
    };
    update.one(toFind, toUpdate)
    .then((response) => {
        res.locals.roomEdited = true;
        return next();
    })
    .catch((error) => {
        addErrorMessage(res, 'roomEdit', 'error editing room');
        return next();
    });
};
