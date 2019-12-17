const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');

const mockSuccess = () => new Promise((resolve, reject) => resolve('success'));
const mockFailure = () => new Promise((resolve, reject) => reject('failure'));

const create = require('../../../../../app/middleware/queryHandlers/booking/create');
const createSuccess = proxyquire('../../../../../app/middleware/queryHandlers/booking/create', {'../../../model/booking/create': mockSuccess});
const createFailure = proxyquire('../../../../../app/middleware/queryHandlers/booking/create', {'../../../model/booking/create': mockFailure});

describe('/app/middleware/queryHandlers/booking/create', () => {

    it('should be a function', () => {
        expect(create).to.be.a('function');
    });

    it('should take three arguments', () => {
        expect(create.length).to.equal(3);
    });

    it('should call next on success', (done) => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
            date: ['12', '12', '2018'],
            fromHours: '19',
            fromMinutes: '30',
            untilHours: '20',
            untilMinutes: '00'
        };
        res.locals = {bookings: []};
        process.env.NODE_ENV = 'testing';
        createSuccess(req, res, nextSpy);
        setTimeout(() => {
            expect(nextSpy.calledOnce);
            done();
        }, 5);
    });

    it('should call next on failure', (done) => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        res.locals = {};
        req.body = {
            date: ['12', '12', '2018'],
            fromHours: '19',
            fromMinutes: '30',
            untilHours: '20',
            untilMinutes: '00'
        };
        process.env.NODE_ENV = 'testing';
        createFailure(req, res, nextSpy);
        setTimeout(() => {
            expect(nextSpy.calledOnce);
            done();
        }, 5);
    });


});
