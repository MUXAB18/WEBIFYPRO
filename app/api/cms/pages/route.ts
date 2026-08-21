import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function GET(req: Request) {
    if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const pages = await prisma.page.findMany({
            include: { sections: { orderBy: { order: 'asc' } } }
        });
        return NextResponse.json(pages);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        const data = await req.json();
        const page = await prisma.page.create({
            data: {
                title: data.title,
                slug: data.slug,
                content: data.content,
                metaTitle: data.metaTitle,
                metaDescription: data.metaDescription,
                isPublished: data.isPublished,
            }
        });
        revalidatePath(page.slug === 'home' ? '/' : `/${page.slug}`);
        return NextResponse.json(page);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        const data = await req.json();
        const { id, sections, ...updateData } = data;

        const page = await prisma.page.update({
            where: { id },
            data: updateData
        });

        if (sections && Array.isArray(sections)) {
            // Delete old sections and recreate
            await prisma.pageSection.deleteMany({ where: { pageId: id } });
            await prisma.pageSection.createMany({
                data: sections.map((s: any) => ({
                    pageId: id,
                    type: s.type,
                    order: s.order,
                    content: typeof s.content === 'string' ? s.content : JSON.stringify(s.content)
                }))
            });
        }

        revalidatePath(page.slug === 'home' ? '/' : `/${page.slug}`);
        return NextResponse.json(page);
    } catch (err: any) {
        console.error('Failed to update page:', err);
        return NextResponse.json({ error: 'Failed to update page', details: err.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

        const page = await prisma.page.findUnique({ where: { id } });
        await prisma.page.delete({ where: { id } });
        if (page) revalidatePath(page.slug === 'home' ? '/' : `/${page.slug}`);

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
    }
}
