const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const assert = chai.assert;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');

const mockSuccess = {
    toAuthenticate: function(date) {
    return new Promise((resolve, reject) => {
        resolve('success');
    });
    }
};

const mockSuccessNull = {
    toAuthenticate: function(date) {
    return new Promise((resolve, reject) => {
        resolve(null);
    });
    }
};

const mockFailure = {
    toAuthenticate: function(date) {
        return new Promise((resolve, reject) => {
            reject('failure');
        });
    }
};

const findToAuthenticate = require('../../../../../app/middleware/queryHandlers/user/findToAuthenticate');
const findToAuthenticateSuccess = proxyquire('../../../../../app/middleware/queryHandlers/user/findToAuthenticate', {'../../../model/user/read': mockSuccess});
const findToAuthenticateSuccessNull = proxyquire('../../../../../app/middleware/queryHandlers/user/findToAuthenticate', {'../../../model/user/read': mockSuccessNull});
const findToAuthenticateFailure = proxyquire('../../../../../app/middleware/queryHandlers/user/findToAuthenticate', {'../../../model/user/read': mockFailure});

describe('/app/middleware/queryHandlers/user/findToAuthenticate', () => {

    it('should be a function', () => {
        expect(findToAuthenticate).to.be.a('function');
    });

    it('should take three arguments', () => {
        expect(findToAuthenticate.length).to.equal(3);
    });

    describe('on success', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {email: 'email'};
        res.locals = {};

        before((done) => {
            findToAuthenticateSuccess(req, res, nextSpy);
            done();
        });

        it('should retain a 200 status code', () => expect(res.statusCode).to.equal(200));
        it('should set res locals user', () => assert.exists(res.locals.user));
        it('should set res locals user to the promise return value', () => expect(res.locals.user).to.equal('success'));

    });

    describe('on success with null response', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {email: 'email'};
        res.locals = {};

        before((done) => {
            findToAuthenticateSuccessNull(req, res, nextSpy);
            done();
        });

        it('should retain a 200 status code', () => expect(res.statusCode).to.equal(200));
        it('should set an email error message', () => expect(res.locals.errors.email.msg).to.equal('Provide a valid email'));
        it('should set an password error message', () => expect(res.locals.errors.password.msg).to.equal('Provide a valid password'));

    });

    describe('on failure', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {email: 'email'};
        res.locals = {};
        before((done) => {
            findToAuthenticateFailure(req, res, nextSpy);
            done();
        });

        it('should return 302 on failure', () => expect(res.statusCode).to.equal(302));
        it('should populate an error message', () => expect(res._getRedirectUrl()).to.equal('/errors/somethings-gone-wrong'));
    });


});
