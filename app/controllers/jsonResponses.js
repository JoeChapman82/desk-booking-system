const apiStructure = require('../config/apiStructure');

module.exports =  {
    getIndex: (req, res) => res.json(apiStructure),
    getRooms: (req, res) => res.json(res.locals.rooms),
    getRoom: (req, res) => res.json(res.locals.room),
    getBooking: (req, res) => res.json(res.locals.booking),
    postBookings: (req, res) => res.json({message: 'success', booking: res.locals.booking}),

    catchAll: (req, res) => res.status(404).json({message: 'Not found'})

};
