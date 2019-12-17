const Room = require('./room');

module.exports = {
    one: (find, update) => Room.findOneAndUpdate(find, update),
};
