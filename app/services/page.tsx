import React from 'react';
import Services from '@/components/Services';
import TechStack from '@/components/TechStack';
import GrowthCTA from '@/components/GrowthCTA';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Our Services | Webify Pro',
  description: 'Premium Web Development, Digital Marketing, and Business Automation services engineered for scale.',
};

export default async function ServicesPage() {
  const dbServices = await prisma.service.findMany({
    orderBy: { order: 'asc' }
  });

  const page = await prisma.page.findUnique({
    where: { slug: 'services' },
    include: { sections: { orderBy: { order: 'asc' } } }
  });

  const sections = page?.sections.map((s: any) => ({
    ...s,
    parsed: typeof s.content === 'string' ? JSON.parse(s.content) : s.content
  })) || [];

  const getSection = (type: string) => sections.find(s => s.type === type)?.parsed || {};
  const hero = getSection('HERO');
  const techStack = getSection('TECH_STACK');
  const cta = getSection('CTA');

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--color-bg)' }}>
      
      {/* Core Services Component (includes modals) */}
      <Services dbServices={dbServices} hero={hero} />

      {/* Tech Stack */}
      <TechStack techStack={techStack} />

      {/* Final Push */}
      <GrowthCTA cta={cta} />

    </div>
  );
}
