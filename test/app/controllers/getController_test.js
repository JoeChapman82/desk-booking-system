const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const getController = require('../../../app/controllers/getController');


describe('/app/controllers/getController', () => {

    it('should be an object', () => {
        expect(getController).to.be.an('object');
    });

    it('should contain arrays', () => {
        Object.keys(getController).forEach((key) => {
            expect(getController[key]).to.be.an('array');
        });
    });

    it('each item in each array should be a function', () => {
        Object.keys(getController).forEach((key) => {
            getController[key].forEach((item) => {
                expect(item).to.be.a('function');
            });
        });
    });

});
