const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const page = await prisma.page.findUnique({
    where: { slug: 'solutions' },
    include: { sections: true }
  });

  if (!page) {
    console.log("Solutions page not found");
    return;
  }

  console.log("Current sections:", page.sections.map(s => s.type));

  const servicesList = page.sections.find(s => s.type === 'SERVICES_LIST');
  if (servicesList) {
    await prisma.pageSection.delete({
      where: { id: servicesList.id }
    });
    console.log("Deleted SERVICES_LIST from Solutions page");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
