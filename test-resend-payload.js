require('dotenv').config({ path: '/Users/user/Desktop/my website/server/.env' });
const { Resend } = require('resend');

(async () => {
    try {
        console.log("Testing Resend API payload...");
        const resend = new Resend(process.env.RESEND_API_KEY);

        console.log("Sending to:", process.env.EMAIL_USER);

        const response = await resend.emails.send({
            from: 'Webify Pro <onboarding@resend.dev>',
            to: process.env.EMAIL_USER,
            subject: 'Test Delivery Status',
            text: 'Testing if Resend accepts this and returns a success payload or soft error.'
        });

        console.log("Resend Full Response Payload:");
        console.log(response);
    } catch (e) {
        console.error("Caught error:", e);
    }
})();
