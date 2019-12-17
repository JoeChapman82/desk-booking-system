const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const newUser = require('../../../../app/middleware/validation/newUser');

describe('/app/middleware/validation/newUser', () => {

    describe('good data', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
            email: 'avalidemail@gmail.com',
            password: 'asecretpasswword',
            confirmPassword: 'asecretpasswword'
        };
        res.locals = {userToken: {sub: {email: 'avalidemail@gmail.com'}}};

        before((done) => {
            newUser(req, res, nextSpy);
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
            confirmPassword: 'diff'
        };
        res.locals = {userToken: {sub: 'differentfrombody'}};

        before((done) => {
            newUser(req, res, nextSpy);
            done();
        });

        it('should call retain a 200 statusCode on failing validation', () => expect(res.statusCode).to.equal(200));
        it('should re render admin invite user on failing validation', () => expect(res._getRenderView()).to.equal('user/new-user'));
        it('should populate a email error if a email is not supplied', () => expect(res.locals.errors.email.msg).to.equal('don\'t alter your email'));
        it('should populate a password error if a password is not supplied', () => expect(res.locals.errors.password.msg).to.equal('create a password or at least 8 characters'));
        it('should populate a confirmPassword error if a confirmPassword is not supplied', () => expect(res.locals.errors.confirmPassword.msg).to.equal('create a password or at least 8 characters'));

    });

    describe('missing data', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
        };
        res.locals = {userToken: {sub: 'differentfrombody'}};

        before((done) => {
            newUser(req, res, nextSpy);
            done();
        });

        it('should call retain a 200 statusCode on failing validation', () => expect(res.statusCode).to.equal(200));
        it('should re render admin invite user on failing validation', () => expect(res._getRenderView()).to.equal('user/new-user'));
        it('should populate a email error if a email is not supplied', () => expect(res.locals.errors.email.msg).to.equal('provide a valid email'));
        it('should populate a password error if a password is not supplied', () => expect(res.locals.errors.password.msg).to.equal('create a password or at least 8 characters'));
        it('should populate a confirmPassword error if a confirmPassword is not supplied', () => expect(res.locals.errors.confirmPassword.msg).to.equal('create a password or at least 8 characters'));

    });

});
