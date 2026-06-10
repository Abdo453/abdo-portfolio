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
    else if (routerState.mode === 'config-dhcp') suffix = '(dhcp-config)#';
    else if (routerState.mode === 'config-line') suffix = '(config-line)#';
    
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
        else if (routerState.mode === 'config-dhcp') routerState.mode = 'config';
        else if (routerState.mode === 'config-line') routerState.mode = 'config';
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
    else if (mainCmd === 'ipv6' && parts[1]?.toLowerCase() === 'route' && routerState.mode === 'config') {
        if (!routerState.ipv6Routes) routerState.ipv6Routes = [];
        routerState.ipv6Routes.push({ network: parts[2], nextHop: parts[3] });
    }
    else if (mainCmd === 'ipv6' && parts[1]?.toLowerCase() === 'unicast-routing' && routerState.mode === 'config') {
        routerState.ipv6Routing = true;
    }
    else if (mainCmd === 'access-list' && routerState.mode === 'config') {
        if (!routerState.acls) routerState.acls = {};
        let aclNum = parts[1];
        if (!routerState.acls[aclNum]) routerState.acls[aclNum] = [];
        routerState.acls[aclNum].push({ action: parts[2]?.toLowerCase(), target: parts[3], wildcard: parts[4] || null });
    }
    else if (mainCmd === 'ip' && parts[1]?.toLowerCase() === 'nat' && parts[2]?.toLowerCase() === 'inside' && routerState.mode === 'config') {
        if (!routerState.nat) routerState.nat = [];
        if (parts[3]?.toLowerCase() === 'source' && parts[4]?.toLowerCase() === 'static') {
            routerState.nat.push({ type: 'static', inside: parts[5], outside: parts[6] });
        } else if (parts[3]?.toLowerCase() === 'source' && parts[4]?.toLowerCase() === 'list') {
            routerState.nat.push({ type: 'overload', list: parts[5], poolOrIf: parts[7] });
        }
    }
    else if (mainCmd === 'ip' && parts[1]?.toLowerCase() === 'dhcp' && parts[2]?.toLowerCase() === 'pool' && routerState.mode === 'config') {
        routerState.mode = 'config-dhcp';
        routerState.currentDhcp = parts[3];
        if (!routerState.dhcp) routerState.dhcp = {};
        routerState.dhcp[parts[3]] = {};
    }
    else if (mainCmd === 'ip' && parts[1]?.toLowerCase() === 'dhcp' && parts[2]?.toLowerCase() === 'snooping' && routerState.mode === 'config') {
        if (parts[3]?.toLowerCase() === 'vlan') routerState.dhcpSnoopingVlan = parts[4];
        else routerState.dhcpSnoopingEnabled = true;
    }
    else if (mainCmd === 'ip' && parts[1]?.toLowerCase() === 'arp' && parts[2]?.toLowerCase() === 'inspection' && routerState.mode === 'config') {
        if (parts[3]?.toLowerCase() === 'vlan') routerState.arpInspectionVlan = parts[4];
    }
    else if (mainCmd === 'network' && routerState.mode === 'config-dhcp') {
        routerState.dhcp[routerState.currentDhcp].network = parts[1];
        routerState.dhcp[routerState.currentDhcp].mask = parts[2];
    }
    else if (mainCmd === 'default-router' && routerState.mode === 'config-dhcp') {
        routerState.dhcp[routerState.currentDhcp].defaultRouter = parts[1];
    }
    else if (mainCmd === 'ip' && parts[1]?.toLowerCase() === 'domain-name' && routerState.mode === 'config') {
        routerState.domainName = parts[2];
    }
    else if (mainCmd === 'crypto' && parts[1]?.toLowerCase() === 'key' && routerState.mode === 'config') {
        routerState.cryptoKey = true;
        term.writeln('% Generating 1024 bit RSA keys, keys will be non-exportable...[OK]');
    }
    else if (mainCmd === 'logging' && routerState.mode === 'config') {
        routerState.syslog = parts[1];
    }
    else if (mainCmd === 'ntp' && parts[1]?.toLowerCase() === 'server' && routerState.mode === 'config') {
        routerState.ntp = parts[2];
    }
    else if (mainCmd === 'line' && parts[1]?.toLowerCase() === 'vty' && routerState.mode === 'config') {
        routerState.mode = 'config-line';
        if (!routerState.lineVty) routerState.lineVty = {};
    }
    else if (mainCmd === 'transport' && parts[1]?.toLowerCase() === 'input' && parts[2]?.toLowerCase() === 'ssh' && routerState.mode === 'config-line') {
        routerState.lineVty.ssh = true;
    }
    else if (mainCmd === 'login' && parts[1]?.toLowerCase() === 'local' && routerState.mode === 'config-line') {
        routerState.lineVty.loginLocal = true;
    }
    else if (mainCmd === 'username' && routerState.mode === 'config') {
        if (!routerState.users) routerState.users = {};
        routerState.users[parts[1]] = true;
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
                routerState.interfaces[routerState.currentIf] = { shutdown: true }; // Default to shutdown
            }
        }
    }
    else if (mainCmd === 'ip' && parts[1]?.toLowerCase() === 'address' && routerState.mode === 'config-if') {
        let intf = routerState.interfaces[routerState.currentIf];
        intf.ip = parts[2];
        intf.mask = parts[3];
    }
    else if (mainCmd === 'ipv6' && parts[1]?.toLowerCase() === 'address' && routerState.mode === 'config-if') {
        let intf = routerState.interfaces[routerState.currentIf];
        intf.ipv6 = parts[2];
    }
    else if (mainCmd === 'ip' && parts[1]?.toLowerCase() === 'access-group' && routerState.mode === 'config-if') {
        let intf = routerState.interfaces[routerState.currentIf];
        intf.accessGroup = { acl: parts[2], direction: parts[3]?.toLowerCase() };
    }
    else if (mainCmd === 'ip' && parts[1]?.toLowerCase() === 'nat' && routerState.mode === 'config-if') {
        let intf = routerState.interfaces[routerState.currentIf];
        intf.nat = parts[2]?.toLowerCase();
    }
    else if (mainCmd === 'ip' && parts[1]?.toLowerCase() === 'dhcp' && parts[2]?.toLowerCase() === 'snooping' && parts[3]?.toLowerCase() === 'trust' && routerState.mode === 'config-if') {
        let intf = routerState.interfaces[routerState.currentIf];
        intf.dhcpTrust = true;
    }
    else if (mainCmd === 'ip' && parts[1]?.toLowerCase() === 'arp' && parts[2]?.toLowerCase() === 'inspection' && parts[3]?.toLowerCase() === 'trust' && routerState.mode === 'config-if') {
        let intf = routerState.interfaces[routerState.currentIf];
        intf.arpTrust = true;
    }
    else if (mainCmd === 'no' && parts[1]?.toLowerCase() === 'shutdown' && routerState.mode === 'config-if') {
        let intf = routerState.interfaces[routerState.currentIf];
        intf.shutdown = false;
        term.writeln(`\n%LINK-3-UPDOWN: Interface ${routerState.currentIf}, changed state to up`);
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
        routerState.lastShow = cmd;
        let p1 = parts[1]?.toLowerCase();
        let p2 = parts[2]?.toLowerCase();
        
        if (p1 === 'vlan') term.writeln('VLAN Name                             Status    Ports\n---- -------------------------------- --------- -------------------------------\n1    default                          active    Fa0/1, Fa0/2...\n10   Accounting                       active');
        else if (p1 === 'mac') term.writeln('Mac Address Table\n-------------------------------------------\nVlan    Mac Address       Type        Ports\n----    -----------       --------    -----');
        else if (p1 === 'ip' && p2 === 'route') term.writeln('Gateway of last resort is not set\n\n     10.0.0.0/8 is variably subnetted, 2 subnets, 2 masks\nC       10.10.10.0/24 is directly connected, GigabitEthernet0/0\nS       192.168.1.0/24 [1/0] via 10.10.10.2');
        else if (p1 === 'ip' && p2 === 'interface') term.writeln('Interface              IP-Address      OK? Method Status                Protocol\nGigabitEthernet0/0     192.168.1.1     YES manual up                    up\nFastEthernet0/1        unassigned      YES unset  up                    down');
        else if (p1 === 'port-security') term.writeln('Secure Port  MaxSecureAddr  CurrentAddr  SecurityViolation  Security Action\n               (Count)       (Count)          (Count)\n---------------------------------------------------------------------------\n      Fa0/1              1          0                  0         Shutdown');
        else if (p1 === 'running-config') term.writeln('Building configuration...\n\nCurrent configuration : 1563 bytes\n!\nversion 15.1\n!\nhostname ' + routerState.hostname + '\n!\n! (Showing simulated configuration...)\n!');
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
