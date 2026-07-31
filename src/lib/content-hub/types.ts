/**
 * Production-Grade Content Hub Universal Types
 * ADR-023-008 Authoritative Specification
 */

export type ManifestGalleryItem = {
  type?: 'image' | 'pdf' | 'video' | 'powerbi' | string;
  title?: string;
  file?: string;
  url?: string;
  thumbnail?: string;
} | string;

export interface ProjectAssetItem {
  type: 'image' | 'pdf' | 'video' | 'powerbi' | string;
  title: string;
  titleEn?: string;
  titleAr?: string;
  url: string;
  thumbnail?: string;
  metadata?: {
    width?: number;
    height?: number;
    mimeType?: string;
    sizeBytes?: number;
    hash?: string;
    blurhash?: string;
    placeholder?: string;
    optimized?: boolean;
  };
}

export interface RepositoryManifest {
  schemaVersion?: number;
  minimumReaderVersion?: number;
  project?: {
    projectId?: string; // Stable ID independent of repository name
    title?: string;
    description?: string;
    problem?: string;
    solution?: string;
    businessValue?: string;
    technicalHighlights?: string;
    salesDescription?: string;
    salesFunnelMetrics?: string;
    status?: string;
    tags?: string[];
    cover?: string;
    gallery?: ManifestGalleryItem[];
    demo?: string;
    caseStudy?: string;
    capabilities?: {
      demo?: boolean;
      caseStudy?: boolean;
      cover?: boolean;
    };
  };
  publish?: {
    [destination: string]: {
      enabled?: boolean;
      visibility?: 'public' | 'internal' | 'private';
      featured?: boolean;
      priority?: number;
      customTitle?: string;
    } | undefined;
  };
}

export interface PortfolioProject {
  id: string; // Stable projectId or repo name
  repoId: string;
  title: string;
  titleEn?: string;
  titleAr?: string;
  subtitle: string;
  category: string;
  description: string;
  descriptionEn?: string;
  descriptionAr?: string;
  problem?: string;
  problemEn?: string;
  problemAr?: string;
  salesDescription?: string;
  salesDescriptionEn?: string;
  salesDescriptionAr?: string;
  salesFunnelMetrics?: string;
  salesFunnelMetricsEn?: string;
  salesFunnelMetricsAr?: string;
  image: string;
  imagePath?: string;
  images?: string[];
  galleryItems?: ProjectAssetItem[];
  demoUrl?: string;
  powerBiUrl?: string;
  caseStudyUrl?: string;
  githubUrl: string;
  documentationUrl?: string;
  downloadUrl?: string;
  videoUrl?: string;
  featured: boolean;
  priority: number;
  tags: string[];
  tech: string[];
  capabilities: {
    demo: boolean;
    caseStudy: boolean;
    cover: boolean;
  };
  archived?: boolean;
  updatedAt?: string;
}

export interface RepoTreeEntry {
  path: string;
  mode?: string;
  type: 'blob' | 'tree';
  sha?: string;
  size?: number;
  url?: string;
}

export interface FallbackResult<T> {
  value: T;
  source: 'manifest' | 'gallery' | 'repo-tree' | 'readme' | 'generated' | 'github-pages' | 'vercel' | 'none';
  confidence: 'exact' | 'high' | 'medium' | 'low';
}

export interface JobPayload {
  id: string;
  traceId: string; // Correlation ID
  type: 'process' | 'translate' | 'optimize' | 'publish' | 'unpublish' | 'remove';
  repoFullName: string;
  repoId: string;
  branch?: string;
  payload?: any;
  attempt: number;
  maxAttempts: number;
  createdAt: string;
  status: 'queued' | 'processing' | 'completed' | 'failed' | 'dead';
  error?: string;
}

export interface AuditLogEntry {
  id?: number;
  repoId: string;
  jobId?: string;
  traceId: string; // Correlation ID
  stage: string;
  status: 'started' | 'completed' | 'failed' | 'skipped';
  message?: string;
  metadata?: any;
  createdAt?: string;
}

export interface RepositoryModel {
  id: string;
  repoId: string;
  owner: string;
  fullName: string;
  defaultBranch: string;
  lastSyncAt?: string;
  lastWebhookAt?: string;
  lastManifestHash?: string;
  status: 'active' | 'archived' | 'deleted';
  enabled: boolean;
  publishTargets: string[];
  createdAt: string;
  updatedAt: string;
}
