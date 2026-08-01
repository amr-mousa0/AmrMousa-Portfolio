/**
 * Content Hub Service API — GET /api/projects/:id?destination=portfolio&lang=en
 */
import type { APIRoute } from 'astro';
import { getProjectsFromStore } from '../../../../../src/lib/sync/project-store';

export const prerender = false;

export const GET: APIRoute = async ({ params, url }) => {
  const id = params.id;
  const destination = url.searchParams.get('destination') || 'portfolio';
  const lang = url.searchParams.get('lang') || 'en';

  const projects = await getProjectsFromStore(destination);
  const project = projects.find(p => p.id === id);

  if (!project) {
    return new Response(JSON.stringify({ error: 'Project not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  const localized = lang === 'ar' ? {
    ...project,
    title: project.titleAr || project.title,
    description: project.descriptionAr || project.description,
    problem: project.problemAr || project.problem,
    salesDescription: project.salesDescriptionAr || project.salesDescription,
    salesFunnelMetrics: project.salesFunnelMetricsAr || project.salesFunnelMetrics
  } : project;

  return new Response(JSON.stringify(localized), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=300'
    }
  });
};
