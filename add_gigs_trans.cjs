const fs = require('fs');

const gigsData = JSON.parse(fs.readFileSync('src/data/gigs.json', 'utf8'));

let enKeys = {};
let arKeys = {};

// Common CTA
enKeys['gig_cta'] = 'Inquire';
arKeys['gig_cta'] = 'استفسر الآن';
enKeys['services_subtitle'] = 'Actionable solutions designed to solve bottlenecks and drive growth.';
arKeys['services_subtitle'] = 'حلول عملية مصممة لحل مشاكل التشغيل وتحقيق نمو حقيقي.';
enKeys['services_title'] = 'Services & Gigs';
arKeys['services_title'] = 'الخدمات والحلول المتاحة';

const translationsAr = {
  "data-analytics": { domain: "تحليل البيانات وذكاء الأعمال", desc: "تحويل البيانات الخام لقرارات استراتيجية تحل مشاكل التشغيل وتعظم الأرباح." },
  "power-bi": { title: "لوحات تحكم تفاعلية Power BI", desc: "لوحات تحكم مخصصة للمديرين لمتابعة المبيعات، المخزون، والأداء المالي بتحديث لحظي." },
  "sql-expert": { title: "تحليل قواعد البيانات بـ SQL", desc: "كتابة استعلامات متقدمة لاستخراج وتنظيف وتحليل البيانات المعقدة." },
  "excel-cleaning": { title: "إكسيل متقدم وتنظيم البيانات", desc: "أتمتة سير العمل، تنظيف البيانات العشوائية، وتحويل التقارير لجداول جاهزة." },
  "etl-pipelines": { title: "تنظيف البيانات وبناء خطوط ETL", desc: "بناء مسارات تلقائية لتنظيف ودمج البيانات من مصادر مختلفة." },

  "growth-marketing": { domain: "التسويق الاستراتيجي والنمو", desc: "استراتيجيات مبنية على البيانات لتحسين الاستحواذ على العملاء، زيادة التفاعل، وتقليل التكلفة." },
  "performance-audit": { title: "تدقيق أداء الحملات", desc: "تحليل شامل لحملات السوشيال ميديا للبحث عن فرص تقليل تكلفة العميل (CAC)." },
  "market-research": { title: "أبحاث السوق وتحليل المنافسين", desc: "تحليل SWOT مفصل ودراسات مقارنة لاكتشاف فجوات السوق." },
  "marketing-mix": { title: "نمذجة المزيج التسويقي", desc: "التحليل الإحصائي لتحديد أفضل قنوات تسويق وتوزيع الميزانية." },
  "retention-strategy": { title: "استراتيجيات الاحتفاظ بالعملاء", desc: "تحديد أسباب خسارة العملاء ووضع خطط لزيادة قيمتهم (LTV)." },
  "seo-analytics": { title: "تحليل السيو (SEO) والكلمات المفتاحية", desc: "تحليل أداء الموقع باستخدام بيانات جوجل لتصدر نتائج البحث." },
  "cro-testing": { title: "اختبارات A/B وتحسين التحويل", desc: "تصميم وتحليل تجارب التسويق لزيادة نسب التحويل والمبيعات." },

  "tech-automation": { domain: "الحلول التقنية والأتمتة", desc: "بناء أنظمة متكاملة وأدوات لتبسيط العمليات وتقليل التدخل البشري." },
  "python-automation": { title: "أتمتة العمليات بـ Python", desc: "كتابة سكريبتات لأتمتة المهام المتكررة وتجميع البيانات من الويب." },
  "api-integration": { title: "ربط الأنظمة عبر API", desc: "ربط الأدوات التسويقية وقواعد البيانات عشان تشتغل مع بعض بانسجام." },
  "dash-web": { title: "تطبيقات داشبورد للويب", desc: "بناء تطبيقات خفيفة لعرض البيانات لمشاركتها مع فريقك بأمان." },
  "google-scripts": { title: "أتمتة جوجل شيتس", desc: "تطوير أدوات مخصصة داخل جداول جوجل لتسهيل إدارة الفريق." }
};

gigsData.forEach(domain => {
  enKeys[`domain_${domain.id}_title`] = domain.domain;
  enKeys[`domain_${domain.id}_desc`] = domain.description;
  
  if(translationsAr[domain.id]) {
      arKeys[`domain_${domain.id}_title`] = translationsAr[domain.id].domain;
      arKeys[`domain_${domain.id}_desc`] = translationsAr[domain.id].desc;
  }

  domain.services.forEach(gig => {
    enKeys[`gig_${gig.id}_title`] = gig.title;
    enKeys[`gig_${gig.id}_desc`] = gig.description;

    if(translationsAr[gig.id]) {
        arKeys[`gig_${gig.id}_title`] = translationsAr[gig.id].title;
        arKeys[`gig_${gig.id}_desc`] = translationsAr[gig.id].desc;
    }
  });
});

let enStr = "";
for(let k in enKeys) {
  enStr += `        "${k}": ${JSON.stringify(enKeys[k])},\n`;
}

let arStr = "";
for(let k in arKeys) {
  arStr += `        "${k}": ${JSON.stringify(arKeys[k])},\n`;
}

let transFile = fs.readFileSync('public/js/translations.js', 'utf8');

transFile = transFile.replace(/"services_title": "Professional Services",/, enStr);
transFile = transFile.replace(/"services_title": "الخدمات المهنية",/, arStr);

fs.writeFileSync('public/js/translations.js', transFile);
console.log("Added 14 gigs and domains translations successfully!");
