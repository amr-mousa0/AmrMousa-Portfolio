# Data Model: Language Dictionary

The localization data is a static JSON/JS Object.

## Entity: TranslationDictionary

Fields:
- `en`: Object containing key-value pairs for English.
- `ar`: Object containing key-value pairs for Egyptian Arabic.

Example Structure:
```javascript
const dictionary = {
  en: {
    "title": "Mohammed Wagdy | Architectural & Interior Designer",
    "hero_designer": "Architectural & Interior Designer",
    "name": "Mohammed Wagdy"
  },
  ar: {
    "title": "Mohammed Wagdy | مصمم معماري وديكور داخلي",
    "hero_designer": "مصمم معماري وديكور داخلي",
    "name": "Mohammed Wagdy" // FR-004: Do not translate proper nouns
  }
}
```
