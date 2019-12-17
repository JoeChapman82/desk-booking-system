const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


module.exports = (email, subject, content) => {
    return new Promise((resolve, reject) => {
        const msg = {
            to: email,
            from: `Room booking ♠ <leedsoneroombookerboss@gmail.com>`,
            fromname: 'Room booking system',
            subject: subject,
            html: content,
        };
        sgMail.send(msg, (err) => {
            if(err) {
                reject(err);
            } else {
                resolve('success');
            }
        });
    });

};
