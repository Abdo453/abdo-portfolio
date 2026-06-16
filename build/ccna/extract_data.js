const fs = require('fs');
const vm = require('vm');

if (!fs.existsSync('data')) {
    fs.mkdirSync('data');
}

function extractFile(fileName, varNames) {
    console.log('Extracting from', fileName);
    const code = fs.readFileSync(fileName, 'utf8');
    
    // Create a mock browser environment
    const context = {
        window: {},
        document: {
            addEventListener: () => {},
            getElementById: () => ({ classList: { remove: () => {} }, innerHTML: '', style: {} }),
            querySelectorAll: () => []
        },
        localStorage: { getItem: () => null, setItem: () => {} },
        setInterval: () => {},
        setTimeout: () => {}
    };
    
    vm.createContext(context);
    try {
        vm.runInContext(code, context);
        return varNames.map(v => context[v]);
    } catch(e) {
        console.error('Error parsing ' + fileName + ':', e.message);
        // Let's try eval strategy if vm fails
    }
}

// 1. Academy Data
let academyDataRes = extractFile('academy.js', ['academyData']) || [];
let academyData = academyDataRes[0];
if (academyData) {
    fs.writeFileSync('data/lessons.json', JSON.stringify(academyData, null, 4));
    console.log('Saved data/lessons.json');
}

// 2. Labs Data
let labsDataRes = extractFile('labs.js', ['simulatorLevels']) || [];
let simulatorLevels = labsDataRes[0];
if (simulatorLevels) {
    fs.writeFileSync('data/labs.json', JSON.stringify(simulatorLevels, null, 4));
    console.log('Saved data/labs.json');
}

// 3. Quizzes Data
let quizzesDataRes = extractFile('quizzes.js', ['quizzesData']) || [];
let quizzesData = quizzesDataRes[0];
if (quizzesData) {
    fs.writeFileSync('data/quizzes.json', JSON.stringify(quizzesData, null, 4));
    console.log('Saved data/quizzes.json');
}

// 4. Create empty structures for new files
const interviewsTemplate = [
    {
        lessonId: "lesson1",
        questions: [
            {
                q: "What is the difference between a Router and a Switch?",
                ideal: "A router operates at Layer 3...",
                junior: "Router connects networks, switch connects devices.",
                mistakes: "Saying a switch works with IP addresses."
            }
        ]
    }
];
fs.writeFileSync('data/interviews.json', JSON.stringify(interviewsTemplate, null, 4));
console.log('Saved data/interviews.json');

const examBlueprintTemplate = {
    totalQuestions: 100,
    timeLimitMinutes: 120,
    domains: [
        { name: "Network Fundamentals", weight: "20%" },
        { name: "Network Access", weight: "20%" },
        { name: "IP Connectivity", weight: "25%" },
        { name: "IP Services", weight: "10%" },
        { name: "Security Fundamentals", weight: "15%" },
        { name: "Automation and Programmability", weight: "10%" }
    ]
};
fs.writeFileSync('data/exam_blueprint.json', JSON.stringify(examBlueprintTemplate, null, 4));
console.log('Saved data/exam_blueprint.json');

console.log('Extraction complete.');
