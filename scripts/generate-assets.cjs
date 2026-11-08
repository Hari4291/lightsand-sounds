const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'images', 'gallery');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function createSVG(title, subtitle, iconContent, bgColors = ['#111625', '#080a10'], accentColor = '#d4af37') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgColors[0]}"/>
      <stop offset="100%" stop-color="${bgColors[1]}"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#faecc1"/>
      <stop offset="50%" stop-color="${accentColor}"/>
      <stop offset="100%" stop-color="#8c6a1e"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="45%" r="50%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="${accentColor}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="cardOverlay" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(10,13,20,0)"/>
      <stop offset="70%" stop-color="rgba(10,13,20,0.6)"/>
      <stop offset="100%" stop-color="rgba(10,13,20,0.95)"/>
    </linearGradient>
  </defs>

  <rect width="800" height="600" fill="url(#bg)"/>
  <rect width="800" height="600" fill="url(#glow)"/>

  <!-- Decorative subtle background grid -->
  <g stroke="rgba(255,255,255,0.03)" stroke-width="1">
    <line x1="0" y1="150" x2="800" y2="150"/>
    <line x1="0" y1="300" x2="800" y2="300"/>
    <line x1="0" y1="450" x2="800" y2="450"/>
    <line x1="200" y1="0" x2="200" y2="600"/>
    <line x1="400" y1="0" x2="400" y2="600"/>
    <line x1="600" y1="0" x2="600" y2="600"/>
  </g>

  <!-- Central Illustrated Feature -->
  ${iconContent}

  <!-- Bottom Vignette and Meta -->
  <rect width="800" height="600" fill="url(#cardOverlay)"/>

  <!-- Gold Accent Lines -->
  <rect x="30" y="30" width="740" height="540" rx="16" fill="none" stroke="url(#gold)" stroke-width="1" stroke-opacity="0.3"/>
  <line x1="30" y1="490" x2="770" y2="490" stroke="url(#gold)" stroke-width="1" stroke-opacity="0.4"/>

  <!-- Bottom Labels -->
  <g transform="translate(60, 530)">
    <rect x="0" y="-20" width="10" height="10" rx="2" fill="url(#gold)"/>
    <text x="22" y="-11" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="12" fill="#d4af37" letter-spacing="3">${subtitle.toUpperCase()}</text>
    <text x="0" y="20" font-family="'Playfair Display', serif" font-weight="700" font-size="28" fill="#ffffff">${title}</text>
  </g>
