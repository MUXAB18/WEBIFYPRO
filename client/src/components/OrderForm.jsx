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
        gap: '60px', alignItems: 'start',
      }}>

        {/* ── Left Panel ── */}
        <ScrollReveal direction="left">
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', borderRadius: '100px',
              border: '1px solid rgba(6,255,165,0.3)', color: '#06ffa5',
              fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.1em',
              textTransform: 'uppercase', marginBottom: '24px',
              background: 'rgba(6,255,165,0.06)',
            }}>
              <Terminal size={13} /> Quantum Terminal
            </div>

            <h2 className="outfit" style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: '800', marginBottom: '18px', lineHeight: '1.2',
            }}>
              Ready to{' '}
              <GlitchText interval={7}>
                <span style={{
                  background: 'linear-gradient(135deg, #6366f1, #06ffa5)',
                  backgroundClip: 'text', WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>Launch?</span>
              </GlitchText>
            </h2>

            <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '32px', lineHeight: '1.75', fontSize: '0.93rem' }}>
              Fill out our step-by-step order wizard. You'll get a <strong style={{ color: '#06ffa5' }}>confirmation email</strong> and your request will arrive via <strong style={{ color: '#25d366' }}>WhatsApp</strong> instantly — no delays.
            </p>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
              {[
                ['Full custom design & development', '#06ffa5'],
                ['Modern & High Performance Stack', '#00d4ff'],
                ['24/7 Dedicated support', '#a855f7'],
              ].map(([item, color]) => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <CheckCircle size={19} color={color} style={{ flexShrink: 0 }} />
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.92rem' }}>{item}</span>
                </li>
              ))}
            </ul>

            {/* Notification channels */}
            <MagneticCard
              tiltStrength={10}
              scaleHover={1.02}
              zDepth={12}
              glowColor="#06ffa5"
              data-cursor-color="#06ffa5"
            >
              <div style={{
                padding: '20px 22px',
                background: 'rgba(3,7,18,0.8)',
                border: '1px solid rgba(99,102,241,0.18)',
                borderRadius: '18px',
              }}>
                <div style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: 'rgba(99,102,241,0.55)', marginBottom: '14px', letterSpacing: '0.1em' }}>
                  // NOTIFICATION_CHANNELS
                </div>
                {[
                  { icon: '📧', label: 'Email', value: 'WEBIFYPRO9@GMAIL.COM', color: '#00d4ff' },
                  { icon: '💬', label: 'WhatsApp', value: '+923708316591', color: '#25d366' },
                  { icon: '⚡', label: 'Response', value: '< 2 hours', color: '#06ffa5' },
                ].map(s => (
                  <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
                      {s.icon} {s.label}
                    </span>
                    <span style={{ fontSize: '0.78rem', fontWeight: '700', color: s.color, fontFamily: 'monospace', textAlign: 'right', maxWidth: '60%', wordBreak: 'break-all' }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </MagneticCard>
          </div>
        </ScrollReveal>

        {/* ── Right: Wizard ── */}
        <ScrollReveal direction="right">
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
