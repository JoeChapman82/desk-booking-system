const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const changeDate = require('../../../../app/middleware/validation/changeDate');

describe('/app/middleware/validation/changeDate', () => {

    describe('good data', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
            dateDay: '1',
            dateMonth: '2',
            dateYear: '2013'
        };
        res.locals = {};

        before((done) => {
            changeDate(req, res, nextSpy);
            done();
        });

        it('should call retain a 200 statusCode on passing validation', () => expect(res.statusCode).to.equal(200));
        it('should call next if data passes validation', () => expect(nextSpy.calledOnce));

    });

    describe('bad data', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
            dateDay: '',
            dateMonth: '',
            dateYear: ''
        };
        res.locals = {};

        before((done) => {
            changeDate(req, res, nextSpy);
            done();
        });

        it('should prform a redirct on failing validation', () => expect(res.statusCode).to.equal(302));

    });

    describe('missing data', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
        };
        res.locals = {};

        before((done) => {
            changeDate(req, res, nextSpy);
            done();
        });

        it('should prform a redirct on failing validation', () => expect(res.statusCode).to.equal(302));

    });

});
