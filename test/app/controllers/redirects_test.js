const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const httpMocks = require('node-mocks-http');
const sinon = require('sinon');

const redirects = require('../../../app/controllers/redirects');


describe('/app/controllers/redirects', () => {

    it('should be an object', () => {
        expect(redirects).to.be.an('object');
    });

    it('should contain functions', () => {
        Object.keys(redirects).forEach((key) => {
            expect(redirects[key]).to.be.a('function');
        });
    });

    describe('index', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        res.status = () => {
            return this;
        };
        it('should perform a redirect to /', () => {
            redirects.index(req, res);
                expect(res.statusCode).to.equal(302);
                expect(res._getRedirectUrl()).to.equal('/');
        });
    });

    describe('choose', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should perform a redirect to /choose', () => {
            redirects.choose(req, res);
                expect(res.statusCode).to.equal(302);
                expect(res._getRedirectUrl()).to.equal('/choose');
        });
    });

    describe('book', () => {

        it('should perform a redirect to /book', () => {
            let req  = httpMocks.createRequest({});
            let res = httpMocks.createResponse();
            redirects.book(req, res);
                expect(res.statusCode).to.equal(302);
                expect(res._getRedirectUrl()).to.equal('/book/undefined');
        });

        it('should append params id to the url', () => {
            let req  = httpMocks.createRequest({});
            let res = httpMocks.createResponse();
            req.params = {id: 'theID'};
            redirects.book(req, res);
                expect(res.statusCode).to.equal(302);
                expect(res._getRedirectUrl()).to.equal('/book/theID');
        });
    });

    describe('changeBookDate', () => {

        it('should perform a redirect to /book', () => {
            let req  = httpMocks.createRequest({});
            let res = httpMocks.createResponse();
            redirects.changeBookDate(req, res);
                expect(res.statusCode).to.equal(302);
                expect(res._getRedirectUrl()).to.equal('/book/undefined?dateDay=undefined&dateMonth=undefined&dateYear=undefined');
        });

        it('should append params id to the url', () => {
            let req  = httpMocks.createRequest({});
            let res = httpMocks.createResponse();
            req.params = {id: 'theID'};
            redirects.changeBookDate(req, res);
                expect(res.statusCode).to.equal(302);
                expect(res._getRedirectUrl()).to.equal('/book/theID?dateDay=undefined&dateMonth=undefined&dateYear=undefined');
        });

        it('should append a query string formed with dates from req.body', () => {
            let req  = httpMocks.createRequest({});
            let res = httpMocks.createResponse();
            req.params = {id: 'theID'};
            req.body = {
                dateDay: '1',
                dateMonth: '2',
                dateYear: '3'
            };
            redirects.changeBookDate(req, res);
                expect(res.statusCode).to.equal(302);
                expect(res._getRedirectUrl()).to.equal('/book/theID?dateDay=1&dateMonth=2&dateYear=3');
        });
    });

    describe('bookCancel', () => {

        it('should perform a redirect to /book', () => {
            let req  = httpMocks.createRequest({});
            let res = httpMocks.createResponse();
            redirects.bookCancel(req, res);
                expect(res.statusCode).to.equal(302);
                expect(res._getRedirectUrl()).to.equal('/book/undefined');
        });

        it('should append params id to the url', () => {
            let req  = httpMocks.createRequest({});
            let res = httpMocks.createResponse();
            req.params = {id: 'theID'};
            redirects.bookCancel(req, res);
                expect(res.statusCode).to.equal(302);
                expect(res._getRedirectUrl()).to.equal('/book/theID');
        });
    });

    describe('cancelled', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should perform a redirect to /cancelled', () => {
            redirects.cancelled(req, res);
                expect(res.statusCode).to.equal(302);
                expect(res._getRedirectUrl()).to.equal('/cancelled');
        });
    });

    describe('goneWrong', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should perform a redirect to /errors/somethings-gone-wrong', () => {
            redirects.goneWrong(req, res);
                expect(res.statusCode).to.equal(302);
                expect(res._getRedirectUrl()).to.equal('/errors/somethings-gone-wrong');
        });
    });

    describe('adminHome', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should perform a redirect to /admin/home', () => {
            redirects.adminHome(req, res);
                expect(res.statusCode).to.equal(302);
                expect(res._getRedirectUrl()).to.equal('/admin/home');
        });
    });

    describe('adminSearchResults', () => {
        it('should perform a redirect to /admin/search-results?by=undefined&search=undefined', () => {
            let req  = httpMocks.createRequest({});
            let res = httpMocks.createResponse();
            res.locals = {};
            redirects.adminSearchResults(req, res);
                expect(res.statusCode).to.equal(302);
                expect(res._getRedirectUrl()).to.equal('/admin/search-results?by=undefined&search=undefined');
        });

        it('should append a query string formed  from res.locals', () => {
            let req  = httpMocks.createRequest({});
            let res = httpMocks.createResponse();
            res.locals = {
                searchBy: 'this',
                searchCriteria: 'that',
            };
            redirects.adminSearchResults(req, res);
                expect(res.statusCode).to.equal(302);
                expect(res._getRedirectUrl()).to.equal('/admin/search-results?by=this&search=that');
        });
    });

    describe('adminNoResults', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should perform a redirect to /admin/no-results', () => {
            redirects.adminNoResults(req, res);
                expect(res.statusCode).to.equal(302);
                expect(res._getRedirectUrl()).to.equal('/admin/no-results');
        });
    });

    describe('adminBookingCancelled', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should perform a redirect to /admin/booking-cancelled', () => {
            redirects.adminBookingCancelled(req, res);
                expect(res.statusCode).to.equal(302);
                expect(res._getRedirectUrl()).to.equal('/admin/booking-cancelled');
        });
    });

    describe('superHome', () => {
        let req  = httpMocks.createRequest({});
        let res = httpMocks.createResponse();
        it('should perform a redirect to /super/home', () => {
            redirects.superHome(req, res);
                expect(res.statusCode).to.equal(302);
                expect(res._getRedirectUrl()).to.equal('/super/home');
        });
    });



});
