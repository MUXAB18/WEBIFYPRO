import prisma from './lib/prisma';
import { blogPosts } from './lib/blogData.js';

async function main() {
  console.log('Seeding blog posts from static data...');
  
  let added = 0;
  for (const post of blogPosts) {
    // Check if it already exists
    const existing = await prisma.post.findUnique({
      where: { slug: post.slug }
    });
    
    if (!existing) {
      await prisma.post.create({
        data: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          category: post.category,
          published: true, // Assuming existing ones are published
        }
      });
      added++;
    }
  }
  
  console.log(`Seeded ${added} new blog posts.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
