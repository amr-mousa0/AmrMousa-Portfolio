/**
 * Content Hub API v1 — GET /api/v1/projects?destination=portfolio&lang=en
 * ADR-023-009 Authoritative Protocol
 */
import type { APIRoute } from 'astro';
import { getProjectsFromStore } from '../../../../lib/sync/project-store';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const destination = url.searchParams.get('destination') || 'portfolio';
  const lang = url.searchParams.get('lang') || 'en';

  const projects = await getProjectsFromStore(destination);
  projects.sort((a: any, b: any) => (a.priority || 999) - (b.priority || 999));

  // Deduplicate projects (keep the highest priority / first encountered)
  const uniqueMap = new Map();
  for (const p of projects) {
    const key = p.repoId || p.id;
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, p);
    }
  }
  const uniqueProjects = Array.from(uniqueMap.values());

  const localized = uniqueProjects.map(p => {
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
