// Generates the raster icons from the brand PNG in public/.
// Run with: npm run icons
//
// Outputs:
//   app/favicon.ico      16, 32 and 48px PNG-compressed entries (legacy browsers, Google)
//   app/apple-icon.png   180px (iOS home screen)
//   public/icon-192.png  192px (web manifest)
//
// app/icon.svg stays the primary favicon for modern browsers.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const source = path.join(root, "public", "pify-light-512.png");

/** RGBA PNG: Next's ICO decoder rejects palette or RGB entries. */
async function png(size) {
  return sharp(source)
    .resize(size, size, { kernel: "lanczos3" })
    .ensureAlpha()
    .png({ palette: false, force: true })
    .toBuffer();
}

/** ICO container holding PNG-compressed images (supported since Windows Vista and by every browser). */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  const entries = [];
  let offset = 6 + 16 * images.length;
  for (const { size, data } of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // width
    e.writeUInt8(size >= 256 ? 0 : size, 1); // height
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const icoSizes = [16, 32, 48];
const icoImages = await Promise.all(icoSizes.map(async (size) => ({ size, data: await png(size) })));
await writeFile(path.join(root, "app", "favicon.ico"), ico(icoImages));
await writeFile(path.join(root, "app", "apple-icon.png"), await png(180));
await writeFile(path.join(root, "public", "icon-192.png"), await png(192));

const meta = await sharp(source).metadata();
console.log(`source ${meta.width}x${meta.height}`);
console.log("wrote app/favicon.ico (16, 32, 48), app/apple-icon.png (180), public/icon-192.png (192)");
