const { Resend } = require('resend');

const sendEmail = async (subject, text, to = process.env.EMAIL_USER) => {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        // When domain is verified, the admin can set EMAIL_FROM in their env to e.g. hello@webifypro.com
        const fromEmail = process.env.EMAIL_FROM || 'Webify Pro <onboarding@resend.dev>';

        await resend.emails.send({
            from: fromEmail,
            to: to,
            subject: subject,
            text: text
        });

        console.log(`Email sent successfully to ${to} via Resend!`);
    } catch (error) {
        console.error(`Error sending email to ${to} via Resend:`, error.message);
        // We do not throw the error so DB saves still succeed
    }
};

module.exports = sendEmail;
