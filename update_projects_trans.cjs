const fs = require('fs');
const path = require('path');

const filepath = path.join(process.cwd(), 'public', 'js', 'translations.js');
let content = fs.readFileSync(filepath, 'utf8');

const enKeys = `
        "projects_subtitle": "Real results from real projects. See how we drive growth.",
        "case_study_back": "Back to Projects",
        "case_study_cta": "Start a Similar Project",
`;

const arKeys = `
        "projects_subtitle": "نتائج حقيقية من مشاريع حقيقية. شوف إزاي بنحقق نمو.",
        "case_study_back": "الرجوع للمشاريع",
        "case_study_cta": "ابدأ مشروع مشابه",
`;

content = content.replace(/"projects_title": "Projects",/, '"projects_title": "Projects",' + '\\n' + enKeys);
content = content.replace(/"projects_title": "المشاريع",/, '"projects_title": "المشاريع",' + '\\n' + arKeys);

fs.writeFileSync(filepath, content);
console.log("Projects translations updated!");
