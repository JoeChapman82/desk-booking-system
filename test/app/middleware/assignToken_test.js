const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const assignToken = require('../../../app/middleware/assignToken');

describe('/app/middleware/assignToken', () => {

    it('should be a function', () => {
        expect(assignToken.sessionToken).to.be.a('function');
    });

    it('should accept three arguments: (request, response, next)', () => {
        expect(assignToken.sessionToken.length).to.equal(3);
    });

    it('should create a cookie with a JWT token', (done) => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        res.locals = { user: { _id: '1', role: 'Test Role' }};
        assignToken.sessionToken(req, res, () => {
           assert.exists(res.cookies.leeds_one_room_booking);
           done();
        });
    });

    it('should create a cookie with a 60 minute lifespan', (done) => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        res.locals = { user: { _id: '1', role: 'Test Role' }};
        assignToken.sessionToken(req, res, () => {
            expect(res.cookies.leeds_one_room_booking.options.maxAge).to.equal(36000000);
            done();
        });
    });

    it('should create an http only cookie', (done) => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        res.locals = { user: { _id: '1', role: 'Test Role' }};
        assignToken.sessionToken(req, res, () => {
            expect(res.cookies.leeds_one_room_booking.options.httpOnly).to.equal(true);
            done();
        });
    });


    it('should create a cookie with a JWT token', (done) => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        res.body = {email: 'an email'};
        res.locals = {};
        assignToken.newUserToken(req, res, () => {
           assert.exists(res.locals.newUserToken);
           done();
        });
    });

});
