import { readdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const SRC_DIR = new URL('../public/images/projects/', import.meta.url);
const MAX_WIDTH = 1600;
const QUALITY = 82;

const fmtKB = (b) => (b / 1024).toFixed(0).padStart(6) + ' KB';

const entries = await readdir(SRC_DIR);
const images = entries.filter((f) => /\.(png|jpe?g)$/i.test(f));

let totalIn = 0;
let totalOut = 0;
let converted = 0;
let skipped = 0;

console.log(`Converting ${images.length} images → WebP (max ${MAX_WIDTH}px, q${QUALITY})\n`);

for (const file of images) {
  const srcPath = join(SRC_DIR.pathname.replace(/^\//, ''), file);
  const { name } = parse(file);
  const outPath = join(SRC_DIR.pathname.replace(/^\//, ''), `${name}.webp`);

  const inSize = (await stat(srcPath)).size;

  try {
    const info = await sharp(srcPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(outPath);

    const outSize = info.size;
    totalIn += inSize;
    totalOut += outSize;
    converted++;
    const pct = ((1 - outSize / inSize) * 100).toFixed(0);
    console.log(`  ${file.padEnd(14)} ${fmtKB(inSize)} → ${fmtKB(outSize)}  (-${pct}%)`);
  } catch (err) {
    skipped++;
    console.log(`  ${file.padEnd(14)} SKIPPED: ${err.message}`);
  }
}

console.log(`\nDone. ${converted} converted, ${skipped} skipped.`);
console.log(`Total: ${fmtKB(totalIn)} → ${fmtKB(totalOut)}  (saved ${fmtKB(totalIn - totalOut)}, -${((1 - totalOut / totalIn) * 100).toFixed(0)}%)`);
console.log(`\nOriginals were NOT deleted. Verify the .webp files, then delete the originals manually.`);
