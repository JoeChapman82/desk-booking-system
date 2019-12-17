const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');

const mockSuccess = function() {
    return new Promise((resolve, reject) => {
        resolve('success');
    });
};

const mockFailure = function() {
    return new Promise((resolve, reject) => {
        reject('failure');
    });
};

const handleInitialUser = require('../../../app/middleware/handleInitialUser');
const handleInitialUserSuccess = proxyquire('../../../app/middleware/handleInitialUser', {'../model/user/create': mockSuccess});
const handleInitialUserFailure = proxyquire('../../../app/middleware/handleInitialUser', {'../model/user/create': mockFailure});

describe('/app/helpers/handleInitialUser', () => {

    it('should be a function', () => {
        expect(handleInitialUser).to.be.a('function');
    });

    it('should take three arguments', () => {
        expect(handleInitialUser.length).to.equal(3);
    });

    it('should be call next if all on success', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        res.locals = {users: []};
        const nextSpy = sinon.spy();
        process.env.NODE_ENV = 'testing';
        handleInitialUser(req, res, nextSpy);
        expect(nextSpy.calledOnce);
    });

    it('should redirect on failure', (done) => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        res.locals = {users: []};
        const nextSpy = sinon.spy();
        process.env.NODE_ENV = 'testing';
        handleInitialUserFailure(req, res, nextSpy);
        setTimeout(() => {
            expect(res.statusCode).to.equal(302);
            done();
        }, 5);
    });

    it('should call next if all on success', (done) => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        res.locals = {users: []};
        const nextSpy = sinon.spy();
        process.env.NODE_ENV = 'testing';
        handleInitialUserSuccess(req, res, nextSpy);
        setTimeout(() => {
            expect(nextSpy.calledOnce);
            done();
        }, 5);
    });

    it('should call next if users already exist', (done) => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        res.locals = {users: ['1']};
        const nextSpy = sinon.spy();
        process.env.NODE_ENV = 'testing';
        handleInitialUserSuccess(req, res, nextSpy);
        setTimeout(() => {
            expect(nextSpy.calledOnce);
            done();
        }, 5);
    });

});
