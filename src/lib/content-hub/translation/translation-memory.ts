/**
 * Translation Memory Engine (Permanent & Keyed)
 * ADR-023-008 Authoritative Protocol
 * 
 * Keying invariant: SHA256(sourceText) + provider + sourceLang + targetLang
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import type { TranslationProvider } from '../providers/translation-provider';

const TRANSLATION_MEMORY_PATH = path.resolve('.cache/translation-memory.json');

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

function loadTranslationMemory(): MemoryStore {
  try {
    if (fs.existsSync(TRANSLATION_MEMORY_PATH)) {
      return JSON.parse(fs.readFileSync(TRANSLATION_MEMORY_PATH, 'utf-8'));
    }
  } catch (e) {}
  return {};
}

function saveTranslationMemory(memory: MemoryStore): void {
  try {
    const dir = path.dirname(TRANSLATION_MEMORY_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(TRANSLATION_MEMORY_PATH, JSON.stringify(memory, null, 2));
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
    const memory = loadTranslationMemory();

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
    saveTranslationMemory(memory);

    return translated;
  }
}
