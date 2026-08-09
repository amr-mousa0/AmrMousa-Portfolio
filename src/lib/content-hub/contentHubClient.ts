import { getProjectsFromStore } from '../sync/project-store';
import type { PortfolioProject } from '../sync/types';

export type ProjectDTO = PortfolioProject;

export interface ContentHubProjectsResult {
  projects: ProjectDTO[];
  error?: string;
}

export class ContentHubClient {
  static async healthCheck(): Promise<boolean> {
    return true;
  }

  static async getProjects(
    destination: string = 'portfolio',
    lang: string = 'en'
  ): Promise<ContentHubProjectsResult> {
    try {
      const projects = await getProjectsFromStore(destination);
      const localized = projects.map(p => {
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
      return { projects: localized };
    } catch (err: any) {
      return { projects: [] };
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
