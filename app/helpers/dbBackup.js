const rp = require('request-promise');
const findBooking = require('../model/booking/read');
const findUser = require('../model/user/read');
const findRoom = require('../model/room/read');
const findParking = require('../model/parking/read');

module.exports = () => {
Promise.all([
    findRoom.all(),
    findBooking.dump(),
    findUser.dump(),
    findParking.all()
])
.then((responses) => {
    rooms = responses[0];
    bookings = responses[1];
    users = responses[2];
    parkings = responses[3];
    rp({
        method: 'POST',
        uri: process.env.BACKUP_URI,
        body: {
            backupCode: process.env.BACKUP_CODE,
            rooms: responses[0],
            bookings: responses[1],
            users: responses[2],
            parkings: responses[3]
        },
        json: true
    })
    .then((response) => {
        console.log(response);
        return null;
    })
    .catch((error) => {
        console.log(error.message);
        return null;
    });
})
.catch((error) => {
    console.log(error.message);
    return null;
});

};
