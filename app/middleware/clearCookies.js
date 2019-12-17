module.exports = (req, res, next) => {
    if(req.signedCookies.leeds_one_room_booking) {
        res.clearCookie('leeds_one_room_booking');
    }
    next();
};
