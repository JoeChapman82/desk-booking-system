const Training = require('./training');

module.exports = {
    byId: (id) => Training.findByIdAndRemove(id),
    byHistoricDate: (date) => Training.remove({start: {"$lte": date}})
};
