import prisma from './lib/prisma';

async function main() {
  try {
    const count = await prisma.post.count();
    console.log("Post count:", count);
  } catch (err) {
    console.error("Prisma Error:", err);
  }
}

main();
