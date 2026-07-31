/**
 * Standalone Content Hub — GitHub Webhook Receiver API
 * ADR-023-008 Authoritative Protocol
 */
import type { APIRoute } from 'astro';
import crypto from 'crypto';
import type { GitHubWebhookPayload } from '../../../lib/sync/types';
import { PipelineOrchestrator } from '../../../lib/content-hub/pipeline-orchestrator';
import { removeProjectFromStore } from '../../../lib/sync/project-store';
import { AuditLogger } from '../../../lib/content-hub/audit/audit-logger';

export const prerender = false;

function verifySignature(payloadText: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  const hmac = crypto.createHmac('sha256', secret);
  const digest = `sha256=${hmac.update(payloadText).digest('hex')}`;
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export const POST: APIRoute = async ({ request }) => {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  const payloadText = await request.text();
  const signature = request.headers.get('x-hub-signature-256');

  // 1. Verify HMAC Signature if secret is configured
  if (secret && !verifySignature(payloadText, signature, secret)) {
    return new Response(JSON.stringify({ error: 'Invalid HMAC signature' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let payload: GitHubWebhookPayload;
  try {
    payload = JSON.parse(payloadText);
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const eventType = request.headers.get('x-github-event') || 'push';
  const repo = payload.repository;

  if (eventType === 'ping') {
    return new Response(JSON.stringify({ message: 'Content Hub Webhook active and ponged successfully.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!repo) {
    return new Response(JSON.stringify({ error: 'Missing repository metadata' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const repoId = repo.name;
  const traceId = `trace-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

  // 2. Handle Delete / Archive Repository Events
  if (eventType === 'repository') {
    if (payload.action === 'deleted') {
      AuditLogger.log(repoId, traceId, 'repository_deleted', 'completed', 'Purging project from store');
      await removeProjectFromStore(repoId, 'portfolio');
      return new Response(JSON.stringify({ action: 'deleted', id: repoId, traceId }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // 3. Handle Push Events via Pipeline Orchestrator & Queue
  if (eventType === 'push') {
    const { jobId } = await PipelineOrchestrator.enqueueRepoSync(repo as any, traceId);

    return new Response(JSON.stringify({
      status: 'enqueued',
      jobId,
      traceId,
      id: repoId
    }), {
      status: 202,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ status: 'ignored', event: eventType }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
