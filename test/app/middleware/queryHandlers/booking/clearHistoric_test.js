const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');

const mockSuccess = {
    byHistoricDate: function(date) {
        return new Promise((resolve, reject) => {
            resolve('failure');
        });
    }
};

const mockFailure = {
    byHistoricDate: function(date) {
        return new Promise((resolve, reject) => {
            reject('failure');
        });
    }
};

const clearHistoric = require('../../../../../app/middleware/queryHandlers/booking/clearHistoric');
const clearHistoricSuccess = proxyquire('../../../../../app/middleware/queryHandlers/booking/clearHistoric', {'../../../model/booking/delete': mockSuccess});
const clearHistoricFailure = proxyquire('../../../../../app/middleware/queryHandlers/booking/clearHistoric', {'../../../model/booking/delete': mockFailure});

describe('/app/middleware/queryHandlers/booking/clearHistoric', () => {

    it('should be a function', () => {
        expect(clearHistoric).to.be.a('function');
    });

    it('should take three arguments', () => {
        expect(clearHistoric.length).to.equal(3);
    });

    it('should retain status code of 200', (done) => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        clearHistoric(req, res, nextSpy);
        setTimeout(() => {
            expect(res.statusCode).to.equal(200);
            done();
        }, 5);
    });

    it('should call next if all on success', (done) => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        res.locals = {};
        process.env.NODE_ENV = 'testing';
        clearHistoricSuccess(req, res, nextSpy);
        setTimeout(() => {
            expect(nextSpy.calledOnce);
            done();
        }, 5);
    });

    it('should call next if all on success', (done) => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        process.env.NODE_ENV = 'testing';
        clearHistoricFailure(req, res, nextSpy);
        setTimeout(() => {
            expect(res.statusCode).to.equal(302);
            done();
        }, 5);
    });


});
