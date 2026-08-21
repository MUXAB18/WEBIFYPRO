"use client";
import React from 'react';
import { Target, Zap, MessageSquare, Target as TargetIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const reasons = [
  {
    icon: <Target size={20} strokeWidth={1.5} />,
    title: 'Direct ROI Focus',
    desc: 'We don\'t care about vanity metrics. Our entire process is optimized for generating more leads, sales, and revenue for your business.'
  },
  {
    icon: <Zap size={20} strokeWidth={1.5} />,
    title: 'Technical Excellence',
    desc: 'We build custom solutions using modern technology ensuring lightning-fast load times and flawless mobile responsiveness.'
  },
  {
    icon: <MessageSquare size={20} strokeWidth={1.5} />,
    title: 'No-Nonsense Comms',
    desc: 'You get direct access to the founders via WhatsApp, transparent reporting, and proactive advice to scale your digital presence.'
  }
];

const WhyUs = ({ values = {} }) => {

  const getIcon = (iconName) => {
    if (!iconName) return <TargetIcon size={20} strokeWidth={1.5} />;
    const IconComponent = LucideIcons[iconName];
    return IconComponent ? <IconComponent size={20} strokeWidth={1.5} /> : <TargetIcon size={20} strokeWidth={1.5} />;
  };

  const dataToUse = values?.values && values.values.length > 0 
    ? values.values.map(v => ({ icon: getIcon(v.icon), title: v.title, desc: v.description }))
    : reasons;

  return (
    <section id="why-us" style={{ padding: '60px 6%', background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', gap: '20px' }}>
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: '800',
              color: 'var(--color-primary)', lineHeight: '1.2', letterSpacing: '-0.02em',
              marginBottom: '12px'
            }}>
              {values.title || <>Why partner with <span style={{ color: 'var(--color-accent)' }}>Webify Pro?</span></>}
            </h2>
            <p style={{ color: 'var(--color-text)', fontSize: '0.95rem', lineHeight: '1.5' }}>
              {values.description || 'We combine high-end software engineering with aggressive digital marketing strategies to build systems that scale your business.'}
            </p>
          </div>
          <a href="#contact" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem', textDecoration: 'none', height: 'fit-content' }}>
            Start Your Project
          </a>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {dataToUse.map((reason, index) => (
            <div key={index} className="premium-card" style={{
              padding: '24px',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: 'rgba(11, 30, 57, 0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--color-accent)'
              }}>
                {reason.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '8px' }}>
                  {reason.title}
                </h3>
                <p style={{ color: 'var(--color-text)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  {reason.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
