const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const assert = chai.assert;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');

const mockSuccess = {
    one: function(date) {
    return new Promise((resolve, reject) => {
        resolve('success');
    });
    }
};

const mockFailure = {
    one: function(date) {
        return new Promise((resolve, reject) => {
            reject('failure');
        });
    }
};

const updateOne = require('../../../../../app/middleware/queryHandlers/room/updateOne');
const updateOneSuccess = proxyquire('../../../../../app/middleware/queryHandlers/room/updateOne', {'../../../model/room/update': mockSuccess});
const updateOneFailure = proxyquire('../../../../../app/middleware/queryHandlers/room/updateOne', {'../../../model/room/update': mockFailure});

describe('/app/middleware/queryHandlers/room/updateOne', () => {

    it('should be a function', () => {
        expect(updateOne).to.be.a('function');
    });

    it('should take three arguments', () => {
        expect(updateOne.length).to.equal(3);
    });

    describe('on success', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {id: '1', name: 'test', equipment: ['1', '2'], sitting: '1', standing: '2'};
        res.locals = {};

        before((done) => {
            updateOneSuccess(req, res, nextSpy);
            done();
        });

        it('should retain a 200 status code', () => expect(res.statusCode).to.equal(200));
        it('should set res locals roomEdited', () => assert.exists(res.locals.roomEdited));
        it('should set roomEdited to true', () => expect(res.locals.roomEdited).to.equal(true));

    });

    describe('on failure', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {id: '1', name: 'test', equipment: ['1', '2'], sitting: '1', standing: '2'};
        res.locals = {};
        before((done) => {
            updateOneFailure(req, res, nextSpy);
            done();
        });

        it('should return 200 on failure', () => expect(res.statusCode).to.equal(200));
        it('should populate an error message on error', () => expect(res.locals.errors.roomEdit.msg).to.equal('error editing room'));
    });


});
