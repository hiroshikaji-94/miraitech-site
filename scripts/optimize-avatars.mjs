/**
 * Convert team avatars in public/images/team to square, face-centred WebP.
 * Usage: node scripts/optimize-avatars.mjs
 *
 * Input:  any .png / .jpg / .jpeg / .avif / .webp in public/images/team
 * Output: <kebab-case-name>.webp (SIZE x SIZE) next to the source
 */
import { readdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const SRC_DIR = fileURLToPath(new URL('../public/images/team/', import.meta.url));
const SIZE = 640;
const QUALITY = 84;

const fmtKB = (b) => (b / 1024).toFixed(0).padStart(6) + ' KB';
const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const entries = await readdir(SRC_DIR);
const images = entries.filter((f) => /\.(png|jpe?g|avif|webp)$/i.test(f) && !/-avatar\.webp$/i.test(f));

console.log(`Converting ${images.length} avatars → ${SIZE}×${SIZE} WebP (q${QUALITY})\n`);

for (const file of images) {
  const srcPath = join(SRC_DIR, file);
  const { name } = parse(file);
  const outPath = join(SRC_DIR, `${kebab(name)}-avatar.webp`);
  const inSize = (await stat(srcPath)).size;

  try {
    const info = await sharp(srcPath)
      .resize({ width: SIZE, height: SIZE, fit: 'cover', position: 'attention' })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(outPath);
    console.log(`  ${file.padEnd(26)} ${fmtKB(inSize)} → ${fmtKB(info.size)}  ${parse(outPath).base}`);
  } catch (err) {
    console.error(`  ${file}: ${err.message}`);
  }
}
