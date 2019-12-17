const Room = require('./room');

module.exports = {
    all: () => Room.find({}),
    byId: (id) => Room.findById(id),
    byName: (name) => Room.findOne({name: name}),
};
