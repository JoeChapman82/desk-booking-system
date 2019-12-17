const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const requestBooking = require('../../../../app/middleware/validation/requestBooking');

describe('/app/middleware/validation/requestBooking', () => {

    describe('good data', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
            reason: '1',
            name: 'test',
            email: 'anemail@gmail.com',
            date: '12/12/2018',
            FromHours: '19',
            UntilHours: '20',
            FromMinutes: '30',
            UntilMinutes: '30',
            room: '5a6d8b03895098918c5daa55'
        };
        res.locals = {bookings: []};

        before((done) => {
            requestBooking(req, res, nextSpy);
            done();
        });

        it('should call retain a 200 statusCode on passing validation', () => expect(res.statusCode).to.equal(200));
        it('should call next if data passes validation', () => expect(nextSpy.calledOnce));

    });

    describe('conflicting times', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
            reason: '1',
            name: 'test',
            email: 'anemail@gmail.com',
            date: ['12', '12', '2018'],
            FromHours: '19',
            UntilHours: '20',
            FromMinutes: '30',
            UntilMinutes: '30',
            room: '5a6d8b03895098918c5daa55'
        };
        res.locals = {bookings: [{start: new Date('2018 12 12 19:00'), end: new Date('2018 12 12 20:00')}]};

        before((done) => {
            requestBooking(req, res, nextSpy);
            done();
        });

        it('should call retain a 200 statusCode on failing validation', () => expect(res.statusCode).to.equal(200));
        it('should re render book on failing validation', () => expect(res._getRenderView()).to.equal('user/book'));
        it('should populate a UntilMinutes error if double booked', () => expect(res.locals.errors.UntilMinutes.msg).to.equal('avoid double booking'));

    });

    describe('identical times', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
            reason: '1',
            name: 'test',
            email: 'anemail@gmail.com',
            date: ['12', '12', '2018'],
            FromHours: '19',
            UntilHours: '19',
            FromMinutes: '30',
            UntilMinutes: '30',
            room: '5a6d8b03895098918c5daa55'
        };
        res.locals = {bookings: []};

        before((done) => {
            requestBooking(req, res, nextSpy);
            done();
        });

        it('should call retain a 200 statusCode on failing validation', () => expect(res.statusCode).to.equal(200));
        it('should re render book on failing validation', () => expect(res._getRenderView()).to.equal('user/book'));
        it('should populate a UntilMinutes error if identical time', () => expect(res.locals.errors.UntilMinutes.msg).to.equal('provide different times'));

    });

    describe('inverted times', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
            reason: '1',
            name: 'test',
            email: 'anemail@gmail.com',
            date: ['12', '12', '2018'],
            FromHours: '20',
            UntilHours: '19',
            FromMinutes: '30',
            UntilMinutes: '30',
            room: '5a6d8b03895098918c5daa55'
        };
        res.locals = {bookings: []};

        before((done) => {
            requestBooking(req, res, nextSpy);
            done();
        });

        it('should call retain a 200 statusCode on failing validation', () => expect(res.statusCode).to.equal(200));
        it('should re render book on failing validation', () => expect(res._getRenderView()).to.equal('user/book'));
        it('should populate a UntilMinutes error if identical time', () => expect(res.locals.errors.UntilMinutes.msg).to.equal('avoid negative times'));

    });

    describe('invalid mongoID in room space', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
            reason: '1',
            name: 'test',
            email: 'anemail@gmail.com',
            date: ['12', '12', '2018'],
            FromHours: '20',
            UntilHours: '19',
            FromMinutes: '30',
            UntilMinutes: '30',
            room: 'not an ID'
        };
        res.locals = {bookings: []};

        before((done) => {
            requestBooking(req, res, nextSpy);
            done();
        });

        it('should redirect if room is invalid', () => expect(res.statusCode).to.equal(302));
        it('should redirect to the choose page', () => expect(res._getRedirectUrl()).to.equal('/'));

    });

    describe('bad data', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
            reason: '',
            name: '',
            email: '',
            FromHours: '',
            UntilHours: '',
            FromMinutes: '',
            UntilMinutes: '',
            room: '5a6d8b03895098918c5daa55'
        };
        res.locals = {};

        before((done) => {
            requestBooking(req, res, nextSpy);
            done();
        });

        it('should call retain a 200 statusCode on failing validation', () => expect(res.statusCode).to.equal(200));
        it('should re render book on failing validation', () => expect(res._getRenderView()).to.equal('user/book'));
        it('should populate a name error if a name is not supplied', () => expect(res.locals.errors.name.msg).to.equal('provide your name'));
        it('should populate a reason error if a reason is not supplied', () => expect(res.locals.errors.reason.msg).to.equal('provide a reason'));
        it('should populate a FromHours error if a FromHours is not supplied', () => expect(res.locals.errors.FromHours.msg).to.equal('provide a valid time'));
        it('should populate a UntilHours error if a UntilHours is not supplied', () => expect(res.locals.errors.UntilHours.msg).to.equal('provide a valid time'));
        it('should populate a FromMinutes error if a FromMinutes is not supplied', () => expect(res.locals.errors.FromMinutes.msg).to.equal('provide a valid time'));
        it('should populate a UntilMinutes error if a UntilMinutes is not supplied', () => expect(res.locals.errors.UntilMinutes.msg).to.equal('provide a valid time'));

    });

    describe('bad data', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
            reason: '',
            name: '',
            email: '',
            FromHours: '',
            UntilHours: '',
            FromMinutes: '',
            UntilMinutes: '',
            room: '5a6d8b03895098918c5daa55'
        };
        res.locals = {};

        before((done) => {
            requestBooking(req, res, nextSpy);
            done();
        });

        it('should call retain a 200 statusCode on failing validation', () => expect(res.statusCode).to.equal(200));
        it('should re render book on failing validation', () => expect(res._getRenderView()).to.equal('user/book'));
        it('should populate a name error if a name is not supplied', () => expect(res.locals.errors.name.msg).to.equal('provide your name'));
        it('should populate a reason error if a reason is not supplied', () => expect(res.locals.errors.reason.msg).to.equal('provide a reason'));
        it('should populate a FromHours error if a FromHours is not supplied', () => expect(res.locals.errors.FromHours.msg).to.equal('provide a valid time'));
        it('should populate a UntilHours error if a UntilHours is not supplied', () => expect(res.locals.errors.UntilHours.msg).to.equal('provide a valid time'));
        it('should populate a FromMinutes error if a FromMinutes is not supplied', () => expect(res.locals.errors.FromMinutes.msg).to.equal('provide a valid time'));
        it('should populate a UntilMinutes error if a UntilMinutes is not supplied', () => expect(res.locals.errors.UntilMinutes.msg).to.equal('provide a valid time'));

    });

});
