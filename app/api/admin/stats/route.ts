import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function GET(req: Request) {
    if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        const [projectsCount, messagesCount, reviewsCount, blogCount] = await Promise.all([
            prisma.order.count(),
            prisma.message.count(),
            prisma.review.count(),
            prisma.post.count()
        ]);
        
        return NextResponse.json({
            projects: projectsCount,
            messages: messagesCount,
            reviews: reviewsCount,
            posts: blogCount
        });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
