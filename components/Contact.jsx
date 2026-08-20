"use client";
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { buildContactWAMessage, WA_NUMBER } from '../config/emailjs';
import SubmissionPopup from './SubmissionPopup';

const INITIAL = { name: '', email: '', phone: '', subject: '', message: '' };

const Contact = ({ hideHeader = false }) => {
  const [formData, setFormData] = useState(INITIAL);
  const [popupOpen, setPopupOpen] = useState(false);
  const [waUrl, setWaUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (key) => (e) => setFormData(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (popupOpen || isSubmitting) return;

    setIsSubmitting(true);

    const snapshot = { ...formData };
    const waMsg = buildContactWAMessage(snapshot);
    const encoded = encodeURIComponent(waMsg);
    const url = `https://wa.me/${WA_NUMBER}?text=${encoded}`;
    setWaUrl(url);

    setPopupOpen(true);
    setFormData(INITIAL);
    setIsSubmitting(false);

    try {
      await fetch(`/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(snapshot),
      });
    } catch (err) {
      console.warn('Backend sync error:', err);
    }
  };

  const contactInfo = [
    { icon: <Mail size={20} />, title: 'Email Us', value: 'webifypro9@gmail.com', href: 'mailto:webifypro9@gmail.com' },
    { icon: <Phone size={20} />, title: 'Call Us', value: '+92 370 8316 591', href: 'tel:+923708316591' },
    { icon: <MessageCircle size={20} />, title: 'WhatsApp', value: '+92 370 8316 591', href: 'https://wa.me/923708316591' },
    { icon: <MapPin size={20} />, title: 'Location', value: 'Sialkot, Pakistan', href: null },
  ];

  return (
    <>
    <section id="contact" style={{ padding: hideHeader ? '60px var(--section-pad-x) var(--section-pad-y)' : 'var(--section-pad-y) var(--section-pad-x)', background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {!hideHeader && (
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{
              display: 'inline-block', padding: '6px 14px', borderRadius: '100px',
              background: 'rgba(11, 30, 57, 0.05)', border: '1px solid var(--color-border)',
              color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: '600',
              textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px'
            }}>
              Contact
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '14px', color: 'var(--color-primary)', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
              Let's start a <span style={{ color: 'var(--color-accent)' }}>conversation.</span>
            </h2>
            <p style={{ color: 'var(--color-text)', maxWidth: '520px', margin: '0 auto', lineHeight: '1.7', fontSize: '1.1rem' }}>
              Fill out the form below and we will get back to you within 24 hours.
            </p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '60px' }}>
          
          {/* Left: Contact Info */}
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '32px', color: 'var(--color-primary)' }}>
              Direct Channels
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {contactInfo.map(info => (
                <a
                  key={info.title}
                  href={info.href || undefined}
                  target={info.href && !info.href.startsWith('mailto') && !info.href.startsWith('tel') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="premium-card"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    padding: '24px', borderRadius: '16px',
                    textDecoration: 'none', color: 'inherit',
                    cursor: info.href ? 'pointer' : 'default',
                    background: 'var(--color-bg)'
                  }}
                >
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
                    background: 'rgba(11, 30, 57, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--color-primary)'
                  }}>{info.icon}</div>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--color-text)', marginBottom: '4px', fontWeight: '500' }}>{info.title}</div>
                    <div style={{ fontWeight: '700', fontSize: '1.05rem', color: 'var(--color-primary)' }}>{info.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="premium-card" style={{ padding: '40px', borderRadius: '24px', background: 'var(--color-bg)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '32px', color: 'var(--color-primary)' }}>
              Send an Inquiry
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-primary)' }}>Full Name</label>
                <input type="text" placeholder="John Doe" required value={formData.name} onChange={set('name')} className="form-input" />
              </div>

              <div className="form-group-half">
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-primary)' }}>Email</label>
                <input type="email" placeholder="john@company.com" required value={formData.email} onChange={set('email')} className="form-input" />
              </div>

              <div className="form-group-half">
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-primary)' }}>Phone Number</label>
                <input type="tel" placeholder="+1 234 567 8900" required value={formData.phone} onChange={set('phone')} className="form-input" />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-primary)' }}>Project Details</label>
                <textarea placeholder="Tell us about your goals..." required rows={4} value={formData.message} onChange={set('message')} className="form-input" style={{ resize: 'vertical', minHeight: '120px' }} />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{ gridColumn: 'span 2', width: '100%', padding: '16px', borderRadius: '12px', fontSize: '1.1rem', justifyContent: 'center' }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          padding: 14px 16px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 10px;
          color: var(--color-primary);
          font-family: inherit;
          font-size: 1rem;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        .form-input::placeholder {
          color: var(--color-text);
          opacity: 0.5;
        }
        .form-input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 4px rgba(11, 30, 57, 0.05);
        }
        @media (max-width: 600px) {
          .form-group-half {
            grid-column: span 2;
          }
        }
      `}</style>
    </section>

      {/* Success Popup */}
      <SubmissionPopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        waUrl={waUrl}
        title="Message Sent"
        subtitle="Thank you for reaching out. We will get back to you shortly, or you can continue this conversation on WhatsApp."
      />
    </>
  );
};

export default Contact;
