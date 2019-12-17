const getController = require('../controllers/getController');
const postController = require('../controllers/postController');
module.exports = (app) => {

    // rooms
    app.get('/', getController.index);
    app.get('/choose', getController.choose);
    app.get('/overview', getController.overview);
    app.post('/overview', postController.overview);
    app.get('/check', getController.check);
    app.post('/check', postController.check);
    app.get('/book/:id', getController.book);
    app.post('/book/:id', postController.book);
    app.post('/change-book-date/:id', postController.changeBookDate);
    app.post('/book-cancel/:id', postController.bookCancel);
    app.get('/cancel/:id', getController.cancel);
    app.post('/cancel', postController.cancel);
    app.get('/cancelled', getController.cancelled);
    // parking
    if(app.locals.showParking) {
        app.get('/parking-give', getController.parkingGive);
        app.post('/parking-give', postController.parkingGive);
        app.get('/parking-take', getController.parkingTake);
        app.post('/parking-take', postController.parkingTake);
        app.get('/parking-take/:id', getController.parkingTakeConfirm);
        app.post('/parking-take/:id', postController.parkingTakeConfirm);
        app.get('/parking-visitor', getController.parkingVisitor);
        app.post('/parking-visitor', postController.parkingVisitor);
        app.get('/parking-visitor/:space', getController.parkingVisitorConfirm);
        app.post('/parking-visitor/:space', postController.parkingVisitorConfirm);
        app.get('/parking-cancel/:id', getController.parkingCancel);
        app.post('/parking-cancel/:id', postController.parkingCancel);
    }
    if(app.locals.showTraining) {
        app.get('/training-session', getController.trainingSession);
        app.get('/training-session/:date', getController.trainingBook);
        app.post('/training-session/:date', postController.trainingBook);
        app.get('/training-cancel/:id', getController.trainingCancel);
        app.post('/training-cancel/:id', postController.trainingCancel);
    }
    // login
    app.get('/login', getController.login);
    app.post('/login', postController.login);
    // errors
    app.get('/errors/somethings-gone-wrong', getController.goneWrong);
    // logout
    app.post('/logout', postController.logout);

    // initial route
    app.get('/secret', getController.secret);

    return app;
};
