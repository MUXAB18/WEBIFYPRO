import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding additional data...');

  // Additional Pages
  const extraPages = [
    { title: 'Services', slug: 'services', isPublished: true },
    { title: 'Solutions', slug: 'solutions', isPublished: true },
    { title: 'Blog', slug: 'blog', isPublished: true },
    { title: 'Start Project', slug: 'start-project', isPublished: true }
  ];

  for (const page of extraPages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {},
      create: page,
    });
  }

  // Additional Solutions
  const extraSolutions = [
    {
      name: 'Healthcare & Wellness',
      slug: 'healthcare-wellness',
      shortDescription: 'HIPAA-compliant platforms with intuitive patient portals and appointment scheduling.',
      content: 'We empower healthcare providers with secure web and mobile applications. We automate patient onboarding and booking, while leveraging local SEO to drive new patient acquisitions.\n\n- HIPAA-Compliant Web & Mobile Apps\n- Automated Appointment Booking\n- Local SEO for Clinics',
      isPublished: true,
      order: 3
    },
    {
      name: 'Real Estate & Property',
      slug: 'real-estate-property',
      shortDescription: 'Immersive property listings, interactive maps, and automated lead capture for realtors.',
      content: 'Transform how you showcase properties. We build premium real estate web apps, automate your lead routing to agents, and run targeted ad campaigns to find qualified buyers faster.\n\n- Premium Real Estate Web Apps\n- Targeted Buyer Ad Campaigns\n- Smart Lead Routing Automation',
      isPublished: true,
      order: 4
    },
    {
      name: 'Corporate & B2B',
      slug: 'corporate-b2b',
      shortDescription: 'Professional digital presence that establishes authority and generates qualified B2B leads.',
      content: 'Your corporate website should be your best salesperson. We design high-authority B2B web apps, automate your lead generation workflows, and run targeted B2B marketing to capture high-ticket clients.\n\n- High-Authority Web Development\n- B2B SEO & Targeted Marketing\n- CRM & Lead Gen Automation',
      isPublished: true,
      order: 5
    },
    {
      name: 'EdTech & E-Learning',
      slug: 'edtech-elearning',
      shortDescription: 'Engaging digital learning platforms, LMS integrations, and student management systems.',
      content: 'Empower educators and students with seamless digital learning experiences. We build custom Learning Management Systems (web/mobile), automate enrollments, and market your courses to a global audience.\n\n- Custom LMS Web & Mobile Apps\n- Course Marketing & SEO\n- Automated Enrollment Workflows',
      isPublished: true,
      order: 6
    },
    {
      name: 'Logistics & Supply',
      slug: 'logistics-supply',
      shortDescription: 'Streamlined operational dashboards, fleet tracking, and inventory management systems.',
      content: 'Modernize your logistics operations with custom software. We develop web portals and driver mobile apps, while heavily automating dispatch and inventory workflows to reduce overhead.\n\n- Operations Web Dashboards\n- Driver & Vendor Mobile Apps\n- Dispatch & Inventory Automation',
      isPublished: true,
      order: 7
    },
    {
      name: 'Hospitality & Travel',
      slug: 'hospitality-travel',
      shortDescription: 'Direct booking engines, property management, and immersive digital travel experiences.',
      content: 'Drive direct bookings and elevate the guest experience. We build highly visual hospitality web and mobile apps, run direct-booking ad campaigns, and automate guest communications.\n\n- Hospitality Web & Mobile Apps\n- Direct-Booking Ad Campaigns\n- Automated Guest Communications',
      isPublished: true,
      order: 8
    }
  ];

  for (const sol of extraSolutions) {
    await prisma.solution.upsert({
      where: { slug: sol.slug },
      update: {},
      create: sol,
    });
  }
  
  // E-commerce and SaaS are already in there from previous seed. Let's fix their short descriptions if needed, but they are fine.

  console.log('Database additional seeded successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
