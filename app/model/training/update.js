const Training = require('./training');

module.exports = {
    one: (find, update) => Training.findOneAndUpdate(find, update),
};
