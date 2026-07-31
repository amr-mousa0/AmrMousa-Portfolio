/**
 * Content Hub Pipeline Orchestrator
 * ADR-023-008 Authoritative Protocol
 * 
 * Flow: Webhook ➔ Queue ➔ GitHubWorker ➔ TranslationWorker ➔ AssetWorker ➔ PublishWorker
 */
import { getRegistry } from './provider-registry';
import { AuditLogger } from './audit/audit-logger';
import { GitHubWorker, TranslationWorker, AssetWorker, PublishWorker } from './workers/pipeline-workers';
import type { PortfolioProject } from './types';

export class PipelineOrchestrator {
  static async enqueueRepoSync(
    repo: {
      name: string;
      full_name: string;
      default_branch?: string;
      html_url: string;
      description?: string;
      homepage?: string;
      language?: string;
      topics?: string[];
      archived?: boolean;
      owner?: { login: string; avatar_url: string };
    },
    customTraceId?: string
  ): Promise<{ traceId: string; jobId: string }> {
    const traceId = customTraceId || `trace-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const registry = getRegistry();

    AuditLogger.log(repo.name, traceId, 'webhook_received', 'started', `Received event for repo ${repo.full_name}`);

    const job = await registry.queue.enqueue({
      traceId,
      type: 'process',
      repoFullName: repo.full_name,
      repoId: repo.name,
      branch: repo.default_branch || 'main',
      payload: repo,
      maxAttempts: 3
    });

    AuditLogger.log(repo.name, traceId, 'job_queued', 'completed', `Job ${job.id} enqueued`);

    // Trigger asynchronous queue execution
    setImmediate(() => {
      PipelineOrchestrator.processNextJob().catch(err => {
        console.error('[PipelineOrchestrator] Worker execution error:', err);
      });
    });

    return { traceId, jobId: job.id };
  }

  static async processNextJob(): Promise<PortfolioProject | null> {
    const registry = getRegistry();
    const job = await registry.queue.dequeue();
    if (!job) return null;

    const repo = job.payload;
    const traceId = job.traceId;

    try {
      // Step 1: GitHubWorker
      const { projectModel, manifest } = await GitHubWorker.process(repo, traceId);

      // Step 2: TranslationWorker
      const translatedModel = await TranslationWorker.process(projectModel, traceId);

      // Step 3: AssetWorker
      const assetModel = await AssetWorker.process(translatedModel, traceId);

      // Step 4: PublishWorker
      const finalProject = await PublishWorker.process(assetModel, manifest, traceId);

      await registry.queue.acknowledge(job.id);
      return finalProject;
    } catch (error: any) {
      AuditLogger.log(repo.name, traceId, 'pipeline_execution', 'failed', `Error: ${error.message}`);
      await registry.queue.fail(job.id, error.message);
      return null;
    }
  }
}
