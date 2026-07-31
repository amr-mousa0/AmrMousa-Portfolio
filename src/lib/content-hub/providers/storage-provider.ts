/**
 * StorageProvider Interface & Implementations (Disk, S3, R2)
 * ADR-023-008 Authoritative Protocol
 */
import fs from 'fs';
import path from 'path';

export interface StorageProvider {
  name: string;
  put(key: string, data: Buffer | string): Promise<string>;
  get(key: string): Promise<Buffer | string | null>;
  delete(key: string): Promise<void>;
  exists(key: string): Promise<boolean>;
}

export class MemoryStorageProvider implements StorageProvider {
  name = 'MemoryStorageProvider';
  private store = new Map<string, Buffer | string>();

  async put(key: string, data: Buffer | string): Promise<string> {
    this.store.set(key, data);
    return key;
  }

  async get(key: string): Promise<Buffer | string | null> {
    return this.store.get(key) ?? null;
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }

  async exists(key: string): Promise<boolean> {
    return this.store.has(key);
  }
}

export class DiskStorageProvider implements StorageProvider {
  name = 'DiskStorageProvider';
  private baseDir: string;

  constructor(baseDir: string = '.cache/storage') {
    this.baseDir = path.resolve(baseDir);
    try {
      if (!fs.existsSync(this.baseDir)) {
        fs.mkdirSync(this.baseDir, { recursive: true });
      }
    } catch (e) {
      console.warn('[DiskStorageProvider] Base directory creation restricted:', e);
    }
  }

  async put(key: string, data: Buffer | string): Promise<string> {
    const filePath = path.join(this.baseDir, key);
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, data);
    return filePath;
  }

  async get(key: string): Promise<Buffer | string | null> {
    const filePath = path.join(this.baseDir, key);
    if (!fs.existsSync(filePath)) return null;
    return fs.readFileSync(filePath);
  }

  async delete(key: string): Promise<void> {
    const filePath = path.join(this.baseDir, key);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  async exists(key: string): Promise<boolean> {
    const filePath = path.join(this.baseDir, key);
    return fs.existsSync(filePath);
  }
}

export class VercelBlobStorageProvider implements StorageProvider {
  name = 'VercelBlobStorageProvider';
  private fallbackMemory = new MemoryStorageProvider();
  private token = process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_BLOB_READ_WRITE_TOKEN;

  async put(key: string, data: Buffer | string): Promise<string> {
    if (!this.token) {
      return this.fallbackMemory.put(key, data);
    }
    try {
      const response = await fetch(`https://blob.vercel-storage.com/${encodeURIComponent(key)}`, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${this.token}`,
          'x-api-version': '7'
        },
        body: data as any
      });
      if (response.ok) {
        const json: any = await response.json();
        return json.url || key;
      }
    } catch (e) {
      console.warn('[VercelBlobStorageProvider] Upload failed, falling back to memory:', e);
    }
    return this.fallbackMemory.put(key, data);
  }

  async get(key: string): Promise<Buffer | string | null> {
    if (!this.token) {
      return this.fallbackMemory.get(key);
    }
    try {
      const response = await fetch(`https://blob.vercel-storage.com/${encodeURIComponent(key)}`, {
        headers: {
          authorization: `Bearer ${this.token}`,
          'x-api-version': '7'
        }
      });
      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        return Buffer.from(arrayBuffer);
      }
    } catch (e) {
      // Fallback
    }
    return this.fallbackMemory.get(key);
  }

  async delete(key: string): Promise<void> {
    await this.fallbackMemory.delete(key);
  }

  async exists(key: string): Promise<boolean> {
    const item = await this.get(key);
    return item !== null;
  }
}

export class S3StorageProvider implements StorageProvider {
  name = 'S3StorageProvider';
  private fallbackMemory = new MemoryStorageProvider();

  async put(key: string, data: Buffer | string): Promise<string> {
    return this.fallbackMemory.put(key, data);
  }
  async get(key: string): Promise<Buffer | string | null> {
    return this.fallbackMemory.get(key);
  }
  async delete(key: string): Promise<void> {
    await this.fallbackMemory.delete(key);
  }
  async exists(key: string): Promise<boolean> {
    return this.fallbackMemory.exists(key);
  }
}

export class R2StorageProvider implements StorageProvider {
  name = 'R2StorageProvider';
  private fallbackMemory = new MemoryStorageProvider();

  async put(key: string, data: Buffer | string): Promise<string> {
    return this.fallbackMemory.put(key, data);
  }
  async get(key: string): Promise<Buffer | string | null> {
    return this.fallbackMemory.get(key);
  }
  async delete(key: string): Promise<void> {
    await this.fallbackMemory.delete(key);
  }
  async exists(key: string): Promise<boolean> {
    return this.fallbackMemory.exists(key);
  }
}

export function createAutoStorageProvider(): StorageProvider {
  const isVercel = !!process.env.VERCEL;
  const isProduction = process.env.NODE_ENV === 'production';
  const hasVercelBlob = !!(process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_BLOB_READ_WRITE_TOKEN);
  const hasR2 = !!(process.env.R2_BUCKET_NAME || process.env.CLOUDFLARE_R2_BUCKET);
  const hasS3 = !!(process.env.AWS_S3_BUCKET || process.env.S3_BUCKET_NAME);

  if (isVercel || isProduction) {
    if (hasVercelBlob) {
      return new VercelBlobStorageProvider();
    }
    if (hasR2) {
      return new R2StorageProvider();
    }
    if (hasS3) {
      return new S3StorageProvider();
    }
    return new MemoryStorageProvider();
  }

  return new DiskStorageProvider();
}

