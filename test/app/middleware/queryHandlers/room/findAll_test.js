const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const assert = chai.assert;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');

const mockSuccess = {
    all: function(date) {
    return new Promise((resolve, reject) => {
        resolve('success');
    });
    }
};

const mockFailure = {
    all: function(date) {
        return new Promise((resolve, reject) => {
            reject('failure');
        });
    }
};

const findAll = require('../../../../../app/middleware/queryHandlers/room/findAll');
const findAllSuccess = proxyquire('../../../../../app/middleware/queryHandlers/room/findAll', {'../../../model/room/read': mockSuccess});
const findAllFailure = proxyquire('../../../../../app/middleware/queryHandlers/room/findAll', {'../../../model/room/read': mockFailure});

describe('/app/middleware/queryHandlers/room/findAll', () => {

    it('should be a function', () => {
        expect(findAll).to.be.a('function');
    });

    it('should take three arguments', () => {
        expect(findAll.length).to.equal(3);
    });

    describe('on success', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {};
        res.locals = {};

        before((done) => {
            findAllSuccess(req, res, nextSpy);
            done();
        });

        it('should retain a 200 status code', () => expect(res.statusCode).to.equal(200));
        it('should set res locals rooms', () => assert.exists(res.locals.rooms));
        it('should set res locals rooms to the promise return value', () => expect(res.locals.rooms).to.equal('success'));

    });

    describe('on failure', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {};
        res.locals = {};
        before((done) => {
            findAllFailure(req, res, nextSpy);
            done();
        });

        it('should return 200 on failure', () => expect(res.statusCode).to.equal(200));
        it('should populate an error message', () => expect(res.locals.errors.roomFind.msg).to.equal('error finding rooms'));
    });


});
