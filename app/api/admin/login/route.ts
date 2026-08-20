import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'webifypro9@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'webifypro';
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_webify_pro_99121';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
            return NextResponse.json({ token, message: 'Login successful' });
        }

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
