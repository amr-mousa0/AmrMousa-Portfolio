/**
 * Content Hub Service API — GET /api/projects?destination=portfolio&lang=en
 */
import type { APIRoute } from 'astro';
import { getProjectsFromStore } from '../../../../../src/lib/sync/project-store';
import type { PortfolioProject } from '../../../../../src/lib/sync/types';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const destination = url.searchParams.get('destination') || 'portfolio';
  const lang = url.searchParams.get('lang') || 'en';

  const projects = await getProjectsFromStore(destination);

  const localized = projects.map((p: PortfolioProject) => {
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

  return new Response(JSON.stringify(localized), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=300'
    }
  });
};
