import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function GET(req: Request) {
    const admin = verifyAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const projects = await prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            include: { tasks: true }
        });
        return NextResponse.json(projects);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}
