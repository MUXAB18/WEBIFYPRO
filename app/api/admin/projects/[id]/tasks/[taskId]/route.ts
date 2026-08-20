import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string, taskId: string }> }) {
    const admin = verifyAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { id, taskId } = await params;
        const body = await req.json();
        const { completed } = body;
        
        await prisma.task.update({
            where: { id: taskId, orderId: id },
            data: { completed }
        });

        const updatedProject = await prisma.order.findUnique({
            where: { id },
            include: { tasks: true }
        });

        if (!updatedProject) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        return NextResponse.json(updatedProject);
    } catch (err: any) {
        console.error(err);
        if (err.code === 'P2025') {
            return NextResponse.json({ error: 'Project or Task not found' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string, taskId: string }> }) {
    const admin = verifyAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { id, taskId } = await params;
        
        await prisma.task.delete({
            where: { id: taskId, orderId: id }
        });

        const updatedProject = await prisma.order.findUnique({
            where: { id },
            include: { tasks: true }
        });

        if (!updatedProject) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        return NextResponse.json(updatedProject);
    } catch (err: any) {
        console.error(err);
        if (err.code === 'P2025') {
             return NextResponse.json({ error: 'Project or Task not found' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
    }
}
