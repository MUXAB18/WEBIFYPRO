const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Pages...');

  // About Page
  let aboutPage = await prisma.page.upsert({
    where: { slug: 'about' },
    update: {},
    create: {
      title: 'About Us',
      slug: 'about',
      metaTitle: 'About Webify Pro | Our Story & Values',
      metaDescription: 'Learn about Webify Pro, our mission to change the traditional agency model, and our core principles.',
      isPublished: true,
    }
  });

  await prisma.pageSection.deleteMany({ where: { pageId: aboutPage.id } });

  await prisma.pageSection.createMany({
    data: [
      {
        pageId: aboutPage.id,
        type: 'HERO',
        order: 0,
        content: JSON.stringify({
          subtitle: 'About Webify Pro',
          title: 'We are the architects of {digital growth.}',
          titleAccentColor: '#ff6b35',
          description: 'Based in Sialkot, Pakistan, we are an elite collective of engineers, designers, and strategists. We partner with ambitious brands to build digital products that dominate markets.'
        })
      },
      {
        pageId: aboutPage.id,
        type: 'STORY',
        order: 1,
        content: JSON.stringify({
          title: 'The traditional agency model is {broken.}',
          titleAccentColor: '#ff6b35',
          paragraphs: [
            'Most agencies operate on a flawed premise: they build what you ask for, collect a check, and disappear. They focus on output, not outcomes.',
            '<strong>Webify Pro was founded to change this.</strong> We operate as an extension of your team. Before we write a single line of code or sketch a wireframe, we obsess over your business logic. Who are your customers? Where is the friction? How do we increase your Customer Lifetime Value?',
            'By combining enterprise-grade software engineering (Next.js, Node, Cloud Native) with deep marketing psychology, we build conversion engines that generate measurable ROI.'
          ]
        })
      },
      {
        pageId: aboutPage.id,
        type: 'STATS',
        order: 2,
        content: JSON.stringify({
          stats: [
            { number: "50+", label: "Projects Delivered" },
            { number: "15+", label: "Countries Served" },
            { number: "99%", label: "Client Retention" },
            { number: "24/7", label: "Global Support" }
          ]
        })
      },
      {
        pageId: aboutPage.id,
        type: 'VALUES',
        order: 3,
        content: JSON.stringify({
          title: 'Our Core Principles',
          values: [
            { icon: 'Target', title: 'Results Obsessed', description: "We don't just write code or design pretty graphics. Everything we do is meticulously engineered to drive measurable business growth and ROI." },
            { icon: 'Zap', title: 'Radical Speed', description: "In the digital world, speed wins. We leverage the latest edge-computing technologies to deliver products that perform instantaneously." },
            { icon: 'Shield', title: 'Absolute Transparency', description: "No black boxes, no technical jargon to hide behind. We communicate clearly, set realistic expectations, and deliver on our promises." },
            { icon: 'Heart', title: 'Craftsmanship', description: "We treat every project as if it were our own startup. We sweat the small details because we believe premium quality is in the micro-interactions." },
            { icon: 'Lightbulb', title: 'Continuous Innovation', description: "We stay ahead of the curve. By constantly exploring new frameworks and marketing channels, we ensure your business never falls behind the competition." },
            { icon: 'LineChart', title: 'Data-Driven Decisions', description: "We don't guess. Every design choice, marketing campaign, and technical architecture decision is backed by hard data and rigorous testing." }
          ]
        })
      },
      {
        pageId: aboutPage.id,
        type: 'CTA',
        order: 4,
        content: JSON.stringify({
          title: 'Ready to build something extraordinary?',
          description: "Let's discuss how Webify Pro can accelerate your digital growth.",
          buttonText: "Start a Project",
          buttonLink: "/contact"
        })
      }
    ]
  });


  // Contact Page
  let contactPage = await prisma.page.upsert({
    where: { slug: 'contact' },
    update: {},
    create: {
      title: 'Contact Us',
      slug: 'contact',
      metaTitle: 'Contact Us | Webify Pro',
      metaDescription: 'Get in touch with Webify Pro to discuss your next digital project.',
      isPublished: true,
    }
  });

  await prisma.pageSection.deleteMany({ where: { pageId: contactPage.id } });

  await prisma.pageSection.createMany({
    data: [
      {
        pageId: contactPage.id,
        type: 'HERO',
        order: 0,
        content: JSON.stringify({
          subtitle: 'Get In Touch',
          title: "Let's build something {amazing.}",
          titleAccentColor: '#ff6b35',
          description: "Ready to transform your digital presence? We're currently taking on new projects. Fill out the form below or reach us directly via WhatsApp."
        })
      },
      {
        pageId: contactPage.id,
        type: 'CONTACT_FORM',
        order: 1,
        content: JSON.stringify({
          hideHeader: true
        })
      }
    ]
  });

  // Services Page
  let servicesPage = await prisma.page.upsert({
    where: { slug: 'services' },
    update: {},
    create: {
      title: 'Services',
      slug: 'services',
      metaTitle: 'Services | Webify Pro',
      metaDescription: 'Everything you need to grow online. End-to-end digital solutions for performance and scalability.',
      isPublished: true,
    }
  });

  await prisma.pageSection.deleteMany({ where: { pageId: servicesPage.id } });

  await prisma.pageSection.createMany({
    data: [
      {
        pageId: servicesPage.id,
        type: 'HERO',
        order: 0,
        content: JSON.stringify({
          subtitle: 'SERVICES',
          title: 'Everything you need to {grow online.}',
          titleAccentColor: '#ff6b35',
          description: 'We provide end-to-end digital solutions designed for performance, scalability, and measurable business growth.'
        })
      },
      {
        pageId: servicesPage.id,
        type: 'SERVICES_LIST',
        order: 1,
        content: JSON.stringify({
          hideHeader: true
        })
      },
      {
        pageId: servicesPage.id,
        type: 'TECH_STACK',
        order: 2,
        content: JSON.stringify({
          subtitle: 'ENGINEERED WITH MODERN TECHNOLOGIES',
          technologies: [
            { name: 'Next.js', icon: 'Code' },
            { name: 'React', icon: 'Code' },
            { name: 'React Native', icon: 'Smartphone' },
            { name: 'Flutter', icon: 'Smartphone' },
            { name: 'TypeScript', icon: 'Code' },
            { name: 'Node.js', icon: 'Database' },
            { name: 'Tailwind CSS', icon: 'Layout' },
            { name: 'Firebase', icon: 'Cloud' },
            { name: 'PostgreSQL', icon: 'Database' },
            { name: 'MongoDB', icon: 'Database' },
            { name: 'Framer Motion', icon: 'Zap' },
            { name: 'Figma', icon: 'Layout' },
            { name: 'Shopify Plus', icon: 'ShoppingBag' }
          ]
        })
      },
      {
        pageId: servicesPage.id,
        type: 'CTA',
        order: 3,
        content: JSON.stringify({
          title: 'Ready to {scale} your business?',
          titleAccentColor: '#ff6b35',
          description: "Stop losing customers to your competitors. Let's build a digital presence that actually drives revenue.",
          buttonText: "Start Your Project",
          buttonLink: "/contact"
        })
      }
    ]
  });

  console.log('Pages seeded successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
