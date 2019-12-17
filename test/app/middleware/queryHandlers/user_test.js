const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const user = require('../../../../app/middleware/queryHandlers/user');

describe('/app/middleware/queryHandlers/user', () => {

    it('should be a object', () => {
        expect(user).to.be.a('object');
    });

    it('should have functions as properties', () => {
        Object.keys(user).forEach((key) => {
            expect(user[key]).to.be.a('function');
        });
    });

});
