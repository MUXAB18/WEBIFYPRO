import React, { useState, useEffect } from 'react';
import {
  Code2, Megaphone, Smartphone, Cpu,
  User, Mail, Phone, FileText,
  DollarSign, Clock, CheckCircle, ChevronRight, ChevronLeft,
  Send, MessageCircle, Zap
} from 'lucide-react';
import { sendOrderEmail, buildOrderWAMessage, WA_NUMBER } from '../config/emailjs';
import SubmissionPopup from './SubmissionPopup';

const SERVICES = [
  { id: 'Web Development', icon: <Code2 size={28} />, color: '#00d4ff', glow: 'rgba(0,212,255,0.14)', label: 'Web Development', sub: 'React · Node.js · MERN' },
  { id: 'Digital Marketing', icon: <Megaphone size={28} />, color: '#ff006e', glow: 'rgba(255,0,110,0.14)', label: 'Digital Marketing', sub: 'Meta Ads · Facebook · SEO' },
  { id: 'Mobile Application', icon: <Smartphone size={28} />, color: '#a855f7', glow: 'rgba(168,85,247,0.14)', label: 'Mobile Application', sub: 'Flutter · Dart · Firebase' },
  { id: 'Social Media Management', icon: <Cpu size={28} />, color: '#06ffa5', glow: 'rgba(6,255,165,0.14)', label: 'Social Media', sub: 'Instagram · TikTok · Growth' },
];

const BUDGETS = [
  { label: 'Starter', value: 'under-100', price: 'Under $70 ', desc: 'Small sites & social pages' },
  { label: 'Growth', value: '100-150', price: '$100 – $150', desc: 'Full websites & campaigns' },
  { label: 'Business', value: '150-200', price: '$150 – $200', desc: 'Complex apps & funnels' },
  { label: 'Enterprise', value: '200+', price: '$200+', desc: 'Custom enterprise solutions' },
];

const TIMELINES = [
  { label: 'ASAP', value: 'asap', desc: '< 1 week' },
  { label: 'Standard', value: 'standard', desc: '2 – 4 weeks' },
  { label: 'Relaxed', value: 'relaxed', desc: '1 – 2 months' },
  { label: 'Flexible', value: 'flexible', desc: 'No rush' },
];

const STEPS = ['Service', 'Details', 'Budget', 'Confirm'];

const INITIAL = {
  service: '',
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  details: '',
  budget: '',
  timeline: '',
};

