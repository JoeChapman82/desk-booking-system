const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const assert = chai.assert;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');

const mockSuccess = {
    byDateRange: function(date) {
        return new Promise((resolve, reject) => {
            resolve('success');
        });
    },
};

const mockFailure = {
    byDateRange: function(date) {
        return new Promise((resolve, reject) => {
            reject('failure');
        });
    },
};

const findDaysBookings = require('../../../../../app/middleware/queryHandlers/booking/findDaysBookings');
const findDaysBookingsSuccess = proxyquire('../../../../../app/middleware/queryHandlers/booking/findDaysBookings', {'../../../model/booking/read': mockSuccess});
const findDaysBookingsFailure = proxyquire('../../../../../app/middleware/queryHandlers/booking/findDaysBookings', {'../../../model/booking/read': mockFailure});

describe('/app/middleware/queryHandlers/booking/findDaysBookings', () => {

    it('should be a function', () => {
        expect(findDaysBookings).to.be.a('function');
    });

    it('should take three arguments', () => {
        expect(findDaysBookings.length).to.equal(3);
    });

    describe('on success', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        res.locals = {today: {date: new Date()}, room: {_id: '1'}};

        before((done) => {
            findDaysBookingsSuccess(req, res, nextSpy);
            done();
        });

        it('should retain a 200 status code', () => expect(res.statusCode).to.equal(200));
        it('should should add res locals bookings', () => assert.exists(res.locals.bookings));
        it('should should add the promise response to bookings', () => expect(res.locals.bookings).to.equal('success'));
    });

    describe('on failure', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        res.locals = {today: {date: new Date()}, room: {_id: '1'}};

        before((done) => {
            findDaysBookingsFailure(req, res, nextSpy);
            done();
        });

        it('should redirect on failure', () => expect(res.statusCode).to.equal(302));
        it('should redirect to gone wrong on failure', () => expect(res._getRedirectUrl()).to.equal('/errors/somethings-gone-wrong'));
    });


});
