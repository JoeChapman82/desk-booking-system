const User = require('./user');

module.exports = (email, password, role) => {
    const user = new User({email: email, password: password, role: role});
    return user.save();
};
