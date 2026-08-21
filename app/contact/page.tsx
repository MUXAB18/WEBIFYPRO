import React from 'react';
import Contact from '@/components/Contact';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const dbPage = await prisma.page.findUnique({ where: { slug: 'contact' } });
  return {
    title: dbPage?.metaTitle || 'Contact Us | Webify Pro',
    description: dbPage?.metaDescription || 'Get in touch with Webify Pro to discuss your next digital project.',
  };
}

export default async function ContactPage() {
  const dbPage = await prisma.page.findUnique({
    where: { slug: 'contact' },
    include: { sections: { orderBy: { order: 'asc' } } }
  });

  if (!dbPage) {
    return notFound();
  }

  const sections = dbPage.sections.map(s => {
    try {
      return { ...s, parsed: JSON.parse(s.content) };
    } catch {
      return { ...s, parsed: {} };
    }
  });

  const getSection = (type: string) => sections.find(s => s.type === type)?.parsed;

  const hero = getSection('HERO');
  const contactForm = getSection('CONTACT_FORM');

  const renderTitle = (title: string, accentColor: string = 'var(--color-accent)') => {
    if (!title) return null;
    const parts = title.split(/(\{.*?\})/g);
    return (
      <>
        {parts.map((part, i) => {
          if (part.startsWith('{') && part.endsWith('}')) {
            return <span key={i} style={{ color: accentColor }}>{part.slice(1, -1)}</span>;
          }
          return <span key={i} dangerouslySetInnerHTML={{ __html: part }} />;
        })}
      </>
    );
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--color-bg)' }}>
      {/* Intro Header */}
      {hero && (
        <section style={{ padding: '80px 6% 0', textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', color: 'var(--color-primary)', lineHeight: '1.1', letterSpacing: '-0.02em', marginBottom: '24px' }}>
                {renderTitle(hero.title, hero.titleAccentColor)}
              </h1>
            )}
            {hero.description && (
              <p style={{ color: 'var(--color-text)', fontSize: '1.15rem', lineHeight: '1.7' }}>
                {hero.description}
              </p>
            )}
          </div>
        </section>
      )}

      {contactForm ? (
        <Contact hideHeader={contactForm.hideHeader} />
      ) : (
        <Contact hideHeader={true} />
      )}
    </div>
  );
}
