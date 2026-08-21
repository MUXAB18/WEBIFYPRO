import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function GET(req: Request) {
    if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const nav = await prisma.navigationItem.findMany({
            orderBy: { order: 'asc' }
        });
        return NextResponse.json(nav);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch navigation' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        const data = await req.json();
        const nav = await prisma.navigationItem.create({
            data
        });
        return NextResponse.json(nav);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to create navigation item' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        const data = await req.json();
        const { id, ...updateData } = data;

        const nav = await prisma.navigationItem.update({
            where: { id },
            data: updateData
        });

        return NextResponse.json(nav);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to update navigation item' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

        await prisma.navigationItem.delete({ where: { id } });
        
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to delete navigation item' }, { status: 500 });
    }
}
