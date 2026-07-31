/**
 * Content Hub Structured Audit Logger with Correlation Traceability (traceId)
 * ADR-023-008 Authoritative Protocol
 */
import type { AuditLogEntry } from '../types';
import { getRegistry } from '../provider-registry';

const STORAGE_KEY = 'audit-log.json';
let inMemoryLogs: AuditLogEntry[] = [];
let isLoaded = false;

async function loadAuditLogs(): Promise<AuditLogEntry[]> {
  if (isLoaded) return inMemoryLogs;
  try {
    const raw = await getRegistry().storage.get(STORAGE_KEY);
    if (raw) {
      const content = typeof raw === 'string' ? raw : raw.toString('utf-8');
      inMemoryLogs = JSON.parse(content);
      isLoaded = true;
      return inMemoryLogs;
    }
  } catch (e) {}
  isLoaded = true;
  return inMemoryLogs;
}

async function saveAuditLogs(logs: AuditLogEntry[]): Promise<void> {
  inMemoryLogs = logs.slice(-500);
  try {
    await getRegistry().storage.put(STORAGE_KEY, JSON.stringify(inMemoryLogs, null, 2));
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

    inMemoryLogs.push(entry);
    saveAuditLogs(inMemoryLogs).catch(() => {});

    return entry;
  }

  static async getLogsByTraceId(traceId: string): Promise<AuditLogEntry[]> {
    const logs = await loadAuditLogs();
    return logs.filter(l => l.traceId === traceId);
  }

  static async getLogsByRepoId(repoId: string): Promise<AuditLogEntry[]> {
    const logs = await loadAuditLogs();
    return logs.filter(l => l.repoId === repoId);
  }
}
