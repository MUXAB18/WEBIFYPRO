require('dotenv').config({ path: './.env' });
const { Resend } = require('resend');

(async () => {
    try {
        console.log("Testing Resend API...");
        const resend = new Resend(process.env.RESEND_API_KEY);

        console.log("Using API Key starting with:", process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 5) : "UNDEFINED");
        
        // Test sending to an external Gmail address to verify if Resend supports general recipients
        const response = await resend.emails.send({
            from: 'Webify Pro <onboarding@resend.dev>',
            to: 'webifypro9@gmail.com',
            subject: 'Test Resend API to External Recipient',
            text: 'Testing if Resend works for external email addresses.'
        });

        console.log("Resend Response:");
        console.log(JSON.stringify(response, null, 2));
    } catch (e) {
        console.error("Caught error:", e);
    }
})();
