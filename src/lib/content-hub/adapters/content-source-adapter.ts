/**
 * ContentSourceAdapter Interface
 * ADR-023-008 Authoritative Protocol
 */
import type { RepositoryManifest, RepoTreeEntry } from '../types';

export interface ContentSourceAdapter {
  name: string;
  fetchManifest(repoFullName: string, branch?: string): Promise<{ manifest: RepositoryManifest | null; raw: string }>;
  fetchTree(repoFullName: string, branch?: string): Promise<RepoTreeEntry[]>;
  fetchFileContent(repoFullName: string, branch: string, filePath: string): Promise<string | null>;
  resolveAssetUrl(repoFullName: string, branch: string, relativePath: string): string;
}
