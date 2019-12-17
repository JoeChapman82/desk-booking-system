const csv = require('csvtojson');
const path = require('path');

const headers = ['description', 'startDate', 'startTime', 'endDate', 'endTime', 'isAllDay'];
const csvPath = path.join(__dirname, '../data/data.csv');
const renders = require('../controllers/renders');

module.exports = (req, res, next) => {
    let json = [];
        csv({
            headers: headers,
            trim: true,
            checkColumn: true
        })
        .fromFile(csvPath)
        .on('csv', (line) => {})
        .on('json', (jsonObj) => {
            if(jsonObj.isAllDay === 'TRUE') {
                let datePartsStart = jsonObj.startDate.split('/');
                let dateStringStart = `${datePartsStart[2]} ${datePartsStart[1]} ${datePartsStart[0]} 08:00:00`;
                let datePartsEnd = jsonObj.endDate.split('/');
                let dateStringEnd = `${datePartsEnd[2]} ${datePartsEnd[1]} ${datePartsEnd[0]} 19:00:00`;
                let start = new Date(dateStringStart);
                let end = new Date(dateStringEnd);
                json.push({name: jsonObj.description, description: jsonObj.description, start: start, end: end});
            } else {
                let datePartsStart = jsonObj.startDate.split('/');
                let dateStringStart = `${datePartsStart[2]} ${datePartsStart[1]} ${datePartsStart[0]} ${jsonObj.startTime}`;
                let datePartsEnd = jsonObj.endDate.split('/');
                let dateStringEnd = `${datePartsEnd[2]} ${datePartsEnd[1]} ${datePartsEnd[0]} ${jsonObj.endTime}`;
                let start = new Date(dateStringStart);
                let end = new Date(dateStringEnd);
                json.push({name: jsonObj.description, description: jsonObj.description, start: start, end: end});
            }
        })
        .on('done', (error) => {
            if(error) {
                console.log(error);
                res.locals.errors = {converting: {msg: error}};
                renders.superSeed(req, res);
            }  else {
                res.locals.jsonBookings = JSON.stringify(json);
                next();
            }
        });
};
