const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrainingSchema = new Schema({
    date: {
        type: Date,
        required: true,
        index: true,
    },
    sessionNumber: {
        type: Number,
        required: true
    },
    nameOne: {
        type: String,
    }
});

const Training = mongoose.model('training', TrainingSchema);
module.exports = Training;
