const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const login = require('../../../../app/middleware/validation/login');

describe('/app/middleware/validation/login', () => {

    describe('good data', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
            email: 'avalidemail@gmail.com',
            password: 'asecretpasswword'
        };
        res.locals = {};

        before((done) => {
            login(req, res, nextSpy);
            done();
        });

        it('should call retain a 200 statusCode on passing validation', () => expect(res.statusCode).to.equal(200));
        it('should call next if data passes validation', () => expect(nextSpy.calledOnce));

    });

    describe('bad data', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
            email: '',
            password: '',
        };
        res.locals = {};

        before((done) => {
            login(req, res, nextSpy);
            done();
        });

        it('should call retain a 200 statusCode on failing validation', () => expect(res.statusCode).to.equal(200));
        it('should re render admin invite user on failing validation', () => expect(res._getRenderView()).to.equal('user/login'));
        it('should populate a email error if a email is not supplied', () => expect(res.locals.errors.email.msg).to.equal('provide a valid email'));
        it('should populate a password error if a password is not supplied', () => expect(res.locals.errors.password.msg).to.equal('provide a valid password'));

    });

    describe('missing data', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
        };
        res.locals = {};

        before((done) => {
            login(req, res, nextSpy);
            done();
        });

        it('should call retain a 200 statusCode on failing validation', () => expect(res.statusCode).to.equal(200));
        it('should re render admin invite user on failing validation', () => expect(res._getRenderView()).to.equal('user/login'));
        it('should populate a email error if a email is not supplied', () => expect(res.locals.errors.email.msg).to.equal('provide a valid email'));
        it('should populate a password error if a password is not supplied', () => expect(res.locals.errors.password.msg).to.equal('provide a valid password'));

    });

});
