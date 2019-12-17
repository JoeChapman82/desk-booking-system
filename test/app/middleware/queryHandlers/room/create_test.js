const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const assert = chai.assert;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');

const mockSuccess = function(date) {
    return new Promise((resolve, reject) => {
        resolve({_id: 'test'});
    });
};

const mockFailure = function(date) {
    return new Promise((resolve, reject) => {
        reject('failure');
    });
};

const create = require('../../../../../app/middleware/queryHandlers/room/create');
const createSuccess = proxyquire('../../../../../app/middleware/queryHandlers/room/create', {'../../../model/room/create': mockSuccess});
const createFailure = proxyquire('../../../../../app/middleware/queryHandlers/room/create', {'../../../model/room/create': mockFailure});

describe('/app/middleware/queryHandlers/room/create', () => {

    it('should be a function', () => {
        expect(create).to.be.a('function');
    });

    it('should take three arguments', () => {
        expect(create.length).to.equal(3);
    });

    describe('on room already in existence', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {};
        res.locals = {room: '1'};

        before((done) => {
            createSuccess(req, res, nextSpy);
            done();
        });

        it('should retain a 200 status code if the room already exists', () => expect(res.statusCode).to.equal(200));
        it('should populate an error', () => expect(res.locals.errors.name.msg).to.equal('don\'t create duplicate rooms'));
    });

    describe('on success', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {sitting: '1', standing: '1', name: 'test', equipment: 'test'};
        res.locals = {room: null};

        before((done) => {
            createSuccess(req, res, nextSpy);
            done();
        });

        it('should retain a 200 status code', () => expect(res.statusCode).to.equal(200));
        it('should set res locals roomCreated', () => assert.exists(res.locals.roomCreated));
        it('should set res locals roomCreated to true', () => expect(res.locals.roomCreated).to.equal(true));

    });

    describe('on failure', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {sitting: '1', standing: '1', name: 'test', equipment: 'test'};
        res.locals = {room: null};
        before((done) => {
            createFailure(req, res, nextSpy);
            done();
        });

        it('should return 200 on failure', () => expect(res.statusCode).to.equal(200));
        it('should populate an error message', () => expect(res.locals.errors.roomCreation.msg).to.equal('error creating room'));
    });


});
