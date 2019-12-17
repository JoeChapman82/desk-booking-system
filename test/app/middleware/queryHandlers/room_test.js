const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const room = require('../../../../app/middleware/queryHandlers/room');

describe('/app/middleware/queryHandlers/room', () => {

    it('should be a object', () => {
        expect(room).to.be.a('object');
    });

    it('should have functions as properties', () => {
        Object.keys(room).forEach((key) => {
            expect(room[key]).to.be.a('function');
        });
    });

});
