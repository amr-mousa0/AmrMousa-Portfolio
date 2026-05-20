const fs = require('fs');
let content = fs.readFileSync('public/js/translations.js', 'utf8');

const enAdd = `
        "service_web-portfolios_title": "Custom Web Portfolios",
        "service_web-portfolios_copy": "I design and develop ultra-fast, luxurious web portfolios and landing pages engineered to convert visitors into premium clients.",
        "service_web-portfolios_gig_0": "High-Converting Landing Pages",
        "service_web-portfolios_gig_1": "Personal & Corporate Portfolios",
        "service_web-portfolios_gig_2": "Responsive Mobile-First Design",
        "service_web-portfolios_gig_3": "Performance & SEO Optimization",
        "service_web-portfolios_cta": "Build Your Portfolio",
        
        "service_excel-expert_title": "Advanced Excel & Data Structuring",
        "service_excel-expert_copy": "Say goodbye to manual entry. I automate messy spreadsheets, build financial models, and create advanced VBA workflows.",
        "service_excel-expert_gig_0": "Automated Reports & Dashboards",
        "service_excel-expert_gig_1": "Financial Modeling & Forecasting",
        "service_excel-expert_gig_2": "VBA & Macro Automations",
        "service_excel-expert_gig_3": "Data Consolidation & Formatting",
        "service_excel-expert_cta": "Automate Spreadsheets",
        
        "service_crm-management_title": "CRM Setup & Workflow Automation",
        "service_crm-management_copy": "Replace repetitive manual tasks with streamlined automated workflows. I connect your CRM, spreadsheets, and apps to save hours.",
        "service_crm-management_gig_0": "CRM Architecture & Custom Setup",
        "service_crm-management_gig_1": "Lead Routing & Sales Funnels",
        "service_crm-management_gig_2": "Email Marketing Automations",
        "service_crm-management_gig_3": "Zapier / Make.com Integrations",
        "service_crm-management_cta": "Organize Your Workflow",`;

const arAdd = `
        "service_web-portfolios_title": "بناء بورتفوليو ومواقع إلكترونية مخصصة",
        "service_web-portfolios_copy": "أقوم بتصميم وتطوير مواقع هبوط وبورتفوليو سريعة وفخمة جداً، مصممة هندسياً لتحويل الزوار إلى عملاء فعليين.",
        "service_web-portfolios_gig_0": "صفحات هبوط عالية التحويل (Landing Pages)",
        "service_web-portfolios_gig_1": "معارض أعمال شخصية وللشركات (Portfolios)",
        "service_web-portfolios_gig_2": "تصميم متجاوب يعطي الأولوية للموبايل",
        "service_web-portfolios_gig_3": "تحسين الأداء ومحركات البحث (SEO)",
        "service_web-portfolios_cta": "ابنِ موقعك الآن",
        
        "service_excel-expert_title": "خبير إكسيل ومحلل بيانات",
        "service_excel-expert_copy": "وداعاً للإدخال اليدوي الممل. أقوم بأتمتة الجداول المعقدة، بناء نماذج مالية، وتطوير مسارات عمل احترافية عبر VBA.",
        "service_excel-expert_gig_0": "تقارير ولوحات معلومات مؤتمتة",
        "service_excel-expert_gig_1": "النمذجة المالية والتنبؤ المالي",
        "service_excel-expert_gig_2": "أتمتة الماكرو و VBA",
        "service_excel-expert_gig_3": "دمج البيانات وتنسيقها باحترافية",
        "service_excel-expert_cta": "أتمت جداولك الآن",
        
        "service_crm-management_title": "إدارة وعمل مسارات أتمتة الـ CRM",
        "service_crm-management_copy": "استبدل المهام اليدوية المتكررة بمسارات أتمتة سريعة. أربط نظام الـ CRM الخاص بك والتطبيقات والجداول لتوفر مجهودك.",
        "service_crm-management_gig_0": "بناء وتخصيص هيكل الـ CRM من الصفر",
        "service_crm-management_gig_1": "توجيه العملاء (Lead Routing) ومسارات البيع",
        "service_crm-management_gig_2": "أتمتة التسويق عبر البريد الإلكتروني",
        "service_crm-management_gig_3": "تكامل مع Zapier / Make.com",
        "service_crm-management_cta": "نظم مسارات عملك الآن",`;

content = content.replace('"en": {', '"en": {' + enAdd);
content = content.replace('"ar": {', '"ar": {' + arAdd);
fs.writeFileSync('public/js/translations.js', content);
