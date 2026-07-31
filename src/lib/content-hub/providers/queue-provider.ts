/**
 * QueueProvider Interface & Implementations (MemoryQueue, BullMQ, SQS)
 * ADR-023-008 Authoritative Protocol
 */
import type { JobPayload } from '../types';

export interface QueueProvider {
  name: string;
  enqueue(job: Omit<JobPayload, 'id' | 'createdAt' | 'status' | 'attempt'>): Promise<JobPayload>;
  dequeue(): Promise<JobPayload | null>;
  acknowledge(jobId: string): Promise<void>;
  fail(jobId: string, error: string): Promise<JobPayload | null>;
  getDeadLetters(): Promise<JobPayload[]>;
}

export class MemoryQueueProvider implements QueueProvider {
  name = 'MemoryQueueProvider';
  private queue: JobPayload[] = [];
  private processing: Map<string, JobPayload> = new Map();
  private deadLetters: JobPayload[] = [];

  async enqueue(jobData: Omit<JobPayload, 'id' | 'createdAt' | 'status' | 'attempt'>): Promise<JobPayload> {
    const job: JobPayload = {
      ...jobData,
      id: `job-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      attempt: 0,
      status: 'queued',
      createdAt: new Date().toISOString()
    };
    this.queue.push(job);
    return job;
  }

  async dequeue(): Promise<JobPayload | null> {
    const job = this.queue.shift();
    if (!job) return null;

    job.status = 'processing';
    job.attempt += 1;
    this.processing.set(job.id, job);
    return job;
  }

  async acknowledge(jobId: string): Promise<void> {
    const job = this.processing.get(jobId);
    if (job) {
      job.status = 'completed';
      this.processing.delete(jobId);
    }
  }

  async fail(jobId: string, error: string): Promise<JobPayload | null> {
    const job = this.processing.get(jobId);
    if (!job) return null;

    job.error = error;
    this.processing.delete(jobId);

    if (job.attempt >= job.maxAttempts) {
      job.status = 'dead';
      this.deadLetters.push(job);
      console.warn(`[MemoryQueueProvider] Job '${jobId}' moved to Dead Letter Queue after ${job.attempt} attempts.`);
    } else {
      job.status = 'queued';
      // Re-queue with exponential delay concept
      this.queue.push(job);
    }

    return job;
  }

  async getDeadLetters(): Promise<JobPayload[]> {
    return [...this.deadLetters];
  }
}

export class BullMQQueueProvider implements QueueProvider {
  name = 'BullMQQueueProvider';
  async enqueue(): Promise<JobPayload> { throw new Error('BullMQQueueProvider not configured.'); }
  async dequeue(): Promise<JobPayload | null> { return null; }
  async acknowledge(): Promise<void> {}
  async fail(): Promise<JobPayload | null> { return null; }
  async getDeadLetters(): Promise<JobPayload[]> { return []; }
}

export class SQSQueueProvider implements QueueProvider {
  name = 'SQSQueueProvider';
  async enqueue(): Promise<JobPayload> { throw new Error('SQSQueueProvider not configured.'); }
  async dequeue(): Promise<JobPayload | null> { return null; }
  async acknowledge(): Promise<void> {}
  async fail(): Promise<JobPayload | null> { return null; }
  async getDeadLetters(): Promise<JobPayload[]> { return []; }
}
