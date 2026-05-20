const fs = require('fs');
const path = require('path');

const filepath = path.join(process.cwd(), 'public', 'js', 'translations.js');
let content = fs.readFileSync(filepath, 'utf8');

// We need to parse the object out of `const translations = { ... }`
// Actually, it's easier to just append the keys before the closing `}` of each section.

const enKeys = `
        // Services Section
        "services_title": "Services & Gigs",
        "services_subtitle": "Actionable solutions designed to solve bottlenecks and drive growth.",
        "gig_cta": "Inquire",

        "domain_data-analytics_title": "Data Analytics & BI",
        "domain_data-analytics_desc": "Transforming raw data into strategic decisions that solve operational bottlenecks and maximize ROI.",
        "gig_power-bi_title": "Power BI Interactive Dashboards",
        "gig_power-bi_desc": "Custom executive dashboards for sales tracking, inventory flow, and financial performance with real-time drill-down capabilities.",
        "gig_sql-expert_title": "SQL Querying & Database Analysis",
        "gig_sql-expert_desc": "Advanced SQL scripting to extract, clean, and analyze complex datasets from relational databases.",
        "gig_excel-cleaning_title": "Advanced Excel & Data Structuring",
        "gig_excel-cleaning_desc": "Automating workflows, cleaning messy datasets, and converting unstructured reports (PDF to Excel) into actionable tables.",
        "gig_etl-pipelines_title": "Data Cleaning & ETL Pipelines",
        "gig_etl-pipelines_desc": "Building automated pipelines to clean, transform, and merge messy data from multiple sources into a single source of truth.",
        "gig_financial-modeling_title": "Financial Modeling & Forecasting",
        "gig_financial-modeling_desc": "Advanced Excel/Power BI financial models, budgeting, cash flow analysis, and scenario planning for executives.",

        "domain_marketing_title": "Marketing & Media Buying",
        "domain_marketing_desc": "Driving targeted traffic and building high-converting funnels through data-backed marketing strategies.",
        "gig_media-buying_title": "Meta Media Buying & Ad Campaigns",
        "gig_media-buying_desc": "Precision media buying on Facebook and Instagram with advanced audience targeting and continuous ROAS optimization.",
        "gig_content-strategy_title": "Content Strategy & Development",
        "gig_content-strategy_desc": "Mapping out comprehensive content plans tailored to each stage of the customer journey (Awareness to Conversion).",
        "gig_social-management_title": "Social Media Management & Design",
        "gig_social-management_desc": "Managing brand presence, creating eye-catching graphics (25+ designs executed), and fostering community engagement.",
        "gig_google-ads_title": "Google Ads & Search Intent Marketing",
        "gig_google-ads_desc": "Capturing high-intent search traffic with optimized Google Search, Display, and Performance Max campaigns.",
        "gig_cro-audit_title": "Conversion Rate Optimization (CRO)",
        "gig_cro-audit_desc": "Auditing landing pages and user flows to identify drop-off points, conduct A/B testing, and boost conversion percentages.",

        "domain_tech-web_title": "Tech & Web Solutions",
        "domain_tech-web_desc": "Building the digital infrastructure required to capture leads and manage customer relationships effectively.",
        "gig_web-dev_title": "Custom Web Development",
        "gig_web-dev_desc": "Developing fast, responsive, and beautifully designed landing pages and portfolios engineered to convert visitors into clients.",
        "gig_crm-setup_title": "CRM Setup & Management",
        "gig_crm-setup_desc": "Implementing and customizing CRM platforms to track sales pipelines, automate follow-ups, and retain customer data.",
        "gig_landing-pages_title": "High-Converting Landing Pages",
        "gig_landing-pages_desc": "Developing ultra-fast, mobile-first landing pages specifically engineered for paid ad campaigns with zero friction.",
        "gig_web-analytics_title": "Web Analytics & Pixel Tracking",
        "gig_web-analytics_desc": "Setting up Google Tag Manager (GTM), Meta Pixel, Google Analytics 4 (GA4), and Conversion API (CAPI) for precise ad tracking.",
`;

