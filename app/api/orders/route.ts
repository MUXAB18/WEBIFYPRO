import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { emailTemplates } from '@/lib/emailTemplates';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        const savedOrder = await prisma.order.create({
            data: {
                service: body.service,
                customerName: body.customerName,
                customerEmail: body.customerEmail,
                customerPhone: body.customerPhone,
                details: body.details,
                status: body.status || "pending",
                developmentStage: body.developmentStage || "Pending",
                assignedBudget: body.assignedBudget ? parseFloat(body.assignedBudget) : 0,
                // Nested create for tasks if they exist in the payload
                ...(body.tasks && body.tasks.length > 0 && {
                    tasks: {
                        create: body.tasks.map((task: any) => ({
                            name: task.name,
                            completed: task.completed || false
                        }))
                    }
                })
            }
        });

        // Send email to Admin
        await sendEmail(
            `New Order Received from ${savedOrder.customerName} (Order #${savedOrder.id.toString().slice(-6)}) - Webify Pro`,
            emailTemplates.adminNewOrder(savedOrder)
        );

        // Send confirmation email to the Customer
        try {
            await sendEmail(
                `Order Confirmation - Webify Pro (Order #${savedOrder.id.toString().slice(-6)})`,
                emailTemplates.customerOrderConfirmation(savedOrder),
                savedOrder.customerEmail
            );
        } catch (customerEmailErr: any) {
            console.error("Customer confirmation email failed (Likely due to Resend unverified domain):", customerEmailErr.message);
        }

        return NextResponse.json(savedOrder, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
