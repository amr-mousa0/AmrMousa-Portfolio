/**
 * TranslationProvider Interface & Implementations
 * ADR-023-008 Authoritative Protocol
 */

export interface TranslationProvider {
  name: string;
  translate(text: string, sourceLang: string, targetLang: string): Promise<string>;
}

export class GoogleTranslateProvider implements TranslationProvider {
  name = 'GoogleTranslateProvider';

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
      console.warn('[GoogleTranslateProvider] Request failed:', e);
    }
    return text;
  }
}

export class LibreTranslateProvider implements TranslationProvider {
  name = 'LibreTranslateProvider';
  async translate(text: string): Promise<string> { return text; }
}

export class OpenAITranslateProvider implements TranslationProvider {
  name = 'OpenAITranslateProvider';
  async translate(text: string): Promise<string> { return text; }
}

export class DeepLTranslateProvider implements TranslationProvider {
  name = 'DeepLTranslateProvider';
  async translate(text: string): Promise<string> { return text; }
}
