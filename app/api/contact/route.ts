import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { emailTemplates } from '@/lib/emailTemplates';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        const savedMessage = await prisma.message.create({
            data: {
                name: body.name,
                email: body.email,
                phone: body.phone,
                subject: body.subject,
                message: body.message,
            }
        });

        // Send email to Admin
        await sendEmail(
            `New Contact Message from ${savedMessage.name} (Ref: ${savedMessage.id.toString().slice(-6)}) - Webify Pro`,
            emailTemplates.adminNewMessage(savedMessage)
        );

        // Send confirmation email to the Customer
        try {
            await sendEmail(
                `We Received Your Message - Webify Pro (Ref: ${savedMessage.id.toString().slice(-6)})`,
                emailTemplates.customerMessageConfirmation(savedMessage),
                savedMessage.email
            );
        } catch (customerEmailErr: any) {
            console.error("Customer confirmation email failed (Likely due to Resend unverified domain):", customerEmailErr.message);
        }

        return NextResponse.json(savedMessage, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
