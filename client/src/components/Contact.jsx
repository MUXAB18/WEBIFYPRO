import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Zap, MessageCircle } from 'lucide-react';
import { sendContactEmail, buildContactWAMessage, WA_NUMBER } from '../config/emailjs';
import ScrollReveal from './motion/ScrollReveal';
import MagneticCard from './motion/MagneticCard';
import SubmissionPopup from './SubmissionPopup';

const INITIAL = { name: '', email: '', phone: '', subject: '', message: '' };

const Contact = () => {
  const [formData, setFormData] = useState(INITIAL);
  const [popupOpen, setPopupOpen] = useState(false);
  const [waUrl, setWaUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const set = (key) => (e) => setFormData(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (popupOpen || isSubmitting) return;

    setIsSubmitting(true);

    // ── Step 1: Build WA URL ──
    const snapshot = { ...formData };
    const waMsg = buildContactWAMessage(snapshot);
    const encoded = encodeURIComponent(waMsg);
    const url = `https://wa.me/${WA_NUMBER}?text=${encoded}`;
    setWaUrl(url);

    // ── Step 2: Show popup immediately ──
    setPopupOpen(true);
    setFormData(INITIAL);
    setIsSubmitting(false);

    // ── Step 3: Send email & DB in background (non-blocking) ──
    // Web3Forms removed since backend handles emails now
    const apiUrl = import.meta.env.VITE_API_URL || '';
    fetch(`${apiUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(snapshot),
    }).catch(err => console.warn('Backend sync error:', err));
  };

  const contactInfo = [
    { icon: <Mail size={20} />, title: 'Email Us', value: 'WEBIFYPRO9@GMAIL.COM', href: 'mailto:WEBIFYPRO9@GMAIL.COM', color: '#00d4ff' },
    { icon: <Phone size={20} />, title: 'Call Us', value: '+923708316591', href: 'tel:+923708316591', color: '#06ffa5' },
    { icon: <MessageCircle size={20} />, title: 'WhatsApp', value: '+923708316591', href: 'https://wa.me/923708316591', color: '#25d366' },
    { icon: <MapPin size={20} />, title: 'Location', value: 'SIALKOT, PAKISTAN', href: null, color: '#a855f7' },
  ];

  const inputStyle = {
    width: '100%', padding: '13px 16px',
    background: 'rgba(0,0,0,0.4)',
    border: '1px solid rgba(0, 212, 255, 0.3)',
    borderRadius: '10px', color: '#e0f7ff', outline: 'none',
    fontFamily: "'Courier New', monospace", fontSize: '16px',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block', marginBottom: '7px',
    fontSize: '0.72rem', color: 'rgba(0, 212, 255, 0.8)',
    fontFamily: 'monospace', letterSpacing: '0.05em',
  };

  return (
    <>
    <section id="contact" style={{ position: 'relative', zIndex: 2 }}>
      {/* Header */}
      <ScrollReveal direction="up">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            display: 'inline-block', padding: '6px 16px', borderRadius: '100px',
            border: '1px solid rgba(0,212,255,0.3)', color: '#00d4ff',
            fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: '18px',
            background: 'rgba(0,212,255,0.06)',
          }}>✦ Quantum Signal</div>

          <h2 className="outfit" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: '800', marginBottom: '14px', color: '#fff' }}>
            Get In{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00d4ff, #6366f1)',
              backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Touch</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '520px', margin: '0 auto', lineHeight: '1.7', fontSize: '0.95rem' }}>
            Send a message — we respond within 24 hours via <strong style={{ color: '#00d4ff' }}>email</strong> and <strong style={{ color: '#25d366' }}>WhatsApp</strong>.
          </p>
        </div>
      </ScrollReveal>

      <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '48px', alignItems: 'start' }}>
        {/* ── Left: Contact Info ── */}
        <ScrollReveal direction="left">
          <div>
            <h3 className="outfit" style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '22px', color: '#fff' }}>
              Contact Channels
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '26px' }}>
              {contactInfo.map(info => (
                <MagneticCard
                  key={info.title}
                  glowColor={info.color}
                  data-cursor-color={info.color}
                  tiltStrength={8}
                  scaleHover={1.03}
                  zDepth={12}
                  style={{ display: 'block' }}
                >
                  <a
                    href={info.href || undefined}
                    target={info.href && !info.href.startsWith('mailto') && !info.href.startsWith('tel') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="contact-info-card"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '15px',
                      padding: '16px 18px',
                      background: 'rgba(5,5,20,0.72)',
                      border: `1px solid ${info.color}22`,
                      borderRadius: '14px', backdropFilter: 'blur(16px)',
                      transition: 'all 0.3s ease, border-color 0.3s ease',
                      textDecoration: 'none', color: 'inherit',
                      cursor: info.href ? 'pointer' : 'default',
                      height: '100%',
                    }}
                  >
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '11px', flexShrink: 0,
                      background: `${info.color}15`, border: `1px solid ${info.color}28`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: info.color, boxShadow: `0 0 14px ${info.color}18`,
                    }}>{info.icon}</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.38)', marginBottom: '2px' }}>{info.title}</div>
                      <div style={{ fontWeight: '600', fontSize: '0.86rem', color: '#fff', wordBreak: 'break-all' }}>{info.value}</div>
                    </div>
                    {info.href && <div style={{ marginLeft: 'auto', color: `${info.color}66`, flexShrink: 0, fontSize: '1rem' }}>→</div>}
                  </a>
                </MagneticCard>
              ))}
            </div>

            {/* Status panel */}
            <div style={{
              padding: '18px 20px',
              background: 'rgba(3,7,18,0.85)',
              border: '1px solid rgba(99,102,241,0.16)',
              borderRadius: '16px',
              backgroundImage: 'linear-gradient(rgba(99,102,241,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.025) 1px,transparent 1px)',
              backgroundSize: '24px 24px',
            }}>
              <div style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: 'rgba(99,102,241,0.5)', marginBottom: '12px', letterSpacing: '0.1em' }}>
                // TRANSMISSION_STATUS
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#06ffa5', animation: 'pulse-dot 2s infinite', flexShrink: 0 }} />
                <span style={{ fontSize: '0.78rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>Signal: ONLINE</span>
              </div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.28)', lineHeight: '1.7' }}>
                📧 Email: instant delivery<br />
                💬 WhatsApp: auto-opens<br />
                ⚡ Response: &lt; 2 hours
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Right: Form ── */}
        <ScrollReveal direction="right">
          <div>
            <h3 className="outfit" style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '22px', color: '#fff' }}>
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="contact-form-inner" style={{
              background: 'rgba(3,7,18,0.88)', backdropFilter: 'blur(24px)',
              border: '1px solid rgba(0, 212, 255, 0.25)', position: 'relative', overflow: 'hidden',
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '14px', alignContent: 'start',
            }}>
              {/* Terminal bar */}
              <div style={{
                gridColumn: 'span 2',
                display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px',
                marginBottom: '10px', paddingBottom: '16px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                zIndex: 1,
              }}>
                {['#00d4ff', '#6366f1', '#a855f7'].map((c, i) => (
                  <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.8 }} />
                ))}
                <span style={{ marginLeft: '6px', fontSize: '0.72rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)' }}>
                  webifypro ~ contact_terminal
                </span>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(0, 212, 255, 0.7)', animation: `blink-dot 1.5s ${i * 0.4}s infinite` }} />
                  ))}
                </div>
              </div>

              {[
                { type: 'text', placeholder: 'Your Name', key: 'name', label: '> client_name' },
                { type: 'email', placeholder: 'your@email.com', key: 'email', label: '> email_address' },
                { type: 'tel', placeholder: '+1 234 567 890', key: 'phone', label: '> phone_number' },
                { type: 'text', placeholder: 'Project Subject', key: 'subject', label: '> message_subject' },
              ].map(({ type, placeholder, key, label }) => (
                <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 1 }}>
                  <label style={labelStyle}>{label}</label>
                  <input type={type} placeholder={placeholder} required
                    value={formData[key]} onChange={set(key)}
                    style={inputStyle} className="contact-input" />
                </div>
              ))}

              <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 1 }}>
                <label style={labelStyle}>&gt; message_content</label>
                <textarea placeholder="Tell us about your project..." required rows={5}
                  value={formData.message} onChange={set('message')}
                  style={{ ...inputStyle, resize: 'none' }} className="contact-input" />
              </div>

              {/* Submit button */}
              <MagneticCard
                tiltStrength={5}
                scaleHover={1.02}
                zDepth={8}
                glowColor="#00d4ff"
                data-cursor-color="#00d4ff"
                style={{ gridColumn: 'span 2', display: 'block', zIndex: 1 }}
              >
                <button
              type="submit"
              disabled={isSubmitting}
              className="contact-submit-btn"
              style={{
                width: '100%', padding: '16px',
                background: isSubmitting ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #00d4ff, #6366f1)',
                border: isSubmitting ? '1px solid rgba(0,212,255,0.3)' : 'none',
                borderRadius: '10px', color: isSubmitting ? '#00d4ff' : '#000',
                fontWeight: '800', fontSize: '1.05rem', cursor: isSubmitting ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                transition: 'all 0.3s ease', fontFamily: 'Outfit, sans-serif',
                position: 'relative', overflow: 'hidden'
              }}
            >
              {isSubmitting && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, bottom: 0,
                  width: '30%', background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)',
                  animation: 'loadingSweep 1s infinite linear',
                }} />
              )}
              
              {isSubmitting ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spinRing 1s linear infinite' }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  <span style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}>{loadingText}</span>
                </>
              ) : (
                <>
                  <Send size={18} /> Send Transmission <Zap size={16} />
                </>
              )}
            </button>
              </MagneticCard>

              {/* Grid overlay */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '28px', zIndex: 0, pointerEvents: 'none',
                backgroundImage: 'linear-gradient(rgba(0, 212, 255, 0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0, 212, 255, 0.02) 1px,transparent 1px)',
                backgroundSize: '30px 30px',
              }} />
            </form>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .contact-form-inner {
          padding: 32px 28px;
          border-radius: 28px;
        }
        .contact-input:focus {
          border-color: rgba(0,212,255,0.6) !important;
          box-shadow: 0 0 20px rgba(0,212,255,0.15) !important;
        }
        .contact-input::placeholder { color: rgba(255,255,255,0.2); }
        .contact-info-card:hover {
          background: rgba(10,10,30,0.92) !important;
        }
        .contact-submit-btn:not(:disabled):hover {
          box-shadow: 0 8px 26px rgba(0,212,255,0.4) !important;
          transform: translateY(-2px);
        }
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes loadingSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 520px) {
          .contact-form-inner { grid-template-columns: 1fr !important; }
          .contact-form-inner > * { grid-column: span 1 !important; }
        }
        @media (max-width: 480px) {
          .contact-form-inner {
            padding: 24px 16px !important;
            border-radius: 20px !important;
          }
        }
      `}</style>
    </section>

      {/* Success Popup */}
      <SubmissionPopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        waUrl={waUrl}
        title="Message Sent! ✨"
        subtitle="Thanks for reaching out! We'll respond within 2 hours. Click below to continue chatting on WhatsApp."
      />
    </>
  );
};

export default Contact;