const OrderWizard = ({ onSuccess }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(INITIAL);
  const [popupOpen, setPopupOpen] = useState(false);
  const [waUrl, setWaUrl] = useState('');
  const [animDir, setAnimDir] = useState('forward');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  // Listen for external service-select events (from Services cards)
  useEffect(() => {
    const handler = (e) => {
      let svc = e.detail;
      if (svc === 'Mobile Applications') svc = 'Mobile Application';
      setForm(prev => ({ ...prev, service: svc }));
      if (step === 0) setStep(1); // jump to details
      document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
    };
    window.addEventListener('select-service', handler);
    return () => window.removeEventListener('select-service', handler);
  }, [step]);

  const go = (dir) => {
    setAnimDir(dir > 0 ? 'forward' : 'back');
    setStep(s => Math.min(Math.max(s + dir, 0), STEPS.length - 1));
  };

  const set = (key) => (val) => setForm(prev => ({ ...prev, [key]: val }));
  const setE = (key) => (e) => set(key)(e.target.value);

  const canProceed = () => {
    if (step === 0) return !!form.service;
    if (step === 1) return form.customerName && form.customerEmail && form.customerPhone && form.details;
    if (step === 2) return !!form.budget && !!form.timeline;
    return true;
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setLoadingText('Encrypting payload...');
    
    setTimeout(() => setLoadingText('Connecting to secure servers...'), 600);
    setTimeout(() => setLoadingText('Establishing secure link...'), 1200);

    setTimeout(() => {
      const snapshot = { ...form };
      const waMsg = buildOrderWAMessage(snapshot);
      const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`;
      setWaUrl(url);
      setPopupOpen(true);
      setForm(INITIAL);
      setStep(0);
      setIsSubmitting(false);

      sendOrderEmail(snapshot).catch(err => console.warn('Email fail:', err));
      const apiUrl = import.meta.env.VITE_API_URL;
      if (apiUrl) {
        fetch(`${apiUrl}/api/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(snapshot),
        }).catch(() => { });
      }
      if (onSuccess) onSuccess();
    }, 2000);
  };

  const selectedService = SERVICES.find(s => s.id === form.service);
  const selectedBudget = BUDGETS.find(b => b.value === form.budget);
  const selectedTimeline = TIMELINES.find(t => t.value === form.timeline);

  const inputStyle = {
    width: '100%', padding: '13px 16px',
    background: 'var(--input-bg)',
    border: '1px solid var(--input-border)',
    borderRadius: '10px',
    color: 'var(--input-text)',
    outline: 'none',
    fontFamily: "'Courier New', monospace",
    fontSize: '15px',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block', marginBottom: '7px',
    fontSize: '0.72rem',
    color: 'var(--primary)',
    fontFamily: 'monospace',
    letterSpacing: '0.05em',
    opacity: 0.85,
  };

  return (
    <>
      <div className="wizard-shell" style={{
        background: 'var(--surface-card)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--primary-border)',
        borderRadius: '28px',
        overflow: 'hidden',
        position: 'relative',
      }}>

        {/* Grid overlay decoration */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '28px', zIndex: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.025) 1px,transparent 1px)',
          backgroundSize: '30px 30px',
        }} />

        {/* Step Progress Bar */}
        <div style={{ position: 'relative', zIndex: 1, padding: '28px 32px 0' }}>
          {/* Terminal dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            {['#ff006e', '#06ffa5', '#00d4ff'].map((c, i) => (
              <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.8 }} />
            ))}
            <span style={{ marginLeft: '6px', fontSize: '0.72rem', fontFamily: 'monospace', color: 'var(--text-faint)' }}>
              webifypro ~ order_wizard · step {step + 1}/{STEPS.length}
            </span>
          </div>

          {/* Steps indicator */}
          <div style={{ display: 'flex', gap: '0', marginBottom: '32px' }}>
            {STEPS.map((name, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <div key={name} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', position: 'relative' }}>
                  {/* Connector line */}
                  {i > 0 && (
                    <div style={{
                      position: 'absolute', left: 0, top: '14px',
                      width: '100%', height: '2px',
                      background: done || active
                        ? 'linear-gradient(90deg, #6366f1, rgba(99,102,241,0.3))'
                        : 'var(--border)',
                      zIndex: 0,
                      transform: 'translateX(-50%)',
                      transition: 'background 0.4s ease',
                    }} />
                  )}
                  {/* Circle */}
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: done ? '#6366f1' : active ? 'rgba(99,102,241,0.2)' : 'var(--glass)',
                    border: `2px solid ${done ? '#6366f1' : active ? '#6366f1' : 'var(--border)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1, position: 'relative',
                    transition: 'all 0.4s ease',
                    boxShadow: active ? '0 0 16px rgba(99,102,241,0.5)' : 'none',
                  }}>
                    {done
                      ? <CheckCircle size={14} color="#fff" />
                      : <span style={{ fontSize: '0.7rem', fontWeight: '700', color: active ? '#6366f1' : 'var(--text-faint)' }}>{i + 1}</span>
                    }
                  </div>
                  <span style={{
                    fontSize: '0.65rem', fontWeight: active ? '700' : '500',
                    color: active ? 'var(--text)' : done ? 'var(--text-muted)' : 'var(--text-faint)',
                    fontFamily: 'Outfit, sans-serif',
                    transition: 'color 0.3s ease',
                  }}>
                    {name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div 
          key={step} 
          className={`wizard-content-area ${animDir === 'forward' ? 'wizard-step-anim' : 'wizard-step-anim wizard-back'}`} 
          style={{ padding: '30px 40px', minHeight: '320px', position: 'relative', zIndex: 1 }}
        >
          {/* ─── STEP 0: Service Selection ─── */}
          {step === 0 && (
            <div>
              <h3 className="outfit" style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text)', marginBottom: '6px' }}>
                What can we build for you?
              </h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '22px' }}>
                Select a service to get started
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="service-grid-wizard">
                {SERVICES.map(svc => {
                  const isActive = form.service === svc.id;
                  return (
                    <button
                      key={svc.id}
                      onClick={() => set('service')(svc.id)}
                      style={{
                        padding: '18px 16px',
                        background: isActive ? `${svc.color}14` : 'var(--glass)',
                        border: `1.5px solid ${isActive ? svc.color : 'var(--border)'}`,
                        borderRadius: '14px',
                        cursor: 'pointer',
                        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px',
                        textAlign: 'left',
                        transition: 'all 0.25s ease',
                        boxShadow: isActive ? `0 0 20px ${svc.glow}` : 'none',
                      }}
                      className="wizard-service-btn"
                    >
                      <div style={{ color: isActive ? svc.color : 'rgba(255,255,255,0.5)', transition: 'color 0.25s ease' }}>
                        {svc.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: '700', color: isActive ? 'var(--text)' : 'var(--text-muted)', fontFamily: 'Outfit, sans-serif' }}>
                          {svc.label}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: isActive ? svc.color : 'var(--text-faint)', marginTop: '2px', fontFamily: 'monospace' }}>
                          {svc.sub}
                        </div>
                      </div>
                      {isActive && (
                        <div style={{
                          marginLeft: 'auto', marginTop: '-24px', alignSelf: 'flex-end',
                          width: '20px', height: '20px', borderRadius: '50%',
                          background: svc.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <CheckCircle size={13} color="#000" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── STEP 1: Details ─── */}
          {step === 1 && (
            <div>
              <h3 className="outfit" style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text)', marginBottom: '6px' }}>
                Tell us about yourself
              </h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '22px' }}>
                How should we reach you?
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }} className="details-grid-wizard">
                <div>
                  <label style={labelStyle}>&gt; your_name</label>
                  <input
                    type="text" required placeholder="John Doe"
                    value={form.customerName} onChange={setE('customerName')}
                    style={inputStyle} className="wizard-input"
                  />
                </div>
                <div>
                  <label style={labelStyle}>&gt; email_address</label>
                  <input
                    type="email" required placeholder="john@example.com"
                    value={form.customerEmail} onChange={setE('customerEmail')}
                    style={inputStyle} className="wizard-input"
                  />
                </div>
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={labelStyle}>&gt; phone_number</label>
                <input
                  type="tel" required placeholder="+1 234 567 890"
                  value={form.customerPhone} onChange={setE('customerPhone')}
                  style={inputStyle} className="wizard-input"
                />
              </div>
              <div>
                <label style={labelStyle}>&gt; project_details</label>
                <textarea
                  rows={4} required placeholder="Describe your project — features, goals, inspiration..."
                  value={form.details} onChange={setE('details')}
                  style={{ ...inputStyle, resize: 'none' }} className="wizard-input"
                />
              </div>
            </div>
          )}

          {/* ─── STEP 2: Budget & Timeline ─── */}
          {step === 2 && (
            <div>
              <h3 className="wizard-title outfit" style={{ fontSize: '1.3rem', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>
                Budget & Timeline
              </h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '20px' }}>
                Help us tailor the right solution
              </p>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--primary)', fontFamily: 'monospace', marginBottom: '10px', opacity: 0.85 }}>
                  {'>'} estimated_budget
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} className="budget-grid-wizard">
                  {BUDGETS.map(b => {
                    const active = form.budget === b.value;
                    return (
                      <button
                        key={b.value}
                        onClick={() => set('budget')(b.value)}
                        style={{
                          padding: '14px 16px', textAlign: 'left',
                          background: active ? 'var(--primary-dim)' : 'var(--glass)',
                          border: `1.5px solid ${active ? '#6366f1' : 'var(--border)'}`,
                          borderRadius: '12px', cursor: 'pointer',
                          transition: 'all 0.22s ease',
                          boxShadow: active ? '0 0 16px rgba(99,102,241,0.3)' : 'none',
                        }}
                        className="wizard-option-btn"
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                          <div style={{ fontSize: '0.78rem', fontWeight: '700', color: active ? 'var(--text)' : 'var(--text-muted)', fontFamily: 'Outfit, sans-serif' }}>
                            {b.label}
                          </div>
                          {active && (
                            <CheckCircle size={15} color="#6366f1" style={{ animation: 'popIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards' }} />
                          )}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: active ? '#6366f1' : 'var(--text-faint)', fontFamily: 'monospace' }}>
                          {b.price}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--primary)', fontFamily: 'monospace', marginBottom: '10px', opacity: 0.85 }}>
                  {'>'} project_timeline
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {TIMELINES.map(t => {
                    const active = form.timeline === t.value;
                    return (
                      <button
                        key={t.value}
                        onClick={() => set('timeline')(t.value)}
                        style={{
                          padding: '10px 16px', flex: 1, minWidth: '80px',
                          background: active ? 'var(--primary-dim)' : 'var(--glass)',
                          border: `1.5px solid ${active ? '#6366f1' : 'var(--border)'}`,
                          borderRadius: '10px', cursor: 'pointer',
                          transition: 'all 0.22s ease', textAlign: 'center',
                          boxShadow: active ? '0 0 14px rgba(99,102,241,0.25)' : 'none',
                        }}
                        className="wizard-option-btn"
                      >
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
                          {active && <CheckCircle size={13} color="#6366f1" style={{ animation: 'popIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards' }} />}
                          <div style={{ fontSize: '0.78rem', fontWeight: '700', color: active ? 'var(--text)' : 'var(--text-muted)', fontFamily: 'Outfit, sans-serif' }}>{t.label}</div>
                        </div>
                        <div style={{ fontSize: '0.64rem', color: active ? '#6366f1' : 'var(--text-faint)', marginTop: '2px' }}>{t.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 3: Confirm ─── */}
          {step === 3 && (
            <div>
              <h3 className="outfit" style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text)', marginBottom: '6px' }}>
                Review & Launch 🚀
              </h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '22px' }}>
                Confirm your order details below
              </p>


              {/* Summary card */}
              <div style={{
                background: 'var(--glass)',
                border: '1px solid var(--border)',
                borderRadius: '16px', padding: '20px',
                marginBottom: '22px',
              }}>
                {[
                  { label: 'Service', value: form.service, color: selectedService?.color },
                  { label: 'Name', value: form.customerName },
                  { label: 'Email', value: form.customerEmail },
                  { label: 'Phone', value: form.customerPhone },
                  { label: 'Budget', value: selectedBudget?.price },
                  { label: 'Timeline', value: selectedTimeline ? `${selectedTimeline.label} (${selectedTimeline.desc})` : '' },
                  { label: 'Details', value: form.details, multiline: true },
                ].map(row => row.value ? (
                  <div key={row.label} style={{
                    display: 'flex', gap: '12px',
                    marginBottom: '12px', alignItems: row.multiline ? 'flex-start' : 'center',
                  }}>
                    <span style={{ fontSize: '0.7rem', color: 'rgba(99,102,241,0.7)', fontFamily: 'monospace', minWidth: '70px', paddingTop: row.multiline ? '2px' : 0 }}>
                      {row.label}
                    </span>
                    <span style={{
                      fontSize: '0.82rem', fontWeight: '600',
                      color: row.color || 'var(--text-muted)',
                      wordBreak: 'break-word',
                      lineHeight: '1.4',
                    }}>
                      {row.value}
                    </span>
                  </div>
                ) : null)}
              </div>

              {/* Submit + WA */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="launch-btn"
                style={{
                  width: '100%', padding: '16px', marginBottom: '12px',
                  background: isSubmitting ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #6366f1, #a855f7)',
                  borderRadius: '12px', fontWeight: '700', fontSize: '1rem',
                  color: isSubmitting ? '#00d4ff' : 'white', border: isSubmitting ? '1px solid rgba(0,212,255,0.3)' : 'none',
                  cursor: isSubmitting ? 'default' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  boxShadow: isSubmitting ? 'none' : '0 8px 30px rgba(99,102,241,0.45)',
                  transition: 'all 0.3s ease',
                  fontFamily: 'Outfit, sans-serif',
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
                    <Send size={18} />
                    <span>Launch Mission</span>
                    <Zap size={16} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Nav buttons */}
        <div className="wizard-footer-area" style={{
          display: 'flex', justifyContent: 'space-between',
          padding: '0 32px 28px', gap: '12px', position: 'relative', zIndex: 1,
        }}>
          <button
            onClick={() => go(-1)}
            disabled={step === 0}
            style={{
              padding: '11px 22px', borderRadius: '100px',
              background: 'var(--glass)',
              border: '1px solid var(--border)',
              color: step === 0 ? 'var(--text-faint)' : 'var(--text-muted)',
              cursor: step === 0 ? 'not-allowed' : 'pointer',
              fontWeight: '600', fontSize: '0.85rem',
              display: 'flex', alignItems: 'center', gap: '6px',
              transition: 'all 0.2s ease',
              fontFamily: 'Outfit, sans-serif',
            }}
            className="wizard-nav-btn"
          >
            <ChevronLeft size={16} /> Back
          </button>

          {step < 3 && (
            <button
              onClick={() => go(1)}
              disabled={!canProceed()}
              style={{
                padding: '11px 26px', borderRadius: '100px',
                background: canProceed()
                  ? 'linear-gradient(135deg, #6366f1, #a855f7)'
                  : 'rgba(255,255,255,0.05)',
                border: 'none',
                color: canProceed() ? '#fff' : 'rgba(255,255,255,0.2)',
                cursor: canProceed() ? 'pointer' : 'not-allowed',
                fontWeight: '700', fontSize: '0.85rem',
                display: 'flex', alignItems: 'center', gap: '6px',
                boxShadow: canProceed() ? '0 4px 16px rgba(99,102,241,0.4)' : 'none',
                transition: 'all 0.3s ease',
                fontFamily: 'Outfit, sans-serif',
              }}
              className="wizard-next-btn"
            >
              Next <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Popup */}
      {popupOpen && (
        <SubmissionPopup
          isOpen={true}
          onClose={() => {
            setPopupOpen(false);
            setStep(1);
          }}
          waUrl={waUrl}
          title="Order Received! 🚀"
          subtitle="Your order has been submitted. We'll be in touch soon. Click below to continue on WhatsApp."
          countdownSec={4}
        />
      )}

      <style>{`
        .wizard-shell { padding: 0; }
        .wizard-step-anim {
          animation: wizardStepIn 0.32s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes wizardStepIn {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .wizard-back {
          animation: wizardStepBack 0.32s cubic-bezier(0.16,1,0.3,1) both !important;
        }
        @keyframes wizardStepBack {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .wizard-input { background: var(--input-bg) !important; border-color: var(--input-border) !important; color: var(--input-text) !important; }
        .wizard-input::placeholder { color: var(--input-placeholder) !important; }
        .wizard-input:focus {
          border-color: rgba(99,102,241,0.7) !important;
          box-shadow: 0 0 20px rgba(99,102,241,0.2) !important;
        }
        .wizard-service-btn:hover { border-color: rgba(255,255,255,0.2) !important; background: rgba(255,255,255,0.05) !important; }
        .wizard-option-btn:hover { border-color: rgba(99,102,241,0.4) !important; background: rgba(99,102,241,0.07) !important; }
        .wizard-nav-btn:not(:disabled):hover { background: rgba(255,255,255,0.1) !important; color: #fff !important; }
        .wizard-next-btn:not(:disabled):hover { box-shadow: 0 6px 22px rgba(99,102,241,0.55) !important; transform: translateY(-1px); }
        .launch-btn:not(:disabled):hover { box-shadow: 0 16px 40px rgba(99,102,241,0.5) !important; transform: translateY(-2px); }
        @keyframes loadingSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        @keyframes popIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @media (max-width: 520px) {
          .service-grid-wizard { grid-template-columns: 1fr !important; gap: 8px !important; }
          .details-grid-wizard { grid-template-columns: 1fr !important; gap: 10px !important; margin-bottom: 10px !important; }
          .budget-grid-wizard { grid-template-columns: 1fr 1fr !important; gap: 6px !important; }
          .wizard-content-area { padding: 20px 16px !important; min-height: auto !important; }
          .wizard-footer-area { padding: 16px !important; }
          .wizard-title { font-size: 1.15rem !important; margin-bottom: 4px !important; }
          .wizard-input { padding: 10px 14px !important; font-size: 0.85rem !important; }
          .wizard-option-btn { padding: 10px 12px !important; }
          .launch-btn { padding: 14px 20px !important; font-size: 0.9rem !important; }
        }
      `}</style>
    </>
  );
};

export default OrderWizard;
