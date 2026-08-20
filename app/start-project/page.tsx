import React from 'react';
import OrderForm from '@/components/OrderForm';

export const metadata = {
  title: 'Get a Quote | Webify Pro',
  description: 'Get a custom quote for your web development or digital marketing project.',
};

export default function QuotePage() {
  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--color-bg)' }}>
      {/* Intro Header */}
      <section style={{ padding: '80px 6% 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block', padding: '6px 14px', borderRadius: '100px',
            background: 'rgba(11, 30, 57, 0.05)', border: '1px solid var(--color-border)',
            color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: '600',
            textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px'
          }}>
            Project Quote
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', color: 'var(--color-primary)', lineHeight: '1.1', letterSpacing: '-0.02em', marginBottom: '24px' }}>
            Start your <span style={{ color: 'var(--color-accent)' }}>Project.</span>
          </h1>
          <p style={{ color: 'var(--color-text)', fontSize: '1.15rem', lineHeight: '1.7' }}>
            Tell us about your requirements using our wizard, and we'll provide a comprehensive proposal and timeline.
          </p>
        </div>
      </section>

      <OrderForm />
    </div>
  );
}
