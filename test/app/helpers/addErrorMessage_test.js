const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const addErrorMessage = require('../../../app/helpers/addErrorMessage');

describe('/app/helpers/addErrorMessage', () => {

    it('should be a function', () => {
        expect(addErrorMessage).to.be.a('function');
    });

    it('should require three arguments', () => {
        expect(addErrorMessage.length).to.equal(3);
    });

    it('should populate add an errors object if it doesn\'t already exist', () => {
        let anObject = {locals: {}};
        addErrorMessage(anObject, 'test', 'an error');
        assert.exists(anObject.locals.errors);
    });

    it('should populate the provided object with a string', () => {
        let anObject = {locals: {}};
        addErrorMessage(anObject, 'test', 'an error');
        expect(anObject.locals.errors.test.msg).to.equal('an error');
    });

});
