const removeBooking = require('../model/booking/delete');
const removeParking = require('../model/booking/delete');
const addDays = require('./addDays');

module.exports = (req, res, next) => {
    const yesterday = addDays(new Date(), -1);
    removeBooking.byHistoricDate(yesterday)
    .then(response => {
        return removeParking.byHistoricDate(yesterday);
    })
    .then(response => {
        console.log('cleared historic records');
        return null;
    })
    .catch((error) => {
        console.log(error);
        return null;
    });
};
