# UI Contracts: Localization

## DOM Data Attributes
- Elements that need translation MUST include the attribute `data-i18n="[key]"`.
- Example: `<h1 data-i18n="hero_designer">Architectural & Interior Designer</h1>`

## Direction State
- The `<html>` tag MUST toggle between `<html lang="en" dir="ltr">` and `<html lang="ar" dir="rtl">`.
