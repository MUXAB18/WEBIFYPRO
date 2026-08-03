import React, { useState } from 'react';
import { MessageSquare, Palette, Code, Rocket, Headphones, CheckCircle, ArrowRight, Clock } from 'lucide-react';
import ScrollReveal from './motion/ScrollReveal';
import MagneticCard from './motion/MagneticCard';

const processSteps = [
  {
    number: '01',
    icon: <MessageSquare size={28} />,
    title: 'Discovery & Strategy',
    subtitle: 'Understanding Your Vision',
    description: 'We start with a free consultation to understand your business goals, target audience, and project requirements. No sales pressure — just honest discussion about what will work best for you.',
    duration: '1-2 days',
    deliverables: ['Project scope document', 'Timeline & milestones', 'Clear pricing quote'],
    color: '#00d4ff',
    gradient: 'linear-gradient(135deg, #00b6e6, #00d4ff)',
  },
  {
    number: '02',
    icon: <Palette size={28} />,
    title: 'Design & Planning',
    subtitle: 'Bringing Ideas to Life',
    description: 'Our designers create mockups and prototypes tailored to your brand. You get to review and approve designs before we write a single line of code — ensuring the final product matches your vision.',
    duration: '3-5 days',
    deliverables: ['Visual mockups', 'User flow diagrams', 'Design revisions (2 rounds included)'],
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #4f46e5, #6366f1)',
  },
  {
    number: '03',
    icon: <Code size={28} />,
    title: 'Development & Build',
    subtitle: 'Crafting Your Solution',
    description: 'We build your website or app using modern, fast, and secure technologies. You\'ll get regular progress updates and can see the live development version at any time.',
    duration: '1-3 weeks',
    deliverables: ['Fully functional website/app', 'Mobile responsive design', 'SEO optimization included'],
    color: '#00d4ff',
    gradient: 'linear-gradient(135deg, #00b6e6, #00d4ff)',
  },
  {
    number: '04',
    icon: <Rocket size={28} />,
    title: 'Testing & Launch',
    subtitle: 'Going Live with Confidence',
    description: 'Rigorous testing across all devices and browsers ensures everything works perfectly. We handle the entire launch process — from domain setup to deployment — so you don\'t have to worry about technical details.',
    duration: '2-3 days',
    deliverables: ['Quality assurance report', 'Launch checklist completed', 'Training materials provided'],
    color: '#a855f7',
    gradient: 'linear-gradient(135deg, #9333ea, #a855f7)',
  },
  {
    number: '05',
    icon: <Headphones size={28} />,
    title: 'Support & Growth',
    subtitle: 'Long-Term Partnership',
    description: '1 month of free maintenance and updates included. After that, we offer flexible ongoing support plans. Your success is our success — we\'re here to help your business grow.',
    duration: 'Ongoing',
    deliverables: ['Bug fixes & updates', '24/7 emergency support', 'Monthly performance reports'],
    color: '#06ffa5',
    gradient: 'linear-gradient(135deg, #00d4a0, #06ffa5)',
  },
];

