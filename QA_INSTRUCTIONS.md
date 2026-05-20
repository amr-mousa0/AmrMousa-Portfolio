# Quality Assurance (QA) Guide

الملف ده بيشرح إزاي تشغل اختبارات Playwright و Lighthouse اللي عملناها عشان تتأكد إن الموقع شغال تمام ومفيش أي أخطاء.

## 1. Playwright (اختبارات تفاعل المستخدم)
أداة Playwright بتفتح الموقع في متصفحات وهمية وتجرب تدوس وتعمل Scroll زأكنها مستخدم حقيقي.

**عشان تشغلها وتشوفها بعينك (واجهة رسومية UI):**
```bash
npx playwright test --ui
```
*(ده هيفتح لك شاشة تقدر تختار منها الاختبار اللي عايز تشغله وتتفرج عليه وهو بيعمل كليك وScroll)*

**عشان تشغلها في الخلفية (أسرع):**
```bash
npx playwright test
```

**عشان تطلع تقرير كامل بالأخطاء (لو حصلت):**
```bash
npx playwright show-report
```

---

## 2. Lighthouse CI (اختبارات الأداء والسرعة والـ SEO)
دي أداة من جوجل بتقيس سرعة الموقع، وأداء الـ SEO، والـ Accessibility.

**الخطوة الأولى: لازم تعمل Build للمشروع الأول:**
```bash
npm run build
```

**الخطوة التانية: شغل الأداة عشان تفحص الفولدر اللي اتعمله Build:**
```bash
npx lhci autorun
```
*(الأداة دي هترجع لك Error لو الأداء أقل من 98% أو لو الـ SEO مش 100% زي ما طلبنا في الإعدادات).*

---

## 3. اختصارات جاهزة (لو حبيت تضيفها في package.json)
ممكن تفتح ملف `package.json` وتضيف السطور دي جوه جزء الـ `"scripts"` عشان تسهل على نفسك:
```json
"test:e2e": "playwright test",
"test:ui": "playwright test --ui",
"test:lighthouse": "npm run build && lhci autorun"
```
وبكده تقدر ترنهم بأوامر بسيطة زي `npm run test:ui`.

مهم جدا جدا 
.\run-qa.bat 