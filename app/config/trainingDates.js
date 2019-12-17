const trainingDates = ['16/4/2019', '25/4/2019', '14/5/2019', '16/5/2019', '21/5/2019', '23/5/2019'];
trainingDates.forEach((date, index) => {
    trainingDates[index] = new Date(`${date.split('/').reverse().join('-')} 04:00`);
});
module.exports = trainingDates;
