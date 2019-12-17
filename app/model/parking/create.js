const Parking = require('./parking');

module.exports = (newParking) => {
    let isVisitor = typeof newParking.isVisitor === 'undefined' ? false : true;
    const parking = new Parking({name: newParking.name, space: newParking.space, date: newParking.date, location: newParking.location, isVisitor: isVisitor});
    return parking.save();
};
