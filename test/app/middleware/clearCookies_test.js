const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const clearCookies = require('../../../app/middleware/clearCookies');

describe('/app/middleware/clearCookies', () => {

    it('should be a function', () => {
        expect(clearCookies).to.be.a('function');
    });

    it('should accept three arguments: (request, response, next)', () => {
        expect(clearCookies.length).to.equal(3);
    });

    it('should should clear a cookie if it exists', (done) => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        req.signedCookies = {leeds_one_room_booking: 'imacookie'};
        clearCookies(req, res, () => {
           expect(res.cookies.leeds_one_room_booking).to.be.a('undefined');
           done();
        });
    });

    it('should not clear a cookie if it doesnt exist', (done) => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        req.signedCookies = {wrong_cookie: 'imacookie'};
        clearCookies(req, res, () => {
           expect(res.cookies.leeds_one_room_booking).to.be.a('undefined');
           done();
        });
    });

});
