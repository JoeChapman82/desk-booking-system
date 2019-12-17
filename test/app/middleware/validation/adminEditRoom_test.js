const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const adminEditRoom = require('../../../../app/middleware/validation/adminEditRoom');

describe('/app/middleware/validation/adminEditRoom', () => {

    describe('good data', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
            equipment: ['1', '2'],
            name: 'test',
            sitting: '1',
            standing: '2',
        };
        res.locals = {};

        before((done) => {
            adminEditRoom(req, res, nextSpy);
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
            equipment: '1',
            name: '',
            sitting: '',
            standing: '',
        };
        res.locals = {};

        before((done) => {
            adminEditRoom(req, res, nextSpy);
            done();
        });

        it('should call retain a 200 statusCode on failing validation', () => expect(res.statusCode).to.equal(200));
        it('should re render admin create edit on failing validation', () => expect(res._getRenderView()).to.equal('admin/edit-room'));
        it('should populate a name error if a name is not supplied', () => expect(res.locals.errors.name.msg).to.equal('provide a room name'));
        it('should populate a sitting error if a description is not sitting', () => expect(res.locals.errors.sitting.msg).to.equal('provide sitting capacity'));
        it('should populate a standing error if a standing is not supplied', () => expect(res.locals.errors.standing.msg).to.equal('provide standing capacity'));

    });

    describe('missing data', () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const nextSpy = sinon.spy();
        req.body = {
            equipment: '1',
        };
        res.locals = {};

        before((done) => {
            adminEditRoom(req, res, nextSpy);
            done();
        });

        it('should call retain a 200 statusCode on failing validation', () => expect(res.statusCode).to.equal(200));
        it('should re render admin create edit on failing validation', () => expect(res._getRenderView()).to.equal('admin/edit-room'));
        it('should populate a name error if a name is not supplied', () => expect(res.locals.errors.name.msg).to.equal('provide a room name'));
        it('should populate a sitting error if a description is not sitting', () => expect(res.locals.errors.sitting.msg).to.equal('provide sitting capacity'));
        it('should populate a standing error if a standing is not supplied', () => expect(res.locals.errors.standing.msg).to.equal('provide standing capacity'));

    });

});
