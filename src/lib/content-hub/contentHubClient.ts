import localProjectsData from '../../data/projects.json';

function getLocalProjectsFallback(lang: string = 'en'): ProjectDTO[] {
  const sorted = [...(localProjectsData as any[])].sort((a, b) => (a.priority || 999) - (b.priority || 999));
  return sorted.map(p => {
    const isAr = lang === 'ar';
    return {
      id: p.id,
      title: isAr ? (p.titleAr || p.title) : (p.titleEn || p.title),
      category: p.category || 'Data Analytics',
      description: isAr ? (p.descriptionAr || p.description) : (p.descriptionEn || p.description),
      problem: isAr ? (p.problemAr || p.problem) : (p.problemEn || p.problem),
      salesDescription: isAr ? (p.salesDescriptionAr || p.salesDescription) : (p.salesDescriptionEn || p.salesDescription),
      salesFunnelMetrics: isAr ? (p.salesFunnelMetricsAr || p.salesFunnelMetrics) : (p.salesFunnelMetricsEn || p.salesFunnelMetrics),
      image: p.imagePath || p.image,
      images: p.images || [],
      demoUrl: p.powerBiUrl || p.demoUrl,
      githubUrl: p.githubUrl,
      tags: p.tech || p.tags || []
    };
  });
}

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
    const envUrl = (typeof process !== 'undefined' && process.env && process.env.CONTENT_HUB_API_URL) ||
      (import.meta as any).env?.CONTENT_HUB_API_URL;

    if (envUrl) {
      return envUrl.replace(/\/+$/, '');
    }

    if (typeof window !== 'undefined' && window.location?.origin) {
      return window.location.origin;
    }

    if (typeof process !== 'undefined' && process.env) {
      if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
        return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
      }
      if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
      }
      if (process.env.SITE_URL) {
        return process.env.SITE_URL.replace(/\/+$/, '');
      }
    }

    return 'https://mousa-analytics.vercel.app';
  }

  /**
   * GET /api/health — Service availability check (with fallback to /api/v1/health)
   */
  static async healthCheck(): Promise<boolean> {
    try {
      const baseUrl = this.getApiBaseUrl();
      let res = await fetch(`${baseUrl}/api/health`, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(3000)
      });
      if (!res.ok) {
        res = await fetch(`${baseUrl}/api/v1/health`, {
          headers: { 'Accept': 'application/json' },
          signal: AbortSignal.timeout(3000)
        });
      }
      return res.ok;
    } catch {
      return false;
    }
  }

  /**
   * GET /api/projects?destination=portfolio&lang=en (with fallback to /api/v1/projects)
   */
  static async getProjects(
    destination: string = 'portfolio',
    lang: string = 'en'
  ): Promise<ContentHubProjectsResult> {
    const baseUrl = this.getApiBaseUrl();
    const envVal = (typeof process !== 'undefined' && process.env) ? process.env.CONTENT_HUB_API_URL : undefined;

    console.log('[ContentHubClient] Diagnostic Info:');
    console.log('  process.env.CONTENT_HUB_API_URL:', envVal ?? '(not set - using default fallback)');
    console.log('  Resolved Base URL:', baseUrl);

    // Primary endpoint /api/projects and fallback endpoint /api/v1/projects
    const primaryEndpoint = `${baseUrl}/api/projects?destination=${encodeURIComponent(destination)}&lang=${encodeURIComponent(lang)}`;
    const fallbackEndpoint = `${baseUrl}/api/v1/projects?destination=${encodeURIComponent(destination)}&lang=${encodeURIComponent(lang)}`;

    let endpoint = primaryEndpoint;

    try {
      console.log('  Exact fetch URL:', endpoint);
      let res = await fetch(endpoint, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(5000)
      });

      console.log('  HTTP Status:', res.status);

      // If /api/projects returns 404, try /api/v1/projects
      if (res.status === 404) {
        console.warn(`[ContentHubClient] Endpoint ${endpoint} returned 404. Trying fallback endpoint: ${fallbackEndpoint}`);
        endpoint = fallbackEndpoint;
        res = await fetch(endpoint, {
          headers: { 'Accept': 'application/json' },
          signal: AbortSignal.timeout(5000)
        });
        console.log('  Fallback HTTP Status:', res.status);
      }

      const bodyText = await res.text();
      console.log('  Response body (first 500 chars):', bodyText.substring(0, 500));

      if (!res.ok) {
        console.warn(`[ContentHubClient] API returned status ${res.status} for ${endpoint}. Using local projects fallback.`);
        return { projects: getLocalProjectsFallback(lang) };
      }

      const data = JSON.parse(bodyText);
      const projects: ProjectDTO[] = Array.isArray(data) ? data : (data.projects || []);
      return { projects: projects.length > 0 ? projects : getLocalProjectsFallback(lang) };
    } catch (err: any) {
      console.warn(`[ContentHubClient] Failed to fetch projects from ${endpoint}:`, err?.message || err);
      return { projects: getLocalProjectsFallback(lang) };
    }
  }

  /**
   * GET /api/projects/:id?destination=portfolio&lang=en (with fallback to /api/v1/projects/:id)
   */
  static async getProjectById(
    id: string,
    destination: string = 'portfolio',
    lang: string = 'en'
  ): Promise<{ project: ProjectDTO | null; error?: string }> {
    const baseUrl = this.getApiBaseUrl();
    const primaryEndpoint = `${baseUrl}/api/projects/${encodeURIComponent(id)}?destination=${encodeURIComponent(destination)}&lang=${encodeURIComponent(lang)}`;
    const fallbackEndpoint = `${baseUrl}/api/v1/projects/${encodeURIComponent(id)}?destination=${encodeURIComponent(destination)}&lang=${encodeURIComponent(lang)}`;

    let endpoint = primaryEndpoint;

    try {
      let res = await fetch(endpoint, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(5000)
      });

      if (res.status === 404) {
        endpoint = fallbackEndpoint;
        res = await fetch(endpoint, {
          headers: { 'Accept': 'application/json' },
          signal: AbortSignal.timeout(5000)
        });
      }

      if (!res.ok) {
        const localList = getLocalProjectsFallback(lang);
        const match = localList.find(p => p.id === id || p.id.endsWith(id));
        return { project: match || null };
      }

      const project: ProjectDTO = await res.json();
      return { project };
    } catch (err: any) {
      console.warn(`[ContentHubClient] Failed to fetch project ${id} from ${endpoint}:`, err?.message || err);
      const localList = getLocalProjectsFallback(lang);
      const match = localList.find(p => p.id === id || p.id.endsWith(id));
      return { project: match || null };
    }
  }
}
