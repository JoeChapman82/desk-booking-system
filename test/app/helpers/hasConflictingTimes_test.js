const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const hasConflictingTimes = require('../../../app/helpers/hasConflictingTimes');

describe('/app/helpers/hasConflictingTimes', () => {

    it('should be a function', () => {
        expect(hasConflictingTimes).to.be.a('function');
    });

    it('should require two arguments', () => {
        expect(hasConflictingTimes.length).to.equal(2);
    });

    it('should return true if provided with conflicting times', () => {
        let booking = {
            date: ['12', '12', '2018'],
            fromHours: '19',
            fromMinutes: '30',
            untilHours: '20',
            untilMinutes: '00'
        };
        let bookings = [{start: new Date('2018', '11', '12', '19', '31'), end: new Date('2018', '11', '12', '19', '59')}];
        expect(hasConflictingTimes(booking, bookings)).to.equal(true);
    });

    it('should return false if provided with unconflicting times', () => {
        let booking = {
            date: ['12', '12', '2019'],
            fromHours: '19',
            fromMinutes: '30',
            untilHours: '20',
            untilMinutes: '00'
        };
        let bookings = [{start: new Date('2018', '11', '12', '19', '31'), end: new Date('2018', '11', '12', '19', '59')}];
        expect(hasConflictingTimes(booking, bookings)).to.equal(false);
    });

});
