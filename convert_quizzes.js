
const fs = require('fs');
let content = fs.readFileSync('d:/abdo_portfolio/old_quizzes.js', 'utf16le');
content = content.replace(/window\.quizzesData\s*=\s*/, '');
content = content.replace(/;\s*$/, '');
// Need to evaluate it
let data;
eval('data = ' + content);
fs.writeFileSync('d:/abdo_portfolio/build/ccna/data/quizzes.json', JSON.stringify(data, null, 4), 'utf8');
console.log('Quizzes converted to JSON successfully.');
