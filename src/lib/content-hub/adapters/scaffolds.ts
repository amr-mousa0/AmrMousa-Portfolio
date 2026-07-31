/**
 * ContentSourceAdapter Scaffolds (GitLab, Local, Drive, CMS)
 * ADR-023-008 Authoritative Protocol
 */
import type { ContentSourceAdapter } from './content-source-adapter';
import type { RepositoryManifest, RepoTreeEntry } from '../types';

export class GitLabAdapter implements ContentSourceAdapter {
  name = 'GitLabAdapter';
  async fetchManifest(): Promise<{ manifest: RepositoryManifest | null; raw: string }> {
    throw new Error('GitLabAdapter not configured.');
  }
  async fetchTree(): Promise<RepoTreeEntry[]> { return []; }
  async fetchFileContent(): Promise<string | null> { return null; }
  resolveAssetUrl(_repo: string, _branch: string, relativePath: string): string { return relativePath; }
}

export class LocalAdapter implements ContentSourceAdapter {
  name = 'LocalAdapter';
  async fetchManifest(): Promise<{ manifest: RepositoryManifest | null; raw: string }> {
    throw new Error('LocalAdapter not configured.');
  }
  async fetchTree(): Promise<RepoTreeEntry[]> { return []; }
  async fetchFileContent(): Promise<string | null> { return null; }
  resolveAssetUrl(_repo: string, _branch: string, relativePath: string): string { return relativePath; }
}

export class DriveAdapter implements ContentSourceAdapter {
  name = 'DriveAdapter';
  async fetchManifest(): Promise<{ manifest: RepositoryManifest | null; raw: string }> {
    throw new Error('DriveAdapter not configured.');
  }
  async fetchTree(): Promise<RepoTreeEntry[]> { return []; }
  async fetchFileContent(): Promise<string | null> { return null; }
  resolveAssetUrl(_repo: string, _branch: string, relativePath: string): string { return relativePath; }
}

export class CMSAdapter implements ContentSourceAdapter {
  name = 'CMSAdapter';
  async fetchManifest(): Promise<{ manifest: RepositoryManifest | null; raw: string }> {
    throw new Error('CMSAdapter not configured.');
  }
  async fetchTree(): Promise<RepoTreeEntry[]> { return []; }
  async fetchFileContent(): Promise<string | null> { return null; }
  resolveAssetUrl(_repo: string, _branch: string, relativePath: string): string { return relativePath; }
}
