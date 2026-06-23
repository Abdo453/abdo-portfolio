
// Global state for Modes and Reports
let currentMode = 'guided'; // 'guided', 'challenge', 'troubleshoot'
let labReport = {
    commands: [],
    errors: [],
    startTime: null,
    endTime: null
};

// State variables
let currentPhaseIndex = 0;
let currentLevelIndex = 0;
let currentLevel = null;

let term;
let fitAddon;
let currentInput = '';
let commandHistory = [];
let historyIndex = -1;

// All valid IOS commands for Tab Completion
const IOS_COMMANDS = {
    user:   ['enable', 'exit', 'logout', 'ping', 'show version', 'show ?'],
    priv:   ['configure terminal', 'conf t', 'disable', 'exit', 'ping', 'reload',
             'show ip route', 'show ip interface brief', 'show running-config',
             'show startup-config', 'show version', 'show vlan', 'show interfaces',
             'show mac address-table', 'show cdp neighbors', 'show cdp neighbors detail',
             'show ip ospf', 'show ip ospf neighbor', 'show ip protocols',
             'show port-security', 'show ip dhcp binding', 'show ip nat translations',
             'show spanning-tree', 'show etherchannel summary', 'show ip bgp',
             'copy running-config startup-config', 'write memory', 'write erase',
             'debug ip ospf events', 'undebug all'],
    config: ['hostname', 'interface', 'int', 'ip route', 'ipv6 route', 'ipv6 unicast-routing',
             'router ospf', 'router eigrp', 'router rip', 'no router ospf',
             'vlan', 'spanning-tree', 'access-list', 'no access-list',
             'ip access-list', 'ip dhcp pool', 'ip dhcp excluded-address',
             'ip nat inside source', 'ip domain-name', 'ip domain lookup',
             'crypto key generate rsa', 'username', 'enable secret', 'service password-encryption',
             'logging', 'ntp server', 'line vty', 'line console', 'banner motd',
             'cdp run', 'lldp run', 'no cdp run', 'no lldp run', 'exit', 'end'],
};

// Linux Router State
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
    term.writeln('Copyright (c) 1986-2026 by Linux Systems, Inc.');
    term.writeln('Press RETURN to get started.');
    term.write('\r\n' + getPrompt());

    term.onData(e => {
        switch (e) {
            case '\r': // Enter
                term.write('\r\n');
                if (currentInput.trim()) {
                    commandHistory.unshift(currentInput.trim());
                    if (commandHistory.length > 50) commandHistory.pop();
                    historyIndex = -1;
                }
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
            case '\t': // Tab completion
                handleTabCompletion();
                break;
            case '\u001b[A': // Arrow Up
                if (commandHistory.length > 0) {
                    historyIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
                    replaceCurrentInput(commandHistory[historyIndex]);
                }
                break;
            case '\u001b[B': // Arrow Down
                if (historyIndex > 0) {
                    historyIndex--;
                    replaceCurrentInput(commandHistory[historyIndex]);
                } else if (historyIndex === 0) {
                    historyIndex = -1;
                    replaceCurrentInput('');
                }
                break;
            case '\u0003': // Ctrl+C
                term.write('^C\r\n');
                currentInput = '';
                term.write(getPrompt());
                break;
            case '\u0005': // Ctrl+E (end of line — IOS behavior)
                break;
            default:
                if ((e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7E)) || e >= '\u00a0') {
                    currentInput += e;
                    term.write(e);
                }
        }
    });
}

function replaceCurrentInput(newInput) {
    // Clear current line and write new input
    term.write('\r' + getPrompt() + ' '.repeat(currentInput.length + 5) + '\r' + getPrompt() + newInput);
    currentInput = newInput;
}

function handleTabCompletion() {
    const input = currentInput.trim().toLowerCase();
    if (!input) return;

    const modeKey = routerState.mode.startsWith('config') ? 'config' : routerState.mode;
    const candidates = (IOS_COMMANDS[modeKey] || IOS_COMMANDS['priv'])
        .filter(cmd => cmd.toLowerCase().startsWith(input));

    if (candidates.length === 1) {
        // Complete the command
        const completion = candidates[0];
        replaceCurrentInput(completion);
    } else if (candidates.length > 1) {
        // Show options
        term.write('\r\n');
        candidates.forEach(c => term.write('  ' + c + '\r\n'));
        term.write(getPrompt() + currentInput);
    }
}

