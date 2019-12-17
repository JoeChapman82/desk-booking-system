const Training = require('./training');

module.exports = (newTraining) => {
    const training = new Training({
        date: newTraining.date,
        sessionNumber: newTraining.sessionNumber
    });
    return training.save();
};
