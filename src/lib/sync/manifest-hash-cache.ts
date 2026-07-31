/**
 * SHA-256 Manifest Hash Deduplication Cache
 * ADR-023-007 Authoritative Protocol
 */
import crypto from 'crypto';
import { getRegistry } from '../content-hub/provider-registry';

const STORAGE_KEY = 'manifest-hashes.json';

interface HashCache {
  [repoId: string]: string;
}

let inMemoryCache: HashCache | null = null;

async function loadHashCache(): Promise<HashCache> {
  if (inMemoryCache) return inMemoryCache;
  try {
    const raw = await getRegistry().storage.get(STORAGE_KEY);
    if (raw) {
      const content = typeof raw === 'string' ? raw : raw.toString('utf-8');
      inMemoryCache = JSON.parse(content);
      return inMemoryCache!;
    }
  } catch (e) {}
  inMemoryCache = {};
  return inMemoryCache;
}

async function saveHashCache(cache: HashCache): Promise<void> {
  inMemoryCache = cache;
  try {
    await getRegistry().storage.put(STORAGE_KEY, JSON.stringify(cache, null, 2));
  } catch (e) {}
}

export function computeHash(content: string): string {
  return crypto.createHash('sha256').update(content || '').digest('hex');
}

export async function hasManifestChanged(repoId: string, rawContent: string): Promise<boolean> {
  const cache = await loadHashCache();
  const newHash = computeHash(rawContent);
  return cache[repoId] !== newHash;
}

export async function recordManifestHash(repoId: string, rawContent: string): Promise<void> {
  const cache = await loadHashCache();
  cache[repoId] = computeHash(rawContent);
  await saveHashCache(cache);
}

export async function removeManifestHash(repoId: string): Promise<void> {
  const cache = await loadHashCache();
  delete cache[repoId];
  await saveHashCache(cache);
}
