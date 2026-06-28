const { Resend } = require('resend');

// Initialize Resend with the API key from your environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (subject, html, to = process.env.ADMIN_EMAIL || process.env.EMAIL_USER) => {
    try {
        const response = await resend.emails.send({
            // NOTE: If you haven't verified a custom domain on Resend, 
            // you must use 'onboarding@resend.dev' as the from address.
            from: 'Webify Pro <onboarding@resend.dev>',
            to: [to],
            subject: subject,
            html: html
        });

        if (response.error) {
            console.error(`Resend API Error:`, response.error);
            throw new Error(response.error.message);
        }

        console.log(`Email sent successfully to ${to} via Resend! ID: ${response.data.id}`);
    } catch (error) {
        console.error(`Error sending email to ${to} via Resend:`, error.message);
        throw error;
    }
};

module.exports = sendEmail;
