import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function GET(req: Request) {
    if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const media = await prisma.media.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(media);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        
        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save to public/uploads directory
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const path = join(process.cwd(), 'public', 'uploads', filename);
        
        // Ensure uploads directory exists - simple try catch for now
        try {
            await writeFile(path, buffer);
        } catch (e: any) {
            if (e.code === 'ENOENT') {
                const fs = require('fs');
                fs.mkdirSync(join(process.cwd(), 'public', 'uploads'), { recursive: true });
                await writeFile(path, buffer);
            } else {
                throw e;
            }
        }

        const url = `/uploads/${filename}`;

        const media = await prisma.media.create({
            data: {
                name: file.name,
                url,
                mimeType: file.type,
                size: file.size,
                altText: file.name
            }
        });

        return NextResponse.json(media);
    } catch (err) {
        console.error('Media upload error:', err);
        return NextResponse.json({ error: 'Failed to upload media' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

        const media = await prisma.media.findUnique({ where: { id }});
        if (media) {
            const path = join(process.cwd(), 'public', media.url);
            try {
                const fs = require('fs');
                if (fs.existsSync(path)) {
                    fs.unlinkSync(path);
                }
            } catch (e) {
                console.error('Failed to delete file from disk', e);
            }
        }

        await prisma.media.delete({ where: { id } });
        
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
    }
}
