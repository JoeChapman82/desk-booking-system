const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const assert = chai.assert;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');

const mockSuccess = function(date) {
    return new Promise((resolve, reject) => {
        resolve({_id: 'test'});
    });
};

const mockFailure = function(date) {
    return new Promise((resolve, reject) => {
        reject('failure');
    });
};

const create = require('../../../../../app/middleware/queryHandlers/user/create');
const createSuccess = proxyquire('../../../../../app/middleware/queryHandlers/user/create', {'../../../model/user/create': mockSuccess});
const createFailure = proxyquire('../../../../../app/middleware/queryHandlers/user/create', {'../../../model/user/create': mockFailure});

describe('/app/middleware/queryHandlers/user/create', () => {

    it('should be a function', () => {
        expect(create).to.be.a('function');
    });

    it('should take three arguments', () => {
        expect(create.length).to.equal(3);
    });

    describe('on user already in existence', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {};
        res.locals = {user: '1'};

        before((done) => {
            createSuccess(req, res, nextSpy);
            done();
        });

        it('should retain a 200 status code if the room already exists', () => expect(res.statusCode).to.equal(200));
        it('should populate an error', () => expect(res.locals.errors.email.msg).to.equal('don\'t create duplicate accounts'));
    });

    describe('on success', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {sitting: '1', standing: '1', name: 'test', equipment: 'test'};
        res.locals = {user: null};

        before((done) => {
            createSuccess(req, res, nextSpy);
            done();
        });

        it('should retain a 200 status code', () => expect(res.statusCode).to.equal(200));
        it('should set res locals userCreated', () => assert.exists(res.locals.userCreated));
        it('should set res locals userCreated to true', () => expect(res.locals.userCreated).to.equal(true));

    });

    describe('on failure', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {sitting: '1', standing: '1', name: 'test', equipment: 'test'};
        res.locals = {user: null};
        before((done) => {
            createFailure(req, res, nextSpy);
            done();
        });

        it('should return 200 on failure', () => expect(res.statusCode).to.equal(200));
        it('should populate an error message', () => expect(res.locals.errors.userCreation.msg).to.equal('error creating room'));
    });


});
