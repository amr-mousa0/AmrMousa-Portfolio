/**
 * Repositories Domain Store & Legacy Migration Manager
 * ADR-023-008 Authoritative Protocol
 */
import type { RepositoryModel } from '../types';
import { getRegistry } from '../provider-registry';

const STORAGE_KEY = 'repositories.json';

interface ReposStore {
  [repoId: string]: RepositoryModel;
}

let inMemoryCache: ReposStore | null = null;

async function loadReposStore(): Promise<ReposStore> {
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

async function saveReposStore(store: ReposStore): Promise<void> {
  inMemoryCache = store;
  try {
    await getRegistry().storage.put(STORAGE_KEY, JSON.stringify(store, null, 2));
  } catch (e) {}
}

export class RepositoriesStore {
  static async get(repoId: string): Promise<RepositoryModel | null> {
    const store = await loadReposStore();
    return store[repoId] || null;
  }

  static async upsert(repoData: Partial<RepositoryModel> & { repoId: string; fullName: string }): Promise<RepositoryModel> {
    const store = await loadReposStore();
    const existing = store[repoData.repoId];

    const model: RepositoryModel = {
      id: existing?.id || `repo-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      repoId: repoData.repoId,
      owner: repoData.owner || repoData.fullName.split('/')[0] || 'amr-mousa0',
      fullName: repoData.fullName,
      defaultBranch: repoData.defaultBranch || existing?.defaultBranch || 'main',
      lastSyncAt: new Date().toISOString(),
      lastWebhookAt: repoData.lastWebhookAt || existing?.lastWebhookAt,
      lastManifestHash: repoData.lastManifestHash || existing?.lastManifestHash,
      status: repoData.status || existing?.status || 'active',
      enabled: repoData.enabled !== undefined ? repoData.enabled : (existing?.enabled ?? true),
      publishTargets: repoData.publishTargets || existing?.publishTargets || ['portfolio'],
      createdAt: existing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store[repoData.repoId] = model;
    await saveReposStore(store);
    return model;
  }

  static async listAll(): Promise<RepositoryModel[]> {
    const store = await loadReposStore();
    return Object.values(store);
  }

  /**
   * Migrate legacy .cache files to storage archive
   */
  static async migrateLegacyCacheToArchive(): Promise<void> {
    try {
      const raw = await getRegistry().storage.get('translation-cache.json');
      if (raw) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const archiveKey = `archive/${timestamp}/translation-cache-backup.json`;
        await getRegistry().storage.put(archiveKey, raw);
        console.log(`[MigrationManager] Backup of legacy cache stored at '${archiveKey}'.`);
      }
    } catch (e) {
      console.warn('[MigrationManager] Migration backup error:', e);
    }
  }
}
