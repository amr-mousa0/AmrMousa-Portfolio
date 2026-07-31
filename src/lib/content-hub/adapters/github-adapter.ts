/**
 * GitHub ContentSourceAdapter Implementation
 * ADR-023-008 Authoritative Protocol
 */
import type { ContentSourceAdapter } from './content-source-adapter';
import type { RepositoryManifest, RepoTreeEntry } from '../types';

export class GitHubAdapter implements ContentSourceAdapter {
  name = 'GitHubAdapter';

  async fetchManifest(repoFullName: string, branch: string = 'main'): Promise<{ manifest: RepositoryManifest | null; raw: string }> {
    const manifestUrl = `https://raw.githubusercontent.com/${repoFullName}/${branch}/manifest.json?t=${Date.now()}`;
    try {
      const res = await fetch(manifestUrl, {
        headers: {
          'User-Agent': 'AmrMousa-ContentHub/8.0',
          'Cache-Control': 'no-cache'
        }
      });
      if (res.ok) {
        const raw = await res.text();
        const manifest = JSON.parse(raw);
        return { manifest, raw };
      }
    } catch (e) {}

    return { manifest: null, raw: '' };
  }

  async fetchTree(repoFullName: string, branch: string = 'main'): Promise<RepoTreeEntry[]> {
    try {
      const url = `https://api.github.com/repos/${repoFullName}/git/trees/${branch}?recursive=1`;
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'AmrMousa-ContentHub/8.0',
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.tree)) {
          return data.tree as RepoTreeEntry[];
        }
      }
    } catch (e) {
      console.warn(`[GitHubAdapter] Error fetching tree for ${repoFullName}:`, e);
    }

    return [];
  }

  async fetchFileContent(repoFullName: string, branch: string = 'main', filePath: string): Promise<string | null> {
    try {
      const url = `https://raw.githubusercontent.com/${repoFullName}/${branch}/${filePath.replace(/^\.\//, '')}`;
      const res = await fetch(url, {
        headers: { 'User-Agent': 'AmrMousa-ContentHub/8.0' }
      });
      if (res.ok) {
        return await res.text();
      }
    } catch (e) {}
    return null;
  }

  resolveAssetUrl(repoFullName: string, branch: string = 'main', relativePath: string): string {
    if (!relativePath) return '/images/default-project.webp';
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
      return relativePath;
    }
    const cleanPath = relativePath.replace(/^\.\//, '');
    return `https://raw.githubusercontent.com/${repoFullName}/${branch}/${cleanPath}`;
  }
}
