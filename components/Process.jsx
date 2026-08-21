"use client";
import React from 'react';
import { MessageSquare, Palette, Code, Rocket, Circle as CircleIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const processSteps = [
  {
    number: '01',
    icon: <MessageSquare size={24} />,
    title: 'Discovery & Strategy',
    description: 'We start by understanding your business goals, target audience, and current bottlenecks. We then develop a customized digital strategy designed to maximize your ROI.',
  },
  {
    number: '02',
    icon: <Palette size={24} />,
    title: 'UX/UI Design',
    description: 'Our design team creates wireframes and high-fidelity mockups. We focus on creating an intuitive, premium user experience that aligns perfectly with your brand identity.',
  },
  {
    number: '03',
    icon: <Code size={24} />,
    title: 'Development',
    description: 'We engineer your solution using modern, scalable tech stacks (React, Next.js, Node). Everything is built for speed, security, and search engine visibility.',
  },
  {
    number: '04',
    icon: <Rocket size={24} />,
    title: 'Launch & Scale',
    description: 'After rigorous testing, we deploy your project. We then shift focus to growth—managing ad campaigns and SEO to drive targeted traffic to your new digital asset.',
  }
];

const Process = ({ data = {} }) => {
  const getIcon = (iconName) => {
    if (!iconName) return <CircleIcon size={24} />;
    const IconComponent = LucideIcons[iconName];
    return IconComponent ? <IconComponent size={24} /> : <CircleIcon size={24} />;
  };

  const stepsToUse = data?.steps && data.steps.length > 0 
    ? data.steps.map((s, i) => ({ 
        number: s.number || String(i+1).padStart(2, '0'), 
        icon: getIcon(s.icon), 
        title: s.title, 
        description: s.description 
      }))
    : processSteps;

  return (
    <section id="process" style={{ padding: 'var(--section-pad-y) var(--section-pad-x)', background: 'var(--color-surface)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{
            display: 'inline-block', padding: '6px 14px', borderRadius: '100px',
            background: 'rgba(11, 30, 57, 0.05)', border: '1px solid var(--color-border)',
            color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: '600',
            textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px'
          }}>
            {data.subtitle || 'Our Methodology'}
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', color: 'var(--color-primary)', lineHeight: '1.1', letterSpacing: '-0.02em', marginBottom: '20px' }}>
            {data.title || <>A proven process for <span style={{ color: 'var(--color-accent)' }}>predictable results.</span></>}
          </h2>
          <p style={{ color: 'var(--color-text)', fontSize: '1.1rem', lineHeight: '1.6' }}>
            {data.description || 'No guesswork. We follow a strict, data-driven framework to ensure your project is delivered on time and achieves its business objectives.'}
          </p>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Vertical Line */}
          <div style={{
            position: 'absolute', top: '0', bottom: '0', left: '28px',
            width: '2px', background: 'var(--color-border)',
            zIndex: 0
          }} className="timeline-line" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', position: 'relative', zIndex: 1 }}>
            {stepsToUse.map((step, index) => (
              <div key={index} style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }} className="timeline-item">
                
                {/* Icon/Number */}
                <div style={{
                  width: '58px', height: '58px', borderRadius: '50%',
                  background: 'var(--color-surface)',
                  border: '2px solid var(--color-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-primary)', flexShrink: 0,
                  boxShadow: '0 8px 16px rgba(11,30,57,0.05)'
                }} className="timeline-icon">
                  {step.icon}
                </div>

                {/* Content */}
                <div className="premium-card" style={{
                  padding: '40px', borderRadius: '20px', flex: 1,
                  background: 'var(--color-surface)'
                }}>
                  <div style={{
                    fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-accent)',
                    marginBottom: '12px', letterSpacing: '0.05em'
                  }}>
                    PHASE {step.number}
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '16px' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: 'var(--color-text)', fontSize: '1.05rem', lineHeight: '1.7' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 600px) {
          .timeline-line {
            left: 20px !important;
          }
          .timeline-item {
            gap: 20px !important;
          }
          .timeline-icon {
            width: 40px !important;
            height: 40px !important;
          }
          .timeline-icon svg {
            width: 18px !important;
            height: 18px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Process;
