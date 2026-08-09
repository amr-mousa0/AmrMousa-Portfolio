/**
 * Universal Content Sync Platform & Intelligent Pipeline Types
 * Spec 023 Authoritative Protocol v7.0 (ADR-023-007)
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
}

export interface RepositoryManifest {
  schemaVersion?: number;
  minimumReaderVersion?: number;
  project?: {
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
  id: string;
  repoId?: string;
  hasManifest?: boolean;
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

export interface GitHubWebhookPayload {
  ref?: string;
  action?: string;
  repository?: {
    name: string;
    full_name: string;
    default_branch?: string;
    html_url: string;
    description?: string;
    homepage?: string;
    language?: string;
    topics?: string[];
    archived?: boolean;
    owner?: {
      login: string;
      avatar_url: string;
    };
  };
  head_commit?: {
    added?: string[];
    modified?: string[];
    removed?: string[];
  };
  commits?: Array<{
    added?: string[];
    modified?: string[];
    removed?: string[];
  }>;
}