const arKeys = `
        // Services Section
        "services_title": "الخدمات",
        "services_subtitle": "حلول عملية مصممة لحل مشاكل التشغيل ودفع عجلة النمو.",
        "gig_cta": "استفسر",

        "domain_data-analytics_title": "تحليل البيانات وذكاء الأعمال",
        "domain_data-analytics_desc": "تحويل البيانات الخام لقرارات استراتيجية بتحل مشاكل التشغيل وبتعظم العائد على الاستثمار.",
        "gig_power-bi_title": "لوحات تحكم تفاعلية (Power BI)",
        "gig_power-bi_desc": "لوحات تنفيذية مخصصة لتتبع المبيعات، حركة المخزون، والأداء المالي بشكل لحظي وتفصيلي.",
        "gig_sql-expert_title": "تحليل قواعد البيانات بـ SQL",
        "gig_sql-expert_desc": "كتابة سكريبتات SQL متقدمة لاستخراج وتنظيف وتحليل مجموعات البيانات المعقدة من قواعد البيانات.",
        "gig_excel-cleaning_title": "أكسيل متقدم وهيكلة البيانات",
        "gig_excel-cleaning_desc": "أتمتة المهام، تنظيف البيانات العشوائية، وتحويل التقارير غير المهيكلة لجداول عملية.",
        "gig_etl-pipelines_title": "هندسة وتنظيف البيانات (ETL)",
        "gig_etl-pipelines_desc": "بناء مسارات مؤتمتة لتنظيف ودمج البيانات من مصادر متعددة في مصدر واحد موثوق.",
        "gig_financial-modeling_title": "النماذج المالية والتوقعات",
        "gig_financial-modeling_desc": "نماذج مالية متقدمة، تخطيط الميزانيات، وتحليل التدفقات النقدية لدعم الإدارة العليا.",

        "domain_marketing_title": "التسويق وشراء المساحات الإعلانية",
        "domain_marketing_desc": "جذب زيارات مستهدفة وبناء قمع مبيعات عالي التحويل من خلال استراتيجيات تسويق مبنية على البيانات.",
        "gig_media-buying_title": "إعلانات ميتا (فيسبوك وإنستجرام)",
        "gig_media-buying_desc": "إدارة الإعلانات باستهداف دقيق للجمهور وتحسين مستمر للعائد على الإنفاق الإعلاني (ROAS).",
        "gig_content-strategy_title": "استراتيجية وتطوير المحتوى",
        "gig_content-strategy_desc": "تخطيط محتوى متكامل مخصص لكل مرحلة من مراحل رحلة العميل (من الوعي للتحويل).",
        "gig_social-management_title": "إدارة السوشيال ميديا والتصميم",
        "gig_social-management_desc": "إدارة تواجد علامتك التجارية، تصميمات جذابة، وزيادة تفاعل المجتمع.",
        "gig_google-ads_title": "إعلانات جوجل والتسويق عبر البحث",
        "gig_google-ads_desc": "استهداف العملاء ذوي النية الشرائية العالية بحملات إعلانية مُحسنة على شبكة البحث والظهور.",
        "gig_cro-audit_title": "تحسين معدل التحويل (CRO)",
        "gig_cro-audit_desc": "مراجعة صفحات الهبوط ومسار المستخدم لتحديد نقاط التسرب وإجراء اختبارات A/B لزيادة المبيعات.",

        "domain_tech-web_title": "الحلول التقنية وبرمجة الويب",
        "domain_tech-web_desc": "بناء البنية التحتية الرقمية المطلوبة لجمع العملاء المحتملين وإدارة العلاقات بفعالية.",
        "gig_web-dev_title": "برمجة مواقع مخصصة",
        "gig_web-dev_desc": "برمجة صفحات هبوط ومواقع سريعة ومتجاوبة ومصممة خصيصاً لتحويل الزوار لعملاء.",
        "gig_crm-setup_title": "إعداد وإدارة الـ CRM",
        "gig_crm-setup_desc": "تطبيق وتخصيص أنظمة إدارة علاقات العملاء لتتبع المبيعات وأتمتة المتابعات.",
        "gig_landing-pages_title": "صفحات هبوط عالية التحويل",
        "gig_landing-pages_desc": "تطوير صفحات هبوط سريعة جداً مُهندسة خصيصاً لحملات الإعلانات المدفوعة.",
        "gig_web-analytics_title": "تحليلات الويب وتتبع البيكسل",
        "gig_web-analytics_desc": "إعداد GTM وبيكسل ميتا وGA4 لتتبع دقيق لأداء الإعلانات وتحركات المستخدمين.",
`;

// Insert enKeys before the 'ar: {' block or at the end of 'en' block
content = content.replace(/\\s*ar:\\s*\\{/, enKeys + '\\n    ar: {');

// Insert arKeys at the very end before the final '}'
content = content.replace(/\\s*\\}\\s*;?\\s*$/, arKeys + '\\n};\\n');

fs.writeFileSync(filepath, content);
console.log("Translations updated!");
