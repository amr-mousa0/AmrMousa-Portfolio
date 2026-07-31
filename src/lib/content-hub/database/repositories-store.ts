/**
 * Repositories Domain Store & Legacy Migration Manager
 * ADR-023-008 Authoritative Protocol
 */
import fs from 'fs';
import path from 'path';
import type { RepositoryModel } from '../types';

const REPOS_STORE_PATH = path.resolve('.cache/repositories.json');

interface ReposStore {
  [repoId: string]: RepositoryModel;
}

function loadReposStore(): ReposStore {
  try {
    if (fs.existsSync(REPOS_STORE_PATH)) {
      return JSON.parse(fs.readFileSync(REPOS_STORE_PATH, 'utf-8'));
    }
  } catch (e) {}
  return {};
}

function saveReposStore(store: ReposStore): void {
  try {
    const dir = path.dirname(REPOS_STORE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(REPOS_STORE_PATH, JSON.stringify(store, null, 2));
  } catch (e) {}
}

export class RepositoriesStore {
  static get(repoId: string): RepositoryModel | null {
    const store = loadReposStore();
    return store[repoId] || null;
  }

  static upsert(repoData: Partial<RepositoryModel> & { repoId: string; fullName: string }): RepositoryModel {
    const store = loadReposStore();
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
    saveReposStore(store);
    return model;
  }

  static listAll(): RepositoryModel[] {
    const store = loadReposStore();
    return Object.values(store);
  }

  /**
   * Migrate legacy .cache files to .archive/{timestamp}/
   */
  static migrateLegacyCacheToArchive(): void {
    const cacheDir = path.resolve('.cache');
    const legacyTranslationPath = path.join(cacheDir, 'translation-cache.json');

    if (fs.existsSync(legacyTranslationPath)) {
      try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const archiveDir = path.resolve(`.archive/${timestamp}`);
        if (!fs.existsSync(archiveDir)) fs.mkdirSync(archiveDir, { recursive: true });

        const destPath = path.join(archiveDir, 'translation-cache-backup.json');
        fs.copyFileSync(legacyTranslationPath, destPath);
        console.log(`[MigrationManager] Backup of legacy cache created at '${destPath}'.`);
      } catch (e) {
        console.warn('[MigrationManager] Migration backup error:', e);
      }
    }
  }
}
