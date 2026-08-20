import React from 'react';
import Contact from '@/components/Contact';

export const metadata = {
  title: 'Contact Us | Webify Pro',
  description: 'Get in touch with Webify Pro to discuss your next digital project.',
};

export default function ContactPage() {
  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--color-bg)' }}>
      {/* Intro Header */}
      <section style={{ padding: '80px 6% 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block', padding: '6px 14px', borderRadius: '100px',
            background: 'rgba(11, 30, 57, 0.05)', border: '1px solid var(--color-border)',
            color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: '600',
            textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px'
          }}>
            Get In Touch
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', color: 'var(--color-primary)', lineHeight: '1.1', letterSpacing: '-0.02em', marginBottom: '24px' }}>
            Let's build something <span style={{ color: 'var(--color-accent)' }}>amazing.</span>
          </h1>
          <p style={{ color: 'var(--color-text)', fontSize: '1.15rem', lineHeight: '1.7' }}>
            Ready to transform your digital presence? We're currently taking on new projects. Fill out the form below or reach us directly via WhatsApp.
          </p>
        </div>
      </section>

      <Contact hideHeader={true} />
    </div>
  );
}
