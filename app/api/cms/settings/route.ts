import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function GET(req: Request) {
    if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        let settings = await prisma.websiteSettings.findFirst();
        if (!settings) {
            settings = await prisma.websiteSettings.create({
                data: {
                    websiteName: 'Webify Pro',
                    contactEmail: 'webifypro9@gmail.com',
                }
            });
        }
        return NextResponse.json(settings);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        const data = await req.json();
        const { id, ...updateData } = data;

        let settings;
        if (id) {
            settings = await prisma.websiteSettings.update({
                where: { id },
                data: updateData
            });
        } else {
            // fallback if id is somehow missing
            settings = await prisma.websiteSettings.findFirst();
            if (settings) {
                settings = await prisma.websiteSettings.update({
                    where: { id: settings.id },
                    data: updateData
                });
            }
        }

        return NextResponse.json(settings);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
