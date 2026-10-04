import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PROOF_DIR = path.join(process.cwd(), 'public', 'proof');
const MAX_WIDTH = 1920;
const QUALITY = 80;

async function processDirectory(directory: string) {
  if (!fs.existsSync(directory)) {
    console.log(`Directory not found: ${directory}`);
    return;
  }

  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      // Look for images that are not yet optimized
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const outPath = fullPath.replace(new RegExp(`${ext}$`, 'i'), '.webp');
        
        console.log(`Optimizing: ${fullPath} -> ${outPath}`);
        try {
          await sharp(fullPath, { failOn: 'none' })
            .resize({ width: MAX_WIDTH, withoutEnlargement: true })
            .webp({ quality: QUALITY, effort: 6 }) // high effort compression
            .toFile(outPath);
            
          console.log(`✅ Success. Deleting original: ${entry.name}`);
          fs.unlinkSync(fullPath); // Delete the original raw file
        } catch (error) {
          console.error(`❌ Failed to process ${entry.name}:`, error);
        }
      }
    }
  }
}

console.log('🚀 Starting image optimization process...');
processDirectory(PROOF_DIR).then(() => {
  console.log('✨ All images optimized successfully!');
});
