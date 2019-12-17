const chai = require('chai');
const app = require('express')();
const expect = chai.expect;

const bootstrap = require('../../../app/middleware/bootstrap');

describe.skip('/app/middleware/bootstrap', () => {

    before(() => {
        bootstrap(app);
    });

    it('should be a function', () => {
        expect(bootstrap).to.be.a('function');
    });

    it('should accept one argument', () => {
        expect(bootstrap.length).to.equal(1);
    });

    it('should set view engine to njk', () => {
        expect(app.settings['view engine']).to.equal('njk');
    });

    it('should add a favicon path', () => {
        expect(app._router.stack.find((element) => element.name === 'favicon')).to.not.equal(undefined);
    });

    it('should add cookieParser', () => {
        expect(app._router.stack.find((element) => element.name === 'cookieParser')).to.not.equal(undefined);
    });

    it('should add httpsRedirect if env = production', () => {
        process.env.NODE_ENV = 'production';
        expect(app._router.stack.find((element) => element.name === 'httpsRedirect')).to.equal(undefined);
    });

    it('should not add httpsRedirect if env = production', () => {
        process.env.NODE_ENV = 'development';
        expect(app._router.stack.find((element) => element.name === 'cookieParser')).to.not.equal(undefined);
    });

    it('should add bodyParser.json', () => {
        expect(app._router.stack.find((element) => element.name === 'jsonParser')).to.not.equal(undefined);
    });

    it('should add bodyParser.urlencoded', () => {
        expect(app._router.stack.find((element) => element.name === 'urlencodedParser')).to.not.equal(undefined);
    });

});
