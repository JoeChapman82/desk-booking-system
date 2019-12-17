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
    }
};

const mockFailure = {
    byId: function(date) {
        return new Promise((resolve, reject) => {
            reject('failure');
        });
    }
};

const findById = require('../../../../../app/middleware/queryHandlers/room/findById');
const findByIdSuccess = proxyquire('../../../../../app/middleware/queryHandlers/room/findById', {'../../../model/room/read': mockSuccess});
const findByIdFailure = proxyquire('../../../../../app/middleware/queryHandlers/room/findById', {'../../../model/room/read': mockFailure});

describe('/app/middleware/queryHandlers/room/findById', () => {

    it('should be a function', () => {
        expect(findById).to.be.a('function');
    });

    it('should take three arguments', () => {
        expect(findById.length).to.equal(3);
    });

    describe('on success', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {};
        res.locals = {booking: {room: '1'}};

        before((done) => {
            findByIdSuccess(req, res, nextSpy);
            done();
        });

        it('should retain a 200 status code', () => expect(res.statusCode).to.equal(200));
        it('should set res locals room', () => assert.exists(res.locals.room));
        it('should set res locals rooms to the promise return value', () => expect(res.locals.room).to.equal('success'));

    });

    describe('on success with params', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {};
        res.params = {id: '1'};
        res.locals = {};

        before((done) => {
            findByIdSuccess(req, res, nextSpy);
            done();
        });

        it('should retain a 200 status code', () => expect(res.statusCode).to.equal(200));
        it('should set res locals room', () => assert.exists(res.locals.room));
        it('should set res locals rooms to the promise return value', () => expect(res.locals.room).to.equal('success'));

    });

    describe('on failure', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {};
        res.locals = {};
        before((done) => {
            findByIdFailure(req, res, nextSpy);
            done();
        });

        it('should return 302 on failure', () => expect(res.statusCode).to.equal(302));
        it('should redirect to gone wrong on failure', () => expect(res._getRedirectUrl()).to.equal('/errors/somethings-gone-wrong'));
    });


});
