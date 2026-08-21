import React from 'react';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const dbPage = await prisma.page.findUnique({
    where: { slug: 'about' },
    include: { sections: { orderBy: { order: 'asc' } } }
  });

  if (!dbPage) {
    return notFound();
  }

  // Parse section contents safely
  const sections = dbPage.sections.map(s => {
    try {
      return { ...s, parsed: JSON.parse(s.content) };
    } catch {
      return { ...s, parsed: {} };
    }
  });

  const getSection = (type: string) => sections.find(s => s.type === type)?.parsed;

  const hero = getSection('HERO');
  const story = getSection('STORY');
  const statsSection = getSection('STATS');
  const valuesSection = getSection('VALUES');
  const cta = getSection('CTA');

  const getIcon = (iconName: string) => {
    if (!iconName) return <LucideIcons.Briefcase size={24} />;
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent size={24} /> : <LucideIcons.Briefcase size={24} />;
  };

  const renderTitle = (title: string, accentColor: string = 'var(--color-accent)') => {
    if (!title) return null;
    // Replace {text} with <span style="color: accentColor">text</span>
    const parts = title.split(/(\{.*?\})/g);
    return (
      <>
        {parts.map((part, i) => {
          if (part.startsWith('{') && part.endsWith('}')) {
            return <span key={i} style={{ color: accentColor }}>{part.slice(1, -1)}</span>;
          }
          // If the title still has raw HTML (legacy), dangerouslySetInnerHTML would be needed, but we migrated to {}
          return <span key={i} dangerouslySetInnerHTML={{ __html: part }} />;
        })}
      </>
    );
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--color-bg)' }}>
      
      {/* 1. Hero Section */}
      {hero && (
        <section style={{ padding: '80px 6% 60px', textAlign: 'center' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {hero.subtitle && (
              <div style={{
                display: 'inline-block', padding: '6px 14px', borderRadius: '100px',
                background: 'rgba(11, 30, 57, 0.05)', border: '1px solid var(--color-border)',
                color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: '600',
                textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px'
              }}>
                {hero.subtitle}
              </div>
            )}
            {hero.title && (
              <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', fontWeight: '800', color: 'var(--color-primary)', lineHeight: '1.05', letterSpacing: '-0.02em', marginBottom: '24px' }}>
                {renderTitle(hero.title, hero.titleAccentColor)}
              </h1>
            )}
            {hero.description && (
              <p style={{ color: 'var(--color-text)', fontSize: '1.25rem', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto' }}>
                {hero.description}
              </p>
            )}
          </div>
        </section>
      )}

      {/* 2. The Story / Mission (Two Columns) */}
      {story && (
        <section style={{ padding: '80px 6%', background: 'var(--color-surface)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
            
            <div>
              {story.title && (
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '24px', lineHeight: '1.2' }}>
                  {renderTitle(story.title, story.titleAccentColor)}
                </h2>
              )}
              <div style={{ height: '4px', width: '60px', background: 'var(--color-accent)', borderRadius: '2px', marginBottom: '32px' }}></div>
            </div>

            <div style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--color-text)' }}>
              {story.paragraphs && story.paragraphs.map((p: string, i: number) => (
                <p key={i} style={{ marginBottom: i !== story.paragraphs.length - 1 ? '20px' : '0' }} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
            
          </div>
        </section>
      )}

      {/* 3. Stats Section */}
      {statsSection && statsSection.stats && (
        <section style={{ padding: '40px 6%', background: 'var(--color-primary)', color: '#fff' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', textAlign: 'center' }}>
              {statsSection.stats.map((stat: any, i: number) => (
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
      )}

      {/* 4. Core Values Grid */}
      {valuesSection && valuesSection.values && (
        <section style={{ padding: '100px 6%' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', color: 'var(--color-primary)' }}>
                {valuesSection.title}
              </h2>
              {valuesSection.description && (
                <p style={{ color: 'var(--color-text)', fontSize: '1.1rem', marginTop: '16px' }}>{valuesSection.description}</p>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
              {valuesSection.values.map((val: any, i: number) => (
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
                    {getIcon(val.icon)}
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
      )}

      {/* 5. Custom CTA */}
      {cta && (
        <section style={{ padding: '100px 6%', background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '24px', lineHeight: '1.1' }}>
              {cta.title}
            </h2>
            <p style={{ color: 'var(--color-text)', fontSize: '1.2rem', marginBottom: '40px' }}>
              {cta.description}
            </p>
            <Link href={cta.buttonLink || '/contact'} className="btn-primary" style={{ display: 'inline-flex', padding: '12px 24px', fontSize: '0.95rem', borderRadius: '12px', alignItems: 'center', gap: '8px' }}>
              {cta.buttonText || 'Start Your Project'} <LucideIcons.ArrowRight size={18} />
            </Link>
          </div>
        </section>
      )}

      {/* Fallback general content if no specific sections exist but page has raw content */}
      {!hero && dbPage.content && (
        <section style={{ padding: '80px 6%' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }} dangerouslySetInnerHTML={{ __html: dbPage.content }} />
        </section>
      )}

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
