import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const admin = verifyAdmin(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { id } = await params;
        const body = await req.json();
        const { name } = body;
        
        if (!name) return NextResponse.json({ error: 'Task name is required' }, { status: 400 });

        const updatedProject = await prisma.order.update({
            where: { id },
            data: {
                tasks: {
                    create: {
                        name,
                        completed: false
                    }
                }
            },
            include: { tasks: true }
        });

        return NextResponse.json(updatedProject);
    } catch (err: any) {
        console.error(err);
        if (err.code === 'P2025') {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Failed to add task' }, { status: 500 });
    }
}
