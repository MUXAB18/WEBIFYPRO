import React from 'react';
import Services from '@/components/Services';
import TechStack from '@/components/TechStack';
import GrowthCTA from '@/components/GrowthCTA';

export const metadata = {
  title: 'Our Services | Webify Pro',
  description: 'Premium Web Development, Digital Marketing, and Business Automation services engineered for scale.',
};

export default function ServicesPage() {
  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--color-bg)' }}>
      
      {/* Core Services Component (includes modals) */}
      <Services />

      {/* Tech Stack */}
      <TechStack />

      {/* Final Push */}
      <GrowthCTA />

    </div>
  );
}
