const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const adminSearchByRoomName = require('../../../../app/middleware/validation/adminSearchByRoomName');

describe('/app/middleware/validation/adminSearchByRoomName', () => {

    describe('good data', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
            searchByRoomName: 'hello',
        };
        res.locals = {};

        before((done) => {
            adminSearchByRoomName(req, res, nextSpy);
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
            searchByRoomName: '',
        };
        res.locals = {};

        before((done) => {
            adminSearchByRoomName(req, res, nextSpy);
            done();
        });

        it('should prform a redirct on failing validation', () => expect(res.statusCode).to.equal(302));

    });

    describe('missing data', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
        };
        res.locals = {};

        before((done) => {
            adminSearchByRoomName(req, res, nextSpy);
            done();
        });

        it('should prform a redirct on failing validation', () => expect(res.statusCode).to.equal(302));

    });

});
