
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public/images');
const MAX_WIDTH = 1600;
const QUALITY = 80;

async function optimizeImages() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.error(`Directory not found: ${PUBLIC_DIR}`);
    return;
  }

  const files = fs.readdirSync(PUBLIC_DIR);
  const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));

  console.log(`Found ${imageFiles.length} images to optimize...`);

  for (const file of imageFiles) {
    const filePath = path.join(PUBLIC_DIR, file);
    const fileExt = path.extname(file);
    const fileName = path.basename(file, fileExt);
    const webpPath = path.join(PUBLIC_DIR, `${fileName}.webp`);

    // Skip if WebP already exists and is newer
    if (fs.existsSync(webpPath)) {
        const originalStats = fs.statSync(filePath);
        const webpStats = fs.statSync(webpPath);
        if (webpStats.mtime > originalStats.mtime) {
            console.log(`Skipping ${file} (WebP already up to date)`);
            continue;
        }
    }

    try {
      const metadata = await sharp(filePath).metadata();
      
      let pipeline = sharp(filePath);

      // Resize if too large
      if (metadata.width && metadata.width > MAX_WIDTH) {
        pipeline = pipeline.resize(MAX_WIDTH);
      }

      // Convert to WebP
      await pipeline
        .webp({ quality: QUALITY })
        .toFile(webpPath);

      const originalSize = (fs.statSync(filePath).size / 1024 / 1024).toFixed(2);
      const newSize = (fs.statSync(webpPath).size / 1024 / 1024).toFixed(2);
      
      console.log(`Optimized: ${file} (${originalSize}MB) -> ${fileName}.webp (${newSize}MB)`);

    } catch (err) {
      console.error(`Error optimizing ${file}:`, err);
    }
  }
}

optimizeImages();
