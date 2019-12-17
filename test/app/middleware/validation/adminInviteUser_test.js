const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const adminInviteUser = require('../../../../app/middleware/validation/adminInviteUser');

describe('/app/middleware/validation/adminInviteUser', () => {

    describe('good data', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
            email: 'avalidemail@gmail.com',
        };
        res.locals = {};

        before((done) => {
            adminInviteUser(req, res, nextSpy);
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
        };
        res.locals = {};

        before((done) => {
            adminInviteUser(req, res, nextSpy);
            done();
        });

        it('should call retain a 200 statusCode on failing validation', () => expect(res.statusCode).to.equal(200));
        it('should re render admin invite user on failing validation', () => expect(res._getRenderView()).to.equal('admin/invite-user'));
        it('should populate a email error if a email is not supplied', () => expect(res.locals.errors.email.msg).to.equal('provide a valid email'));

    });

    describe('missing data', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
        };
        res.locals = {};

        before((done) => {
            adminInviteUser(req, res, nextSpy);
            done();
        });

        it('should call retain a 200 statusCode on failing validation', () => expect(res.statusCode).to.equal(200));
        it('should re render admin invite user on failing validation', () => expect(res._getRenderView()).to.equal('admin/invite-user'));
        it('should populate a email error if a email is not supplied', () => expect(res.locals.errors.email.msg).to.equal('provide a valid email'));

    });

});
