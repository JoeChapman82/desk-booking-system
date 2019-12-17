const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const httpMocks = require('node-mocks-http');

const errorHandler = require('../../../app/middleware/errorHandler');


describe('/app/helpers/errorHandler', () => {

    it('should be a function', () => {
        expect(errorHandler).to.be.a('function');
    });

    it('should take four arguments', () => {
        expect(errorHandler.length).to.equal(4);
    });

    it('should be send a 500 in a non production environment', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        process.env.NODE_ENV = 'testing';
        errorHandler('err', req, res, () => {});
        expect(res.statusCode).to.equal(500);
    });

    it('should redirect in production environments', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        process.env.NODE_ENV = 'production';
        errorHandler('err', req, res, () => {});
        expect(res.statusCode).to.equal(302);
    });

});
