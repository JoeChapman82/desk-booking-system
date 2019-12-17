const Parking = require('./parking');

module.exports = {
    byId: (id) => Parking.findByIdAndRemove(id),
    byHistoricDate: (date) => Parking.remove({date: {"$lte": date}})
};
