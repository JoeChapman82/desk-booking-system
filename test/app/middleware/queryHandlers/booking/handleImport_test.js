const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const assert = chai.assert;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');

const mockSuccess = function(date) {
        return new Promise((resolve, reject) => {
            resolve('success');
        });
};

const mockFailure = function() {
        return new Promise((resolve, reject) => {
            reject('failure');
        });
};

const handleImport = require('../../../../../app/middleware/queryHandlers/booking/handleImport');
const handleImportSuccess = proxyquire('../../../../../app/middleware/queryHandlers/booking/handleImport', {'../../../model/booking/create': mockSuccess});
const handleImportFailure = proxyquire('../../../../../app/middleware/queryHandlers/booking/handleImport', {'../../../model/booking/create': mockFailure});

describe('/app/middleware/queryHandlers/booking/handleImport', () => {
    const bookings = JSON.stringify([{start: new Date(), end: new Date(), description: 'test'}, {start: new Date(), end: new Date(), description: 'test'}]);

    it('should be a function', () => {
        expect(handleImport).to.be.a('function');
    });

    it('should take three arguments', () => {
        expect(handleImport.length).to.equal(3);
    });

    describe('on success', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        res.locals = {room: {_id: '1'}, jsonBookings: bookings};

        before((done) => {
            handleImportSuccess(req, res, nextSpy);
            done();
        });

        it('should retain a 200 status code', () => expect(res.statusCode).to.equal(200));
    });

    describe('on failure', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        res.locals = {room: {_id: '1'}, jsonBookings: JSON.stringify([{start: new Date(), end: new Date(), description: 'test'}, {start: new Date(), end: new Date(), description: 'test'}])};

        before((done) => {
            handleImportFailure(req, res, nextSpy);
            done();
        });

        it('should redirect on failure', () => expect(res.statusCode).to.equal(302));
        it('should redirect to gone wrong on failure', () => expect(res._getRedirectUrl()).to.equal('/errors/somethings-gone-wrong'));
    });


});
