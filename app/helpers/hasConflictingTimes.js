module.exports = (booking, bookings) => {
    let isConflicting = false;
    const timeFrom = new Date(booking.date[2], booking.date[1] - 1, booking.date[0], booking.fromHours, booking.fromMinutes);
    const timeTo = new Date(booking.date[2], booking.date[1] - 1, booking.date[0], booking.untilHours, booking.untilMinutes);
    bookings.forEach((booked) => {
        if(timeFrom < booked.end && timeTo > booked.start) {
            isConflicting = true;
        }
    });
    return isConflicting;
};
