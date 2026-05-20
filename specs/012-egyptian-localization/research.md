# Research: Egyptian Arabic Localization

## Arabic Text Expansion in RTL
- **Decision**: Use `max-width` and `line-height` adjustments for `[dir="rtl"]`.
- **Rationale**: Arabic text often requires larger `line-height` (e.g., 1.6 to 1.8) for optimal legibility compared to Latin scripts. Text length can vary, so flexbox wrapping and `word-break` adjustments might be needed.
- **Alternatives considered**: Fixed height cards (rejected because it breaks on text expansion).

## Handling Proper Nouns
- **Decision**: Wrap proper nouns (e.g., "Mohammed Wagdy") in a `<span class="notranslate" dir="ltr">` if needed, or simply map the key to the same exact string in the English and Arabic dictionary.
- **Rationale**: Keeps the brand intact and satisfies FR-004.

## Cinematic Loader Integration
- **Decision**: Hook into the existing `loader` element ID/Class. On toggle click, show the loader, update DOM, `setTimeout` for ~500ms, hide the loader.
- **Rationale**: This is a pure vanilla JS approach that leverages the existing luxury loader without new dependencies.
