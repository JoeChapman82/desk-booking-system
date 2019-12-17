const Room = require('./room');

module.exports = (newRoom) => {
    const room = new Room({name: newRoom.name, equipment: newRoom.equipment, sitting: newRoom.sitting, standing: newRoom.standing});
    return room.save();
};
