const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const mainConfig = require('../../../app/config/main');


describe('/app/config/main', () => {

    it('should be an object', () => {
        expect(mainConfig).to.be.an('object');
    });

    it('should have five properties', () => {
        expect(Object.keys(mainConfig).length).to.equal(5);
    });

    it('should contain bookedTemplate, a string', () => {
        expect(mainConfig.bookedTemplate).to.be.a('string');
    });

    it('should contain inviteTemplate, a string', () => {
        expect(mainConfig.inviteTemplate).to.be.a('string');
    });

    it('should contain saltRounds, an integer', () => {
        expect(mainConfig.saltRounds).to.be.a('number');
    });

    it('should contain jwtLifespan, an integer', () => {
        expect(mainConfig.jwtLifespan).to.be.a('number');
    });

    it('should contain cookieLifespan, an integer', () => {
        expect(mainConfig.cookieLifespan).to.be.a('number');
    });

});
