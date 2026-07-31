/**
 * GitHub Repository Single O(1) Trees API Fetcher
 * ADR-023-007 Authoritative Protocol
 */
import type { RepoTreeEntry } from './types';

export async function fetchRepoTree(fullName: string, branch: string = 'main'): Promise<RepoTreeEntry[]> {
  try {
    const url = `https://api.github.com/repos/${fullName}/git/trees/${branch}?recursive=1`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'AmrMousa-ContentSync-Engine/7.0',
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
    console.warn(`[RepoTreeFetcher] Error fetching tree for ${fullName}:`, e);
  }

  return [];
}

export async function fetchReadmeContent(fullName: string, branch: string = 'main'): Promise<string | null> {
  try {
    const url = `https://raw.githubusercontent.com/${fullName}/${branch}/README.md`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'AmrMousa-ContentSync-Engine/7.0'
      }
    });
    if (res.ok) {
      return await res.text();
    }
  } catch (e) {}
  return null;
}
