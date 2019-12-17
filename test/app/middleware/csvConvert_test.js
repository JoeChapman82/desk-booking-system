const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const httpMocks = require('node-mocks-http');
const sinon = require('sinon');
const fs = require('fs');
const path = require('path');
const proxyquire = require('proxyquire');
const csvConvert = require('../../../app/middleware/csvConvert');

const mockCsvPath = path.join(__dirname, '../../data/mock.csv');

const csvConvertMockData = proxyquire('../../../app/middleware/csvConvert', {'../data/data.csv': mockCsvPath});


    describe('/app/middleware/csvConvert', () => {

        it('should be a function', () => {
            expect(csvConvert).to.be.a('function');
        });

        it('should take three arguments', () => {
            expect(csvConvert.length).to.equal(3);
        });

        it('should finish writing this test', () => {
            csvConvertMockData({}, {}, () => {});
        });


    });
