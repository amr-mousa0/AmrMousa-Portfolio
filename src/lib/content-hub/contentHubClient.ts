/**
 * Content Hub Gateway Client — Single API Gateway for Portfolio Presentation Layer
 * Refactored Architecture (ADR-023-009)
 */

export interface ProjectDTO {
  id: string;
  repoId?: string;
  title: string;
  titleEn?: string;
  titleAr?: string;
  subtitle?: string;
  category?: string;
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
  image?: string;
  imagePath?: string;
  images?: string[];
  galleryItems?: Array<{ type: string; url: string; title?: string }>;
  demoUrl?: string;
  powerBiUrl?: string;
  caseStudyUrl?: string;
  githubUrl?: string;
  documentationUrl?: string;
  videoUrl?: string;
  featured?: boolean;
  priority?: number;
  tags?: string[];
  tech?: string[];
  capabilities?: {
    demo?: boolean;
    caseStudy?: boolean;
    cover?: boolean;
  };
  archived?: boolean;
}

export interface ContentHubProjectsResult {
  projects: ProjectDTO[];
  error?: string;
}

export class ContentHubClient {
  private static getApiBaseUrl(): string {
    const url = (
      (typeof process !== 'undefined' && process.env && process.env.CONTENT_HUB_API_URL) ||
      import.meta.env.CONTENT_HUB_API_URL ||
      'https://content-sync-service.vercel.app'
    ).replace(/\/$/, '');

    return url;
  }

  /**
   * GET /api/v1/health — Service availability check
   */
  static async healthCheck(): Promise<boolean> {
    try {
      const baseUrl = this.getApiBaseUrl();
      const res = await fetch(`${baseUrl}/api/v1/health`, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(3000)
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  /**
   * GET /api/v1/projects?destination=portfolio&lang=en
   */
  static async getProjects(
    destination: string = 'portfolio',
    lang: string = 'en'
  ): Promise<ContentHubProjectsResult> {
    const baseUrl = this.getApiBaseUrl();
    const endpoint = `${baseUrl}/api/v1/projects?destination=${encodeURIComponent(destination)}&lang=${encodeURIComponent(lang)}`;

    try {
      const res = await fetch(endpoint, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(5000)
      });

      if (!res.ok) {
        const errorMsg = `Content Hub API returned status ${res.status}`;
        if (import.meta.env.DEV) {
          throw new Error(`[ContentHubClient DEV ERROR] ${errorMsg} at ${endpoint}`);
        }
        return { projects: [], error: 'Projects are temporarily unavailable' };
      }

      const data = await res.json();
      const projects: ProjectDTO[] = Array.isArray(data) ? data : (data.projects || []);
      return { projects };
    } catch (err: any) {
      console.error(`[ContentHubClient] Failed to fetch projects from ${endpoint}:`, err?.message || err);

      if (import.meta.env.DEV) {
        throw new Error(
          `[ContentHubClient DEV ERROR] Content Hub Service is unavailable at ${endpoint}. Details: ${err?.message || err}`
        );
      }

      return {
        projects: [],
        error: 'Projects are temporarily unavailable'
      };
    }
  }

  /**
   * GET /api/v1/projects/:id?destination=portfolio&lang=en
   */
  static async getProjectById(
    id: string,
    destination: string = 'portfolio',
    lang: string = 'en'
  ): Promise<{ project: ProjectDTO | null; error?: string }> {
    const baseUrl = this.getApiBaseUrl();
    const endpoint = `${baseUrl}/api/v1/projects/${encodeURIComponent(id)}?destination=${encodeURIComponent(destination)}&lang=${encodeURIComponent(lang)}`;

    try {
      const res = await fetch(endpoint, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(5000)
      });

      if (!res.ok) {
        if (res.status === 404) {
          return { project: null };
        }
        const errorMsg = `Content Hub API returned status ${res.status}`;
        if (import.meta.env.DEV) {
          throw new Error(`[ContentHubClient DEV ERROR] ${errorMsg} at ${endpoint}`);
        }
        return { project: null, error: 'Projects are temporarily unavailable' };
      }

      const project: ProjectDTO = await res.json();
      return { project };
    } catch (err: any) {
      console.error(`[ContentHubClient] Failed to fetch project ${id} from ${endpoint}:`, err?.message || err);

      if (import.meta.env.DEV) {
        throw new Error(
          `[ContentHubClient DEV ERROR] Content Hub Service is unavailable at ${endpoint}. Details: ${err?.message || err}`
        );
      }

      return { project: null, error: 'Projects are temporarily unavailable' };
    }
  }
}
