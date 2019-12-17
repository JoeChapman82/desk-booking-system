const totalSpaces = require('../config/safe').visitorParkingSpaces;

module.exports = (takenSpaces) => {
    let allSpaces = {};
    for(var i = 1; i <= totalSpaces; i++) {
        allSpaces[i.toString()] = {available: true};
    }
    takenSpaces.forEach((space) => {
        allSpaces[space.space].id = space._id;
        allSpaces[space.space].available = false;
        allSpaces[space.space].name = space.name;
    });
    return allSpaces;

};
