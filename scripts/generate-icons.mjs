import sharp from 'sharp';
import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&amp;display=swap');
    </style>
  </defs>

  <!-- Fond cardinal -->
  <rect width="512" height="512" fill="#8B1A1A" rx="64"/>

  <!-- Cadre or extérieur -->
  <rect x="20" y="20" width="472" height="472" fill="none" stroke="#C9A84C" stroke-width="3" rx="50"/>

  <!-- Cadre or intérieur -->
  <rect x="34" y="34" width="444" height="444" fill="none" stroke="#C9A84C" stroke-width="1" rx="40"/>

  <!-- Lettre H -->
  <text
    x="256"
    y="330"
    text-anchor="middle"
    font-family="Palatino Linotype, Palatino, Book Antiqua, Georgia, serif"
    font-size="280"
    font-weight="bold"
    fill="#C9A84C"
    letter-spacing="-4"
  >H</text>

  <!-- Ligne décorative sous le H -->
  <line x1="100" y1="370" x2="412" y2="370" stroke="#C9A84C" stroke-width="1.5"/>
  <!-- petits ornements sur la ligne -->
  <polygon points="100,370 108,366 108,374" fill="#C9A84C"/>
  <polygon points="412,370 404,366 404,374" fill="#C9A84C"/>
  <circle cx="256" cy="370" r="3" fill="#C9A84C"/>
  <circle cx="200" cy="370" r="2" fill="#C9A84C"/>
  <circle cx="312" cy="370" r="2" fill="#C9A84C"/>

  <!-- Texte HOMÉLIA en bas -->
  <text
    x="256"
    y="430"
    text-anchor="middle"
    font-family="Palatino Linotype, Palatino, Book Antiqua, Georgia, serif"
    font-size="38"
    font-weight="normal"
    fill="#C9A84C"
    letter-spacing="10"
  >HOMÉLIA</text>
</svg>
`;

const svgBuffer = Buffer.from(svg);

// 512x512 (manifest + splash)
await sharp(svgBuffer)
  .resize(512, 512)
  .png()
  .toFile(path.join(publicDir, 'icon-512.png'));
console.log('✓ icon-512.png');

// 192x192 (manifest Android)
await sharp(svgBuffer)
  .resize(192, 192)
  .png()
  .toFile(path.join(publicDir, 'icon-192.png'));
console.log('✓ icon-192.png');

// 180x180 (apple-touch-icon)
await sharp(svgBuffer)
  .resize(180, 180)
  .png()
  .toFile(path.join(publicDir, 'apple-touch-icon.png'));
console.log('✓ apple-touch-icon.png');

// favicon 32x32
await sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toFile(path.join(publicDir, 'favicon.ico'));
console.log('✓ favicon.ico');

console.log('\nTous les icônes générés dans public/');
