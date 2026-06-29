/**
 * convert-to-webp.mjs
 * Converts all JPEG/PNG images in public/images to WebP (quality 82).
 * Originals are preserved as fallbacks for <picture> elements.
 */

import { execSync } from 'child_process';
import { readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const imagesDir = join(__dirname, '..', 'public', 'images');

const QUALITY = 82;
const EXTS = new Set(['.jpg', '.jpeg', '.png']);

const files = readdirSync(imagesDir).filter(f => EXTS.has(extname(f).toLowerCase()));

console.log(`\nConverting ${files.length} image(s) to WebP (quality ${QUALITY})...\n`);

for (const file of files) {
  const input = join(imagesDir, file);
  const output = join(imagesDir, basename(file, extname(file)) + '.webp');
  const before = statSync(input).size;

  try {
    execSync(
      `npx sharp-cli --input "${input}" --output "${output}" --format webp --quality ${QUALITY}`,
      { stdio: 'pipe' }
    );
    const after = statSync(output).size;
    const saving = (((before - after) / before) * 100).toFixed(1);
    const beforeKB = (before / 1024).toFixed(0);
    const afterKB = (after / 1024).toFixed(0);
    console.log(`  ✓ ${file.padEnd(38)} ${beforeKB}KB → ${afterKB}KB  (${saving}% smaller)`);
  } catch (err) {
    console.error(`  ✗ ${file}: ${err.message}`);
  }
}

console.log('\nDone! WebP files written alongside originals in public/images/\n');
