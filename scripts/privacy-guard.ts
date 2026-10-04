import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const CONFIG_PATH = path.join(process.cwd(), 'data', 'privacy-config.json');

interface BlurRegion {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface PrivacyConfig {
  [imagePath: string]: BlurRegion[];
}

async function runPrivacyGuard() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.log('No privacy-config.json found. Skipping privacy guard.');
    return;
  }

  const configContent = fs.readFileSync(CONFIG_PATH, 'utf-8');
  const config: PrivacyConfig = JSON.parse(configContent);

  for (const [relativePath, regions] of Object.entries(config)) {
    // We assume the images are inside public/
    const fullPath = path.join(process.cwd(), 'public', relativePath);
    
    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️ Target image not found: ${fullPath}`);
      continue;
    }

    console.log(`🔒 Applying privacy guard to: ${relativePath}`);
    const image = sharp(fullPath);
    const metadata = await image.metadata();
    
    // We will composite blurred rectangles over the original image
    const composites = await Promise.all(regions.map(async (region) => {
      // Ensure region is within bounds
      const safeLeft = Math.max(0, region.left);
      const safeTop = Math.max(0, region.top);
      const safeWidth = Math.min(region.width, (metadata.width || 0) - safeLeft);
      const safeHeight = Math.min(region.height, (metadata.height || 0) - safeTop);

      // Extract the region, heavily blur it, and prepare for composite
      const blurredBuffer = await sharp(fullPath)
        .extract({ left: safeLeft, top: safeTop, width: safeWidth, height: safeHeight })
        .blur(15) // Heavy blur
        .toBuffer();

      return {
        input: blurredBuffer,
        top: safeTop,
        left: safeLeft,
      };
    }));

    // Output to a temporary file, then overwrite
    const tempPath = fullPath + '.temp';
    await image.composite(composites).toFile(tempPath);
    
    fs.renameSync(tempPath, fullPath);
    console.log(`✅ Privacy guard applied successfully.`);
  }
}

console.log('🛡️ Starting Privacy Guard...');
runPrivacyGuard().then(() => {
  console.log('✨ Privacy guard execution finished!');
}).catch(console.error);
