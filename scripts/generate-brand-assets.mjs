import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const logoPath = path.join(publicDir, 'sb-logo.svg');

function createIconOnlySvg(logoWidth, logoHeight) {
  const side = logoHeight;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side} ${side}" role="img" aria-labelledby="title desc">
  <title id="title">SB Digital Studios Icon</title>
  <desc id="desc">SB monogram icon cropped from the main logo.</desc>
  <image href="/sb-logo.svg" x="0" y="0" width="${logoWidth}" height="${logoHeight}" preserveAspectRatio="xMinYMin meet" />
</svg>
`;
}

function createSocialSvg(width, height) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">SB Digital Studios</title>
  <desc id="desc">Default social thumbnail using SB Digital Studios logo.</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0A0A0F" />
      <stop offset="55%" stop-color="#12121A" />
      <stop offset="100%" stop-color="#1A1A24" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)" />
  <circle cx="${Math.round(width * 0.9)}" cy="${Math.round(height * 0.12)}" r="${Math.round(height * 0.24)}" fill="#00D4AA" fill-opacity="0.14" />
  <circle cx="${Math.round(width * 0.1)}" cy="${Math.round(height * 0.96)}" r="${Math.round(height * 0.28)}" fill="#FF6B4A" fill-opacity="0.16" />
  <rect x="${Math.round(width * 0.05)}" y="${Math.round(height * 0.12)}" width="${Math.round(width * 0.9)}" height="${Math.round(height * 0.76)}" rx="32" fill="#12121A" stroke="#2A2A35" />
  <image href="/favicon.svg" x="${Math.round(width * 0.33)}" y="${Math.round(height * 0.22)}" width="${Math.round(width * 0.34)}" height="${Math.round(height * 0.56)}" preserveAspectRatio="xMidYMid meet" />
</svg>
`;
}

async function writeSvg(fileName, content) {
  await fs.writeFile(path.join(publicDir, fileName), content, 'utf8');
}

async function renderPngFromSvg(svgContent, fileName, width, height) {
  await sharp(Buffer.from(svgContent))
    .resize(width, height, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, fileName));
}

async function renderFaviconPng(iconBuffer, fileName, size) {
  const logo = await sharp(iconBuffer)
    .resize(Math.round(size * 0.82), Math.round(size * 0.58), {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: '#0a0a0f'
    }
  })
    .composite([{ input: logo, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, fileName));
}

async function renderSocialPng(logoBuffer, fileName, width, height) {
  const logo = await sharp(logoBuffer)
    .resize(Math.round(width * 0.34), Math.round(height * 0.56), {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toBuffer();

  const backgroundSvg = createSocialSvg(width, height);

  await sharp(Buffer.from(backgroundSvg))
    .composite([{ input: logo, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, fileName));
}

async function main() {
  await fs.mkdir(publicDir, { recursive: true });
  const logoSvg = await fs.readFile(logoPath, 'utf8');
  const logoBuffer = Buffer.from(logoSvg);
  const metadata = await sharp(logoBuffer).metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error('Could not read dimensions from public/sb-logo.svg');
  }

  const iconSvg = createIconOnlySvg(metadata.width, metadata.height);
  const iconBuffer = Buffer.from(iconSvg);

  await writeSvg('favicon.svg', iconSvg);
  await writeSvg('og-image.svg', createSocialSvg(1200, 630));
  await writeSvg('twitter-image.svg', createSocialSvg(1200, 600));

  await renderFaviconPng(iconBuffer, 'favicon-16x16.png', 16);
  await renderFaviconPng(iconBuffer, 'favicon-32x32.png', 32);
  await renderFaviconPng(iconBuffer, 'apple-touch-icon.png', 180);
  await renderFaviconPng(iconBuffer, 'android-chrome-192x192.png', 192);
  await renderFaviconPng(iconBuffer, 'android-chrome-512x512.png', 512);

  await renderSocialPng(iconBuffer, 'og-image.png', 1200, 630);
  await renderSocialPng(iconBuffer, 'twitter-image.png', 1200, 600);

  console.log('Brand assets generated in public/.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
