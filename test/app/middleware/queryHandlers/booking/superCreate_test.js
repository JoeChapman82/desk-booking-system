const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const assert = chai.assert;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');

const mockSuccess = function(date) {
        return new Promise((resolve, reject) => {
            resolve({_id: 'test'});
        });
};

const mockFailure = function(date) {
        return new Promise((resolve, reject) => {
            reject('failure');
        });
};

const create = require('../../../../../app/middleware/queryHandlers/booking/superCreate');
const createSuccess = proxyquire('../../../../../app/middleware/queryHandlers/booking/superCreate', {'../../../model/booking/create': mockSuccess});
const createFailure = proxyquire('../../../../../app/middleware/queryHandlers/booking/superCreate', {'../../../model/booking/create': mockFailure});

describe('/app/middleware/queryHandlers/booking/create', () => {

    it('should be a function', () => {
        expect(create).to.be.a('function');
    });

    it('should take three arguments', () => {
        expect(create.length).to.equal(3);
    });

    describe('on success', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {startDate: '12 12 2018', endDate: '12 12 2018', name: 'test', description: 'test'};
        res.locals = {roomId: '1'};

        before((done) => {
            createSuccess(req, res, nextSpy);
            done();
        });

        it('should retain a 200 status code', () => expect(res.statusCode).to.equal(200));
        it('should set res locals booking', () => assert.exists(res.locals.booking));
        it('should set res locals booked', () => assert.exists(res.locals.booked));
        it('should set res locals booked to true', () => expect(res.locals.booked).to.equal(true));
        it('should set res locals bookedRoom', () => assert.exists(res.locals.bookedRoom));
        it('should set res locals bookedRoom as the promise return _id', () => expect(res.locals.bookedRoom).to.equal('test'));

    });

    describe('on failure', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {bookedRoom: 'room'};
        res.locals = {};
        before((done) => {
            createFailure(req, res, nextSpy);
            done();
        });

        it('should return 200 on failure', () => expect(res.statusCode).to.equal(200));
        it('should populate an error message', () => expect(res.locals.errors.booking.msg).to.equal('error booking room'));
    });


});
