/**
 * Standalone Content Hub Audit Read API — GET /api/audit/:id
 * ADR-023-008 Authoritative Protocol
 */
import type { APIRoute } from 'astro';
import { AuditLogger } from '../../../lib/content-hub/audit/audit-logger';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const id = params.id;
  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing ID parameter' }), { status: 400 });
  }

  // Check if ID is a traceId or repoId
  let logs = AuditLogger.getLogsByTraceId(id);
  if (logs.length === 0) {
    logs = AuditLogger.getLogsByRepoId(id);
  }

  return new Response(JSON.stringify(logs), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
};