</svg>`;
}

// 1. DJ Services
const djSVG = createSVG(
  'DJ Services & Sound',
  'Energetic Celebration Music',
  `<g transform="translate(400, 270)">
    <!-- Turntable Platter Left -->
    <circle cx="-160" cy="0" r="100" fill="#141a27" stroke="url(#gold)" stroke-width="2"/>
    <circle cx="-160" cy="0" r="80" fill="#0d111a" stroke="rgba(212,175,55,0.4)" stroke-width="1"/>
    <circle cx="-160" cy="0" r="30" fill="url(#gold)"/>
    <!-- Turntable Platter Right -->
    <circle cx="160" cy="0" r="100" fill="#141a27" stroke="url(#gold)" stroke-width="2"/>
    <circle cx="160" cy="0" r="80" fill="#0d111a" stroke="rgba(212,175,55,0.4)" stroke-width="1"/>
    <circle cx="160" cy="0" r="30" fill="url(#gold)"/>
    <!-- Center DJ Mixer -->
    <rect x="-60" y="-80" width="120" height="160" rx="8" fill="#182030" stroke="url(#gold)" stroke-width="1.5"/>
    <!-- Equalizer LED Bars -->
    <g fill="#d4af37" opacity="0.85">
      <rect x="-40" y="-40" width="12" height="70" rx="2"/>
      <rect x="-20" y="-60" width="12" height="90" rx="2"/>
      <rect x="8" y="-50" width="12" height="80" rx="2"/>
      <rect x="28" y="-30" width="12" height="60" rx="2"/>
    </g>
    <!-- DJ Headphones Arc -->
    <path d="M-120 -80 C-120 -180 120 -180 120 -80" fill="none" stroke="url(#gold)" stroke-width="8" stroke-linecap="round"/>
    <rect x="-140" y="-90" width="35" height="50" rx="8" fill="url(#gold)"/>
    <rect x="105" y="-90" width="35" height="50" rx="8" fill="url(#gold)"/>
    <!-- Sound Waves / Lasers -->
    <path d="M-280 -60 L-340 -120 M-280 60 L-350 110 M280 -60 L340 -120 M280 60 L350 110" stroke="#f7df94" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
  </g>`,
  ['#1a152e', '#090812'],
  '#e5a93c'
);

// 2. Lighting Services
const lightingSVG = createSVG(
  'Lighting Services',
  'Atmospheric & Stage Illumination',
  `<g transform="translate(400, 260)">
    <!-- Overhead Truss -->
    <rect x="-320" y="-170" width="640" height="24" rx="4" fill="#1b2333" stroke="url(#gold)" stroke-width="1.5"/>
    <line x1="-300" y1="-170" x2="300" y2="-146" stroke="#d4af37" stroke-width="1" stroke-dasharray="8 8" opacity="0.5"/>
    <!-- Hanging Moving Heads -->
    <g fill="#1f283b" stroke="url(#gold)" stroke-width="1.5">
      <rect x="-220" y="-146" width="40" height="40" rx="6"/>
      <rect x="-70" y="-146" width="40" height="40" rx="6"/>
      <rect x="80" y="-146" width="40" height="40" rx="6"/>
      <rect x="230" y="-146" width="40" height="40" rx="6"/>
    </g>
    <!-- Light Beams Cone -->
    <polygon points="-200,-106 -360,200 -80,200" fill="#d4af37" opacity="0.16"/>
    <polygon points="-50,-106 -140,200 60,200" fill="#f7e6a7" opacity="0.22"/>
    <polygon points="100,-106 -10,200 190,200" fill="#f7e6a7" opacity="0.22"/>
    <polygon points="250,-106 130,200 370,200" fill="#d4af37" opacity="0.16"/>
    <!-- Fairy Lights Garland -->
    <path d="M-320 -100 Q-160 -40 0 -100 Q160 -40 320 -100" fill="none" stroke="#faecc1" stroke-width="1.5" stroke-dasharray="4 16" stroke-linecap="round"/>
  </g>`,
  ['#1c1a24', '#080a11'],
  '#f5c242'
);

// 3. Tent House
const tentSVG = createSVG(
  'Tent House Arrangements',
  'Royal Shamiana & Canopies',
  `<g transform="translate(400, 270)">
    <!-- Tent Peak Finial -->
    <path d="M0 -170 L20 -140 L-20 -140 Z" fill="url(#gold)"/>
    <!-- Main Tent Canopy Roof -->
    <polygon points="0,-140 -340,30 340,30" fill="#1e2638" stroke="url(#gold)" stroke-width="2"/>
    <!-- Tent Scalloped Valance / Fringe -->
    <path d="M-340 30 Q-300 60 -260 30 Q-220 60 -180 30 Q-140 60 -100 30 Q-60 60 -20 30 Q20 60 60 30 Q100 60 140 30 Q180 60 220 30 Q260 60 300 30 Q340 60 340 30" fill="none" stroke="url(#gold)" stroke-width="3"/>
    <!-- Tent Pillars -->
    <rect x="-330" y="30" width="16" height="150" fill="url(#gold)"/>
    <rect x="-110" y="30" width="12" height="150" fill="#1b2333" stroke="url(#gold)" stroke-width="1"/>
    <rect x="100" y="30" width="12" height="150" fill="#1b2333" stroke="url(#gold)" stroke-width="1"/>
    <rect x="314" y="30" width="16" height="150" fill="url(#gold)"/>
    <!-- Royal Chandelier Inside -->
    <g transform="translate(0, 70)">
      <circle cx="0" cy="0" r="16" fill="url(#gold)"/>
      <path d="M-25 15 Q0 30 25 15 M-40 25 Q0 50 40 25" fill="none" stroke="#f7e6a7" stroke-width="2"/>
      <circle cx="-25" cy="15" r="4" fill="#fff"/>
      <circle cx="25" cy="15" r="4" fill="#fff"/>
    </g>
    <!-- VIP Chairs Outline -->
    <rect x="-180" y="110" width="45" height="60" rx="4" fill="#151d2a" stroke="url(#gold)" stroke-width="1.5"/>
    <rect x="135" y="110" width="45" height="60" rx="4" fill="#151d2a" stroke="url(#gold)" stroke-width="1.5"/>
  </g>`,
  ['#141b29', '#080a0f'],
  '#dfb753'
);

// 4. Car / Driving Services
const carSVG = createSVG(
  'Car & Driving Services',
  'Event & Journey Transportation',
  `<g transform="translate(400, 275)">
    <!-- Premium Sedan Silhouette -->
    <!-- Car Body -->
    <path d="M-280 60 C-270 20 -230 10 -180 10 L-90 -50 C-60 -65 100 -65 140 -50 L220 10 C260 10 280 30 290 60 L-280 60 Z" fill="#171e2c" stroke="url(#gold)" stroke-width="2"/>
    <!-- Car Cabin Glass -->
    <path d="M-80 -40 L-150 5 L110 5 L125 -40 Z" fill="#0c1018" stroke="url(#gold)" stroke-width="1.5"/>
    <line x1="0" y1="-40" x2="0" y2="5" stroke="url(#gold)" stroke-width="2"/>
    <!-- Wheels -->
    <circle cx="-170" cy="65" r="45" fill="#0d111a" stroke="url(#gold)" stroke-width="3"/>
    <circle cx="-170" cy="65" r="20" fill="url(#gold)"/>
    <circle cx="170" cy="65" r="45" fill="#0d111a" stroke="url(#gold)" stroke-width="3"/>
    <circle cx="170" cy="65" r="20" fill="url(#gold)"/>
    <!-- Wedding Floral Bonnet Garland -->
    <path d="M120 -5 L240 25" stroke="#e86e80" stroke-width="6" stroke-linecap="round"/>
    <circle cx="160" cy="5" r="10" fill="#e86e80"/>
    <circle cx="180" cy="12" r="8" fill="#f7e6a7"/>
    <circle cx="205" cy="18" r="9" fill="#e86e80"/>
    <!-- Headlight Beam -->
    <polygon points="280,45 380,20 380,85 280,55" fill="#faecc1" opacity="0.3"/>
  </g>`,
  ['#141924', '#090c12'],
  '#c5a059'
);

// 5. Professional Sound System
const soundSVG = createSVG(
  'Professional Sound System',
  'High-Fidelity Audio Engineering',
  `<g transform="translate(400, 270)">
    <!-- Large Subwoofer Left -->
    <rect x="-240" y="-120" width="130" height="230" rx="8" fill="#151b27" stroke="url(#gold)" stroke-width="2"/>
    <circle cx="-175" cy="-55" r="40" fill="#0c1017" stroke="url(#gold)" stroke-width="2"/>
    <circle cx="-175" cy="50" r="40" fill="#0c1017" stroke="url(#gold)" stroke-width="2"/>
    <circle cx="-175" cy="-55" r="12" fill="url(#gold)"/>
    <circle cx="-175" cy="50" r="12" fill="url(#gold)"/>

    <!-- Large Subwoofer Right -->
    <rect x="110" y="-120" width="130" height="230" rx="8" fill="#151b27" stroke="url(#gold)" stroke-width="2"/>
    <circle cx="175" cy="-55" r="40" fill="#0c1017" stroke="url(#gold)" stroke-width="2"/>
    <circle cx="175" cy="50" r="40" fill="#0c1017" stroke="url(#gold)" stroke-width="2"/>
    <circle cx="175" cy="-55" r="12" fill="url(#gold)"/>
    <circle cx="175" cy="50" r="12" fill="url(#gold)"/>

    <!-- Center Stage Microphone & Mixer -->
    <g transform="translate(0, 10)">
      <!-- Wireless Mic -->
      <line x1="0" y1="90" x2="0" y2="-90" stroke="url(#gold)" stroke-width="3"/>
      <ellipse cx="0" cy="-90" rx="15" ry="22" fill="#252f44" stroke="url(#gold)" stroke-width="2"/>
      <!-- Mic Base Stand -->
      <polygon points="0,90 -40,110 40,110" fill="url(#gold)"/>
      <!-- Sound Equalizer Waves Floating -->
      <path d="M-60 -30 Q0 -70 60 -30" fill="none" stroke="#f7e6a7" stroke-width="2" stroke-dasharray="4 4"/>
      <path d="M-75 -10 Q0 -55 75 -10" fill="none" stroke="#d4af37" stroke-width="2" opacity="0.6"/>
    </g>
  </g>`,
  ['#131a28', '#07090f'],
  '#d4af37'
);

// 6. Event Decoration
const decorSVG = createSVG(
  'Event Decoration',
  'Grand Stage & Floral Craft',
  `<g transform="translate(400, 260)">
    <!-- Grand Royal Mandap Arch -->
    <path d="M-220 150 L-220 -30 C-220 -150 220 -150 220 -30 L220 150" fill="none" stroke="url(#gold)" stroke-width="4"/>
    <path d="M-200 150 L-200 -25 C-200 -130 200 -130 200 -25 L200 150" fill="none" stroke="url(#gold)" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.7"/>
    <!-- Floral Garland Wrap around arch -->
    <g fill="#e28743">
      <circle cx="-190" cy="-60" r="14" fill="#e85d75"/>
      <circle cx="-150" cy="-105" r="14" fill="#f5c242"/>
      <circle cx="-90" cy="-135" r="15" fill="#e85d75"/>
      <circle cx="0" cy="-145" r="18" fill="#f9e076"/>
      <circle cx="90" cy="-135" r="15" fill="#e85d75"/>
      <circle cx="150" cy="-105" r="14" fill="#f5c242"/>
      <circle cx="190" cy="-60" r="14" fill="#e85d75"/>
    </g>
    <!-- Royal Stage Backdrop Drapes -->
    <path d="M-180 -10 Q-100 80 -180 150" fill="none" stroke="#d4af37" stroke-width="2" opacity="0.6"/>
    <path d="M180 -10 Q100 80 180 150" fill="none" stroke="#d4af37" stroke-width="2" opacity="0.6"/>
    <!-- Royal Ceremonial Chair / Sofa -->
    <rect x="-80" y="50" width="160" height="80" rx="8" fill="#20293d" stroke="url(#gold)" stroke-width="2"/>
    <path d="M-70 50 C-70 10 70 10 70 50" fill="#1b2233" stroke="url(#gold)" stroke-width="2"/>
    <rect x="-85" y="60" width="15" height="40" rx="4" fill="url(#gold)"/>
    <rect x="70" y="60" width="15" height="40" rx="4" fill="url(#gold)"/>
  </g>`,
  ['#1a1727', '#090811'],
  '#f0ad4e'
);

fs.writeFileSync(path.join(outDir, 'dj-services.svg'), djSVG);
fs.writeFileSync(path.join(outDir, 'lighting-services.svg'), lightingSVG);
fs.writeFileSync(path.join(outDir, 'tent-house.svg'), tentSVG);
fs.writeFileSync(path.join(outDir, 'car-services.svg'), carSVG);
fs.writeFileSync(path.join(outDir, 'sound-system.svg'), soundSVG);
fs.writeFileSync(path.join(outDir, 'event-decoration.svg'), decorSVG);

// Also generate the gallery image items
fs.writeFileSync(path.join(outDir, 'gallery-dj-1.svg'), djSVG);
fs.writeFileSync(path.join(outDir, 'gallery-dj-2.svg'), djSVG);
fs.writeFileSync(path.join(outDir, 'gallery-light-1.svg'), lightingSVG);
fs.writeFileSync(path.join(outDir, 'gallery-light-2.svg'), lightingSVG);
fs.writeFileSync(path.join(outDir, 'gallery-tent-1.svg'), tentSVG);
fs.writeFileSync(path.join(outDir, 'gallery-car-1.svg'), carSVG);
fs.writeFileSync(path.join(outDir, 'gallery-sound-1.svg'), soundSVG);
fs.writeFileSync(path.join(outDir, 'gallery-decor-1.svg'), decorSVG);
fs.writeFileSync(path.join(outDir, 'gallery-decor-2.svg'), decorSVG);

console.log('Successfully generated all high-resolution event asset graphics.');
