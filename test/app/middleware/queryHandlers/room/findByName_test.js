const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const assert = chai.assert;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');

const mockSuccess = {
    byName: function(date) {
    return new Promise((resolve, reject) => {
        resolve('success');
    });
    }
};

const mockSuccessNullResponse = {
    byName: function(date) {
    return new Promise((resolve, reject) => {
        resolve(null);
    });
    }
};

const mockFailure = {
    byName: function(date) {
        return new Promise((resolve, reject) => {
            reject('failure');
        });
    }
};

const findByName = require('../../../../../app/middleware/queryHandlers/room/findByName');
const findByNameSuccess = proxyquire('../../../../../app/middleware/queryHandlers/room/findByName', {'../../../model/room/read': mockSuccess});
const findByNameSuccessNull = proxyquire('../../../../../app/middleware/queryHandlers/room/findByName', {'../../../model/room/read': mockSuccessNullResponse});
const findByNameFailure = proxyquire('../../../../../app/middleware/queryHandlers/room/findByName', {'../../../model/room/read': mockFailure});

describe('/app/middleware/queryHandlers/room/findByName', () => {

    it('should be a function', () => {
        expect(findByName).to.be.a('function');
    });

    it('should take three arguments', () => {
        expect(findByName.length).to.equal(3);
    });

    describe('on success', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {};
        res.locals = {roomName: {room: '1'}};

        before((done) => {
            findByNameSuccess(req, res, nextSpy);
            done();
        });

        it('should retain a 200 status code', () => expect(res.statusCode).to.equal(200));
        it('should set res locals room', () => assert.exists(res.locals.room));
        it('should set res locals rooms to the promise return value', () => expect(res.locals.room).to.equal('success'));

    });

    describe('on success with body', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {name: '1'};
        res.params = {id: '1'};
        res.locals = {};

        before((done) => {
            findByNameSuccess(req, res, nextSpy);
            done();
        });

        it('should retain a 200 status code', () => expect(res.statusCode).to.equal(200));
        it('should set res locals room', () => assert.exists(res.locals.room));
        it('should set res locals rooms to the promise return value', () => expect(res.locals.room).to.equal('success'));

    });

    describe('on success with null response', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {name: '1'};
        res.params = {id: '1'};
        res.locals = {};

        before((done) => {
            findByNameSuccessNull(req, res, nextSpy);
            done();
        });

        it('should retain a 200 status code', () => expect(res.statusCode).to.equal(200));
        it('should set res locals rooms to the promise return value', () => expect(res.locals.room).to.equal(null));
        it('should set search criteria to none', () => expect(res.locals.searchCriteria).to.equal('none'));


    });

    describe('on failure', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {};
        res.locals = {};
        before((done) => {
            findByNameFailure(req, res, nextSpy);
            done();
        });

        it('should return 302 on failure', () => expect(res.statusCode).to.equal(302));
        it('should redirect to gone wrong on failure', () => expect(res._getRedirectUrl()).to.equal('/errors/somethings-gone-wrong'));
    });


});
