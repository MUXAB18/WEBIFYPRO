"use client";
import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

const GrowthCTA = () => {
  return (
    <section style={{ padding: '80px 6%', background: 'var(--color-bg)', color: 'var(--color-primary)', textAlign: 'center' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '16px', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
          Ready to <span style={{ color: 'var(--color-accent)' }}>scale</span> your business?
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text)', marginBottom: '32px', lineHeight: '1.6' }}>
          Stop losing customers to your competitors. Let's build a digital presence that actually drives revenue.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/start-project" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '12px 24px', borderRadius: '100px',
            background: 'var(--color-accent)', color: '#fff',
            fontWeight: '700', fontSize: '0.95rem', textDecoration: 'none',
            transition: 'transform 0.3s ease',
          }}>
            Start Your Project <ArrowRight size={18} />
          </a>
          <a href="https://wa.me/923708316591" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '12px 24px', borderRadius: '100px',
            background: 'transparent', border: '1px solid rgba(11, 30, 57, 0.2)',
            color: 'var(--color-primary)', fontWeight: '700', fontSize: '0.95rem', textDecoration: 'none',
            transition: 'background 0.3s ease',
          }}>
            <MessageCircle size={18} /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default GrowthCTA;
