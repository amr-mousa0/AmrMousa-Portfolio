/**
 * Sharp Image Processing & WebP Optimization Pipeline
 * ADR-023-007 Authoritative Protocol
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export async function optimizeImageBuffer(
  inputBuffer: Buffer,
  maxWidth: number = 1200,
  quality: number = 82
): Promise<Buffer> {
  try {
    return await sharp(inputBuffer)
      .resize({ width: maxWidth, fit: 'inside', withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();
  } catch (e) {
    console.warn('[ImageProcessor] Sharp optimization failed, returning original buffer:', e);
    return inputBuffer;
  }
}

export async function generateTechCoverPlaceholder(title: string, tags: string[]): Promise<string> {
  const displayTitle = title || 'Data & Analytics Solution';
  const tagList = tags && tags.length > 0 ? tags.slice(0, 3).join(' • ') : 'Data Analytics & Engineering';

  const svg = `
    <svg width="800" height="500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="50%" stop-color="#1e1b4b"/>
          <stop offset="100%" stop-color="#090d16"/>
        </linearGradient>
        <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#818cf8"/>
          <stop offset="100%" stop-color="#38bdf8"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <circle cx="700" cy="100" r="180" fill="#6366f1" opacity="0.08"/>
      <circle cx="100" cy="400" r="150" fill="#38bdf8" opacity="0.08"/>
      
      <rect x="50" y="50" width="700" height="400" rx="16" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      
      <text x="90" y="210" font-family="system-ui, sans-serif" font-size="32" font-weight="700" fill="url(#textGrad)">
        ${displayTitle.length > 35 ? displayTitle.substring(0, 35) + '...' : displayTitle}
      </text>
      
      <rect x="90" y="250" width="120" height="4" rx="2" fill="#6366f1"/>
      
      <text x="90" y="300" font-family="system-ui, sans-serif" font-size="18" font-weight="500" fill="#94a3b8">
        ${tagList}
      </text>
      
      <text x="90" y="380" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#475569" letter-spacing="1">
        AMR MOUSA DATA PORTFOLIO SHOWCASE
      </text>
    </svg>
  `;

  try {
    const webpBuffer = await sharp(Buffer.from(svg))
      .webp({ quality: 90 })
      .toBuffer();

    const fileName = `placeholder-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.webp`;
    const outDir = path.resolve('public/images/placeholders');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const filePath = path.join(outDir, fileName);
    fs.writeFileSync(filePath, webpBuffer);

    return `/images/placeholders/${fileName}`;
  } catch (e) {
    return '/images/default-project.webp';
  }
}
