const nodemailerService = require('../services/nodemailer/nodemailer');
const redirects = require('../controllers/redirects');
const bookedTemplate = require('../content/emails/booked');
const inviteTemplate = require('../content/emails/invite');
const parkingTemplate = require('../content/emails/parking');

module.exports = {
    bookingEmail: (req, res, next) => {
        next();
        // let param = encodeURIComponent(res.locals.booking._id);
        // const personalisation = {
        //     cancelLink: `${process.env.NODE_URI}/cancel/${param}`,
        //     name: req.body.name,
        //     roomName: res.locals.room.name,
        //     bookedDate: `${req.body.date[0]}/${req.body.date[1]}/${req.body.date[2]}`,
        //     bookedFrom: `${req.body.FromHours}:${req.body.FromMinutes}`,
        //     bookedUntil: `${req.body.UntilHours}:${req.body.UntilMinutes}`,
        //     bookingDescription: req.body.reason
        // };
        // const emailToSend = bookedTemplate(personalisation);
        // const title = `Booked: ${res.locals.room.name}, ${req.body.date[0]}/${req.body.date[1]}/${req.body.date[2]}, ${req.body.FromHours}:${req.body.FromMinutes} - ${req.body.UntilHours}:${req.body.UntilMinutes}`;
        // next();
        // nodemailerService(req.body.email, title, emailToSend)
        // .then((response) => {
        //     return null;
        // })
        // .catch((error) => {
        //     console.log(error);
        //     return null;
        // });
    },
    inviteEmail: (req, res, next) => {
        if(res.locals.user !== null) {
            res.locals.errors = {email: {msg: 'User already has an account'}};
            return next();
        }
        let param = encodeURIComponent(res.locals.newUserToken);
        let link = `${process.env.NODE_URI}/new-user?token=${param}`;
        console.log(link);
        const personalisation = {
            link: link
        };
        const emailToSend = inviteTemplate(personalisation);
        const title = 'Leeds One Room Booking: Account activation';
        nodemailerService(req.body.email, title, emailToSend)
        .then((response) => {
            res.locals.invited = true;
            return next();
        })
        .catch((error) => {
            console.log(error);
            return redirect.goneWrong(req, res);
        });
    },
    parkingEmail: (req, res, next) => {
        next();
        // let param = encodeURIComponent(res.locals.visitor._id);
        // const personalisation = {
        //     cancelLink: `${process.env.NODE_URI}/parking-cancel/${param}`,
        //     name: req.body.name,
        //     date: `${req.body.dateDay}/${req.body.dateMonth}/${req.body.dateYear}`,
        //     space: req.body.space
        // };
        // const emailToSend = parkingTemplate(personalisation);
        // const title = `Parking reserved: Space ${req.body.space}, ${req.body.dateDay}/${req.body.dateMonth}/${req.body.dateYear} for: ${req.body.name}`;
        //
        // next();
        // nodemailerService(req.body.email, title, emailToSend)
        // .then((response) => {
        //     return null;
        // })
        // .catch((error) => {
        //     console.log(error);
        //     return null;
        // });
    },
};
