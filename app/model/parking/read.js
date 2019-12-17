const Parking = require('./parking');

module.exports = {
    all: () => Parking.find(),
    byId: (id) => Parking.findById(id),
    byDateRange: (start, end) => Parking.find({date: {$gte: start, $lte: end}, isVisitor: false}),
    byDateRangeVisitor: (start, end, includeSpace, space) => {
        if(includeSpace) {
            return Parking.find({date: {$gte: start, $lte: end}, isVisitor: true, space: space});
        } else {
            return Parking.find({date: {$gte: start, $lte: end}, isVisitor: true});
        }
    },
};
