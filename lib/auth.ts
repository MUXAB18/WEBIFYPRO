import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_webify_pro_99121';

export function verifyAdmin(req: Request) {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        if (decoded.role === 'admin') {
            return decoded;
        }
        return null;
    } catch (err) {
        return null;
    }
}
