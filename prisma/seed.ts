import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial data...');

  // 1. Navigation Items
  await prisma.navigationItem.deleteMany({});
  
  const navItems = [
    { label: 'Home', url: '/', order: 1 },
    { label: 'Services', url: '/services', order: 2 },
    { label: 'Solutions', url: '/solutions', order: 3 },
    { label: 'About', url: '/about', order: 4 },
    { label: 'Blog', url: '/blog', order: 5 },
    { label: 'Contact', url: '/contact', order: 6 },
  ];

  for (const item of navItems) {
    await prisma.navigationItem.create({ data: item });
  }

  // 2. Services
  await prisma.service.deleteMany({});
  const services = [
    {
      name: 'Web Development',
      slug: 'web-development',
      shortDescription: 'Custom high-performance websites built with React, Node.js, and the full MERN stack.',
      content: 'Custom high-performance websites built with React, Node.js, and the full MERN stack. Java-powered backends, blazing-fast frontends.\n\n- Pixel-Perfect UI that Converts\n- Lightning Fast (LCP < 1.5s) for SEO\n- Fully Scalable Backend Architecture',
      icon: 'Code2',
      isPublished: true,
      order: 1
    },
    {
      name: 'Digital Marketing',
      slug: 'digital-marketing',
      shortDescription: 'Meta Ads, Facebook Page growth, and comprehensive digital strategies.',
      content: 'Meta Ads, Facebook Page growth, and comprehensive digital strategies to boost your online presence and ROI.\n\n- Guaranteed Lead Generation Workflows\n- Massive ROAS on Meta Ad Campaigns\n- Data-Backed Competitor Targeting',
      icon: 'Megaphone',
      isPublished: true,
      order: 2
    },
    {
      name: 'Mobile Application',
      slug: 'mobile-application',
      shortDescription: 'Performance-driven cross-platform mobile apps built with Flutter.',
      content: 'Performance-driven cross-platform mobile apps built with Flutter for both iOS and Android — concept to App Store.\n\n- Premium Native iOS & Android UI\n- Offline Capabilities & Background Sync\n- Push Notifications to Drive Engagement',
      icon: 'Smartphone',
      isPublished: true,
      order: 3
    },
    {
      name: 'Social Media Management',
      slug: 'social-media-management',
      shortDescription: 'Building and managing your brand presence across all major platforms.',
      content: 'Building and managing your brand presence across all major social media platforms with data-driven content strategies.\n\n- Viral-Engineered Short Form Content\n- Consistent Omnichannel Brand Voice\n- Active Community Management',
      icon: 'Cpu',
      isPublished: true,
      order: 4
    }
  ];

  for (const service of services) {
    await prisma.service.create({ data: service });
  }

  // 3. Solutions
  await prisma.solution.deleteMany({});
  const solutions = [
    {
      name: 'E-Commerce Platform',
      slug: 'e-commerce-platform',
      shortDescription: 'Scalable online stores with seamless payment integration.',
      content: 'Custom e-commerce platforms designed to maximize conversions and simplify inventory management.',
      isPublished: true,
      order: 1
    },
    {
      name: 'SaaS Architecture',
      slug: 'saas-architecture',
      shortDescription: 'Multi-tenant cloud applications for your next big idea.',
      content: 'Robust SaaS applications with subscription billing, user management, and cloud scalability.',
      isPublished: true,
      order: 2
    }
  ];

  for (const solution of solutions) {
    await prisma.solution.create({ data: solution });
  }

  // 4. Basic Pages
  await prisma.page.deleteMany({});
  const pages = [
    {
      title: 'Home',
      slug: 'home',
      isPublished: true,
    },
    {
      title: 'About Us',
      slug: 'about',
      isPublished: true,
    },
    {
      title: 'Contact Us',
      slug: 'contact',
      isPublished: true,
    }
  ];

  for (const page of pages) {
    await prisma.page.create({ data: page });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
