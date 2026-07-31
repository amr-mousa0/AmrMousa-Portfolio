/**
 * Universal Repository Manifest GitHub Sync Engine (Spec 023 Authoritative Protocol v7.0)
 * ADR-023-007 Authoritative Protocol
 * 
 * 1. Single Source of Truth: manifest.json is 100% authoritative.
 * 2. 3-Tier Architecture: Decoupled presentation layer from Content Sync Service.
 * 3. Intelligent Fallback Engine: Enriches missing data without overriding declared manifest fields.
 */
import type { PortfolioProject, RepositoryManifest, ProjectAssetItem } from '../lib/sync/types';
import { getProjectsFromStore } from '../lib/sync/project-store';

export type { PortfolioProject, RepositoryManifest, ProjectAssetItem };

/**
 * Presentation Layer Fetcher — Consumes normalized projects from Content Sync Store
 */
export async function fetchGitHubProjects(): Promise<PortfolioProject[]> {
  console.log('[Presentation Layer] Fetching normalized projects from Content Sync Store...');
  const projects = await getProjectsFromStore('portfolio');
  console.log(`[Presentation Layer] Loaded ${projects.length} normalized projects.`);
  return projects;
}
