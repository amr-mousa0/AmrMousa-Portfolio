/**
 * Normalized Project Durable Storage Manager
 * ADR-023-007 Authoritative Protocol
 * 
 * Supports Vercel KV / Redis with automatic local file-system fallback.
 */
import type { PortfolioProject } from './types';
import { getRegistry } from '../content-hub/provider-registry';

const STORAGE_KEY = 'projects.json';

export async function getProjectsFromStore(destination: string = 'portfolio'): Promise<PortfolioProject[]> {
  try {
    const raw = await getRegistry().storage.get(STORAGE_KEY);
    if (raw) {
      const content = typeof raw === 'string' ? raw : raw.toString('utf-8');
      const projects: PortfolioProject[] = JSON.parse(content);
      return projects.filter(p => {
        if (p.archived) return false;
        if (p.hasManifest === false) return false;
        if (p.id === 'landing-page' || p.repoId === 'landing-page') return false;
        if (p.problem?.includes('The organization required automated tracking and structured analytics visibility for')) return false;
        return true;
      });
    }
  } catch (e) {
    console.warn('[ProjectStore] Error reading projects from storage:', e);
  }

  return [];
}

export async function saveProjectsToStore(projects: PortfolioProject[], destination: string = 'portfolio'): Promise<void> {
  try {
    // Sort projects by priority
    projects.sort((a, b) => a.priority - b.priority);

    await getRegistry().storage.put(STORAGE_KEY, JSON.stringify(projects, null, 2));
    console.log(`[ProjectStore] Updated store for '${destination}' with ${projects.length} projects.`);
  } catch (e) {
    console.warn('[ProjectStore] Error writing to store:', e);
  }
}

export async function upsertProjectInStore(project: PortfolioProject, destination: string = 'portfolio'): Promise<void> {
  const current = await getProjectsFromStore(destination);
  const filtered = current.filter(p => {
    if (p.id === project.id) return false;
    if (project.repoId && p.repoId === project.repoId) return false;
    return true;
  });
  filtered.push(project);
  await saveProjectsToStore(filtered, destination);
}

export async function removeProjectFromStore(repoId: string, destination: string = 'portfolio'): Promise<void> {
  const current = await getProjectsFromStore(destination);
  const filtered = current.filter(p => p.id !== repoId);
  await saveProjectsToStore(filtered, destination);
}
