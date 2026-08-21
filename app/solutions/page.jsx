import React from 'react';
import prisma from '@/lib/prisma';
import ClientSolutionsPage from './ClientSolutionsPage';
import GrowthCTA from '@/components/GrowthCTA';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SolutionsPage() {
  const dbSolutions = await prisma.solution.findMany({
    orderBy: { order: 'asc' }
  });

  const page = await prisma.page.findUnique({
    where: { slug: 'solutions' },
    include: { sections: { orderBy: { order: 'asc' } } }
  });

  const sections = page?.sections.map((s) => ({
    ...s,
    parsed: typeof s.content === 'string' ? JSON.parse(s.content) : s.content
  })) || [];

  const getSection = (type) => sections.find(s => s.type === type)?.parsed || {};
  const techStack = getSection('TECH_STACK');
  const cta = getSection('CTA');

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--color-bg)' }}>
      <ClientSolutionsPage dbSolutions={dbSolutions} sections={sections} />
      <GrowthCTA cta={cta} />
    </div>
  );
}
