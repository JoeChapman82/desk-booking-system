const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const clearDataFile = require('../../../app/middleware/clearDataFile');

describe('/app/middleware/clearDataFile', () => {

    it('should be a function', () => {
        expect(clearDataFile).to.be.a('function');
    });

    it('should accept three arguments: (request, response, next)', () => {
        expect(clearDataFile.length).to.equal(3);
    });

    it('should should keep response status at 200', (done) => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        clearDataFile(req, res, () => {
           expect(res.statusCode).to.equal(200);
           done();
        });
    });


});
