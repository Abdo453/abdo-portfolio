// State variables
let currentPhaseIndex = 0;
let currentLevelIndex = 0;
let currentLevel = null;

let term;
let fitAddon;
let currentInput = '';

// Cisco Router State
let routerState = {
    hostname: 'Router',
    mode: 'user', // modes: 'user' (>), 'priv' (#), 'config' (config)#
    interfaces: {},
    runningConfig: ''
};

function getPrompt() {
    let suffix = '>';
    if (routerState.mode === 'priv') suffix = '#';
    else if (routerState.mode === 'config') suffix = '(config)#';
    else if (routerState.mode === 'config-vlan') suffix = '(config-vlan)#';
    else if (routerState.mode === 'config-if') suffix = '(config-if)#';
    
    return `${routerState.hostname}${suffix}`;
}

function initTerminal() {
    term = new Terminal({
        theme: {
            background: '#000000',
            foreground: '#00ff00',
            cursor: '#00ff00'
        },
        fontFamily: '"Fira Code", monospace',
        fontSize: 16,
        cursorBlink: true
    });
    
    fitAddon = new FitAddon.FitAddon();
    term.loadAddon(fitAddon);
    term.open(document.getElementById('xterm-container'));
    fitAddon.fit();
    
    window.addEventListener('resize', () => {
        fitAddon.fit();
    });

    term.writeln('System Bootstrap, Version 15.1(4)M4, RELEASE SOFTWARE (fc1)');
    term.writeln('Copyright (c) 1986-2026 by Cisco Systems, Inc.');
    term.writeln('Press RETURN to get started.');
    term.write('\r\n' + getPrompt());

    term.onKey(e => {
        const ev = e.domEvent;
        const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

        if (ev.keyCode === 13) { // Enter
            term.write('\r\n');
            processCommand(currentInput.trim());
            currentInput = '';
            term.write(getPrompt());
        } else if (ev.keyCode === 8) { // Backspace
            if (term._core.buffer.x > getPrompt().length) {
                currentInput = currentInput.slice(0, -1);
                term.write('\b \b');
            }
        } else if (printable) {
            currentInput += e.key;
            term.write(e.key);
        }
    });
}

function processCommand(cmd) {
    if (!cmd) return;

    let parts = cmd.toLowerCase().split(' ');
    let mainCmd = parts[0];

    // Basic Command Parser
    if (mainCmd === 'enable' || mainCmd === 'en') {
        if (routerState.mode === 'user') routerState.mode = 'priv';
    } 
    else if (mainCmd === 'disable') {
        if (routerState.mode === 'priv') routerState.mode = 'user';
    }
    else if ((mainCmd === 'configure' && parts[1] === 'terminal') || cmd.toLowerCase() === 'conf t') {
        if (routerState.mode === 'priv') routerState.mode = 'config';
        else term.writeln('% Error: Must be in privileged mode.');
    }
    else if (mainCmd === 'exit') {
        if (routerState.mode === 'config-vlan') routerState.mode = 'config';
        else if (routerState.mode === 'config-if') routerState.mode = 'config';
        else if (routerState.mode === 'config') routerState.mode = 'priv';
        else if (routerState.mode === 'priv') routerState.mode = 'user';
    }
    else if (mainCmd === 'hostname' && routerState.mode === 'config') {
        if (parts[1]) {
            routerState.hostname = parts[1]; // Case sensitive for hostname
        }
    }
    else if (mainCmd === 'vlan' && routerState.mode === 'config') {
        if (parts[1]) {
            routerState.mode = 'config-vlan';
            if (!routerState.vlans) routerState.vlans = {};
            routerState.currentVlan = parts[1];
            if (!routerState.vlans[parts[1]]) {
                routerState.vlans[parts[1]] = { name: `VLAN${parts[1]}` };
            }
        }
    }
    else if (mainCmd === 'name' && routerState.mode === 'config-vlan') {
        if (parts[1]) {
            let vlanName = cmd.substring(5).trim(); // Keep exact casing
            if (routerState.currentVlan && routerState.vlans[routerState.currentVlan]) {
                routerState.vlans[routerState.currentVlan].name = vlanName;
            }
        }
    }
    else if (mainCmd === 'ip' && parts[1] === 'route' && routerState.mode === 'config') {
        if (parts[2] && parts[3] && parts[4]) {
            if (!routerState.routes) routerState.routes = [];
            routerState.routes.push({ network: parts[2], mask: parts[3], nextHop: parts[4] });
        } else {
            term.writeln('% Incomplete command.');
        }
    }
    else if ((mainCmd === 'interface' || mainCmd === 'int') && routerState.mode === 'config') {
        if (parts[1]) {
            routerState.mode = 'config-if';
            routerState.currentIf = parts[1];
            if (!routerState.interfaces) routerState.interfaces = {};
            if (!routerState.interfaces[parts[1]]) {
                routerState.interfaces[parts[1]] = {};
            }
        }
    }
    else if (mainCmd === 'switchport' && routerState.mode === 'config-if') {
        let intf = routerState.interfaces[routerState.currentIf];
        if (parts[1] === 'mode' && parts[2] === 'access') {
            intf.mode = 'access';
        } else if (parts[1] === 'port-security') {
            if (!parts[2]) {
                intf.portSecurityEnabled = true;
            } else if (parts[2] === 'violation' && parts[3]) {
                intf.violation = parts[3];
            }
        }
    }
    else if (mainCmd === 'show' && routerState.mode !== 'user') {
        term.writeln('Showing output (simulated)...');
    }
    else {
        term.writeln('% Invalid input detected at \'^\' marker.');
    }

    checkChallenge();
}

function checkChallenge() {
    if (!currentLevel) return;
    
    let isPassed = currentLevel.validate(routerState);
    if (isPassed) {
        document.getElementById('statusBox').classList.add('success');
        document.getElementById('challengeStatus').innerText = "نجاح! لقد أتممت التحدي.";
        
        // Show success msg in terminal
        term.writeln('');
        term.writeln('\x1b[32m*** CHALLENGE COMPLETED ***\x1b[0m');
        
        // Setup next level logic here (optional auto-advance)
    }
}

function buildUI() {
    const selector = document.getElementById('phaseSelector');
    
    window.ccnaCurriculum.forEach((phaseObj, pIndex) => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = phaseObj.phase;
        
        phaseObj.levels.forEach((lvl, lIndex) => {
            const opt = document.createElement('option');
            opt.value = `${pIndex}-${lIndex}`;
            opt.innerText = lvl.title;
            optgroup.appendChild(opt);
        });
        
        selector.appendChild(optgroup);
    });

    // Load first level
    selector.value = "0-0";
    loadPhase("0-0");
}

window.loadPhase = function(val) {
    let [p, l] = val.split('-');
    currentPhaseIndex = parseInt(p);
    currentLevelIndex = parseInt(l);
    currentLevel = window.ccnaCurriculum[currentPhaseIndex].levels[currentLevelIndex];

    document.getElementById('theoryContent').innerHTML = currentLevel.theory;
    document.getElementById('challengeStatus').innerText = currentLevel.challengeText;
    document.getElementById('statusBox').classList.remove('success');

    // Reset Router State for new level
    routerState.mode = 'user';
    routerState.hostname = 'Router';
    if(term) {
        term.writeln('\r\n\x1b[36m--- Level Loaded: ' + currentLevel.title + ' ---\x1b[0m');
        term.write(getPrompt());
    }
};

window.onload = () => {
    buildUI();
    initTerminal();
};
