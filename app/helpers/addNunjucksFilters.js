module.exports = (nunjucksEnv) => {

    nunjucksEnv.addFilter('asMonth', (str) => {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[parseInt(str)];
    });

    nunjucksEnv.addFilter('asDateString', (date) => {
        if(date === null || date === undefined) {
            return;
        }
        date = new Date(date);
        let formedDate = `${date.getDate()}/${date.getMonth() + 1 }/${date.getFullYear()}`;
        return formedDate;
    });

    nunjucksEnv.addFilter('asDashedDateString', (date) => {
        if(date === null || date === undefined) {
            return;
        }
        date = new Date(date);
        let formedDate = `${date.getDate()}-${date.getMonth() + 1 }-${date.getFullYear()}`;
        return formedDate;
    });

    nunjucksEnv.addFilter('asReadableDate', (date) => {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if(date === null || date === undefined) {
            return;
        }
        if(typeof date === 'string') {
            date = new Date(date);
        }
        let formedDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
            return formedDate;
    });

    nunjucksEnv.addFilter('asDayMonthTime', (date) => {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if(date === null || date === undefined) {
            return;
        }
        if(typeof date === 'string') {
            date = new Date(date);
        }
        let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        let formedDate = `${date.getDate()} ${months[date.getMonth()]}, ${hours}:${minutes}`;
            return formedDate;
    });

    nunjucksEnv.addFilter('positionFromTop', (time) => {
        let date = new Date(time.getFullYear(), time.getMonth(), time.getDate(), 8);
        let startPosition = ((time - date) / 1000 / 60 / 60 * 9.09);
        return `${startPosition}%`;
    });

    nunjucksEnv.addFilter('calculateHeight', (from, to) => {
        let height = ((to - from) / 1000 / 60 / 60 * 9.09);
        return `${height}%`;
    });

    nunjucksEnv.addFilter('sliceIt', (string, position, insert) => {
        return `${string.slice(0, position)}${insert}${string.slice(position)}`;
    });

    nunjucksEnv.addFilter('hoursAndMinutes', (date) => {
        if(date === null || date === undefined) {
            return;
        }
        date = new Date(date);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        minutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${minutes}`;
    });

    return nunjucksEnv;
};
