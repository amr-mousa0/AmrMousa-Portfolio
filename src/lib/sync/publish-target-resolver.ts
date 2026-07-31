/**
 * Multi-Portfolio Fan-Out Publish Target Resolver
 * ADR-023-007 Authoritative Protocol
 */
import type { RepositoryManifest } from './types';

export interface PublishTargetConfig {
  destination: string;
  enabled: boolean;
  visibility: 'public' | 'internal' | 'private';
  featured: boolean;
  priority: number;
  customTitle?: string;
}

export function resolvePublishTargets(manifest: RepositoryManifest | null): PublishTargetConfig[] {
  const targets: PublishTargetConfig[] = [];

  if (!manifest || !manifest.publish) {
    // Default fallback target if manifest has no publish block
    targets.push({
      destination: 'portfolio',
      enabled: true,
      visibility: 'public',
      featured: false,
      priority: 99
    });
    return targets;
  }

  for (const [dest, config] of Object.entries(manifest.publish)) {
    if (!config) continue;
    targets.push({
      destination: dest,
      enabled: config.enabled !== false,
      visibility: config.visibility || 'public',
      featured: config.featured === true,
      priority: config.priority !== undefined ? config.priority : 99,
      customTitle: config.customTitle
    });
  }

  return targets;
}
