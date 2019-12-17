const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const authorisation = require('../../../app/middleware/authorisation');

describe('/app/middleware/authorisation', () => {

    it('should be a function', () => {
        expect(authorisation).to.be.a('function');
    });

    it('should accept three arguments: (request, response, next)', () => {
        expect(authorisation.length).to.equal(3);
    });

    it('should should return a 200', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        req._parsedUrl = {pathname: '/name'};
        req.signedCookies = {leeds_one_room_booking: 'imacookie'};
        authorisation(req, res, () => {
            expect(res.statusCode).to.equal(200);
        });
    });

    it('should should return a 200', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        req._parsedUrl = {pathname: '/new-user?token=notatoken'};
        req.signedCookies = {leeds_one_room_booking: 'imacookie'};
        authorisation(req, res, () => {
            expect(res.statusCode).to.equal(200);
        });
    });

});
