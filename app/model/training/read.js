const Training = require('./training');

module.exports = {
    all: () => Training.find(),
    dump: () => Training.find().populate({path: 'room', select: 'name'}),
    byId: (id) => Training.findById(id),
    byParams: (params) => Training.find(params).limit(),
    countByParams: (params) => Training.find(params).count()
};
