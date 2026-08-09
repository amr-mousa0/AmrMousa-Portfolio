import localProjectsData from '../../data/projects.json';

// Get all markdown files natively at build time
const mdFiles = import.meta.glob('../../content/projects/**/*.md', { eager: true });

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

function getLocalProjects(lang: string = 'en'): ProjectDTO[] {
  // 1. Parse markdown files
  const mdProjects = Object.entries(mdFiles).map(([path, module]: [string, any]) => {
    const slugMatch = path.match(/projects\/(ar|en)\/([^/.]+)\.md$/);
    if (!slugMatch) return null;
    const fileLang = slugMatch[1];
    const slug = slugMatch[2];
    if (fileLang !== lang) return null;

    const data = module.frontmatter || {};
    return {
      id: slug,
      repoId: slug,
      title: lang === 'ar' ? (data.titleAr || data.title) : (data.titleEn || data.title),
      category: data.category || 'Data Analytics',
      description: lang === 'ar' ? (data.descriptionAr || data.description) : (data.descriptionEn || data.description),
      problem: lang === 'ar' ? (data.problemAr || data.problemText) : (data.problemEn || data.problemText),
      salesDescription: lang === 'ar' ? (data.salesDescriptionAr || data.solutionText) : (data.salesDescriptionEn || data.solutionText),
      salesFunnelMetrics: lang === 'ar' ? (data.salesFunnelMetricsAr || data.impactText) : (data.salesFunnelMetricsEn || data.impactText),
      image: data.coverImage,
      imagePath: data.coverImage,
      images: data.galleryImages || [data.coverImage].filter(Boolean),
      demoUrl: data.powerBiUrl || data.dashboardUrl,
      githubUrl: data.githubUrl,
      tags: data.tags || data.tech || [],
      priority: data.priority || 50,
      archived: data.draft || false
    };
  }).filter(Boolean) as ProjectDTO[];

  // 2. Parse old projects.json
  const sortedJson = [...(localProjectsData as any[])].sort((a, b) => (a.priority || 999) - (b.priority || 999));
  const jsonProjects = sortedJson.map(p => {
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
      imagePath: p.imagePath || p.image,
      images: p.images || [],
      demoUrl: p.powerBiUrl || p.demoUrl,
      githubUrl: p.githubUrl,
      tags: p.tech || p.tags || [],
      priority: p.priority || 50
    };
  });

  // 3. Merge them, Markdown takes precedence
  const allProjects = [...mdProjects.filter(p => !p.archived)];
  jsonProjects.forEach(jp => {
    if (!allProjects.find(mp => mp.id === jp.id || (mp.repoId && mp.repoId === jp.id))) {
      allProjects.push(jp);
    }
  });

  return allProjects.sort((a, b) => (a.priority || 999) - (b.priority || 999));
}

export class ContentHubClient {
  static async healthCheck(): Promise<boolean> {
    return true;
  }

  static async getProjects(
    destination: string = 'portfolio',
    lang: string = 'en'
  ): Promise<ContentHubProjectsResult> {
    return { projects: getLocalProjects(lang) };
  }

  static async getProjectById(
    id: string,
    destination: string = 'portfolio',
    lang: string = 'en'
  ): Promise<{ project: ProjectDTO | null; error?: string }> {
    const all = getLocalProjects(lang);
    const match = all.find(p => p.id === id || (p.repoId && p.repoId === id));
    return { project: match || null };
  }
}
