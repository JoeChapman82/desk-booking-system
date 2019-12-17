const findTraining = require('../model/training/read');
const createTraining = require('../model/training/create');
const sessionsPerDay = 12;
const dates = require('../config/trainingDates');

module.exports = async () => {
    const currentSessions = await(findTraining.all());
    if(currentSessions.length === 0) {
        let calls = [];
        dates.forEach((date) => {
            for(let i = 1; i <= sessionsPerDay; i++) {
                calls.push(createTraining({date, sessionNumber: i}));
            }
        });
        let results = await Promise.all(calls);
        console.log('training sessions created');

    } else {
        console.log('Training sessions already created');
    }

}
