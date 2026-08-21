import React from 'react';
import OrderForm from '@/components/OrderForm';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Get a Quote | Webify Pro',
  description: 'Get a custom quote for your web development or digital marketing project.',
};

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

export default async function QuotePage() {
  const page = await prisma.page.findUnique({
    where: { slug: 'start-project' },
    include: { sections: { orderBy: { order: 'asc' } } }
  });

  const sections = page?.sections.map((s: any) => ({
    ...s,
    parsed: typeof s.content === 'string' ? JSON.parse(s.content) : s.content
  })) || [];

  const getSection = (type: string) => sections.find(s => s.type === type)?.parsed || {};
  const hero = getSection('HERO');

  const subtitle = hero.subtitle || 'Project Quote';
  const title = hero.title || 'Start your {Project.}';
  const titleAccentColor = hero.titleAccentColor || 'var(--color-accent)';
  const description = hero.description || "Tell us about your requirements using our wizard, and we'll provide a comprehensive proposal and timeline.";

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--color-bg)' }}>
      {/* Intro Header */}
      <section style={{ padding: '80px 6% 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block', padding: '6px 14px', borderRadius: '100px',
            background: 'rgba(11, 30, 57, 0.05)', border: '1px solid var(--color-border)',
            color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: '600',
            textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px'
          }}>
            {subtitle}
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', color: 'var(--color-primary)', lineHeight: '1.1', letterSpacing: '-0.02em', marginBottom: '24px' }}>
            {renderTitle(title, titleAccentColor)}
          </h1>
          <p style={{ color: 'var(--color-text)', fontSize: '1.15rem', lineHeight: '1.7' }}>
            {description}
          </p>
        </div>
      </section>

      <OrderForm />
    </div>
  );
}
