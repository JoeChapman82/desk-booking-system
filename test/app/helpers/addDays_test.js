const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const addDaysHelper = require('../../../app/helpers/addDays');

describe('/app/helpers/addDays', () => {

    it('should be a function', () => {
        expect(addDaysHelper).to.be.a('function');
    });

    it('should require two arguments', () => {
        expect(addDaysHelper.length).to.equal(2);
    });

    it('should should add the given days to the given date', () => {
        const date1 = new Date('01 Jan 2017');
        const date2 = new Date('08 Jan 2017');
        expect(addDaysHelper(date1, 7).toString()).to.equal(date2.toString());
    });

    it('should be able to traverse months without issue', () => {
        const date1 = new Date('30 Nov 2017');
        const date2 = new Date('7 Dec 2017');
        expect(addDaysHelper(date1, 7).toString()).to.equal(date2.toString());
    });

    it('should be able to traverse years without issue', () => {
        const date1 = new Date('31 Dec 2017');
        const date2 = new Date('7 Jan 2018');
        expect(addDaysHelper(date1, 7).toString()).to.equal(date2.toString());
    });


});
