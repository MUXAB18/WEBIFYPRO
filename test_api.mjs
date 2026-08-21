import 'dotenv/config';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_webify_pro_99121';
const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });

async function run() {
  console.log("Fetching pages to get the 'home' page...");
  const res = await fetch('http://localhost:3000/api/cms/pages', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  if (!res.ok) {
    console.error("Failed to fetch pages", await res.text());
    return;
  }
  
  const pages = await res.json();
  const homePage = pages.find(p => p.slug === 'solutions');
  
  if (!homePage) {
    console.error("Solutions page not found");
    return;
  }
  
  console.log("Attempting to save solutions page...");
  
  const sectionsToSave = homePage.sections.map((s, i) => ({ ...s, order: i }));
  sectionsToSave.push({
    type: 'PROCESS',
    content: '{\n  "title": "Test Title"\n}',
    order: sectionsToSave.length
  });
  
  const body = {
    id: homePage.id,
    title: homePage.title,
    slug: homePage.slug,
    content: homePage.content,
    metaTitle: homePage.metaTitle,
    metaDescription: homePage.metaDescription,
    isPublished: homePage.isPublished,
    sections: sectionsToSave
  };

  const putRes = await fetch('http://localhost:3000/api/cms/pages', {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify(body)
  });
  
  if (!putRes.ok) {
    console.error("Failed to save page", putRes.status, putRes.statusText);
    const errText = await putRes.text();
    console.error("Error response:", errText);
  } else {
    console.log("Save successful!");
    const data = await putRes.json();
    console.log("Response data:", data);
  }
}

run().catch(console.error);
