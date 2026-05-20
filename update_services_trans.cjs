const fs = require('fs');
let content = fs.readFileSync('public/js/translations.js', 'utf8');

const enAdd = `
        "service_data-analytics_title": "Data Analytics & BI Dashboards",
        "service_data-analytics_copy": "Stop guessing. I transform raw data into interactive dashboards that reveal bottlenecks, track live KPIs, and maximize ROI.",
        "service_data-analytics_gig_0": "Interactive Sales & KPI Dashboards",
        "service_data-analytics_gig_1": "Real-time ROI Tracking",
        "service_data-analytics_gig_2": "Custom SQL Queries & Data Modeling",
        "service_data-analytics_gig_3": "Data Cleaning & Processing",
        "service_data-analytics_cta": "Inquire about Dashboards",
        "service_media-buying_title": "Marketing Strategy & Media Buying",
        "service_media-buying_copy": "Expose which ad campaigns actually convert. I manage and scale paid campaigns to eliminate wasted ad spend and drive qualified leads.",
        "service_media-buying_gig_0": "Meta Ads Campaign Management",
        "service_media-buying_gig_1": "A/B Testing & ROAS Optimization",
        "service_media-buying_gig_2": "Pixel Setup & Conversion Tracking",
        "service_media-buying_gig_3": "Comprehensive Campaign Audits",
        "service_media-buying_cta": "Scale Your Campaigns",
        "service_automation_title": "Workflow & Business Automation",
        "service_automation_copy": "Replace repetitive manual tasks with streamlined automated workflows. I connect your CRM, spreadsheets, and apps to save hours.",
        "service_automation_gig_0": "CRM Lead Routing Automation",
        "service_automation_gig_1": "Email Marketing Automations",
        "service_automation_gig_2": "Custom Zapier / Make.com Flows",
        "service_automation_gig_3": "3rd-Party API Integrations",
        "service_automation_cta": "Automate Your Workflow",`;

const arAdd = `
        "service_data-analytics_title": "تحليل البيانات ولوحات ذكاء الأعمال",
        "service_data-analytics_copy": "توقف عن التخمين. أحول البيانات الخام إلى لوحات تفاعلية تكشف عن الاختناقات وتتبع الأداء وتعظم العائد.",
        "service_data-analytics_gig_0": "لوحات تفاعلية للمبيعات ومؤشرات الأداء",
        "service_data-analytics_gig_1": "تتبع العائد على الاستثمار لحظياً",
        "service_data-analytics_gig_2": "استعلامات SQL مخصصة ونمذجة البيانات",
        "service_data-analytics_gig_3": "تنظيف ومعالجة البيانات",
        "service_data-analytics_cta": "استفسر عن اللوحات التفاعلية",
        "service_media-buying_title": "استراتيجية التسويق وشراء الإعلانات",
        "service_media-buying_copy": "اكتشف أي الحملات تحقق تحويلات فعلية. أدير الحملات المدفوعة للقضاء على الهدر وجلب عملاء محتملين.",
        "service_media-buying_gig_0": "إدارة حملات إعلانات ميتا",
        "service_media-buying_gig_1": "اختبار A/B وتحسين العائد الإعلاني",
        "service_media-buying_gig_2": "إعداد بيكسل وتتبع التحويلات",
        "service_media-buying_gig_3": "مراجعة وتدقيق شامل للحملات",
        "service_media-buying_cta": "ضاعف مبيعاتك الآن",
        "service_automation_title": "أتمتة سير العمل والأعمال",
        "service_automation_copy": "استبدل المهام اليدوية بمسارات آلية مبسطة. أربط نظام إدارة العملاء والتطبيقات لتوفير وقتك.",
        "service_automation_gig_0": "أتمتة توجيه عملاء الـ CRM",
        "service_automation_gig_1": "أتمتة التسويق عبر البريد الإلكتروني",
        "service_automation_gig_2": "مسارات Zapier مخصصة",
        "service_automation_gig_3": "تكامل الـ API مع التطبيقات الخارجية",
        "service_automation_cta": "أتمت عملك الآن",`;

content = content.replace('"en": {', '"en": {' + enAdd);
content = content.replace('"ar": {', '"ar": {' + arAdd);
fs.writeFileSync('public/js/translations.js', content);
