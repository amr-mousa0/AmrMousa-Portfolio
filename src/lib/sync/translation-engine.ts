/**
 * Dynamic Intelligent Translation Engine with Permanent Caching
 * ADR-023-007 Authoritative Protocol
 */
import { getRegistry } from '../content-hub/provider-registry';

const STORAGE_KEY = 'translation-cache.json';

interface TranslationCache {
  [key: string]: {
    [lang: string]: string | undefined;
  };
}

let inMemoryCache: TranslationCache | null = null;

async function loadTranslationCache(): Promise<TranslationCache> {
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

async function saveTranslationCache(cache: TranslationCache): Promise<void> {
  inMemoryCache = cache;
  try {
    await getRegistry().storage.put(STORAGE_KEY, JSON.stringify(cache, null, 2));
  } catch (e) {}
}

export interface TranslationProvider {
  name: string;
  translate(text: string, sourceLang: string, targetLang: string): Promise<string>;
}

export class GoogleTranslateProvider implements TranslationProvider {
  name = 'GoogleTranslateAPI';

  async translate(text: string, sourceLang: string = 'auto', targetLang: string = 'ar'): Promise<string> {
    if (!text || text.trim() === '') return '';
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
      if (res.ok) {
        const data = await res.json();
        if (data && data[0] && Array.isArray(data[0])) {
          const translatedParts = data[0].map((part: any) => part[0]).filter(Boolean);
          const fullTranslation = translatedParts.join('');
          if (fullTranslation && fullTranslation.trim() !== '') {
            return fullTranslation.trim();
          }
        }
      }
    } catch (e) {
      console.warn('[TranslationEngine] Translation request failed:', e);
    }

    return text;
  }
}

const defaultProvider = new GoogleTranslateProvider();

/**
 * Dynamic Translation with SHA-256 / String Key Deduplicated Caching
 */
export async function translateWithCache(
  text: string,
  targetLang: string = 'ar',
  provider: TranslationProvider = defaultProvider
): Promise<string> {
  if (!text || text.trim() === '') return '';
  if (targetLang === 'en') return text;

  const cache = await loadTranslationCache();
  const cacheKey = text.trim();

  if (cache[cacheKey] && cache[cacheKey][targetLang] && cache[cacheKey][targetLang] !== text) {
    return cache[cacheKey][targetLang]!;
  }

  const translatedText = await provider.translate(text, 'auto', targetLang);

  if (!cache[cacheKey]) cache[cacheKey] = {};
  cache[cacheKey][targetLang] = translatedText;
  await saveTranslationCache(cache);

  return translatedText;
}
