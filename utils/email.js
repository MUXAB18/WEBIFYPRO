const nodemailer = require('nodemailer');

const sendEmail = async (subject, html, to = process.env.EMAIL_USER) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"Webify Pro" <${process.env.EMAIL_USER}>`,
            to: to,
            subject: subject,
            html: html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${to} via Nodemailer! MessageID: ${info.messageId}`);
    } catch (error) {
        console.error(`Error sending email to ${to} via Nodemailer:`, error.message);
        // We do not throw the error so DB saves still succeed
    }
};

module.exports = sendEmail;
