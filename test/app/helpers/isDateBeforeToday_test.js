const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const isDateBeforeToday = require('../../../app/helpers/isDateBeforeToday');

describe('/app/helpers/isDateBeforeToday', () => {

    it('should be a function', () => {
        expect(isDateBeforeToday).to.be.a('function');
    });

    it('should require one arguments', () => {
        expect(isDateBeforeToday.length).to.equal(1);
    });

    it('should return true if provided with a date before today', () => {
        expect(isDateBeforeToday(new Date('2011', '2', '1'))).to.equal(true);
    });

    it('should return false if provided with a date after today', () => {
        expect(isDateBeforeToday(new Date('2099', '2', '1'))).to.equal(false);
    });

});
