const multer  = require('multer');
const path = require('path');
const renders = require('../controllers/renders');
const fileDirectory = path.join(__dirname, '../data/');
const fs = require('fs');
let isIncorrectType;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, fileDirectory);
    },
    filename: function (req, file, cb) {
        cb(null, 'data.csv');
    }
});

function fileFilter (req, file, callback) {
    if(file.mimetype !== 'text/csv') {
        isIncorrectType = true;
        callback(null, false);
    } else {
        callback(null, true);
        isIncorrectType = false;
    }
}

module.exports = (req, res, next) => {
    let fileErrorMessage = 'only upload .csv files';
    let upload = multer({ storage: storage, fileFilter: fileFilter, limits: {fileSize: 10000000}}).single('uploadCalendar');

    upload(req, res, (err) => {
        if(err) {
            res.locals.errors = {uploadFile: {msg: 'error uploading'}};
            return renders.superSeed(req, res);
        } else {
            if(req.file === undefined) {
                if(isIncorrectType) {
                    res.locals.errors = {uploadFile: {msg: 'incorrect file type'}};
                    return renders.superSeed(req, res);
                } else {
                    res.locals.errors = {uploadFile: {msg: 'choose a file to upload'}};
                    return renders.superSeed(req, res);
                }
            } else {
                res.locals.roomName = req.file.originalname.split('.')[0];
                res.locals.successes = {uploadFile: {msg: 'File received.'}};
                next();
            }
        }
    });
};