function processCommand(cmd) {
    if (!cmd) return;
    if (typeof labReport !== 'undefined') labReport.commands.push(cmd);

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
        } else if (mainCmd === 'curl') {
            term.writeln('{"interfaces": {"GigabitEthernet0/0": {"ip": "192.168.1.1", "status": "up"}}}');
            routerState.lastCurl = cmd;
        } else if (mainCmd === 'hydra') {
            term.writeln('Hydra v9.1 (c) 2020 by van Hauser/THC - Please do not use in military or secret service organizations, or for illegal purposes.');
            term.writeln('Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at ' + new Date().toISOString());
            setTimeout(() => { term.writeln('[22][ssh] host: 192.168.1.1   login: admin   password: linux\n1 of 1 target successfully completed, 1 valid password found'); checkChallenge(); }, 1500);
            routerState.lastHydra = cmd;
        } else if (mainCmd === 'hping3') {
            term.writeln('HPING 192.168.1.1 (eth0 192.168.1.1): S set, 40 headers + 0 data bytes');
            term.writeln('hping in flood mode, no replies will be shown');
            routerState.lastHping = cmd;
        } else {
            term.writeln('bash: ' + mainCmd + ': command not found');
        }
        checkChallenge();
        return;
    }

    // Basic Command Parser (Linux IOS)
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
    else if (mainCmd === 'no' && parts[1]?.toLowerCase() === 'access-list' && routerState.mode === 'config') {
            let aclNum = parts[2];
            if (routerState.acls && routerState.acls[aclNum]) delete routerState.acls[aclNum];
            term.writeln(`% Access list ${aclNum} deleted.`);
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
    else if (mainCmd === 'cdp' && parts[1]?.toLowerCase() === 'run' && routerState.mode === 'config') {
        routerState.cdpGlobal = true;
    }
    else if (mainCmd === 'lldp' && parts[1]?.toLowerCase() === 'run' && routerState.mode === 'config') {
        routerState.lldpGlobal = true;
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
    else if (mainCmd === 'no' && parts[1]?.toLowerCase() === 'router' && routerState.mode === 'config') {
        if (parts[2]?.toLowerCase() === 'ospf') {
            if (routerState.ospf && routerState.ospf.pid === parts[3]) delete routerState.ospf;
            term.writeln(`% OSPF process ${parts[3]} deleted.`);
        }
    }
    else if (mainCmd === 'access-class' && routerState.mode === 'config-line') {
        routerState.lineVty.accessClass = { acl: parts[1], direction: parts[2]?.toLowerCase() };
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
    else if (mainCmd === 'channel-group' && routerState.mode === 'config-if') {
        let intf = routerState.interfaces[routerState.currentIf];
        intf.channelGroup = parts[1];
        if (parts[2]?.toLowerCase() === 'mode') intf.channelGroupMode = parts[3]?.toLowerCase();
    }
    else if (mainCmd === 'cdp' && parts[1]?.toLowerCase() === 'enable' && routerState.mode === 'config-if') {
        let intf = routerState.interfaces[routerState.currentIf];
        intf.cdpEnabled = true;
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
        let p3 = parts[3]?.toLowerCase();
        
        if (p1 === 'version') {
            term.writeln('Linux IOS Software, Version 15.1(4)M4, RELEASE SOFTWARE (fc1)');
            term.writeln('Technical Support: http://www.linux.com/techsupport');
            term.writeln('ROM: System Bootstrap, Version 15.1(4)M4');
            term.writeln(`${routerState.hostname} uptime is 0 days, 0 hours, 1 minute`);
            term.writeln('linux 1941 (revision 1.0) with 491520K/32768K bytes of memory.');
            term.writeln('1 FastEthernet interface, 2 GigabitEthernet interfaces');
        }
        else if (p1 === 'vlan') {
            let vlanLines = 'VLAN Name                             Status    Ports\n---- -------------------------------- --------- -------------------------------\n1    default                          active    Fa0/1, Fa0/2, Fa0/3';
            if (routerState.vlans) {
                Object.entries(routerState.vlans).forEach(([id, v]) => {
                    vlanLines += `\n${id.padEnd(4)} ${v.name.padEnd(33)} active`;
                });
            }
            term.writeln(vlanLines);
        }
        else if (p1 === 'mac' && p2 === 'address-table') {
            term.writeln('Mac Address Table\n-------------------------------------------\nVlan    Mac Address       Type        Ports\n----    -----------       --------    -----\n   1    aabb.cc00.0100    DYNAMIC     Gi0/0\n   1    aabb.cc00.0200    DYNAMIC     Gi0/1');
        }
        else if (p1 === 'ip' && p2 === 'route') {
            let routeOut = 'Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP\n       D - EIGRP, O - OSPF, IA - OSPF inter area\n\nGateway of last resort is not set\n';
            if (routerState.routes && routerState.routes.length > 0) {
                routerState.routes.forEach(r => {
                    const ad = r.ad ? `[${r.ad}/0]` : '[1/0]';
                    routeOut += `\nS    ${r.network}/${r.mask} ${ad} via ${r.nextHop}`;
                });
            }
            if (routerState.ospf && routerState.ospf.networks && routerState.ospf.networks.length > 0) {
                routerState.ospf.networks.forEach(n => {
                    routeOut += `\nO    ${n.net} [110/2] via (OSPF neighbor), 00:00:05, GigabitEthernet0/0`;
                });
            }
            if (!routerState.routes?.length && !routerState.ospf?.networks?.length) {
                routeOut += '\n     (no routes configured)';
            }
            term.writeln(routeOut);
        }
        else if (p1 === 'ip' && p2 === 'interface' && p3 === 'brief') {
            let ifOut = 'Interface              IP-Address      OK? Method Status                Protocol\n';
            const defaultIfs = { 'gigabitethernet0/0': null, 'gigabitethernet0/1': null, 'fastethernet0/0': null };
            const allIfs = Object.assign({}, defaultIfs, routerState.interfaces);
            Object.entries(allIfs).forEach(([name, cfg]) => {
                const ip = cfg?.ip || 'unassigned';
                const status = cfg?.shutdown === false ? 'up' : 'administratively down';
                const proto = cfg?.shutdown === false && cfg?.ip ? 'up' : 'down';
                ifOut += `${name.padEnd(22)} ${ip.padEnd(15)} YES manual ${status.padEnd(22)} ${proto}\n`;
            });
            term.writeln(ifOut);
        }
        else if (p1 === 'interfaces') {
            const ifName = parts[2];
            const cfg = ifName ? routerState.interfaces[ifName.toLowerCase()] : null;
            if (cfg || ifName) {
                const status = cfg?.shutdown === false ? 'up' : 'down';
                term.writeln(`${ifName || 'GigabitEthernet0/0'} is ${status}, line protocol is ${status}`);
                term.writeln(`  Hardware is Gigabit Ethernet, address is aabb.cc${Math.floor(Math.random()*9000+1000)}`);
                if (cfg?.ip) term.writeln(`  Internet address is ${cfg.ip}/${cfg.mask || '24'}`);
                else term.writeln('  Internet protocol processing disabled');
                term.writeln('  MTU 1500 bytes, BW 1000000 Kbit/sec, DLY 10 usec');
            } else {
                term.writeln('GigabitEthernet0/0 is administratively down, line protocol is down');
            }
        }
        else if (p1 === 'port-security') {
            if (p2 === 'interface') {
                const ifName = parts[3]?.toLowerCase();
                const cfg = routerState.interfaces[ifName];
                if (cfg?.portSecurityEnabled) {
                    term.writeln(`Port Security              : Enabled`);
                    term.writeln(`Port Status                : Secure-up`);
                    term.writeln(`Violation Mode             : ${cfg.violation || 'Shutdown'}`);
                    term.writeln(`Maximum MAC Addresses      : ${cfg.maximumMacs || 1}`);
                    term.writeln(`Total MAC Addresses        : 0`);
                    term.writeln(`Security Violation Count   : 0`);
                } else {
                    term.writeln(`Port Security is not enabled on interface ${ifName || 'unknown'}.`);
                }
            } else {
                term.writeln('Secure Port  MaxSecureAddr  CurrentAddr  SecurityViolation  Security Action\n               (Count)       (Count)          (Count)\n---------------------------------------------------------------------------');
                Object.entries(routerState.interfaces).forEach(([name, cfg]) => {
                    if (cfg.portSecurityEnabled) {
                        term.writeln(`      ${name.substring(0,6)}              ${cfg.maximumMacs||1}          0                  0         ${cfg.violation||'Shutdown'}`);
                    }
                });
            }
        }
        else if (p1 === 'running-config') {
            let cfg = `Building configuration...\n\nCurrent configuration :\n!\nversion 15.1\nservice timestamps debug datetime msec\nservice timestamps log datetime msec\n!\nhostname ${routerState.hostname}\n!`;
            if (routerState.users) Object.keys(routerState.users).forEach(u => { cfg += `\nusername ${u} privilege 15 secret 5 $1$xxxx`; });
            if (routerState.domainName) cfg += `\nip domain-name ${routerState.domainName}`;
            if (routerState.ospf) cfg += `\nrouter ospf ${routerState.ospf.pid}\n router-id ${routerState.ospf.routerId || '1.1.1.1'}`;
            if (routerState.ntp) cfg += `\nntp server ${routerState.ntp}`;
            if (routerState.syslog) cfg += `\nlogging ${routerState.syslog}`;
            if (routerState.routes) routerState.routes.forEach(r => { cfg += `\nip route ${r.network} ${r.mask} ${r.nextHop}${r.ad ? ' '+r.ad : ''}`; });
            Object.entries(routerState.interfaces).forEach(([name, c]) => {
                cfg += `\ninterface ${name}`;
                if (c.ip) cfg += `\n ip address ${c.ip} ${c.mask}`;
                if (!c.shutdown) cfg += '\n no shutdown';
                else cfg += '\n shutdown';
            });
            cfg += '\n!\nend';
            term.writeln(cfg);
        }
        else if (p1 === 'startup-config') {
            term.writeln('startup-config is not present');
        }
        else if (p1 === 'ip' && p2 === 'ospf' && p3 === 'neighbor') {
            if (routerState.ospf) {
                term.writeln('Neighbor ID     Pri   State           Dead Time   Address         Interface');
                term.writeln('2.2.2.2           1   FULL/DR         00:00:33    10.0.0.2        GigabitEthernet0/0');
            } else {
                term.writeln('% OSPF is not configured.');
            }
        }
        else if (p1 === 'ip' && p2 === 'ospf') {
            if (routerState.ospf) {
                term.writeln(` Routing Process "ospf ${routerState.ospf.pid}" with ID ${routerState.ospf.routerId || '1.1.1.1'}`);
                term.writeln(' Start time: 00:00:05.000, Time elapsed: 00:00:30.000');
                term.writeln(' Supports only single TOS(TOS0) routes');
                term.writeln(' Number of areas in this router is 1. 1 normal 0 stub 0 nssa');
            } else {
                term.writeln('% OSPF is not configured.');
            }
        }
        else if (p1 === 'ip' && p2 === 'protocols') {
            let proto = 'Routing Protocol is "connected"\n';
            if (routerState.ospf) proto += `\nRouting Protocol is "ospf ${routerState.ospf.pid}"\n  Outgoing update filter list for all interfaces is not set\n  Incoming update filter list for all interfaces is not set\n  Router ID ${routerState.ospf.routerId || '1.1.1.1'}`;
            if (routerState.eigrp) proto += `\nRouting Protocol is "eigrp ${routerState.eigrp.as}"`;
            if (routerState.rip) proto += `\nRouting Protocol is "rip"\n  Sending updates every 30 seconds`;
            term.writeln(proto);
        }
        else if (p1 === 'ip' && p2 === 'dhcp' && p3 === 'binding') {
            term.writeln('IP address       Client-ID/              Lease expiration        Type\n                 Hardware address\n192.168.1.100    0100.5079.6668.00       Mar 01 2026 00:00 AM    Automatic');
        }
        else if (p1 === 'ip' && p2 === 'nat' && p3 === 'translations') {
            if (routerState.nat && routerState.nat.length > 0) {
                term.writeln('Pro Inside global      Inside local       Outside local      Outside global');
                routerState.nat.forEach(n => {
                    if (n.type === 'static') term.writeln(`--- ${n.outside}        ${n.inside}          ---                ---`);
                    else term.writeln('tcp 203.0.113.1:1025  192.168.1.10:1025  8.8.8.8:80         8.8.8.8:80');
                });
            } else {
                term.writeln('% NAT is not configured.');
            }
        }
        else if (p1 === 'spanning-tree') {
            term.writeln('VLAN0001\n  Spanning tree enabled protocol ieee\n  Root ID    Priority    32769\n             Address     aabb.cc00.0100\n             This bridge is the root\n  Bridge ID  Priority    32769  (priority 32768 sys-id-ext 1)\n             Address     aabb.cc00.0100');
        }
        else if (p1 === 'etherchannel' && p2 === 'summary') {
            term.writeln('Flags:  D - down        P - bundled in port-channel\n        I - stand-alone s - suspended\nGroup  Port-channel  Protocol    Ports\n------+-------------+-----------+-----------------------------------------------\n1      Po1(SU)         LACP      Gi0/1(P)    Gi0/2(P)');
        }
        else if (p1 === 'cdp' && p2 === 'neighbors') {
            if (p3 === 'detail') {
                term.writeln('-------------------------\nDevice ID: Switch1\nEntry address(es):\n  IP address: 192.168.1.2\nPlatform: linux WS-C2960,  Capabilities: Switch IGMP\nInterface: GigabitEthernet0/0,  Port ID (outgoing port): FastEthernet0/1\nHoldtime : 120 sec\nVersion :\nLinux IOS Software, Version 12.2(55)SE9\nNative VLAN: 1\nDuplex: full');
            } else {
                term.writeln('Capability Codes: R - Router, T - Trans Bridge, B - Source Route Bridge\n                  S - Switch, H - Host, I - IGMP, r - Repeater\n\nDevice ID        Local Intrfce     Holdtme    Capability  Platform  Port ID\nSwitch1          Gig 0/0           120             S I      2960      Fas 0/1');
            }
        }
        else if (p1 === '?') {
            const cmds = IOS_COMMANDS[routerState.mode.startsWith('config') ? 'config' : routerState.mode] || [];
            cmds.forEach(c => term.writeln('  ' + c));
        }
        else {
            term.writeln('% Unrecognized show command. Try: show ip route, show ip interface brief, show running-config, show version, show ?');
        }
    }
    else if (mainCmd === 'copy') {
        if (parts[1]?.toLowerCase() === 'running-config' && parts[2]?.toLowerCase() === 'startup-config') {
            term.writeln('Destination filename [startup-config]? ');
            setTimeout(() => { term.writeln('Building configuration...\n[OK]'); checkChallenge(); }, 500);
            routerState.savedConfig = true;
        } else {
            term.writeln('% Invalid copy command.');
        }
    }
    else if ((mainCmd === 'write') && (parts[1]?.toLowerCase() === 'memory' || parts[1]?.toLowerCase() === 'mem' || !parts[1])) {
        if (routerState.mode === 'priv') {
            term.writeln('Building configuration...\n[OK]');
            routerState.savedConfig = true;
        } else {
            term.writeln('% Error: Must be in privileged EXEC mode.');
        }
    }
    else if (mainCmd === 'ping') {
        const target = parts[1] || '1.1.1.1';
        term.writeln(`Type escape sequence to abort.`);
        term.writeln(`Sending 5, 100-byte ICMP Echos to ${target}, timeout is 2 seconds:`);
        setTimeout(() => {
            term.writeln('!!!!!');
            term.writeln(`Success rate is 100 percent (5/5), round-trip min/avg/max = 1/2/4 ms`);
            routerState.lastPing = cmd;
            checkChallenge();
        }, 800);
    }
    else if (mainCmd === '?' || (mainCmd === 'show' && parts[1] === '?')) {
        const modeKey = routerState.mode.startsWith('config') ? 'config' : routerState.mode;
        const cmds = IOS_COMMANDS[modeKey] || [];
        cmds.forEach(c => term.writeln('  ' + c));
    }
    else if (mainCmd === 'end') {
        routerState.mode = 'priv';
    }
    else if (mainCmd === 'do' && routerState.mode.startsWith('config')) {
        // 'do show ...' from config mode
        const subCmd = parts.slice(1).join(' ');
        const savedMode = routerState.mode;
        routerState.mode = 'priv';
        processCommand(subCmd);
        routerState.mode = savedMode;
        return;
    }
    else {
        if (typeof labReport !== 'undefined') labReport.errors.push(cmd);
        // More realistic IOS error messages
        const modeHint = routerState.mode === 'user'
            ? '(run `enable` to enter privileged mode)'
            : routerState.mode === 'priv'
            ? '(try `show ?` or `configure terminal`)'
            : '(try `?` to see available commands)';
        term.writeln(`                           ^`);
        term.writeln(`% Invalid input detected at '^' marker. ${modeHint}`);
    }

    checkChallenge();
}

function checkChallenge() {
    if (!currentLevel) return;
    
    let isPassed = currentLevel.validate(routerState);
    if (isPassed && !document.getElementById('statusBox').classList.contains('success')) {
        document.getElementById('statusBox').classList.add('success');
        document.getElementById('challengeStatus').innerText = "نجاح! لقد أتممت التحدي.";
        
        labReport.endTime = new Date();
        document.getElementById('btnReport').style.display = 'block';
        
        // Show success msg in terminal
        term.writeln('');
        term.writeln('\x1b[32m*** CHALLENGE COMPLETED ***\x1b[0m');
        term.writeln('\x1b[36mاضغط على زر Report بالأعلى لرؤية تقريرك.\x1b[0m');
    }
}

function buildUI() {
    const selector = document.getElementById('phaseSelector');
    selector.innerHTML = '<option value="" disabled selected>-- اختر المرحلة --</option>';
    
    window.linuxCurriculum.forEach((phaseObj, pIndex) => {
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
    currentLevel = window.linuxCurriculum[currentPhaseIndex].levels[currentLevelIndex];

    // Reset Report
    labReport = {
        commands: [],
        errors: [],
        startTime: new Date(),
        endTime: null
    };
    document.getElementById('btnReport').style.display = 'none';

    // Apply Mode UI
    applyModeUI();

    document.getElementById('statusBox').classList.remove('success');

    // Reset Router State
    routerState = {
        hostname: 'Router',
        mode: 'user',
        interfaces: {},
        runningConfig: '',
        isLinux: currentLevel.isLinux || false
    };

    // Inject bugs based on Mode
    if (currentMode === 'troubleshoot') {
        injectTroubleshootingBug();
    } else if (currentLevel.initialState) {
        Object.assign(routerState, JSON.parse(JSON.stringify(currentLevel.initialState)));
    }

    currentInput = '';
    commandHistory = [];
    historyIndex = -1;

    if (term) {
        term.clear();
        term.writeln('\x1b[36m╔══════════════════════════════════════════════════╗\x1b[0m');
        term.writeln('\x1b[36m║  Linux IOS Software, Version 15.1(4)M4           ║\x1b[0m');
        term.writeln('\x1b[36m╚══════════════════════════════════════════════════╝\x1b[0m');
        term.writeln('\x1b[33mLevel: ' + currentLevel.title + ' [' + currentMode.toUpperCase() + ']\x1b[0m');
        term.writeln('\x1b[90mTip: Use Tab for completion, ↑↓ for history, ? for help\x1b[0m');
        term.writeln('');
        term.write(getPrompt());
    }
};

window.setLabMode = function(mode) {
    currentMode = mode;
    document.querySelectorAll('.lab-modes button').forEach(btn => btn.classList.remove('active'));
    document.getElementById('mode' + mode.charAt(0).toUpperCase() + mode.slice(1)).classList.add('active');
    
    // Reload phase with new mode
    let val = document.getElementById('phaseSelector').value;
    if (val) loadPhase(val);
}

function applyModeUI() {
    let tc = document.getElementById('theoryContent');
    let cs = document.getElementById('challengeStatus');
    
    if (currentMode === 'guided') {
        tc.innerHTML = currentLevel.theory;
        cs.innerHTML = currentLevel.challengeText;
    } else if (currentMode === 'challenge') {
        tc.innerHTML = "<h2>تحدي بدون مساعدة</h2><p>في هذا الوضع، لن يظهر لك الشرح أو الأوامر. اعتمد على حفظك للوصول للهدف المذكور بالأسفل.</p>";
        cs.innerHTML = currentLevel.challengeText;
    } else if (currentMode === 'troubleshoot') {
        tc.innerHTML = "<h2>اكتشاف الأخطاء (Troubleshooting)</h2><p>هناك خطأ مقصود في إعدادات الراوتر. استخدم أوامر الـ show لتشخيص المشكلة وحلها.</p>";
        cs.innerHTML = "اكتشف الخطأ الموجود في الشبكة، ثم قم بإصلاحه لتلبية المتطلبات الخاصة بهذا اللاب.";
    }
}

function injectTroubleshootingBug() {
    // If the lab has specific bugs defined, pick one randomly.
    if (currentLevel.bugs && currentLevel.bugs.length > 0) {
        let randomBug = currentLevel.bugs[Math.floor(Math.random() * currentLevel.bugs.length)];
        Object.assign(routerState, JSON.parse(JSON.stringify(randomBug.state)));
        // Could also log the bug silently for debugging
        console.log("Injected Bug: ", randomBug.description);
    } else if (currentLevel.initialState) {
        // Fallback to initial state if no bugs array
        Object.assign(routerState, JSON.parse(JSON.stringify(currentLevel.initialState)));
    } else {
        // Generic random bug if nothing defined: Shut down an interface
        routerState.interfaces['fa0/0'] = { shutdown: true };
    }
}

window.showDiagram = function() {
    let diagramText = currentLevel.topology || "[Router] --- (fa0/0) --- [Switch]";
    document.getElementById('diagramContent').innerText = diagramText;
    document.getElementById('diagramModal').classList.add('active');
}

window.showReport = function() {
    let duration = ((labReport.endTime - labReport.startTime) / 1000).toFixed(1);
    let html = `
        <h3 style="color:#00d2ff;">تقرير الأداء: ${currentLevel.title}</h3>
        <p><strong>الوضع (Mode):</strong> ${currentMode.toUpperCase()}</p>
        <p><strong>وقت التنفيذ:</strong> ${duration} ثانية</p>
        <hr style="border-color: rgba(255,255,255,0.1); margin: 15px 0;">
        <h4 style="color:#4CAF50;">✅ الأوامر المنفذة (Commands Used):</h4>
        <pre style="background:#0f172a; padding:10px; border-radius:5px;">${labReport.commands.join('\n') || 'لا توجد أوامر'}</pre>
        <h4 style="color:#f85149; margin-top:15px;">❌ الأخطاء (Failed Commands):</h4>
        <pre style="background:#0f172a; padding:10px; border-radius:5px;">${labReport.errors.join('\n') || 'ممتاز! لم تقع في أي أخطاء.'}</pre>
    `;
    document.getElementById('reportContent').innerHTML = html;
    document.getElementById('reportModal').classList.add('active');
}

// Intercept term.writeln to catch errors
const originalWriteln = term ? term.writeln : null;

// Ensure terminal loads properly with data_loader
document.addEventListener('linuxDataReady', () => {
    buildUI();
    if (!term) initTerminal();
});

// For local testing without server (fallback)
window.addEventListener('load', () => {
    if (!window.linuxDataLoading && window.linuxCurriculum) {
        buildUI();
        if (!term) initTerminal();
    }
});

