const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const httpMocks = require('node-mocks-http');

const findHome = require('../../../app/middleware/findHome');


describe('/app/helpers/findHome', () => {

    it('should be a function', () => {
        expect(findHome).to.be.a('function');
    });

    it('should take three arguments', () => {
        expect(findHome.length).to.equal(3);
    });

    it('should redirect to choose if no token is located', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        res.locals = {};
        findHome(req, res, () => {});
        expect(res._getRedirectUrl()).to.equal('/choose');
    });

    it('should redirect to admin home if user is an admin', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        res.locals = {userToken: {permissions: 'Admin'}};
        findHome(req, res, () => {});
        expect(res._getRedirectUrl()).to.equal('/admin/home');
    });

    it('should redirect to super home if user is a super', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        res.locals = {userToken: {permissions: 'Super'}};
        findHome(req, res, () => {});
        expect(res._getRedirectUrl()).to.equal('/super/home');
    });

    it('should redirect to choose if the role is unknown', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        res.locals = {userToken: {permissions: 'not a role'}};
        findHome(req, res, () => {});
        expect(res._getRedirectUrl()).to.equal('/choose');
    });

    it('should redirect to choose if the role is unknown and a tempToken is present', () => {
        const req  = httpMocks.createRequest({});
        const res = httpMocks.createResponse();
        res.locals = {tempToken: {permissions: 'not a role'}};
        findHome(req, res, () => {});
        expect(res._getRedirectUrl()).to.equal('/choose');
    });
    //
    // it('should redirect to admin dashboard if user is an Admin', () => {
    //     const req  = httpMocks.createRequest({});
    //     const res = httpMocks.createResponse();
    //     res.locals = {userToken: {permissions: 'Admin'}};
    //     findHome(req, res, () => {});
    //     expect(res._getRedirectUrl()).to.equal('/admin/dashboard');
    // });
    //
    // it('should redirect to somethings gone wrong if the user permission is no a known value', () => {
    //     const req  = httpMocks.createRequest({});
    //     const res = httpMocks.createResponse();
    //     res.locals = {userToken: {permissions: 'I made this up'}};
    //     findHome(req, res, () => {});
    //     expect(res._getRedirectUrl()).to.equal('/errors/somethings-gone-wrong');
    // });


});
