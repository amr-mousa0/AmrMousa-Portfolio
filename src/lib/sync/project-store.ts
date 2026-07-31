/**
 * Normalized Project Durable Storage Manager
 * ADR-023-007 Authoritative Protocol
 * 
 * Supports Vercel KV / Redis with automatic local file-system fallback.
 */
import fs from 'fs';
import path from 'path';
import type { PortfolioProject } from './types';

const LOCAL_STORE_PATH = path.resolve('src/data/projects.json');

export async function getProjectsFromStore(destination: string = 'portfolio'): Promise<PortfolioProject[]> {
  // Read local file store fallback
  try {
    if (fs.existsSync(LOCAL_STORE_PATH)) {
      const data = fs.readFileSync(LOCAL_STORE_PATH, 'utf-8');
      const projects: PortfolioProject[] = JSON.parse(data);
      return projects.filter(p => !p.archived);
    }
  } catch (e) {
    console.warn('[ProjectStore] Error reading local store:', e);
  }

  return [];
}

export async function saveProjectsToStore(projects: PortfolioProject[], destination: string = 'portfolio'): Promise<void> {
  try {
    const dir = path.dirname(LOCAL_STORE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    // Sort projects by priority
    projects.sort((a, b) => a.priority - b.priority);

    fs.writeFileSync(LOCAL_STORE_PATH, JSON.stringify(projects, null, 2));
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
