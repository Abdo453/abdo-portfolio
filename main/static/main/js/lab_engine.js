// lab_engine.js - V3 Interactive Lab Engine
class VirtualFileSystem {
    constructor(initialState) {
        this.fs = initialState || {
            '/': { type: 'dir', contents: ['var', 'etc', 'home'] },
            '/var': { type: 'dir', contents: ['www'] },
            '/var/www': { type: 'dir', contents: ['html'] },
            '/var/www/html': { type: 'dir', contents: ['index.php', 'config.php', 'images'] },
            '/var/www/html/index.php': { type: 'file', content: '<?php echo "Welcome"; ?>' },
            '/var/www/html/config.php': { type: 'file', content: '<?php\n// Database credentials\n$db_user = "webapp";\n$db_pass = "super_secret_pw_123";\n?>' },
            '/etc': { type: 'dir', contents: ['passwd', 'shadow'] },
            '/etc/passwd': { type: 'file', content: 'root:x:0:0:root:/root:/bin/bash\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin' },
            '/home': { type: 'dir', contents: ['user'] },
            '/home/user': { type: 'dir', contents: ['flag.txt'] },
            '/home/user/flag.txt': { type: 'file', content: 'FLAG{cmd_1nj3ct10n_m4st3r}' }
        };
        this.cwd = '/var/www/html';
    }

    resolvePath(path) {
        if (!path || path === '.') return this.cwd;
        if (path === '..') {
            const parts = this.cwd.split('/').filter(Boolean);
            parts.pop();
            return '/' + parts.join('/');
        }
        if (path.startsWith('/')) return path;
        return this.cwd === '/' ? '/' + path : this.cwd + '/' + path;
    }

    ls(path) {
        let target = this.resolvePath(path);
        if (this.fs[target] && this.fs[target].type === 'dir') {
            return this.fs[target].contents.join('  ');
        }
        if (this.fs[target] && this.fs[target].type === 'file') {
            return target.split('/').pop();
        }
        return `ls: cannot access '${path || target}': No such file or directory`;
    }

    cat(path) {
        let target = this.resolvePath(path);
        if (this.fs[target]) {
            if (this.fs[target].type === 'dir') return `cat: ${path}: Is a directory`;
            return this.fs[target].content;
        }
        return `cat: ${path}: No such file or directory`;
    }

    pwd() {
        return this.cwd;
    }

    cd(path) {
        let target = this.resolvePath(path);
        if (this.fs[target] && this.fs[target].type === 'dir') {
            this.cwd = target;
            return '';
        }
        return `cd: ${path}: No such file or directory`;
    }
}

class LabEngine {
    constructor(journeyData) {
        this.journey = journeyData;
        this.currentLevelIndex = 0;
        this.xp = parseInt(localStorage.getItem('lab_xp') || '50'); // Start with 50 XP
        this.history = [];
        this.vfs = new VirtualFileSystem(journeyData.initialFS);
        this.ui = {
            terminal: document.getElementById('v3-term-output'),
            input: document.getElementById('v3-term-input'),
            historyPanel: document.getElementById('v3-history-panel'),
            hintBtn: document.getElementById('v3-hint-btn'),
            hintDisplay: document.getElementById('v3-hint-display'),
            xpDisplay: document.getElementById('v3-xp-display'),
            levelTitle: document.getElementById('v3-level-title'),
            levelDesc: document.getElementById('v3-level-desc'),
            progressBar: document.getElementById('v3-progress-bar')
        };
        this.currentHintsUnlocked = 0;
        this.init();
    }