const Process = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" style={{
      position: 'relative',
      padding: 'clamp(80px, 12vw, 120px) 6% clamp(80px, 12vw, 120px)',
      background: 'linear-gradient(180deg, transparent 0%, rgba(0,212,255,0.02) 50%, transparent 100%)',
    }}>
      {/* Header */}
      <ScrollReveal direction="up">
        <div style={{ textAlign: 'center', marginBottom: '70px', maxWidth: '750px', margin: '0 auto 70px' }}>
          <div style={{
            display: 'inline-block', padding: '8px 20px', borderRadius: '100px',
            border: '1px solid rgba(0,212,255,0.3)', color: '#00d4ff',
            fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.14em',
            textTransform: 'uppercase', marginBottom: '24px',
            background: 'rgba(0,212,255,0.06)',
            boxShadow: '0 4px 16px rgba(0,212,255,0.1)',
          }}>
            ⚡ Our Process
          </div>

          <h2 className="outfit" style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: '800',
            marginBottom: '20px',
            color: '#fff',
            lineHeight: '1.2',
          }}>
            How We Turn Your Vision{' '}
            <br />
            Into <span style={{ color: '#00c8ff' }}>Reality</span>
          </h2>

          <p style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
            lineHeight: '1.7',
            maxWidth: '580px',
            margin: '0 auto',
          }}>
            A proven 5-step process that takes you from idea to launch — with full transparency,
            regular updates, and no surprises.
          </p>
        </div>
      </ScrollReveal>

      {/* Desktop Timeline View */}
      <div className="process-desktop" style={{
        display: 'none',
        position: 'relative',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Timeline Line */}
        <div style={{
          position: 'absolute',
          top: '80px',
          left: '0',
          right: '0',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.2) 10%, rgba(0,212,255,0.2) 90%, transparent)',
          zIndex: 0,
        }}>
          {/* Progress Line */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${(activeStep / (processSteps.length - 1)) * 100}%`,
            background: 'linear-gradient(90deg, #00d4ff, #6366f1)',
            transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 0 20px rgba(0,212,255,0.5)',
          }} />
        </div>

        {/* Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${processSteps.length}, 1fr)`,
          gap: '20px',
          position: 'relative',
          zIndex: 1,
        }}>
          {processSteps.map((step, index) => (
            <ScrollReveal key={index} direction="up" delay={index * 0.1}>
              <div
                onMouseEnter={() => setActiveStep(index)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                {/* Icon Circle */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: activeStep === index ? step.gradient : 'rgba(255,255,255,0.05)',
                  border: `2px solid ${activeStep === index ? step.color : 'rgba(255,255,255,0.1)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: activeStep === index ? '#000' : 'rgba(255,255,255,0.6)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: activeStep === index ? `0 10px 40px ${step.color}40` : 'none',
                  transform: activeStep === index ? 'scale(1.1) translateY(-5px)' : 'scale(1)',
                  marginBottom: '24px',
                }}>
                  {step.icon}
                </div>

                {/* Step Number */}
                <div style={{
                  fontSize: '0.7rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: activeStep === index ? step.color : 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.1em',
                  marginBottom: '8px',
                  fontWeight: '700',
                }}>
                  STEP {step.number}
                </div>

                {/* Title */}
                <h3 className="outfit" style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: activeStep === index ? '#fff' : 'rgba(255,255,255,0.7)',
                  textAlign: 'center',
                  marginBottom: '6px',
                  transition: 'color 0.3s ease',
                }}>
                  {step.title}
                </h3>

                {/* Duration */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.5)',
                  marginTop: '8px',
                }}>
                  <Clock size={14} />
                  {step.duration}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Active Step Details Card */}
        <ScrollReveal direction="up">
          <MagneticCard
            tiltStrength={8}
            scaleHover={1.02}
            zDepth={15}
            glowColor={processSteps[activeStep].color}
          >
            <div style={{
              marginTop: '60px',
              background: 'rgba(10,10,30,0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${processSteps[activeStep].color}30`,
              borderRadius: '24px',
              padding: '40px',
              boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${processSteps[activeStep].color}15`,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              {/* Subtitle */}
              <div style={{
                fontSize: '0.85rem',
                color: processSteps[activeStep].color,
                fontWeight: '600',
                marginBottom: '12px',
                letterSpacing: '0.05em',
              }}>
                {processSteps[activeStep].subtitle}
              </div>

              {/* Description */}
              <p style={{
                fontSize: '1.05rem',
                lineHeight: '1.8',
                color: 'rgba(255,255,255,0.8)',
                marginBottom: '32px',
              }}>
                {processSteps[activeStep].description}
              </p>

              {/* Deliverables */}
              <div>
                <div style={{
                  fontSize: '0.75rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.12em',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                }}>
                  What You Get:
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '12px',
                }}>
                  {processSteps[activeStep].deliverables.map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                    }}>
                      <CheckCircle size={18} style={{
                        color: processSteps[activeStep].color,
                        flexShrink: 0,
                        marginTop: '2px',
                      }} />
                      <span style={{
                        fontSize: '0.9rem',
                        color: 'rgba(255,255,255,0.75)',
                        lineHeight: '1.5',
                      }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MagneticCard>
        </ScrollReveal>
      </div>

      {/* Mobile/Tablet Stacked View */}
      <div className="process-mobile" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '700px',
        margin: '0 auto',
      }}>
        {processSteps.map((step, index) => (
          <ScrollReveal key={index} direction="up" delay={index * 0.1}>
            <MagneticCard
              tiltStrength={5}
              scaleHover={1.02}
              zDepth={12}
              glowColor={step.color}
            >
              <div style={{
                background: 'rgba(10,10,30,0.6)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: `1px solid ${step.color}30`,
                borderRadius: '20px',
                padding: 'clamp(24px, 5vw, 32px)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s ease',
              }}>
                {/* Step Number Badge */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: `${step.color}15`,
                  border: `2px solid ${step.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: '700',
                  color: step.color,
                }}>
                  {step.number}
                </div>

                {/* Icon */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  background: step.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#000',
                  marginBottom: '20px',
                  boxShadow: `0 8px 24px ${step.color}30`,
                }}>
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="outfit" style={{
                  fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                  fontWeight: '700',
                  color: '#fff',
                  marginBottom: '8px',
                }}>
                  {step.title}
                </h3>

                {/* Subtitle */}
                <div style={{
                  fontSize: '0.85rem',
                  color: step.color,
                  fontWeight: '600',
                  marginBottom: '16px',
                  letterSpacing: '0.03em',
                }}>
                  {step.subtitle}
                </div>

                {/* Duration */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: `${step.color}10`,
                  border: `1px solid ${step.color}25`,
                  fontSize: '0.75rem',
                  color: step.color,
                  fontWeight: '600',
                  marginBottom: '20px',
                }}>
                  <Clock size={14} />
                  {step.duration}
                </div>

                {/* Description */}
                <p style={{
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                  lineHeight: '1.7',
                  color: 'rgba(255,255,255,0.75)',
                  marginBottom: '24px',
                }}>
                  {step.description}
                </p>

                {/* Deliverables */}
                <div>
                  <div style={{
                    fontSize: '0.7rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '0.12em',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                  }}>
                    What You Get:
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}>
                    {step.deliverables.map((item, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                      }}>
                        <CheckCircle size={16} style={{
                          color: step.color,
                          flexShrink: 0,
                          marginTop: '3px',
                        }} />
                        <span style={{
                          fontSize: '0.85rem',
                          color: 'rgba(255,255,255,0.7)',
                          lineHeight: '1.5',
                        }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connector Arrow (except last step) */}
                {index < processSteps.length - 1 && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px',
                  }}>
                    <ArrowRight size={24} style={{
                      color: step.color,
                      opacity: 0.5,
                    }} />
                  </div>
                )}
              </div>
            </MagneticCard>
          </ScrollReveal>
        ))}
      </div>

      {/* CTA */}
      <ScrollReveal direction="up">
        <div style={{
          textAlign: 'center',
          marginTop: 'clamp(60px, 10vw, 80px)',
        }}>
          <MagneticCard
            tiltStrength={8}
            scaleHover={1.06}
            zDepth={15}
            glowColor="#00d4ff"
            style={{ display: 'inline-block' }}
          >
            <a
              href="https://wa.me/923708316591?text=Hi%20Webify%20Pro!%20I%20want%20to%20discuss%20my%20project%20and%20understand%20your%20process."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '18px 36px',
                background: 'linear-gradient(135deg, #0066ff, #00d4ff)',
                borderRadius: '14px',
                color: '#fff',
                fontSize: '1.05rem',
                fontWeight: '700',
                fontFamily: 'Outfit, sans-serif',
                textDecoration: 'none',
                boxShadow: '0 12px 40px rgba(0,212,255,0.35)',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              className="process-cta"
            >
              <MessageSquare size={20} />
              Start Your Project Today
              <ArrowRight size={20} />
            </a>
          </MagneticCard>

          <p style={{
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.5)',
            marginTop: '16px',
          }}>
            Free consultation • No obligation • Clear pricing
          </p>
        </div>
      </ScrollReveal>

      <style>{`
        @media (min-width: 1024px) {
          .process-desktop {
            display: block !important;
          }
          .process-mobile {
            display: none !important;
          }
        }

        .process-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 50px rgba(0,212,255,0.45) !important;
        }

        @media (max-width: 768px) {
          #process {
            padding: clamp(60px, 10vw, 80px) 5% !important;
          }
        }

        html.light-mode .process-mobile > div > div,
        html.light-mode .process-desktop > div {
          background: rgba(255,255,255,0.97) !important;
          border-color: rgba(0,0,0,0.1) !important;
        }

        html.light-mode .process-mobile h3,
        html.light-mode .process-mobile p,
        html.light-mode .process-desktop h3,
        html.light-mode .process-desktop p {
          color: rgba(13,14,26,0.85) !important;
        }
      `}</style>
    </section>
  );
};

export default Process;
