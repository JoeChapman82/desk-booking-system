const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const nunjucks = require('nunjucks');
const expressNunjucks = require('express-nunjucks');
const app = require('express')();

const addNunjucksFilters = require('../../../app/helpers/addNunjucksFilters');

describe('/app/helpers/addNunjucksFilters', () => {

    let nunjucksEnv;

    before(() => {
        nunjucksEnv = nunjucks.configure('a path', {
            autoescape: true,
            express: app,
            noCache: true,
            watch: true
        });
        addNunjucksFilters(nunjucksEnv);
    });

    it('should be a function', () => {
        expect(addNunjucksFilters).to.be.a('function');
    });

    it('should require one arguments', () => {
        expect(addNunjucksFilters.length).to.equal(1);
    });

    it('should return anObject', () => {
        expect(addNunjucksFilters(nunjucksEnv)).to.be.an('object');
    });

    it('should add a asMonth filter to the nunjucks env', () => {
        expect(nunjucksEnv.filters.asMonth).to.be.a('function');
    });

    it('should add a asDateString filter to the nunjucks env', () => {
        expect(nunjucksEnv.filters.asDateString).to.be.a('function');
        expect(nunjucksEnv.filters.asDateString(new Date())).to.be.an('string');
        expect(nunjucksEnv.filters.asDateString(null)).to.be.an('undefined');
    });

    it('should add a asMonth filter to the nunjucks env', () => {
        expect(nunjucksEnv.filters.asMonth).to.be.a('function');
        expect(nunjucksEnv.filters.asMonth('2')).to.be.equal('Mar');
    });

    it('should add a asReadableDate filter to the nunjucks env', () => {
        expect(nunjucksEnv.filters.asReadableDate).to.be.a('function');
        expect(nunjucksEnv.filters.asReadableDate(new Date())).to.be.an('string');
        expect(nunjucksEnv.filters.asReadableDate('12 12 2018')).to.be.an('string');
        expect(nunjucksEnv.filters.asReadableDate(null)).to.be.an('undefined');
    });

    it('should add a asDayMonthTime filter to the nunjucks env', () => {
        expect(nunjucksEnv.filters.asDayMonthTime).to.be.a('function');
        expect(nunjucksEnv.filters.asDayMonthTime(new Date())).to.be.an('string');
        expect(nunjucksEnv.filters.asDayMonthTime('12 12 2018')).to.be.an('string');
        expect(nunjucksEnv.filters.asDayMonthTime(null)).to.be.an('undefined');

    });

    it('should add a positionFromTop filter to the nunjucks env', () => {
        expect(nunjucksEnv.filters.positionFromTop).to.be.a('function');
        expect(nunjucksEnv.filters.positionFromTop(new Date())).to.be.an('string');
    });

    it('should add a calculateHeight filter to the nunjucks env', () => {
        expect(nunjucksEnv.filters.calculateHeight).to.be.a('function');
        expect(nunjucksEnv.filters.calculateHeight(new Date(), new Date())).to.be.an('string');
    });

    it('should add a sliceIt filter to the nunjucks env', () => {
        expect(nunjucksEnv.filters.sliceIt).to.be.a('function');
        expect(nunjucksEnv.filters.sliceIt('string', 12, 'string')).to.be.an('string');
    });

    it('should add a hoursAndMinutes filter to the nunjucks env', () => {
        expect(nunjucksEnv.filters.hoursAndMinutes).to.be.a('function');
        expect(nunjucksEnv.filters.hoursAndMinutes(new Date())).to.be.an('string');
        expect(nunjucksEnv.filters.hoursAndMinutes(null)).to.be.an('undefined');
        expect(nunjucksEnv.filters.hoursAndMinutes('12 12 2018 09:12:12')).to.be.an('string');
        expect(nunjucksEnv.filters.hoursAndMinutes('12 12 2018 09:09:12')).to.be.an('string');
    });

});
