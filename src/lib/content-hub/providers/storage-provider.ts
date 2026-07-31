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

export class DiskStorageProvider implements StorageProvider {
  name = 'DiskStorageProvider';
  private baseDir: string;

  constructor(baseDir: string = '.cache/storage') {
    this.baseDir = path.resolve(baseDir);
    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir, { recursive: true });
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

export class S3StorageProvider implements StorageProvider {
  name = 'S3StorageProvider';
  async put(): Promise<string> { throw new Error('S3StorageProvider not configured.'); }
  async get(): Promise<Buffer | string | null> { return null; }
  async delete(): Promise<void> {}
  async exists(): Promise<boolean> { return false; }
}

export class R2StorageProvider implements StorageProvider {
  name = 'R2StorageProvider';
  async put(): Promise<string> { throw new Error('R2StorageProvider not configured.'); }
  async get(): Promise<Buffer | string | null> { return null; }
  async delete(): Promise<void> {}
  async exists(): Promise<boolean> { return false; }
}
