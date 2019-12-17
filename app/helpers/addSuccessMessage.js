module.exports = (response, element, message) => {
    response.locals.successes = response.locals.successes || {};
    response.locals.successes[element] = {msg: message};
};
