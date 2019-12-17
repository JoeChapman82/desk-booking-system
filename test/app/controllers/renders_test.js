const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const httpMocks = require('node-mocks-http');
const sinon = require('sinon');

const renders = require('../../../app/controllers/renders');


describe('/app/controllers/renders', () => {

    it('should be an object', () => {
        expect(renders).to.be.an('object');
    });

    it('should contain functions', () => {
        Object.keys(renders).forEach((key) => {
            expect(renders[key]).to.be.a('function');
        });
    });

    describe('index', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should render the index view', () => {
            renders.index(req, res);
                expect(res.statusCode).to.equal(200);
                expect(res._getRenderView()).to.equal('index');
        });
    });

    describe('choose', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should render the choose view', () => {
            renders.choose(req, res);
                expect(res.statusCode).to.equal(200);
                expect(res._getRenderView()).to.equal('user/choose');
        });
    });

    describe('book', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should render the book view', () => {
            renders.book(req, res);
                expect(res.statusCode).to.equal(200);
                expect(res._getRenderView()).to.equal('user/book');
        });
    });

    describe('cancel', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should render the cancel view', () => {
            renders.cancel(req, res);
                expect(res.statusCode).to.equal(200);
                expect(res._getRenderView()).to.equal('user/cancel');
        });
    });

    describe('cancelled', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should render the cancelled view', () => {
            renders.cancelled(req, res);
                expect(res.statusCode).to.equal(200);
                expect(res._getRenderView()).to.equal('user/cancelled');
        });
    });

    describe('login', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should render the login view', () => {
            renders.login(req, res);
                expect(res.statusCode).to.equal(200);
                expect(res._getRenderView()).to.equal('user/login');
        });
    });

    describe('goneWrong', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should render the goneWrong view', () => {
            renders.goneWrong(req, res);
                expect(res.statusCode).to.equal(200);
                expect(res._getRenderView()).to.equal('errors/somethings-gone-wrong');
        });
    });

    describe('adminHome', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should render the adminHome view', () => {
            renders.adminHome(req, res);
                expect(res.statusCode).to.equal(200);
                expect(res._getRenderView()).to.equal('admin/home');
        });
    });

    describe('adminBooking', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should render the adminBooking view', () => {
            renders.adminBooking(req, res);
                expect(res.statusCode).to.equal(200);
                expect(res._getRenderView()).to.equal('admin/booking');
        });
    });

    describe('adminBookingCancelled', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should render the adminBookingCancelled view', () => {
            renders.adminBookingCancelled(req, res);
                expect(res.statusCode).to.equal(200);
                expect(res._getRenderView()).to.equal('admin/booking-cancelled');
        });
    });

    describe('adminCreateRoom', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should render the adminCreateRoom view', () => {
            renders.adminCreateRoom(req, res);
                expect(res.statusCode).to.equal(200);
                expect(res._getRenderView()).to.equal('admin/create-room');
        });
    });

    describe('adminEditRoom', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should render the adminEditRoom view', () => {
            renders.adminEditRoom(req, res);
                expect(res.statusCode).to.equal(200);
                expect(res._getRenderView()).to.equal('admin/edit-room');
        });
    });

    describe('adminInviteUser', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should render the adminInviteUser view', () => {
            renders.adminInviteUser(req, res);
                expect(res.statusCode).to.equal(200);
                expect(res._getRenderView()).to.equal('admin/invite-user');
        });
    });

    describe('adminSearchResults', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should render the adminSearchResults view', () => {
            renders.adminSearchResults(req, res);
                expect(res.statusCode).to.equal(200);
                expect(res._getRenderView()).to.equal('admin/search-results');
        });
    });

    describe('adminNoResults', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should render the adminNoResults view', () => {
            renders.adminNoResults(req, res);
                expect(res.statusCode).to.equal(200);
                expect(res._getRenderView()).to.equal('admin/no-results');
        });
    });

    describe('superHome', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should render the superHome view', () => {
            renders.superHome(req, res);
                expect(res.statusCode).to.equal(200);
                expect(res._getRenderView()).to.equal('super/home');
        });
    });

    describe('superSeed', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should render the superSeed view', () => {
            renders.superSeed(req, res);
                expect(res.statusCode).to.equal(200);
                expect(res._getRenderView()).to.equal('super/seed');
        });
    });

    describe('superInviteUser', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should render the superInviteUser view', () => {
            renders.superInviteUser(req, res);
                expect(res.statusCode).to.equal(200);
                expect(res._getRenderView()).to.equal('super/invite-user');
        });
    });

    describe('superCreateRoom', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should render the superCreateRoom view', () => {
            renders.superCreateRoom(req, res);
                expect(res.statusCode).to.equal(200);
                expect(res._getRenderView()).to.equal('super/create-room');
        });
    });

    describe('superEditRoom', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should render the superEditRoom view', () => {
            renders.superEditRoom(req, res);
                expect(res.statusCode).to.equal(200);
                expect(res._getRenderView()).to.equal('super/edit-room');
        });
    });

    describe('superCreateBooking', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should render the superCreateBooking view', () => {
            renders.superCreateBooking(req, res);
                expect(res.statusCode).to.equal(200);
                expect(res._getRenderView()).to.equal('super/create-booking');
        });
    });

    describe('superManageUsers', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should render the superManageUsers view', () => {
            renders.superManageUsers(req, res);
                expect(res.statusCode).to.equal(200);
                expect(res._getRenderView()).to.equal('super/manage-users');
        });
    });

    describe('superClearOldBookings', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should render the superClearOldBookings view', () => {
            renders.superClearOldBookings(req, res);
                expect(res.statusCode).to.equal(200);
                expect(res._getRenderView()).to.equal('super/clear-old-bookings');
        });
    });

    describe('newUser', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should render the newUser view', () => {
            renders.newUser(req, res);
                expect(res.statusCode).to.equal(200);
                expect(res._getRenderView()).to.equal('user/new-user');
        });
    });

});
