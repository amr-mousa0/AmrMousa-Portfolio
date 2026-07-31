/**
 * Translation Memory Engine (Permanent & Keyed)
 * ADR-023-008 Authoritative Protocol
 * 
 * Keying invariant: SHA256(sourceText) + provider + sourceLang + targetLang
 */
import crypto from 'crypto';
import type { TranslationProvider } from '../providers/translation-provider';
import { getRegistry } from '../provider-registry';

const STORAGE_KEY = 'translation-memory.json';

interface MemoryRecord {
  sourceHash: string;
  sourceText: string;
  translatedText: string;
  provider: string;
  sourceLang: string;
  targetLang: string;
  createdAt: string;
}

interface MemoryStore {
  [key: string]: MemoryRecord;
}

let inMemoryCache: MemoryStore | null = null;

async function loadTranslationMemory(): Promise<MemoryStore> {
  if (inMemoryCache) return inMemoryCache;
  try {
    const raw = await getRegistry().storage.get(STORAGE_KEY);
    if (raw) {
      const content = typeof raw === 'string' ? raw : raw.toString('utf-8');
      inMemoryCache = JSON.parse(content);
      return inMemoryCache!;
    }
  } catch (e) {}
  inMemoryCache = {};
  return inMemoryCache;
}

async function saveTranslationMemory(memory: MemoryStore): Promise<void> {
  inMemoryCache = memory;
  try {
    await getRegistry().storage.put(STORAGE_KEY, JSON.stringify(memory, null, 2));
  } catch (e) {}
}

export function computeTranslationKey(
  sourceText: string,
  providerName: string,
  sourceLang: string = 'auto',
  targetLang: string = 'ar'
): string {
  const textHash = crypto.createHash('sha256').update(sourceText.trim()).digest('hex');
  return `${textHash}:${providerName}:${sourceLang}:${targetLang}`;
}

export class TranslationMemoryEngine {
  static async translateWithMemory(
    sourceText: string,
    provider: TranslationProvider,
    sourceLang: string = 'auto',
    targetLang: string = 'ar'
  ): Promise<string> {
    if (!sourceText || sourceText.trim() === '') return '';
    if (targetLang === 'en') return sourceText;

    const memoryKey = computeTranslationKey(sourceText, provider.name, sourceLang, targetLang);
    const memory = await loadTranslationMemory();

    // 1. Permanent Memory Hit Check
    if (memory[memoryKey] && memory[memoryKey].translatedText) {
      return memory[memoryKey].translatedText;
    }

    // 2. Perform Dynamic Translation
    const translated = await provider.translate(sourceText, sourceLang, targetLang);

    // 3. Store Permanently in Memory
    memory[memoryKey] = {
      sourceHash: crypto.createHash('sha256').update(sourceText.trim()).digest('hex'),
      sourceText: sourceText.trim(),
      translatedText: translated,
      provider: provider.name,
      sourceLang,
      targetLang,
      createdAt: new Date().toISOString()
    };
    await saveTranslationMemory(memory);

    return translated;
  }
}
