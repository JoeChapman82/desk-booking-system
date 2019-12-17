const apiStructure = {
    '/': 'You are here!',
    rooms: {
        '/rooms': {
            methods: ['GET'],
        },
        '/room/${id}': {
            methods: ['GET']
        }
    },
    bookings: {
        '/bookings': {
            methods: ['POST'],
            required: {
                room: {
                    description: 'Room id',
                    type: 'String',
                    retrictions: ['Valid room id']
                },
                name: {
                    description: 'Your name',
                    type: 'String',
                    retrictions: ['Within whitelist']
                },
                description: {
                    description: 'A reason for your booking',
                    type: 'String',
                    retrictions: ['Within whitelist']
                },
                email: {
                    description: 'Your email address',
                    type: 'String',
                    retrictions: ['Within whitelist', 'Valid email']
                },
                start: {
                    description: 'Start date and time for the booking',
                    type: 'String',
                    retrictions: ['Must coercible to a js date object'],
                    examples: ['2018 02 12 12:00:00', '2018-02-12 12:00:00', '1518379623']
                },
                end: {
                    description: 'End date and time for the booking',
                    type: 'String',
                    retrictions: ['Must coercible to a js date object'],
                    examples: ['2018 02 12 12:00:00', '2018-02-12 12:00:00', '1518379623']
                },
            }
        },
        'booking/${id}': {
            methods: ['GET']
        }
    },
    parkings: {
        '/parkings': {
            methods: ['NONE']
        },
        '/parking': {
            methods: ['NONE']
        },
        'parking/${id}': {
            methods: ['NONE']
        }
    }

};

module.exports = apiStructure;
