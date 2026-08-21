import prisma from './lib/prisma';

async function main() {
  console.log('Seeding CMS data...');

  // 1. Navigation Items
  const navLinks = [
    { label: 'Home', url: '/', order: 1 },
    { label: 'Services', url: '/services', order: 2 },
    { label: 'Solutions', url: '/solutions', order: 3 },
    { label: 'About', url: '/about', order: 4 },
    { label: 'Blog', url: '/blog', order: 5 },
    { label: 'Contact', url: '/contact', order: 6 },
  ];

  for (const link of navLinks) {
    const exists = await prisma.navigationItem.findFirst({ where: { url: link.url } });
    if (!exists) {
      await prisma.navigationItem.create({ data: link });
      console.log(`Created Nav: ${link.label}`);
    }
  }

  // 2. Website Settings
  const settings = await prisma.websiteSettings.findFirst();
  if (!settings) {
    await prisma.websiteSettings.create({
      data: {
        websiteName: 'Webify Pro',
        logoUrl: '/webifylogo-new-withname.png',
        contactEmail: 'contact@webifypro.com',
        contactPhone: '+1 234 567 8900',
        seoTitle: 'Webify Pro | Premium Digital Agency',
        seoDescription: 'We build modern websites and digital experiences.'
      }
    });
    console.log('Created Website Settings');
  }

  // 3. Admin User
  const adminExists = await prisma.user.findUnique({ where: { email: 'admin@webify.pro' } });
  if (!adminExists) {
    await prisma.user.create({
      data: {
        email: 'admin@webify.pro',
        name: 'Super Admin',
        role: 'SUPER_ADMIN'
      }
    });
    console.log('Created Admin User');
  }

  console.log('Seeding completed.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
