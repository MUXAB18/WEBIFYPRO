const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (subject, html, to = process.env.ADMIN_EMAIL || process.env.EMAIL_USER) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: `"Webify Pro" <${process.env.EMAIL_USER}>`,
            to: to,
            subject: subject,
            html: html
        });

        console.log(`Email sent successfully to ${to} via Gmail SMTP! ID: ${info.messageId}`);
    } catch (error) {
        console.error(`Error sending email to ${to} via Gmail SMTP:`, error.message);
        throw error;
    }
};

module.exports = sendEmail;
