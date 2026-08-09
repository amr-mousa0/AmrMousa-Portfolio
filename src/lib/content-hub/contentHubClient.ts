import { getProjectsFromStore } from '../sync/project-store';
import type { PortfolioProject } from '../sync/types';

export type ProjectDTO = PortfolioProject;

export interface ContentHubProjectsResult {
  projects: ProjectDTO[];
  error?: string;
}

// Dynamically import all project markdown files at build time
const mdFiles = import.meta.glob('../../content/projects/**/*.md', { eager: true });

function getLocalMarkdownProjects(lang: string = 'en'): ProjectDTO[] {
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
      hasManifest: true,
      title: data.title || slug,
      titleEn: data.titleEn || data.title || slug,
      titleAr: data.titleAr || data.title || slug,
      subtitle: data.category || 'Data Analytics',
      category: data.category || 'Data Analytics',
      description: data.description || data.problemText || '',
      descriptionEn: data.descriptionEn || data.description || data.problemText || '',
      descriptionAr: data.descriptionAr || data.description || data.problemText || '',
      problem: data.problemText || '',
      problemEn: data.problemText || '',
      problemAr: data.problemText || '',
      salesDescription: data.solutionText || '',
      salesDescriptionEn: data.solutionText || '',
      salesDescriptionAr: data.solutionText || '',
      salesFunnelMetrics: data.impactText || '',
      salesFunnelMetricsEn: data.impactText || '',
      salesFunnelMetricsAr: data.impactText || '',
      image: data.coverImage || '/images/default-project.webp',
      imagePath: data.coverImage || '/images/default-project.webp',
      images: data.galleryImages || [data.coverImage].filter(Boolean),
      demoUrl: data.dashboardUrl || data.powerBiUrl,
      powerBiUrl: data.dashboardUrl || data.powerBiUrl,
      caseStudyUrl: `/projects/${slug}`,
      githubUrl: data.githubUrl || `https://github.com/amr-mousa0/${slug}`,
      featured: data.featured || false,
      priority: data.priority || 50,
      tags: data.tags || ['Data Analytics'],
      tech: data.tags || ['Data Analytics'],
      capabilities: {
        demo: !!(data.dashboardUrl || data.powerBiUrl),
        caseStudy: true,
        cover: true
      },
      archived: data.draft || false
    } as PortfolioProject;
  }).filter(Boolean) as ProjectDTO[];

  return mdProjects.filter(p => !p.archived);
}

export class ContentHubClient {
  static async healthCheck(): Promise<boolean> {
    return true;
  }

  static async getProjects(
    destination: string = 'portfolio',
    lang: string = 'en'
  ): Promise<ContentHubProjectsResult> {
    const mdProjects = getLocalMarkdownProjects(lang);

    try {
      const storeProjects = await getProjectsFromStore(destination);
      const localizedStore = storeProjects.map(p => {
        if (lang === 'ar') {
          return {
            ...p,
            title: p.titleAr || p.title,
            description: p.descriptionAr || p.description,
            problem: p.problemAr || p.problem,
            salesDescription: p.salesDescriptionAr || p.salesDescription,
            salesFunnelMetrics: p.salesFunnelMetricsAr || p.salesFunnelMetrics
          };
        }
        return p;
      });

      // Merge store projects with local markdown projects
      const combined = [...localizedStore];
      mdProjects.forEach(mp => {
        if (!combined.some(cp => cp.id === mp.id || (cp.repoId && cp.repoId === mp.repoId))) {
          combined.push(mp);
        }
      });

      combined.sort((a, b) => (a.priority || 999) - (b.priority || 999));
      return { projects: combined };
    } catch (err: any) {
      return { projects: mdProjects };
    }
  }

  static async getProjectById(
    id: string,
    destination: string = 'portfolio',
    lang: string = 'en'
  ): Promise<{ project: ProjectDTO | null; error?: string }> {
    const { projects } = await this.getProjects(destination, lang);
    const match = projects.find(p => p.id === id || (p.repoId && p.repoId === id));
    return { project: match || null };
  }
}
