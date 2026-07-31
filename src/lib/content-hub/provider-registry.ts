/**
 * Content Hub Provider Registry (Dependency Injection Container)
 * ADR-023-008 Authoritative Protocol
 */
import type { ContentSourceAdapter } from './adapters/content-source-adapter';
import { GitHubAdapter } from './adapters/github-adapter';
import type { TranslationProvider } from './providers/translation-provider';
import { GoogleTranslateProvider } from './providers/translation-provider';
import type { AssetProcessor } from './providers/asset-processor';
import { SharpProcessor } from './providers/asset-processor';
import type { StorageProvider } from './providers/storage-provider';
import { createAutoStorageProvider } from './providers/storage-provider';
import type { QueueProvider } from './providers/queue-provider';
import { MemoryQueueProvider } from './providers/queue-provider';

export interface ContentHubRegistry {
  adapter: ContentSourceAdapter;
  translation: TranslationProvider;
  asset: AssetProcessor;
  storage: StorageProvider;
  queue: QueueProvider;
}

export function createDefaultRegistry(): ContentHubRegistry {
  return {
    adapter: new GitHubAdapter(),
    translation: new GoogleTranslateProvider(),
    asset: new SharpProcessor(),
    storage: createAutoStorageProvider(),
    queue: new MemoryQueueProvider()
  };
}

let activeRegistry: ContentHubRegistry = createDefaultRegistry();

export function getRegistry(): ContentHubRegistry {
  return activeRegistry;
}

export function setRegistry(customRegistry: Partial<ContentHubRegistry>): void {
  activeRegistry = { ...activeRegistry, ...customRegistry };
}
