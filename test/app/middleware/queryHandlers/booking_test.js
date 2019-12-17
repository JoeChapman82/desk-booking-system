const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const booking = require('../../../../app/middleware/queryHandlers/booking');

describe('/app/middleware/queryHandlers/booking', () => {

    it('should be a object', () => {
        expect(booking).to.be.a('object');
    });

    it('should have functions as properties', () => {
        Object.keys(booking).forEach((key) => {
            expect(booking[key]).to.be.a('function');
        });
    });

});
