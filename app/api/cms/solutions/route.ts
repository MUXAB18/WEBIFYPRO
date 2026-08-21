import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function GET(req: Request) {
    if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const solutions = await prisma.solution.findMany({
            orderBy: { order: 'asc' }
        });
        return NextResponse.json(solutions);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch solutions' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        const data = await req.json();
        const solution = await prisma.solution.create({
            data
        });
        revalidatePath('/solutions');
        return NextResponse.json(solution);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to create solution' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        const data = await req.json();
        const { id, ...updateData } = data;

        const solution = await prisma.solution.update({
            where: { id },
            data: updateData
        });

        revalidatePath('/solutions');
        return NextResponse.json(solution);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to update solution' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

        await prisma.solution.delete({ where: { id } });
        revalidatePath('/solutions');
        
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to delete solution' }, { status: 500 });
    }
}
