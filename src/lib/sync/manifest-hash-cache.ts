/**
 * SHA-256 Manifest Hash Deduplication Cache
 * ADR-023-007 Authoritative Protocol
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const HASH_CACHE_PATH = path.resolve('.cache/manifest-hashes.json');

interface HashCache {
  [repoId: string]: string;
}

function loadHashCache(): HashCache {
  try {
    if (fs.existsSync(HASH_CACHE_PATH)) {
      return JSON.parse(fs.readFileSync(HASH_CACHE_PATH, 'utf-8'));
    }
  } catch (e) {}
  return {};
}

function saveHashCache(cache: HashCache) {
  try {
    const dir = path.dirname(HASH_CACHE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(HASH_CACHE_PATH, JSON.stringify(cache, null, 2));
  } catch (e) {}
}

export function computeHash(content: string): string {
  return crypto.createHash('sha256').update(content || '').digest('hex');
}

export function hasManifestChanged(repoId: string, rawContent: string): boolean {
  const cache = loadHashCache();
  const newHash = computeHash(rawContent);
  return cache[repoId] !== newHash;
}

export function recordManifestHash(repoId: string, rawContent: string): void {
  const cache = loadHashCache();
  cache[repoId] = computeHash(rawContent);
  saveHashCache(cache);
}

export function removeManifestHash(repoId: string): void {
  const cache = loadHashCache();
  delete cache[repoId];
  saveHashCache(cache);
}
