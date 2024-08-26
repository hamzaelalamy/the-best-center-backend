const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendNewsletter = (email, subject, content) => {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            html: content,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending newsletter:', error);
                reject(error);
            } else {
                console.log('Newsletter sent:', info.response);
                resolve(info);
            }
        });
    });
};

module.exports = { sendNewsletter };