const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const assert = chai.assert;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');

const mockSuccess = {
    byParams: function(date) {
        return new Promise((resolve, reject) => {
            resolve('success');
        });
    },
    byRoom: function(date) {
        return new Promise((resolve, reject) => {
            resolve('success');
        });
    }
};

const mockFailure = {
    byParams: function(date) {
        return new Promise((resolve, reject) => {
            reject('failure');
        });
    },
    byRoom: function(date) {
        return new Promise((resolve, reject) => {
            reject('failure');
        });
    }
};

const findByParams = require('../../../../../app/middleware/queryHandlers/booking/findByParams');
const findByParamsSuccess = proxyquire('../../../../../app/middleware/queryHandlers/booking/findByParams', {'../../../model/booking/read': mockSuccess});
const findByParamsFailure = proxyquire('../../../../../app/middleware/queryHandlers/booking/findByParams', {'../../../model/booking/read': mockFailure});

describe('/app/middleware/queryHandlers/booking/findByParams', () => {

    it('should be a function', () => {
        expect(findByParams).to.be.a('function');
    });

    it('should take three arguments', () => {
        expect(findByParams.length).to.equal(3);
    });

    describe('on invalid params', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        res.locals = {};
        req.query = {search: 'test'};

        before((done) => {
            findByParamsSuccess(req, res, nextSpy);
            done();
        });

        it('should redirect in valid params are suppied', () => expect(res.statusCode).to.equal(302));
        it('should redirect to gone wrong valid params are suppied', () => expect(res._getRedirectUrl()).to.equal('/errors/somethings-gone-wrong'));

    });

    describe('on success by description', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        res.locals = {};
        req.query = {search: 'test', by: 'description'};

        before((done) => {
            findByParamsSuccess(req, res, nextSpy);
            done();
        });

        it('should retain a 200 status code', () => expect(res.statusCode).to.equal(200));
        it('should should add res locals results on success', () => assert.exists(res.locals.results));
        it('should should add the promise response to results', () => expect(res.locals.results).to.equal('success'));
    });

    describe('on failure by description', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        res.locals = {};
        req.query = {search: 'test', by: 'description'};

        before((done) => {
            findByParamsFailure(req, res, nextSpy);
            done();
        });

        it('should redirect on failure', () => expect(res.statusCode).to.equal(302));
        it('should redirect to gone wrong on failure', () => expect(res._getRedirectUrl()).to.equal('/errors/somethings-gone-wrong'));
    });

    describe('on success by room', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        res.locals = {};
        req.query = {search: 'test', by: 'room'};

        before((done) => {
            findByParamsSuccess(req, res, nextSpy);
            done();
        });

        it('should retain a 200 status code', () => expect(res.statusCode).to.equal(200));
        it('should should add res locals results on success', () => assert.exists(res.locals.results));
        it('should should add the promise response to results', () => expect(res.locals.results).to.equal('success'));
    });

    describe('on failure by room', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        res.locals = {};
        req.query = {search: 'test', by: 'room'};
        before((done) => {
            findByParamsFailure(req, res, nextSpy);
            done();
        });

        it('should redirect on failure', () => expect(res.statusCode).to.equal(302));
        it('should redirect to gone wrong on failure', () => expect(res._getRedirectUrl()).to.equal('/errors/somethings-gone-wrong'));
    });

    describe('on search supplied as none', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        res.locals = {};
        req.query = {search: 'none', by: 'room'};


        before((done) => {
            findByParamsSuccess(req, res, nextSpy);
            done();
        });

        it('should retain a 200 status code', () => expect(res.statusCode).to.equal(200));
        it('should should add res locals results', () => assert.exists(res.locals.results));
        it('should add an array as results', () => expect(res.locals.results).to.be.an('array'));
    });


});
