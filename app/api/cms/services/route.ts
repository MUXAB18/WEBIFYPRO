import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function GET(req: Request) {
    if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const services = await prisma.service.findMany({
            orderBy: { order: 'asc' }
        });
        return NextResponse.json(services);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        const data = await req.json();
        const service = await prisma.service.create({
            data
        });
        revalidatePath('/services');
        return NextResponse.json(service);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        const data = await req.json();
        const { id, ...updateData } = data;

        const service = await prisma.service.update({
            where: { id },
            data: updateData
        });

        revalidatePath('/services');
        return NextResponse.json(service);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

        await prisma.service.delete({ where: { id } });
        revalidatePath('/services');
        
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
    }
}
