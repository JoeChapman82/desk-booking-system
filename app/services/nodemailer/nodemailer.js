const nodemailer = require('nodemailer');
const emailConfig = require('../../config/email');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(emailConfig);

module.exports = (email, title, content) => {
    return new Promise((resolve, reject) => {
        let mailOptions = {
            from: `"Room booking ♠" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: title,
            html: content,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info.messageId);
            }
        });
    });
};
