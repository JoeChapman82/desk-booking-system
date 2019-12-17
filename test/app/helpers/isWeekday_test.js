const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const isWeekday = require('../../../app/helpers/isWeekday');

describe('/app/helpers/isWeekday', () => {

    it('should be a function', () => {
        expect(isWeekday).to.be.a('function');
    });

    it('should require one arguments', () => {
        expect(isWeekday.length).to.equal(1);
    });

    it('should return true if provided with a weekday', () => {
        expect(isWeekday(new Date('02 Feb 2018'))).to.equal(true);
        expect(isWeekday(new Date('01 Feb 2018'))).to.equal(true);
        expect(isWeekday(new Date('31 Jan 2018'))).to.equal(true);
        expect(isWeekday(new Date('30 Jan 2018'))).to.equal(true);
        expect(isWeekday(new Date('29 Jan 2018'))).to.equal(true);

    });

    it('should return false if provided with a weekend', () => {
        expect(isWeekday(new Date('03 Feb 2018'))).to.equal(false);
        expect(isWeekday(new Date('04 Feb 2018'))).to.equal(false);

    });

});
