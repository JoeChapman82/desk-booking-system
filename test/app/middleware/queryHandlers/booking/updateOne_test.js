const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const assert = chai.assert;
const httpMocks = require('node-mocks-http');
const proxyquire = require('proxyquire');

const mockSuccess = {
    one: function(one, two) {
        return new Promise((resolve, reject) => {
            resolve('success');
        });
    },
};

const mockFailure = {
    one: function(onw, two) {
        return new Promise((resolve, reject) => {
            reject('failure');
        });
    },
};

const updateOne = require('../../../../../app/middleware/queryHandlers/booking/updateOne');
const updateOneSuccess = proxyquire('../../../../../app/middleware/queryHandlers/booking/updateOne', {'../../../model/booking/update': mockSuccess});
const updateOneFailure = proxyquire('../../../../../app/middleware/queryHandlers/booking/updateOne', {'../../../model/booking/update': mockFailure});

describe('/app/middleware/queryHandlers/booking/updateOne', () => {

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
        req.body = {date: '12/12/2018', id: '1', name: 'a', description: 'a', room: '201', startTime: '19:00', endTime: '20:00'};
        res.locals = {room: {name: '201'}, rooms: [{_id: '1', name: '201'}, {_id: '1', name: '202'}, {_id: '1', name: '203'}]};

        before((done) => {
            updateOneSuccess(req, res, nextSpy);
            done();
        });

        it('should retain a 200 status code', () => expect(res.statusCode).to.equal(200));
        it('should should add res locals bookingEdited', () => assert.exists(res.locals.bookingEdited));
        it('should should set bookingEdited to true', () => expect(res.locals.bookingEdited).to.equal(true));
    });

    describe('on success with room change', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {date: '12/12/2018', id: '1', name: 'a', description: 'a', room: '202', startTime: '19:00', endTime: '20:00'};
        res.locals = {room: {name: '201'}, rooms: [{_id: '1', name: '201'}, {_id: '1', name: '202'}, {_id: '1', name: '203'}]};

        before((done) => {
            updateOneSuccess(req, res, nextSpy);
            done();
        });

        it('should retain a 200 status code', () => expect(res.statusCode).to.equal(200));
        it('should should add res locals bookingEdited', () => assert.exists(res.locals.bookingEdited));
        it('should should set bookingEdited to true', () => expect(res.locals.bookingEdited).to.equal(true));
    });

    describe('on failure', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {date: '12/12/2018', id: '1', name: 'a', description: 'a', room: '201', startTime: '19:00', endTime: '20:00'};
        res.locals = {room: {name: '201'}, rooms: [{_id: '1', name: '201'}, {_id: '1', name: '202'}, {_id: '1', name: '203'}]};

        before((done) => {
            updateOneFailure(req, res, nextSpy);
            done();
        });

        it('should retain 200 on failure', () => expect(res.statusCode).to.equal(200));
        it('should add an error message on failure', () => expect(res.locals.errors.bookingEdit.msg).to.equal('error editing booking'));
    });


});
