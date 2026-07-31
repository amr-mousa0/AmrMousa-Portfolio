/**
 * Normalized Project Durable Storage Manager
 * ADR-023-007 Authoritative Protocol
 * 
 * Supports Vercel KV / Redis with automatic local file-system fallback.
 */
import type { PortfolioProject } from './types';
import { getRegistry } from '../content-hub/provider-registry';
import initialProjects from '../../data/projects.json';

const STORAGE_KEY = 'projects.json';

export async function getProjectsFromStore(destination: string = 'portfolio'): Promise<PortfolioProject[]> {
  try {
    const raw = await getRegistry().storage.get(STORAGE_KEY);
    if (raw) {
      const content = typeof raw === 'string' ? raw : raw.toString('utf-8');
      const projects: PortfolioProject[] = JSON.parse(content);
      return projects.filter(p => !p.archived);
    }
  } catch (e) {
    console.warn('[ProjectStore] Error reading projects from storage:', e);
  }

  // Fallback to static bundled projects list
  return (initialProjects as PortfolioProject[]).filter(p => !p.archived);
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
  const idx = current.findIndex(p => p.id === project.id);
  if (idx >= 0) {
    current[idx] = project;
  } else {
    current.push(project);
  }
  await saveProjectsToStore(current, destination);
}

export async function removeProjectFromStore(repoId: string, destination: string = 'portfolio'): Promise<void> {
  const current = await getProjectsFromStore(destination);
  const filtered = current.filter(p => p.id !== repoId);
  await saveProjectsToStore(filtered, destination);
}
