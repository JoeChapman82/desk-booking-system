const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const adminEditBooking = require('../../../../app/middleware/validation/adminEditBooking');

describe('/app/middleware/validation/adminEditBooking', () => {

    describe('good data', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
            description: '1',
            name: 'test',
            date: '12/12/2018',
            startTime: '19:19',
            endTime: '20:20'
        };
        res.locals = {};

        before((done) => {
            adminEditBooking(req, res, nextSpy);
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
            name: '',
            description: '',
            date: '',
            startTime: '',
            endTime: ''
        };
        res.locals = {};

        before((done) => {
            adminEditBooking(req, res, nextSpy);
            done();
        });

        it('should call retain a 200 statusCode on failing validation', () => expect(res.statusCode).to.equal(200));
        it('should re render admin create edit on failing validation', () => expect(res._getRenderView()).to.equal('admin/booking'));
        it('should populate a name error if a name is not supplied', () => expect(res.locals.errors.name.msg).to.equal('name is required'));
        it('should populate a description error if a description is not supplied', () => expect(res.locals.errors.description.msg).to.equal('description is required'));
        it('should populate a date error if a date is not supplied', () => expect(res.locals.errors.date.msg).to.equal('enter a valid date (dd/mm/yyyy)'));
        it('should populate a startTime error if a startTime is not supplied', () => expect(res.locals.errors.startTime.msg).to.equal('enter a valid start time hh:mm'));
        it('should populate a endTime error if a endTime is not supplied', () => expect(res.locals.errors.endTime.msg).to.equal('enter a valid end time hh:mm'));

    });

    describe('missing data', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
        };
        res.locals = {};

        before((done) => {
            adminEditBooking(req, res, nextSpy);
            done();
        });

        it('should call retain a 200 statusCode on failing validation', () => expect(res.statusCode).to.equal(200));
        it('should re render admin create edit on failing validation', () => expect(res._getRenderView()).to.equal('admin/booking'));
        it('should populate a name error if a name is not supplied', () => expect(res.locals.errors.name.msg).to.equal('name is required'));
        it('should populate a description error if a description is not supplied', () => expect(res.locals.errors.description.msg).to.equal('description is required'));
        it('should populate a date error if a date is not supplied', () => expect(res.locals.errors.date.msg).to.equal('enter a valid date (dd/mm/yyyy)'));
        it('should populate a startTime error if a startTime is not supplied', () => expect(res.locals.errors.startTime.msg).to.equal('enter a valid start time hh:mm'));
        it('should populate a endTime error if a endTime is not supplied', () => expect(res.locals.errors.endTime.msg).to.equal('enter a valid end time hh:mm'));

    });

});
