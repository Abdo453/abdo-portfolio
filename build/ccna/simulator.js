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
    if (routerState.isLinux) {
        return `\x1b[31mroot@kali\x1b[0m:\x1b[34m~\x1b[0m# `;
    }

    let suffix = '>';
    if (routerState.mode === 'priv') suffix = '#';
    else if (routerState.mode === 'config') suffix = '(config)#';
    else if (routerState.mode === 'config-vlan') suffix = '(config-vlan)#';
    else if (routerState.mode === 'config-if') suffix = '(config-if)#';
    else if (routerState.mode === 'config-router') suffix = '(config-router)#';
    
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

    term.onData(e => {
        switch (e) {
            case '\r': // Enter
                term.write('\r\n');
                processCommand(currentInput.trim());
                currentInput = '';
                term.write(getPrompt());
                break;
            case '\u007F': // Backspace (DEL)
            case '\b': // Backspace
                if (currentInput.length > 0) {
                    currentInput = currentInput.slice(0, -1);
                    term.write('\b \b');
                }
                break;
            default:
                // Handle printable characters (including Arabic/unicode)
                if ((e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7E)) || e >= '\u00a0') {
                    currentInput += e;
                    term.write(e);
                }
        }
    });
}

function processCommand(cmd) {
    if (!cmd) return;

    let parts = cmd.trim().split(/\s+/); // Handle multiple spaces
    let mainCmd = parts[0].toLowerCase();
    
    // Support Attacker PC mode (Linux)
    if (routerState.isLinux) {
        if (mainCmd === 'nmap') {
            term.writeln('Starting Nmap 7.93 ( https://nmap.org )');
            routerState.lastNmap = cmd; // Save command for validation
            if (cmd.includes('-sS')) term.writeln('Stealth SYN scan initiated...');
            setTimeout(() => { term.writeln('Host is up. Ports: 22/tcp, 80/tcp.'); checkChallenge(); }, 1000);
        } else if (mainCmd === 'ping') {
            term.writeln('PING ' + (parts[1] || 'target') + ' 56(84) bytes of data.');
            term.writeln('64 bytes from target: icmp_seq=1 ttl=64 time=0.03 ms');
            routerState.lastPing = cmd;
        } else if (mainCmd === 'ssh') {
            term.writeln('admin@' + (parts[1] || 'target') + ' password: ');
            routerState.lastSsh = cmd;
        } else if (mainCmd === 'route-injector') {
            term.writeln('Injecting LSA packets into OSPF process...');
            term.writeln('Success! Target routing table poisoned.');
            routerState.lastPing = cmd; // Storing here for simplicity in validation
        } else {
            term.writeln('bash: ' + mainCmd + ': command not found');
        }
        checkChallenge();
        return;
    }

    // Basic Command Parser (Cisco IOS)
    if (mainCmd === 'enable' || mainCmd === 'en') {
        if (routerState.mode === 'user') routerState.mode = 'priv';
    } 
    else if (mainCmd === 'disable') {
        if (routerState.mode === 'priv') routerState.mode = 'user';
    }
    else if ((mainCmd === 'configure' && parts[1]?.toLowerCase() === 'terminal') || cmd.toLowerCase() === 'conf t') {
        if (routerState.mode === 'priv') routerState.mode = 'config';
        else term.writeln('% Error: Must be in privileged mode.');
    }
    else if (mainCmd === 'exit') {
        if (routerState.mode === 'config-vlan') routerState.mode = 'config';
        else if (routerState.mode === 'config-if') routerState.mode = 'config';
        else if (routerState.mode === 'config-router') routerState.mode = 'config';
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
    else if (mainCmd === 'ip' && parts[1]?.toLowerCase() === 'route' && routerState.mode === 'config') {
        if (parts[2] && parts[3] && parts[4]) {
            if (!routerState.routes) routerState.routes = [];
            let r = { network: parts[2], mask: parts[3], nextHop: parts[4] };
            if (parts[5]) r.ad = parts[5]; // Administrative Distance (for floating static)
            routerState.routes.push(r);
        } else {
            term.writeln('% Incomplete command.');
        }
    }
    else if (mainCmd === 'router' && routerState.mode === 'config') {
        if (parts[1]?.toLowerCase() === 'ospf') {
            routerState.mode = 'config-router';
            routerState.currentProtocol = 'ospf';
            if (!routerState.ospf) routerState.ospf = { pid: parts[2], networks: [] };
        } else if (parts[1]?.toLowerCase() === 'eigrp') {
            routerState.mode = 'config-router';
            routerState.currentProtocol = 'eigrp';
            if (!routerState.eigrp) routerState.eigrp = { as: parts[2], networks: [] };
        } else if (parts[1]?.toLowerCase() === 'rip') {
            routerState.mode = 'config-router';
            routerState.currentProtocol = 'rip';
            if (!routerState.rip) routerState.rip = { networks: [], version: 1 };
        }
    }
    else if (mainCmd === 'router-id' && routerState.mode === 'config-router') {
        if (routerState.currentProtocol === 'ospf') routerState.ospf.routerId = parts[1];
        else if (routerState.currentProtocol === 'eigrp') routerState.eigrp.routerId = parts[1];
    }
    else if (mainCmd === 'network' && routerState.mode === 'config-router') {
        if (routerState.currentProtocol === 'ospf') {
            if (parts[1] && parts[2] && parts[3]?.toLowerCase() === 'area' && parts[4]) {
                routerState.ospf.networks.push({ net: parts[1], wildcard: parts[2], area: parts[4] });
            }
        } else if (routerState.currentProtocol === 'eigrp') {
            routerState.eigrp.networks.push({ net: parts[1], wildcard: parts[2] || null });
        } else if (routerState.currentProtocol === 'rip') {
            routerState.rip.networks.push({ net: parts[1] });
        }
    }
    else if (mainCmd === 'version' && routerState.mode === 'config-router' && routerState.currentProtocol === 'rip') {
        routerState.rip.version = parts[1];
    }
    else if (mainCmd === 'encapsulation' && routerState.mode === 'config-if') {
        if (parts[1]?.toLowerCase() === 'dot1q' && parts[2]) {
            let intf = routerState.interfaces[routerState.currentIf];
            intf.encapsulation = 'dot1Q';
            intf.encapsulationVlan = parts[2];
        }
    }
    else if ((mainCmd === 'interface' || mainCmd === 'int') && routerState.mode === 'config') {
        if (parts[1]) {
            routerState.mode = 'config-if';
            routerState.currentIf = parts[1].toLowerCase(); // e.g. f0/1 or range
            if (!routerState.interfaces) routerState.interfaces = {};
            if (!routerState.interfaces[routerState.currentIf]) {
                routerState.interfaces[routerState.currentIf] = {};
            }
        }
    }
    else if (mainCmd === 'switchport' && routerState.mode === 'config-if') {
        let intf = routerState.interfaces[routerState.currentIf];
        if (parts[1]?.toLowerCase() === 'mode') {
            if (parts[2]?.toLowerCase() === 'access') intf.mode = 'access';
            if (parts[2]?.toLowerCase() === 'trunk') intf.mode = 'trunk';
        } else if (parts[1]?.toLowerCase() === 'access' && parts[2]?.toLowerCase() === 'vlan') {
            intf.accessVlan = parts[3];
        } else if (parts[1]?.toLowerCase() === 'trunk' && parts[2]?.toLowerCase() === 'native' && parts[3]?.toLowerCase() === 'vlan') {
            intf.nativeVlan = parts[4];
        } else if (parts[1]?.toLowerCase() === 'port-security') {
            if (!parts[2]) {
                intf.portSecurityEnabled = true;
            } else if (parts[2]?.toLowerCase() === 'violation' && parts[3]) {
                intf.violation = parts[3].toLowerCase();
            } else if (parts[2]?.toLowerCase() === 'mac-address' && parts[3]) {
                intf.macAddress = parts[3]; // e.g. sticky
            } else if (parts[2]?.toLowerCase() === 'maximum' && parts[3]) {
                intf.maximumMacs = parts[3];
            }
        }
    }
    else if (mainCmd === 'spanning-tree' && routerState.mode === 'config') {
        if (parts[1]?.toLowerCase() === 'vlan' && parts[3]?.toLowerCase() === 'root') {
            if (!routerState.stpConfig) routerState.stpConfig = {};
            routerState.stpConfig[parts[2]] = parts[4]?.toLowerCase(); // e.g. primary
        }
    }
    else if (mainCmd === 'channel-group' && routerState.mode === 'config-if') {
        if (parts[2]?.toLowerCase() === 'mode') {
            let intf = routerState.interfaces[routerState.currentIf];
            intf.channelGroup = parts[1];
            intf.channelMode = parts[3]?.toLowerCase(); // e.g. active
        }
    }
    else if (mainCmd === 'show' && routerState.mode !== 'user') {
        if (parts[1]?.toLowerCase() === 'vlan') term.writeln('VLAN Name                             Status    Ports\n---- -------------------------------- --------- -------------------------------\n1    default                          active    Fa0/1, Fa0/2...\n10   Accounting                       active');
        else if (parts[1]?.toLowerCase() === 'mac') term.writeln('Mac Address Table\n-------------------------------------------\nVlan    Mac Address       Type        Ports\n----    -----------       --------    -----');
        else term.writeln('Showing output (simulated)...');
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
    routerState = {
        hostname: 'Router',
        mode: 'user',
        interfaces: {},
        runningConfig: '',
        isLinux: currentLevel.isLinux || false
    };
    currentInput = '';

    if(term) {
        term.writeln('\r\n\x1b[36m--- Level Loaded: ' + currentLevel.title + ' ---\x1b[0m');
        term.write(getPrompt());
    }
};

window.onload = () => {
    buildUI();
    initTerminal();
};