    init() {
        this.updateUI();
        if (this.ui.input) {
            // Remove old listeners by replacing element to avoid duplicates if re-initing
            const new_input = this.ui.input.cloneNode(true);
            this.ui.input.parentNode.replaceChild(new_input, this.ui.input);
            this.ui.input = new_input;
            
            this.ui.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.executeAttempt(this.ui.input.value);
                    this.ui.input.value = '';
                }
            });
        }
        if (this.ui.hintBtn) {
            const new_hintBtn = this.ui.hintBtn.cloneNode(true);
            this.ui.hintBtn.parentNode.replaceChild(new_hintBtn, this.ui.hintBtn);
            this.ui.hintBtn = new_hintBtn;
            this.ui.hintBtn.addEventListener('click', () => this.unlockHint());
        }
        this.printTerm(`[System] Initialized Virtual Environment: ${this.journey.title}`);
        this.printTerm(`[System] Loaded Level ${this.currentLevelIndex + 1}: ${this.currentLevel().name}`);
    }

    currentLevel() {
        return this.journey.levels[this.currentLevelIndex];
    }

    updateUI() {
        if(this.ui.xpDisplay) this.ui.xpDisplay.innerText = `${this.xp} XP`;
        if(this.ui.levelTitle) this.ui.levelTitle.innerText = `Level ${this.currentLevelIndex + 1}: ${this.currentLevel().name}`;
        if(this.ui.levelDesc) this.ui.levelDesc.innerHTML = this.currentLevel().description;
        if(this.ui.progressBar) {
            const pct = ((this.currentLevelIndex) / this.journey.levels.length) * 100;
            this.ui.progressBar.style.width = `${pct}%`;
        }
        this.currentHintsUnlocked = 0;
        if(this.ui.hintDisplay) this.ui.hintDisplay.innerHTML = '';
        if(this.ui.hintBtn) {
            const level = this.currentLevel();
            if (level.hints && level.hints.length > 0) {
                this.ui.hintBtn.innerText = `Unlock Hint (Cost: ${level.hints[0].cost} XP)`;
                this.ui.hintBtn.disabled = false;
            } else {
                this.ui.hintBtn.innerText = `No Hints Available`;
                this.ui.hintBtn.disabled = true;
            }
        }
    }

    printTerm(text, className = '') {
        if (!this.ui.terminal) return;
        const line = document.createElement('div');
        line.className = `term-line ${className}`;
        line.innerText = text;
        this.ui.terminal.appendChild(line);
        this.ui.terminal.scrollTop = this.ui.terminal.scrollHeight;
    }

    unlockHint() {
        const level = this.currentLevel();
        if (this.currentHintsUnlocked >= level.hints.length) {
            alert('No more hints available for this level.');
            return;
        }
        const hint = level.hints[this.currentHintsUnlocked];
        if (this.xp < hint.cost) {
            alert(`Not enough XP! You need ${hint.cost} XP. You have ${this.xp} XP.`);
            return;
        }
        this.xp -= hint.cost;
        localStorage.setItem('lab_xp', this.xp);
        this.currentHintsUnlocked++;
        
        const hintEl = document.createElement('div');
        hintEl.className = 'hint-item';
        hintEl.innerHTML = `<strong>Hint ${this.currentHintsUnlocked}:</strong> ${hint.text}`;
        this.ui.hintDisplay.appendChild(hintEl);
        
        if (this.currentHintsUnlocked < level.hints.length) {
            this.ui.hintBtn.innerText = `Unlock Hint ${this.currentHintsUnlocked+1} (Cost: ${level.hints[this.currentHintsUnlocked].cost} XP)`;
        } else {
            this.ui.hintBtn.innerText = `All Hints Unlocked`;
            this.ui.hintBtn.disabled = true;
        }
        if(this.ui.xpDisplay) this.ui.xpDisplay.innerText = `${this.xp} XP`;
    }

    executeAttempt(input) {
        this.printTerm(`$ ${input}`, 'term-input-echo');
        
        const level = this.currentLevel();
        
        // 1. Check Filters first
        if (level.filters) {
            for (let filter of level.filters) {
                if (input.includes(filter.char)) {
                    this.printTerm(`Error: Invalid character '${filter.char}' detected by WAF.`, 'term-error');
                    this.addHistory(input, false, 'Blocked by WAF');
                    return;
                }
            }
        }

        // 2. Simulate execution
        let output = '';
        let success = false;
        
        let injectedCmds = [];
        const separators = [';', '|', '&&', '||'];
        let hasSeparator = false;
        
        // A naive parser to extract commands after separators
        let remainingInput = input;
        for (let sep of separators) {
            if (remainingInput.includes(sep)) {
                hasSeparator = true;
                const parts = remainingInput.split(sep);
                for(let i=1; i<parts.length; i++) {
                    injectedCmds.push(parts[i].trim());
                }
                break;
            }
        }
        // Also support $IFS injection bypassing spaces
        if (input.includes('$IFS')) {
            hasSeparator = true;
            let parts = input.split(';');
            if(parts.length > 1) {
                injectedCmds.push(parts[1].trim().replace(/\$IFS/g, ' '));
            } else {
                injectedCmds.push(input.trim().replace(/\$IFS/g, ' '));
            }
        }

        if (!hasSeparator && !input.startsWith('ping ')) {
            // If it's a direct command with no base ping, maybe they just typed 'whoami'
            injectedCmds.push(input.trim());
        } else if (!hasSeparator) {
            // Normal base command execution
            output = `PING ${input.replace('ping ', '')} (127.0.0.1) 56(84) bytes of data.\n64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.034 ms`;
        }

        if (injectedCmds.length > 0) {
            for (let cmdStr of injectedCmds) {
                if(!cmdStr) continue;
                const parts = cmdStr.split(' ').filter(Boolean);
                const cmd = parts[0];
                const args = parts.slice(1);
                
                if (cmd === 'whoami') output += 'www-data\n';
                else if (cmd === 'pwd') output += this.vfs.pwd() + '\n';
                else if (cmd === 'ls') output += this.vfs.ls(args[0]) + '\n';
                else if (cmd === 'cat') output += this.vfs.cat(args[0]) + '\n';
                else if (cmd === 'cd') output += this.vfs.cd(args[0]) + '\n';
                else if (cmd === 'sleep') output += `[Time delay of ${args[0]} seconds simulated]\n`;
                else output += `bash: ${cmd}: command not found\n`;
            }
        }

        output = output.trim();

        // Check completion condition using eval safely for the journey definition
        if (level.completionCondition && level.completionCondition(input, output)) {
            success = true;
            if(output) this.printTerm(output);
            this.printTerm(`[+] Level Completed! Reward: +${level.rewardXP} XP`, 'term-success');
            this.addHistory(input, true, 'Execution successful');
            this.xp += level.rewardXP;
            localStorage.setItem('lab_xp', this.xp);
            
            setTimeout(() => this.nextLevel(), 2000);
        } else {
            if(output) this.printTerm(output);
            this.addHistory(input, false, 'Did not meet level objective');
        }
    }

    addHistory(cmd, success, note) {
        this.history.push({ cmd, success, note });
        if (!this.ui.historyPanel) return;
        
        const el = document.createElement('div');
        el.className = `history-item ${success ? 'success' : 'fail'}`;
        el.innerHTML = `
            <span class="hist-cmd">${cmd}</span>
            <span class="hist-status">${success ? '✓' : '✗'}</span>
        `;
        this.ui.historyPanel.prepend(el);
    }

    nextLevel() {
        this.currentLevelIndex++;
        if (this.currentLevelIndex >= this.journey.levels.length) {
            if(this.ui.progressBar) this.ui.progressBar.style.width = `100%`;
            this.showMasterySummary();
        } else {
            this.ui.terminal.innerHTML = '';
            this.init();
        }
    }

    showMasterySummary() {
        const modal = document.getElementById('v3-mastery-modal');
        if(modal) {
            modal.style.display = 'flex';
            document.getElementById('v3-final-xp').innerText = this.xp;
        }
    }
}
window.LabEngine = LabEngine;
