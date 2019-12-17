const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const choose = require('../../../../app/middleware/validation/choose');

describe('/app/middleware/validation/choose', () => {

        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
        };
        res.locals = {};

        before((done) => {
            choose(req, res, nextSpy);
            done();
        });

    it('should call next', () => expect(nextSpy.calledOnce));
    it('should retain a 200 status', () => expect(res.statusCode).to.equal(200));

});
