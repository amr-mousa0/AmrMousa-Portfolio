/**
 * AssetProcessor Interface & Sharp Implementation
 * ADR-023-008 Authoritative Protocol
 */
import sharp from 'sharp';
import crypto from 'crypto';
import { getRegistry } from '../provider-registry';

export interface ProcessedAssetMetadata {
  width?: number;
  height?: number;
  mimeType?: string;
  sizeBytes?: number;
  hash?: string;
  blurhash?: string;
  placeholder?: string; // Tiny Base64 data URI
  optimized?: boolean;
}

export interface AssetProcessor {
  name: string;
  optimize(inputBuffer: Buffer, maxWidth?: number, quality?: number): Promise<{ buffer: Buffer; metadata: ProcessedAssetMetadata }>;
  generatePlaceholderCover(title: string, tags: string[]): Promise<{ buffer: Buffer; url: string }>;
}

export class SharpProcessor implements AssetProcessor {
  name = 'SharpProcessor';

  async optimize(
    inputBuffer: Buffer,
    maxWidth: number = 1200,
    quality: number = 82
  ): Promise<{ buffer: Buffer; metadata: ProcessedAssetMetadata }> {
    try {
      const image = sharp(inputBuffer);
      const meta = await image.metadata();

      const optimizedBuffer = await image
        .resize({ width: maxWidth, fit: 'inside', withoutEnlargement: true })
        .webp({ quality })
        .toBuffer();

      const optimizedMeta = await sharp(optimizedBuffer).metadata();
      const contentHash = crypto.createHash('sha256').update(optimizedBuffer).digest('hex');

      // Generate tiny Base64 placeholder
      const tinyBuffer = await sharp(optimizedBuffer)
        .resize(20)
        .blur()
        .webp({ quality: 20 })
        .toBuffer();
      const placeholderUri = `data:image/webp;base64,${tinyBuffer.toString('base64')}`;

      return {
        buffer: optimizedBuffer,
        metadata: {
          width: optimizedMeta.width || meta.width,
          height: optimizedMeta.height || meta.height,
          mimeType: 'image/webp',
          sizeBytes: optimizedBuffer.length,
          hash: contentHash,
          placeholder: placeholderUri,
          optimized: true
        }
      };
    } catch (e) {
      console.warn('[SharpProcessor] Optimization failed, returning original buffer:', e);
      return {
        buffer: inputBuffer,
        metadata: {
          sizeBytes: inputBuffer.length,
          hash: crypto.createHash('sha256').update(inputBuffer).digest('hex'),
          optimized: false
        }
      };
    }
  }

  async generatePlaceholderCover(title: string, tags: string[]): Promise<{ buffer: Buffer; url: string }> {
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
          AMR MOUSA DATA CONTENT HUB
        </text>
      </svg>
    `;

    const webpBuffer = await sharp(Buffer.from(svg)).webp({ quality: 90 }).toBuffer();
    const fileName = `placeholder-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.webp`;
    const storageKey = `placeholders/${fileName}`;

    let storedUrl = `/images/placeholders/${fileName}`;
    try {
      storedUrl = await getRegistry().storage.put(storageKey, webpBuffer);
    } catch (e) {
      console.warn('[SharpProcessor] Storage put failed for placeholder:', e);
    }

    return {
      buffer: webpBuffer,
      url: storedUrl || `/images/placeholders/${fileName}`
    };
  }
}
