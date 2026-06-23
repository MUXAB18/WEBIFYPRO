// ─── Web3Forms Credentials (set in .env) ─────────────────────────────────────────
export const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

// ─── Your WhatsApp number ─────────────────────────────────────────────────────
export const WA_NUMBER = '923708316591'; // without +

// ─── Send order email via Web3Forms ───────────────────────────────────────────
export async function sendOrderEmail(formData) {
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: `🚀 New Order: ${formData.service} — ${formData.customerName}`,
      from_name: 'Webify Pro',
      service_requested: formData.service,
      client_name: formData.customerName,
      client_email: formData.customerEmail,
      client_phone: formData.customerPhone,
      project_details: formData.details,
    })
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || 'Web3Forms submission failed');
  }
  return data;
}

// ─── Send contact email via Web3Forms ─────────────────────────────────────────
export async function sendContactEmail(formData) {
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: `📩 Message: ${formData.subject} — ${formData.name}`,
      from_name: 'Webify Pro',
      client_name: formData.name,
      client_email: formData.email,
      client_phone: formData.phone,
      message_subject: formData.subject,
      message_content: formData.message,
    })
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || 'Web3Forms submission failed');
  }
  return data;
}

// ─── Open WhatsApp with pre-filled message ────────────────────────────────────
export function openWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WA_NUMBER}?text=${encoded}`;
  
  // Use window.open to open in a new tab/app prompt, preventing the SPA from resetting/reloading
  // when the user returns to the browser tab.
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function buildOrderWAMessage(formData) {
  return (
    `🚀 *New Order — Webify Pro*\n\n` +
    `*Service:* ${formData.service}\n` +
    `*Name:* ${formData.customerName}\n` +
    `*Email:* ${formData.customerEmail}\n` +
    `*Phone:* ${formData.customerPhone}\n\n` +
    `*Project Details:*\n${formData.details}`
  );
}

export function buildContactWAMessage(formData) {
  return (
    `📩 *New Message — Webify Pro*\n\n` +
    `*Name:* ${formData.name}\n` +
    `*Email:* ${formData.email}\n` +
    `*Phone:* ${formData.phone}\n` +
    `*Subject:* ${formData.subject}\n\n` +
    `*Message:*\n${formData.message}`
  );
}
