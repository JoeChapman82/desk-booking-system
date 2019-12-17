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

const findAll = require('../../../../../app/middleware/queryHandlers/user/findAll');
const findAllSuccess = proxyquire('../../../../../app/middleware/queryHandlers/user/findAll', {'../../../model/user/read': mockSuccess});
const findAllFailure = proxyquire('../../../../../app/middleware/queryHandlers/user/findAll', {'../../../model/user/read': mockFailure});

describe('/app/middleware/queryHandlers/user/findAll', () => {

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
        it('should set res locals users', () => assert.exists(res.locals.users));
        it('should set res locals users to the promise return value', () => expect(res.locals.users).to.equal('success'));

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
        it('should populate an error message', () => expect(res.locals.errors.userFind.msg).to.equal('error finding users'));
    });


});
