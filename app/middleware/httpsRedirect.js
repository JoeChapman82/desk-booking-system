module.exports = (req, res, next) => {
    if (req.protocol !== 'https') {
        return res.redirect(302, 'https://' + req.get('Host') + req.url);
    }
    next();
};
