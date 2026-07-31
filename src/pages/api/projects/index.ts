/**
 * Standalone Content Read API Endpoint — GET /api/projects
 * ADR-023-007 Authoritative Protocol
 */
import type { APIRoute } from 'astro';
import { getProjectsFromStore } from '../../../lib/sync/project-store';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const destination = url.searchParams.get('destination') || 'portfolio';
  const projects = await getProjectsFromStore(destination);

  return new Response(JSON.stringify(projects), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=300'
    }
  });
};
