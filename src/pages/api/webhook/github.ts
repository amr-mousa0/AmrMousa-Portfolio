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
  const secretExists = !!secret;
  const signatureExists = !!signature;
  const secretTrimmed = secret ? secret.trim() : '';

  if (!signatureExists || !secretExists) {
    console.warn('[Webhook Auth] Missing signature or secret:', { secretExists, signatureExists });
    return false;
  }

  const hmac = crypto.createHmac('sha256', secretTrimmed);
  const digest = `sha256=${hmac.update(payloadText, 'utf-8').digest('hex')}`;
  
  const sigBuf = Buffer.from(signature.trim());
  const digBuf = Buffer.from(digest);

  const lengthMatch = sigBuf.length === digBuf.length;
  let matches = false;

  if (lengthMatch) {
    try {
      matches = crypto.timingSafeEqual(sigBuf, digBuf);
    } catch (e: any) {
      console.error('[Webhook Auth] timingSafeEqual error:', e.message);
    }
  }

  console.log('[Webhook Auth Diagnostic]', {
    secretConfigured: true,
    secretLength: secret.length,
    signatureHeaderPresent: true,
    receivedSignature: signature,
    calculatedDigest: digest,
    payloadLength: payloadText.length,
    sigBufferLength: sigBuf.length,
    digBufferLength: digBuf.length,
    lengthMatched: lengthMatch,
    verificationSuccess: matches
  });

  return matches;
}

export const POST: APIRoute = async ({ request }) => {
  const payload = await request.text();
  const signature = request.headers.get('x-hub-signature-256');
  const delivery = request.headers.get('x-github-delivery');

  console.log('=== WEBHOOK DIAGNOSTIC PAYLOAD START ===');
  console.log(JSON.stringify({
    payload,
    'x-hub-signature-256': signature,
    'x-github-delivery': delivery
  }));
  console.log('=== WEBHOOK DIAGNOSTIC PAYLOAD END ===');

  return new Response(JSON.stringify({ message: 'Diagnostic payload logged successfully.' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
