const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const assert = chai.assert;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');

const mockSuccess = {
    byId: function(date) {
        return new Promise((resolve, reject) => {
            resolve('success');
        });
    },
};

const mockFailure = {
    byId: function(date) {
        return new Promise((resolve, reject) => {
            reject('failure');
        });
    },
};

const remove = require('../../../../../app/middleware/queryHandlers/booking/remove');
const removeSuccess = proxyquire('../../../../../app/middleware/queryHandlers/booking/remove', {'../../../model/booking/delete': mockSuccess});
const removeFailure = proxyquire('../../../../../app/middleware/queryHandlers/booking/remove', {'../../../model/booking/delete': mockFailure});

describe('/app/middleware/queryHandlers/booking/remove', () => {

    it('should be a function', () => {
        expect(remove).to.be.a('function');
    });

    it('should take three arguments', () => {
        expect(remove.length).to.equal(3);
    });

    describe('on success', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {bookedRoom: 'room'};
        res.locals = {};

        before((done) => {
            removeSuccess(req, res, nextSpy);
            done();
        });

        it('should retain a 200 status code', () => expect(res.statusCode).to.equal(200));
        it('should set res locals unbooked', () => assert.exists(res.locals.unbooked));
        it('should set res locals unbooked to true', () => expect(res.locals.unbooked).to.equal(true));
    });

    describe('on success with params', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.params = {id: 'room'};
        res.locals = {};

        before((done) => {
            removeSuccess(req, res, nextSpy);
            done();
        });

        it('should retain a 200 status code', () => expect(res.statusCode).to.equal(200));
        it('should set res locals unbooked', () => assert.exists(res.locals.unbooked));
        it('should set res locals unbooked to true', () => expect(res.locals.unbooked).to.equal(true));
    });

    describe('on failure', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {bookedRoom: 'room'};
        res.locals = {};
        before((done) => {
            removeFailure(req, res, nextSpy);
            done();
        });

        it('should redirect on failure', () => expect(res.statusCode).to.equal(302));
        it('should redirect to gone wrong on failure', () => expect(res._getRedirectUrl()).to.equal('/errors/somethings-gone-wrong'));
    });


});
