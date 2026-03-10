const nodemailer = require('nodemailer');

const sendEmail = async (subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to the admin
            subject: subject,
            text: text
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully via Nodemailer!');
    } catch (error) {
        console.error('Error sending email via Nodemailer:', error.message);
        // We do not throw the error because we still want the DB save to succeed
    }
};

module.exports = sendEmail;
