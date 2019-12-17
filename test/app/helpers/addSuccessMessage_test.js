const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const addSuccessMessage = require('../../../app/helpers/addSuccessMessage');

describe('/app/helpers/addSuccessMessage', () => {

    it('should be a function', () => {
        expect(addSuccessMessage).to.be.a('function');
    });

    it('should require three arguments', () => {
        expect(addSuccessMessage.length).to.equal(3);
    });

    it('should populate add an errors object if it doesn\'t already exist', () => {
        let anObject = {locals: {}};
        addSuccessMessage(anObject, 'test', 'an error');
        assert.exists(anObject.locals.successes);
    });

    it('should populate the provided object with a string', () => {
        let anObject = {locals: {}};
        addSuccessMessage(anObject, 'test', 'an error');
        expect(anObject.locals.successes.test.msg).to.equal('an error');
    });

});
