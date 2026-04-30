import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
const svgPath = join(publicDir, "favicon.svg");
const svgBuffer = readFileSync(svgPath);

const sizes = [
  { size: 16, name: "favicon-16x16.png" },
  { size: 32, name: "favicon-32x32.png" },
  { size: 48, name: "favicon-48x48.png" },
  { size: 180, name: "apple-touch-icon.png" },
  { size: 192, name: "android-chrome-192x192.png" },
  { size: 512, name: "android-chrome-512x512.png" },
];

async function generate() {
  for (const { size, name } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(join(publicDir, name));
    console.log(`✓ ${name} (${size}×${size})`);
  }

  // Generate ICO from the 16, 32, 48 PNGs
  // ICO format: simple concatenation of PNG data with ICO header
  const ico16 = readFileSync(join(publicDir, "favicon-16x16.png"));
  const ico32 = readFileSync(join(publicDir, "favicon-32x32.png"));
  const ico48 = readFileSync(join(publicDir, "favicon-48x48.png"));

  const images = [
    { size: 16, data: ico16 },
    { size: 32, data: ico32 },
    { size: 48, data: ico48 },
  ];

  // ICO file format
  const headerSize = 6;
  const dirEntrySize = 16;
  const numImages = images.length;
  let offset = headerSize + dirEntrySize * numImages;

  // Header: reserved(2) + type(2) + count(2)
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);       // reserved
  header.writeUInt16LE(1, 2);       // type: 1 = ICO
  header.writeUInt16LE(numImages, 4);

  const dirEntries = Buffer.alloc(dirEntrySize * numImages);
  const dataBuffers = [];

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const off = i * dirEntrySize;
    dirEntries.writeUInt8(img.size === 256 ? 0 : img.size, off);      // width
    dirEntries.writeUInt8(img.size === 256 ? 0 : img.size, off + 1);  // height
    dirEntries.writeUInt8(0, off + 2);    // color palette
    dirEntries.writeUInt8(0, off + 3);    // reserved
    dirEntries.writeUInt16LE(1, off + 4); // color planes
    dirEntries.writeUInt16LE(32, off + 6); // bits per pixel
    dirEntries.writeUInt32LE(img.data.length, off + 8);  // data size
    dirEntries.writeUInt32LE(offset, off + 12);           // data offset
    offset += img.data.length;
    dataBuffers.push(img.data);
  }

  const ico = Buffer.concat([header, dirEntries, ...dataBuffers]);
  writeFileSync(join(publicDir, "favicon.ico"), ico);
  console.log("✓ favicon.ico (16+32+48)");

  console.log("\nAll favicons generated!");
}

generate().catch(console.error);
