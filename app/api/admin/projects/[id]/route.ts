import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const admin = verifyAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { id } = await params;
        const project = await prisma.order.findUnique({
            where: { id },
            include: { tasks: true }
        });
        if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        return NextResponse.json(project);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const admin = verifyAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { id } = await params;
        const body = await req.json();
        const { developmentStage, assignedBudget, status } = body;
        
        const updateFields: any = {};
        if (developmentStage !== undefined) updateFields.developmentStage = developmentStage;
        if (assignedBudget !== undefined) updateFields.assignedBudget = parseFloat(assignedBudget);
        if (status !== undefined) updateFields.status = status;

        const updatedProject = await prisma.order.update({
            where: { id },
            data: updateFields,
            include: { tasks: true }
        });

        return NextResponse.json(updatedProject);
    } catch (err: any) {
        console.error(err);
        if (err.code === 'P2025') {
             return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const admin = verifyAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { id } = await params;
        await prisma.order.delete({
            where: { id }
        });
        return NextResponse.json({ message: 'Project deleted successfully' });
    } catch (err: any) {
        console.error(err);
        if (err.code === 'P2025') {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
