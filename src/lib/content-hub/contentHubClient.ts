import { getProjectsFromStore } from '../sync/project-store';
import type { PortfolioProject } from '../sync/types';

export type ProjectDTO = PortfolioProject;

export interface ContentHubProjectsResult {
  projects: ProjectDTO[];
  error?: string;
}

// Dynamically import all project markdown files at build time
const mdFiles = import.meta.glob('../../content/projects/**/*.md', { eager: true });

function getLocalMarkdownProjects(): ProjectDTO[] {
  const enModules: Record<string, any> = {};
  const arModules: Record<string, any> = {};

  Object.entries(mdFiles).forEach(([path, module]: [string, any]) => {
    const match = path.match(/projects\/(ar|en)\/([^/.]+)\.md$/);
    if (!match) return;
    const [, fileLang, slug] = match;
    if (fileLang === 'en') enModules[slug] = module.frontmatter || {};
    if (fileLang === 'ar') arModules[slug] = module.frontmatter || {};
  });

  const slugs = Array.from(new Set([...Object.keys(enModules), ...Object.keys(arModules)]));

  return slugs.map(slug => {
    const en = enModules[slug] || {};
    const ar = arModules[slug] || {};

    const titleEn = en.titleEn || en.title || ar.titleEn || slug;
    const titleAr = ar.titleAr || ar.title || en.titleAr || titleEn;

    const descEn = en.description || en.problemText || ar.description || '';
    const descAr = ar.description || ar.problemText || en.description || descEn;

    const problemEn = en.problemText || en.problem || '';
    const problemAr = ar.problemText || ar.problem || problemEn;

    const solutionEn = en.solutionText || en.salesDescription || '';
    const solutionAr = ar.solutionText || ar.salesDescription || solutionEn;

    const impactEn = en.impactText || en.salesFunnelMetrics || '';
    const impactAr = ar.impactText || ar.salesFunnelMetrics || impactEn;

    const categoryEn = en.category || ar.category || 'Data Analytics';
    const categoryAr = ar.category || en.category || 'تحليلات البيانات';

    const cover = en.coverImage || ar.coverImage || '/images/default-project.webp';
    const gallery = en.galleryImages || ar.galleryImages || [cover];
    const docUrl = en.documentationUrl || en.pdfUrl || ar.documentationUrl || ar.pdfUrl || null;
    const galleryItems = en.galleryItems || ar.galleryItems || (docUrl ? [
      { type: 'image', title: 'Cover', url: cover },
      { type: 'pdf', title: 'PDF Documentation', url: docUrl }
    ] : []);

    const priority = en.priority || ar.priority || 50;
    const draft = en.draft || ar.draft || false;

    return {
      id: slug,
      repoId: slug,
      hasManifest: true,
      title: titleEn,
      titleEn: titleEn,
      titleAr: titleAr,
      subtitle: categoryEn,
      category: categoryEn,
      categoryAr: categoryAr,
      description: descEn,
      descriptionEn: descEn,
      descriptionAr: descAr,
      problem: problemEn,
      problemEn: problemEn,
      problemAr: problemAr,
      salesDescription: solutionEn,
      salesDescriptionEn: solutionEn,
      salesDescriptionAr: solutionAr,
      salesFunnelMetrics: impactEn,
      salesFunnelMetricsEn: impactEn,
      salesFunnelMetricsAr: impactAr,
      image: cover,
      imagePath: cover,
      images: gallery,
      galleryItems: galleryItems,
      documentationUrl: docUrl,
      demoUrl: en.dashboardUrl || en.powerBiUrl || ar.dashboardUrl || ar.powerBiUrl,
      powerBiUrl: en.dashboardUrl || en.powerBiUrl || ar.dashboardUrl || ar.powerBiUrl,
      caseStudyUrl: `/projects/${slug}`,
      githubUrl: en.githubUrl || ar.githubUrl || `https://github.com/amr-mousa0/${slug}`,
      featured: en.featured || ar.featured || false,
      priority: priority,
      tags: en.tags || ar.tags || ['Data Analytics'],
      tech: en.tags || ar.tags || ['Data Analytics'],
      capabilities: {
        demo: !!(en.dashboardUrl || en.powerBiUrl || ar.dashboardUrl || ar.powerBiUrl),
        caseStudy: true,
        cover: true
      },
      archived: draft
    } as PortfolioProject;
  }).filter(p => {
    if (p.archived) return false;
    if (['amr-mousa0', 'landing-page', 'walmart-sales-analysis'].includes(p.id)) return false;
    if (p.problem?.includes('The organization required automated tracking') || p.problemAr?.includes('تطلبت المنظمة')) return false;
    return true;
  });
}

export class ContentHubClient {
  static async healthCheck(): Promise<boolean> {
    return true;
  }

  static async getProjects(
    destination: string = 'portfolio',
    lang: string = 'en'
  ): Promise<ContentHubProjectsResult> {
    const mdProjects = getLocalMarkdownProjects();

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
