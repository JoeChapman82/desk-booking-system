const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const postController = require('../../../app/controllers/postController');


describe('/app/controllers/postController', () => {

    it('should be an object', () => {
        expect(postController).to.be.an('object');
    });

    it('should contain arrays', () => {
        Object.keys(postController).forEach((key) => {
            expect(postController[key]).to.be.an('array');
        });
    });

    it('each item in each array should be a function', () => {
        Object.keys(postController).forEach((key) => {
            postController[key].forEach((item) => {
                expect(item).to.be.a('function');
            });
        });
    });

});
