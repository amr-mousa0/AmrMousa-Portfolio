const fs = require('fs');
const path = require('path');

const filepath = path.join(process.cwd(), 'public', 'js', 'translations.js');
let content = fs.readFileSync(filepath, 'utf8');

const enKeys = `
        "sticky_whatsapp": "WhatsApp",
        "sticky_call": "Call Me",
`;

const arKeys = `
        "sticky_whatsapp": "واتساب",
        "sticky_call": "اتصل بيا",
`;

content = content.replace(/"contact_location": "Cairo - Egypt"/, '"contact_location": "Cairo - Egypt",' + '\\n' + enKeys);
content = content.replace(/"contact_location": "القاهرة - مصر"/, '"contact_location": "القاهرة - مصر",' + '\\n' + arKeys);

fs.writeFileSync(filepath, content);
console.log("Sticky CTA translations updated!");
