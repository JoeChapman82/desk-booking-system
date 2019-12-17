const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');

const mockSuccess = {
    byId: function(date) {
        return new Promise((resolve, reject) => {
            resolve('failure');
        });
    }
};

const mockFailure = {
    byId: function(date) {
        return new Promise((resolve, reject) => {
            reject('failure');
        });
    }
};

const findById = require('../../../../../app/middleware/queryHandlers/booking/findById');
const findByIdSuccess = proxyquire('../../../../../app/middleware/queryHandlers/booking/findById', {'../../../model/booking/read': mockSuccess});
const findByIdFailure = proxyquire('../../../../../app/middleware/queryHandlers/booking/findById', {'../../../model/booking/read': mockFailure});

describe('/app/middleware/queryHandlers/booking/findById', () => {

    it('should be a function', () => {
        expect(findById).to.be.a('function');
    });

    it('should take three arguments', () => {
        expect(findById.length).to.equal(3);
    });

    it('should call next if all on success', (done) => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        res.locals = {};
        req.params = {id: 1};
        findByIdSuccess(req, res, nextSpy);
        setTimeout(() => {
            expect(nextSpy.calledOnce);
            done();
        }, 5);

    });

    it('should redirect on failre', (done) => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.params = {id: 1};
        findByIdFailure(req, res, nextSpy);
        setTimeout(() => {
            expect(res.statusCode).to.equal(302);
            done();
        }, 5);
    });


});
