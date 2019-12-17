const getController = require('../controllers/getController');
const postController = require('../controllers/postController');

module.exports = (app) => {
    // admin routes
    app.get('/admin/home', getController.adminHome);

    app.get('/admin/booking/:id', getController.adminBooking);
    app.post('/admin/booking/:id', postController.adminEditBooking);

    app.get('/admin/cancel-booking/:id', getController.adminCancelBooking);
    app.get('/admin/booking-cancelled', getController.adminBookingCancelled);

    app.get('/admin/create-room', getController.adminCreateRoom);
    app.post('/admin/create-room', postController.adminCreateRoom);

    app.get('/admin/edit-room', getController.adminEditRoom);
    app.post('/admin/edit-room', postController.adminEditRoom);

    app.get('/admin/invite-user', getController.adminInviteUser);
    app.post('/admin/invite-user', postController.adminInviteUser);

    app.post('/admin/search-by-description', postController.adminSearchByDescription);
    app.post('/admin/search-by-room', postController.adminSearchByRoomName);

    app.get('/admin/search-results', getController.adminSearchResults);
    app.get('/admin/no-results', getController.adminNoResults);

    app.get('/admin/training-overview', getController.adminTrainingOverview);
    app.post('/admin/training-cancel', postController.adminTrainingCancel);


    // super routes
    app.get('/super/home', getController.superHome);

    app.get('/super/seed', getController.superSeed);
    app.post('/super/seed', postController.superSeed);

    app.get('/super/invite-user', getController.superInviteUser);
    app.post('/super/invite-user', postController.superInviteUser);

    app.get('/super/create-room', getController.superCreateRoom);
    app.post('/super/create-room', postController.superCreateRoom);

    app.get('/super/edit-room', getController.superEditRoom);
    app.post('/super/edit-room', postController.superEditRoom);

    app.get('/super/create-booking', getController.superCreateBooking);
    app.post('/super/create-booking', postController.superCreateBooking);

    app.get('/super/manage-users', getController.superManageUsers);
    // app.post('/super/manage-users', postController.superManageUsers);

    app.get('/super/clear-old-bookings', getController.superClearOldBookings);
    app.post('/super/clear-old-bookings', postController.superClearOldBookings);

    // other routes
    app.get('/new-user', getController.newUser);
    app.post('/new-user', postController.newUser);
    return app;
};
