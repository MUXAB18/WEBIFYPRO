import React from 'react';
import Link from 'next/link';
import { Target, Zap, Shield, Heart, ArrowRight, Lightbulb, LineChart } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: <Target size={24} />,
      title: "Results Obsessed",
      description: "We don't just write code or design pretty graphics. Everything we do is meticulously engineered to drive measurable business growth and ROI."
    },
    {
      icon: <Zap size={24} />,
      title: "Radical Speed",
      description: "In the digital world, speed wins. We leverage the latest edge-computing technologies to deliver products that perform instantaneously."
    },
    {
      icon: <Shield size={24} />,
      title: "Absolute Transparency",
      description: "No black boxes, no technical jargon to hide behind. We communicate clearly, set realistic expectations, and deliver on our promises."
    },
    {
      icon: <Heart size={24} />,
      title: "Craftsmanship",
      description: "We treat every project as if it were our own startup. We sweat the small details because we believe premium quality is in the micro-interactions."
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Continuous Innovation",
      description: "We stay ahead of the curve. By constantly exploring new frameworks and marketing channels, we ensure your business never falls behind the competition."
    },
    {
      icon: <LineChart size={24} />,
      title: "Data-Driven Decisions",
      description: "We don't guess. Every design choice, marketing campaign, and technical architecture decision is backed by hard data and rigorous testing."
    }
  ];

  const stats = [
    { number: "50+", label: "Projects Delivered" },
    { number: "15+", label: "Countries Served" },
    { number: "99%", label: "Client Retention" },
    { number: "24/7", label: "Global Support" }
  ];

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--color-bg)' }}>
      
      {/* 1. Hero Section */}
      <section style={{ padding: '80px 6% 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block', padding: '6px 14px', borderRadius: '100px',
            background: 'rgba(11, 30, 57, 0.05)', border: '1px solid var(--color-border)',
            color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: '600',
            textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px'
          }}>
            About Webify Pro
          </div>
          <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', fontWeight: '800', color: 'var(--color-primary)', lineHeight: '1.05', letterSpacing: '-0.02em', marginBottom: '24px' }}>
            We are the architects of <span style={{ color: 'var(--color-accent)' }}>digital growth.</span>
          </h1>
          <p style={{ color: 'var(--color-text)', fontSize: '1.25rem', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto' }}>
            Based in Sialkot, Pakistan, we are an elite collective of engineers, designers, and strategists. We partner with ambitious brands to build digital products that dominate markets.
          </p>
        </div>
      </section>

      {/* 2. The Story / Mission (Two Columns) */}
      <section style={{ padding: '80px 6%', background: 'var(--color-surface)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
          
          <div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '24px', lineHeight: '1.2' }}>
              The traditional agency model is <span style={{ color: 'var(--color-accent)' }}>broken.</span>
            </h2>
            <div style={{ height: '4px', width: '60px', background: 'var(--color-accent)', borderRadius: '2px', marginBottom: '32px' }}></div>
          </div>

          <div style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--color-text)' }}>
            <p style={{ marginBottom: '20px' }}>
              Most agencies operate on a flawed premise: they build what you ask for, collect a check, and disappear. They focus on output, not outcomes.
            </p>
            <p style={{ marginBottom: '20px' }}>
              <strong>Webify Pro was founded to change this.</strong> We operate as an extension of your team. Before we write a single line of code or sketch a wireframe, we obsess over your business logic. Who are your customers? Where is the friction? How do we increase your Customer Lifetime Value?
            </p>
            <p>
              By combining enterprise-grade software engineering (Next.js, Node, Cloud Native) with deep marketing psychology, we build conversion engines that generate measurable ROI.
            </p>
          </div>
          
        </div>
      </section>

      {/* 3. Stats Section */}
      <section style={{ padding: '40px 6%', background: 'var(--color-primary)', color: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', textAlign: 'center' }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ padding: '12px' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--color-accent)', marginBottom: '4px', lineHeight: '1' }}>
                  {stat.number}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: '500', opacity: 0.9 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Core Values Grid */}
      <section style={{ padding: '100px 6%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', color: 'var(--color-primary)' }}>
              Our Core Principles
            </h2>
            <p style={{ color: 'var(--color-text)', fontSize: '1.1rem', marginTop: '16px' }}>The non-negotiable standards that govern everything we do.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {values.map((val, i) => (
              <div key={i} style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                padding: '40px 32px',
                borderRadius: '16px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              className="value-card"
              >
                <div style={{
                  width: '56px', height: '56px', borderRadius: '14px',
                  background: 'rgba(255, 107, 53, 0.1)', color: 'var(--color-accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px'
                }}>
                  {val.icon}
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '12px' }}>
                  {val.title}
                </h3>
                <p style={{ color: 'var(--color-text)', lineHeight: '1.6', fontSize: '1.05rem' }}>
                  {val.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Custom CTA */}
      <section style={{ padding: '100px 6%', background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '24px', lineHeight: '1.1' }}>
            Ready to build the future of your brand?
          </h2>
          <p style={{ color: 'var(--color-text)', fontSize: '1.2rem', marginBottom: '40px' }}>
            Let's jump on a quick discovery call to see if we're the right technical partner for your next major project.
          </p>
          <Link href="/start-project" className="btn-primary" style={{ display: 'inline-flex', padding: '12px 24px', fontSize: '0.95rem', borderRadius: '12px', alignItems: 'center', gap: '8px' }}>
            Start Your Project <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <style>{`
        .value-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(11, 30, 57, 0.06);
          border-color: rgba(11, 30, 57, 0.15) !important;
        }
      `}</style>
    </div>
  );
}
