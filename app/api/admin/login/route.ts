import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { sendEmail } from '@/lib/email';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'webifypro9@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'webifypro';
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_webify_pro_99121';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            // Generate 6-digit OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            
            // Sign a short-lived token containing the OTP
            const otpToken = jwt.sign({ email, otp }, JWT_SECRET, { expiresIn: '10m' });

            // Send OTP via email
            const emailHtml = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                    <h2 style="color: #0B1E39;">Webify Pro Admin Login</h2>
                    <p>You recently attempted to log into the Webify Pro Admin Panel.</p>
                    <p>Your one-time password (OTP) is:</p>
                    <div style="font-size: 24px; font-weight: bold; color: #FF6B35; letter-spacing: 4px; padding: 12px; background: #f8fafc; border-radius: 8px; text-align: center; margin: 20px 0;">
                        ${otp}
                    </div>
                    <p>This code will expire in 10 minutes. If you did not request this, please secure your account immediately.</p>
                </div>
            `;
            await sendEmail('Webify Pro - Admin Login Code', emailHtml, ADMIN_EMAIL);

            return NextResponse.json({ 
                otpRequired: true, 
                otpToken, 
                message: 'OTP sent to your email' 
            });
        }

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (err) {
        console.error("Login Error:", err);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
