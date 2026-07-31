/**
 * Standalone Content Read API Endpoint — GET /api/projects/:id
 * ADR-023-007 Authoritative Protocol
 */
import type { APIRoute } from 'astro';
import { getProjectsFromStore } from '../../../lib/sync/project-store';

export const prerender = false;

export const GET: APIRoute = async ({ params, url }) => {
  const id = params.id;
  const destination = url.searchParams.get('destination') || 'portfolio';
  const projects = await getProjectsFromStore(destination);

  const project = projects.find(p => p.id === id);

  if (!project) {
    return new Response(JSON.stringify({ error: 'Project not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  return new Response(JSON.stringify(project), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=300'
    }
  });
};
