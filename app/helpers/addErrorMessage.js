module.exports = (response, element, message) => {
    response.locals.errors = response.locals.errors || {};
    response.locals.errors[element] = {msg: message};
};
