/**
 * Content Hub Structured Audit Logger with Correlation Traceability (traceId)
 * ADR-023-008 Authoritative Protocol
 */
import fs from 'fs';
import path from 'path';
import type { AuditLogEntry } from '../types';

const AUDIT_LOG_PATH = path.resolve('.cache/audit-log.json');

function loadAuditLogs(): AuditLogEntry[] {
  try {
    if (fs.existsSync(AUDIT_LOG_PATH)) {
      return JSON.parse(fs.readFileSync(AUDIT_LOG_PATH, 'utf-8'));
    }
  } catch (e) {}
  return [];
}

function saveAuditLogs(logs: AuditLogEntry[]): void {
  try {
    const dir = path.dirname(AUDIT_LOG_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    // Keep last 500 audit entries
    const trimmed = logs.slice(-500);
    fs.writeFileSync(AUDIT_LOG_PATH, JSON.stringify(trimmed, null, 2));
  } catch (e) {}
}

export class AuditLogger {
  static log(
    repoId: string,
    traceId: string,
    stage: string,
    status: 'started' | 'completed' | 'failed' | 'skipped',
    message?: string,
    metadata?: any,
    jobId?: string
  ): AuditLogEntry {
    const entry: AuditLogEntry = {
      id: Date.now(),
      repoId,
      traceId,
      jobId,
      stage,
      status,
      message,
      metadata,
      createdAt: new Date().toISOString()
    };

    console.log(`[AuditLog] [${traceId.substring(0, 8)}] [${stage}] [${status}] ${repoId}${message ? `: ${message}` : ''}`);

    const logs = loadAuditLogs();
    logs.push(entry);
    saveAuditLogs(logs);

    return entry;
  }

  static getLogsByTraceId(traceId: string): AuditLogEntry[] {
    const logs = loadAuditLogs();
    return logs.filter(l => l.traceId === traceId);
  }

  static getLogsByRepoId(repoId: string): AuditLogEntry[] {
    const logs = loadAuditLogs();
    return logs.filter(l => l.repoId === repoId);
  }
}
