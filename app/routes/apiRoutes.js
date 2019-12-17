const apiController = require('../controllers/apiController');

module.exports = (api) => {

    api.get('/', apiController.getIndex);
    api.get('/rooms', apiController.getRooms);
    api.get('/room/:id', apiController.getRoom);
    api.get('/booking/:id', apiController.getBooking);

    api.post('/bookings', apiController.postBookings);

    api.all('*', apiController.catchAll);
    return api;
};
