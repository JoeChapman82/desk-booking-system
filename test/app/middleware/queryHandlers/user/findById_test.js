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

const findById = require('../../../../../app/middleware/queryHandlers/user/findById');
const findByIdSuccess = proxyquire('../../../../../app/middleware/queryHandlers/user/findById', {'../../../model/user/read': mockSuccess});
const findByIdFailure = proxyquire('../../../../../app/middleware/queryHandlers/user/findById', {'../../../model/user/read': mockFailure});

describe('/app/middleware/queryHandlers/user/findById', () => {

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
        req.body = {email: 'email'};
        res.locals = {};

        before((done) => {
            findByIdSuccess(req, res, nextSpy);
            done();
        });

        it('should retain a 200 status code', () => expect(res.statusCode).to.equal(200));
        it('should set res locals user', () => assert.exists(res.locals.user));
        it('should set res locals user to the promise return value', () => expect(res.locals.user).to.equal('success'));

    });

    describe('on failure', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {email: 'email'};
        res.locals = {};
        before((done) => {
            findByIdFailure(req, res, nextSpy);
            done();
        });

        it('should return 200 on failure', () => expect(res.statusCode).to.equal(200));
        it('should populate an error message', () => expect(res.locals.errors.userFind.msg).to.equal('error finding user'));
    });


});
