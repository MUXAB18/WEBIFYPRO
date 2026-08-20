const getBaseTemplate = (title: string, content: string, isAdmin = false) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333333; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f4f4f7; padding: 40px 10px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="100%" max-width="600" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td align="center" style="background-color: #0c0c1d; padding: 40px 20px; border-bottom: 3px solid #00d4ff;">
              <span style="display: block; font-size: 13px; font-weight: bold; color: #00d4ff; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Webify Pro</span>
              <h1 style="margin: 0; font-size: 24px; color: #ffffff; font-weight: 700;">${title}</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px; font-size: 16px; line-height: 1.6; color: #334155;">
              ${isAdmin ? '<div style="text-align: center; margin-bottom: 20px;"><span style="display: inline-block; background-color: #ffe4e6; color: #e11d48; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase;">Admin Notification</span></div>' : ''}
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #f8fafc; padding: 20px; border-top: 1px solid #e2e8f0; font-size: 13px; color: #64748b;">
              <p style="margin: 0 0 10px 0;">This is an automated message from Webify Pro.</p>
              <p style="margin: 0 0 10px 0;">&copy; ${new Date().getFullYear()} Webify Pro. All rights reserved.</p>
              <a href="https://webifypro.live" style="color: #6366f1; text-decoration: none; font-weight: 600;">Visit Website</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const emailTemplates = {
  adminNewOrder: (order: any) => getBaseTemplate('New Order Received! 🚀', `
    <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">Action Required: New Order</h2>
    <p style="margin-bottom: 24px;">A new order has just been placed. Please review the details below.</p>
    
    <table width="100%" border="0" cellpadding="12" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 20px;">
      <tr><th align="left" width="35%" style="color: #6366f1; border-bottom: 1px solid #e2e8f0;">Service</th><td style="border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: bold;">${order.service}</td></tr>
      <tr><th align="left" style="color: #6366f1; border-bottom: 1px solid #e2e8f0;">Customer</th><td style="border-bottom: 1px solid #e2e8f0; color: #0f172a;">${order.customerName}</td></tr>
      <tr><th align="left" style="color: #6366f1; border-bottom: 1px solid #e2e8f0;">Email</th><td style="border-bottom: 1px solid #e2e8f0;"><a href="mailto:${order.customerEmail}" style="color: #0ea5e9; text-decoration: none;">${order.customerEmail}</a></td></tr>
      <tr><th align="left" style="color: #6366f1; border-bottom: 1px solid #e2e8f0;">Phone</th><td style="border-bottom: 1px solid #e2e8f0; color: #0f172a;">${order.customerPhone}</td></tr>
      <tr><th align="left" style="color: #6366f1; vertical-align: top;">Details</th><td style="color: #0f172a;">${order.details}</td></tr>
    </table>
  `, true),

  customerOrderConfirmation: (order: any) => getBaseTemplate('Order Confirmation ✨', `
    <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">Hi ${order.customerName},</h2>
    <p style="margin-bottom: 24px;">Thank you for choosing <strong>Webify Pro</strong>! We have successfully received your order and our team is reviewing your requirements.</p>
    
    <table width="100%" border="0" cellpadding="12" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 24px;">
      <tr><th align="left" width="35%" style="color: #6366f1; border-bottom: 1px solid #e2e8f0;">Service</th><td style="border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: bold;">${order.service}</td></tr>
      <tr><th align="left" style="color: #6366f1; border-bottom: 1px solid #e2e8f0;">Your Phone</th><td style="border-bottom: 1px solid #e2e8f0; color: #0f172a;">${order.customerPhone}</td></tr>
      <tr><th align="left" style="color: #6366f1; vertical-align: top;">Project Details</th><td style="color: #0f172a;">${order.details}</td></tr>
    </table>
    
    <p style="margin-bottom: 30px;">We'll be in touch with you shortly to discuss the next steps!</p>
    
    <div style="text-align: center;">
      <a href="https://webifypro.live" style="display: inline-block; padding: 14px 28px; background-color: #6366f1; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">Visit Our Website</a>
    </div>
  `),

  adminNewMessage: (msg: any) => getBaseTemplate('New Contact Message 📩', `
    <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">New Inquiry Received</h2>
    <p style="margin-bottom: 24px;">You have received a new message from the website contact form.</p>
    
    <table width="100%" border="0" cellpadding="12" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 20px;">
      <tr><th align="left" width="35%" style="color: #6366f1; border-bottom: 1px solid #e2e8f0;">Name</th><td style="border-bottom: 1px solid #e2e8f0; color: #0f172a;">${msg.name}</td></tr>
      <tr><th align="left" style="color: #6366f1; border-bottom: 1px solid #e2e8f0;">Email</th><td style="border-bottom: 1px solid #e2e8f0;"><a href="mailto:${msg.email}" style="color: #0ea5e9; text-decoration: none;">${msg.email}</a></td></tr>
      <tr><th align="left" style="color: #6366f1; border-bottom: 1px solid #e2e8f0;">Phone</th><td style="border-bottom: 1px solid #e2e8f0; color: #0f172a;">${msg.phone}</td></tr>
      <tr><th align="left" style="color: #6366f1; border-bottom: 1px solid #e2e8f0;">Subject</th><td style="border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: bold;">${msg.subject}</td></tr>
      <tr><th align="left" style="color: #6366f1; vertical-align: top;">Message</th><td style="color: #0f172a;">${msg.message}</td></tr>
    </table>
  `, true),

  customerMessageConfirmation: (msg: any) => getBaseTemplate('Message Received 💌', `
    <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">Hi ${msg.name},</h2>
    <p style="margin-bottom: 16px;">Thank you for reaching out to <strong>Webify Pro</strong>!</p>
    <p style="margin-bottom: 16px;">We have successfully received your message regarding <strong>"${msg.subject}"</strong>. Our team has been notified and we will review your inquiry immediately.</p>
    <p style="margin-bottom: 30px;">We pride ourselves on quick communication, so you can expect to hear back from us within the next 2 hours.</p>
    
    <div style="text-align: center;">
      <a href="https://webifypro.live" style="display: inline-block; padding: 14px 28px; background-color: #6366f1; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">Explore Our Services</a>
    </div>
  `)
};
