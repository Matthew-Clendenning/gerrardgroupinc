import sharp from "sharp";
import fs from "fs";
import path from "path";

const IMG_DIR = "./public/images";
const MAX_WIDTH = 1200;
const WEBP_QUALITY = 78;

const files = fs.readdirSync(IMG_DIR);
const imageFiles = files.filter((f) =>
  /\.(jpe?g|png|JPG|JPEG|PNG)$/i.test(f)
);

let totalBefore = 0;
let totalAfter = 0;

for (const file of imageFiles) {
  const inputPath = path.join(IMG_DIR, file);
  const ext = path.extname(file);
  const baseName = path.basename(file, ext);
  const outputPath = path.join(IMG_DIR, `${baseName}.webp`);

  const beforeSize = fs.statSync(inputPath).size;
  totalBefore += beforeSize;

  try {
    const metadata = await sharp(inputPath).metadata();
    let pipeline = sharp(inputPath);

    // Resize if wider than MAX_WIDTH
    if (metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }

    await pipeline
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputPath);

    const afterSize = fs.statSync(outputPath).size;
    totalAfter += afterSize;

    const savings = (((beforeSize - afterSize) / beforeSize) * 100).toFixed(1);
    console.log(
      `${file} → ${baseName}.webp | ${(beforeSize / 1024).toFixed(0)}KB → ${(afterSize / 1024).toFixed(0)}KB (${savings}% smaller)`
    );

    // Remove original after successful conversion
    fs.unlinkSync(inputPath);
  } catch (err) {
    console.error(`FAILED: ${file} — ${err.message}`);
  }
}

console.log(
  `\nDone! ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB total (${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}% reduction)`
);
