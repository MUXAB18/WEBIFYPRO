import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

let reviewsCache = {
  data: null as any,
  timestamp: 0
};
const CACHE_DURATION = 60000; // 60 seconds

export async function GET() {
  try {
    const now = Date.now();
    if (reviewsCache.data && (now - reviewsCache.timestamp < CACHE_DURATION)) {
      return NextResponse.json({ success: true, reviews: reviewsCache.data });
    }

    const reviews = await prisma.review.findMany({
      where: { approved: true },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
      
    reviewsCache.data = reviews;
    reviewsCache.timestamp = now;
    
    return NextResponse.json({ success: true, reviews });
  } catch (err: any) {
    console.error('Review fetch error:', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, role, review, rating, avatar, color, glow, border } = body;

    if (!name || !role || !review || !rating) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const newReview = await prisma.review.create({
      data: {
        name: name.slice(0, 80),
        role: role.slice(0, 100),
        review: review.slice(0, 1000),
        rating: Math.min(5, Math.max(1, Number(rating))),
        avatar: avatar || name.slice(0, 2).toUpperCase(),
        color: color || '#6366f1',
        glow: glow || 'rgba(99,102,241,0.12)',
        border: border || 'rgba(99,102,241,0.25)',
        verified: false,
        approved: true,
      }
    });

    reviewsCache.data = null; // Clear cache so new review appears immediately
    return NextResponse.json({ success: true, review: newReview }, { status: 201 });
  } catch (err: any) {
    console.error('Review save error:', err);
    return NextResponse.json({ success: false, message: 'Failed to save review' }, { status: 500 });
  }
}
