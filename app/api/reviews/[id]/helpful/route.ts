import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        
        const updated = await prisma.review.update({
            where: { id },
            data: { helpful: { increment: 1 } }
        });

        if (!updated) return NextResponse.json({ success: false, message: 'Review not found' }, { status: 404 });
        
        return NextResponse.json({ success: true, helpful: updated.helpful });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ success: false, message: 'Update failed' }, { status: 500 });
    }
}
