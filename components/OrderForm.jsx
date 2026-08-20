"use client";
import React from 'react';
import { Terminal } from 'lucide-react';
import { CheckCircle, MessageCircle } from 'lucide-react';
import GlitchText from './motion/GlitchText';
import ScrollReveal from './motion/ScrollReveal';
import MagneticCard from './motion/MagneticCard';
import OrderWizard from './OrderWizard';

const OrderForm = () => {
  return (
    <section id="order" style={{ position: 'relative', zIndex: 2 }}>
      <div className="order-container" style={{
        maxWidth: '1000px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1.2fr',
        gap: '60px', alignItems: 'stretch',
      }}>

        {/* ── Left Panel ── */}
        <ScrollReveal direction="left" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', borderRadius: '100px',
              border: '1px solid var(--color-border)', color: 'var(--color-primary)',
              fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.05em',
              textTransform: 'uppercase', marginBottom: '24px',
              background: 'rgba(11, 30, 57, 0.05)',
            }}>
              <MessageCircle size={14} /> Ready to start?
            </div>

            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '800', marginBottom: '18px', lineHeight: '1.2',
              color: 'var(--color-primary)'
            }}>
              Get a custom proposal in <span style={{ color: 'var(--color-accent)' }}>hours</span>
            </h2>

            <p style={{ color: 'var(--color-text)', marginBottom: '32px', lineHeight: '1.75', fontSize: '1.05rem' }}>
              Fill out our step-by-step order wizard. You'll get a confirmation email and your request will be reviewed by our team immediately.
            </p>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
              {[
                'Full custom design & development',
                'Modern & High Performance Stack',
                '24/7 Dedicated support',
              ].map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <CheckCircle size={20} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                  <span style={{ color: 'var(--color-text)', fontSize: '1rem', fontWeight: '500' }}>{item}</span>
                </li>
              ))}
            </ul>

            {/* Notification channels */}
            <div style={{
              marginTop: 'auto',
              padding: '24px',
              background: '#fff',
              border: '1px solid var(--color-border)',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Contact Channels
              </div>
              {[
                { icon: '📧', label: 'Email', value: 'webifypro9@gmail.com' },
                { icon: '💬', label: 'WhatsApp', value: '+92 370 8316591' },
                { icon: '⚡', label: 'Response Time', value: '< 2 hours' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text)', fontWeight: '500' }}>
                    {s.icon} {s.label}
                  </span>
                  <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-primary)', textAlign: 'right' }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ── Right: Wizard ── */}
        <ScrollReveal direction="right" style={{ height: '100%' }}>
          <OrderWizard />
        </ScrollReveal>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .order-container { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </section>
  );
};

export default OrderForm;
