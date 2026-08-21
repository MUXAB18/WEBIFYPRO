import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_webify_pro_99121';

export async function POST(req: Request) {
    try {
        const { otp, otpToken } = await req.json();

        if (!otp || !otpToken) {
            return NextResponse.json({ error: 'Missing OTP or Token' }, { status: 400 });
        }

        // Verify the temporary OTP token
        try {
            const decoded: any = jwt.verify(otpToken, JWT_SECRET);
            
            // Check if the provided OTP matches the one in the token payload
            if (decoded.otp === otp.trim()) {
                // Issue the final admin token
                const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
                return NextResponse.json({ token, message: 'Login successful' });
            } else {
                return NextResponse.json({ error: 'Invalid OTP' }, { status: 401 });
            }
        } catch (err: any) {
            if (err.name === 'TokenExpiredError') {
                return NextResponse.json({ error: 'OTP has expired. Please login again.' }, { status: 401 });
            }
            return NextResponse.json({ error: 'Invalid or manipulated token' }, { status: 401 });
        }
    } catch (err) {
        console.error("OTP Verify Error:", err);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
