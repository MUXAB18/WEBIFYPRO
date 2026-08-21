import nodemailer from 'nodemailer';

export const sendEmail = async (subject: string, html: string, to: string = process.env.ADMIN_EMAIL || process.env.EMAIL_USER!) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports (STARTTLS)
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Verify connection configuration (Important for Vercel)
        await new Promise((resolve, reject) => {
            transporter.verify(function (error, success) {
                if (error) {
                    console.error("Transporter verify error:", error);
                    reject(error);
                } else {
                    resolve(success);
                }
            });
        });

        // Send mail using Promise wrapper
        const info = await new Promise((resolve, reject) => {
            transporter.sendMail({
                from: `"Webify Pro" <${process.env.EMAIL_USER}>`,
                to: to,
                subject: subject,
                html: html
            }, (err, info) => {
                if (err) {
                    console.error("Error sending mail:", err);
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });

        console.log(`Email sent successfully to ${to} via Gmail SMTP! ID: ${(info as any).messageId}`);
    } catch (error: any) {
        console.error(`Error sending email to ${to} via Gmail SMTP:`, error.message);
        throw error;
    }
};
