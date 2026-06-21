export class UIRenderer {
    constructor(journeyManager) {
        this.manager = journeyManager;
        
        this.els = {
            company: document.getElementById('v3-story-company'),
            target: document.getElementById('v3-story-target'),
            objective: document.getElementById('v3-story-objective'),
            env: document.getElementById('v3-story-env'),
            
            termOutput: document.getElementById('v3-term-output'),
            termInput: document.getElementById('v3-term-input'),
            
            historyPanel: document.getElementById('v3-history-panel'),
            hintBtn: document.getElementById('v3-hint-btn'),
            hintPanel: document.getElementById('v3-hint-display'),
            
            levelDisplay: document.getElementById('v3-level-display'),
            xpDisplay: document.getElementById('v3-xp-display'),
            coinsDisplay: document.getElementById('v3-coins-display'),
            
            dashboard: document.getElementById('v3-mastery-modal')
        };
        
        if (this.els.termInput) {
            // Clear existing listeners
            const new_input = this.els.termInput.cloneNode(true);
            this.els.termInput.parentNode.replaceChild(new_input, this.els.termInput);
            this.els.termInput = new_input;
            
            this.els.termInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.manager.executeCommand(this.els.termInput.value);
                    this.els.termInput.value = '';
                }
            });
        }

        if (this.els.hintBtn) {
            const new_btn = this.els.hintBtn.cloneNode(true);
            this.els.hintBtn.parentNode.replaceChild(new_btn, this.els.hintBtn);
            this.els.hintBtn = new_btn;
            this.els.hintBtn.addEventListener('click', () => {
                // simple hook for now, we unlock index 0 for testing
                this.unlockNextHint();
            });
        }
    }

    renderMission(missionData) {
        const scenario = missionData.scenario;
        
        if(this.els.company) this.els.company.innerText = scenario.company;
        if(this.els.target) this.els.target.innerText = scenario.target;
        if(this.els.objective) this.els.objective.innerText = scenario.objective;
        if(this.els.env) this.els.env.innerText = JSON.stringify(scenario.environment);
        
        if(this.els.termOutput) this.els.termOutput.innerHTML = '';
        this.printTerminal(`[+] Connected to ${scenario.company} internal network.`);
        this.printTerminal(`[+] Mission: ${missionData.title}`);
        
        this.updateStats();
        
        if(this.els.hintPanel) this.els.hintPanel.innerHTML = '';
        this.currentHintIndex = 0;
        this.updateHintButton(missionData);
    }

    printTerminal(text, className = '') {
        if (!this.els.termOutput) return;
        const line = document.createElement('div');
        line.className = `term-line ${className}`;
        line.innerText = text;
        this.els.termOutput.appendChild(line);
        this.els.termOutput.scrollTop = this.els.termOutput.scrollHeight;
    }

    updateHistoryPanel(historyArr) {
        if (!this.els.historyPanel) return;
        this.els.historyPanel.innerHTML = '';
        
        historyArr.slice().reverse().forEach(h => {
            const el = document.createElement('div');
            el.className = `history-item ${h.success ? 'success' : 'fail'}`;
            el.innerHTML = `
                <span class="hist-cmd">${h.input}</span>
                <span class="hist-status">${h.success ? '✓' : '✗'}</span>
            `;
            if (h.note) el.title = h.note;
            this.els.historyPanel.appendChild(el);
        });
    }

    updateStats() {
        if(this.els.levelDisplay) this.els.levelDisplay.innerText = `Level ${this.manager.progress.getLevel()}`;
        if(this.els.xpDisplay) this.els.xpDisplay.innerText = `${this.manager.storage.getXP()} XP`;
        if(this.els.coinsDisplay) this.els.coinsDisplay.innerText = `${this.manager.storage.getCoins()} Coins`;
    }

    updateHintButton(missionData) {
        if (!this.els.hintBtn) return;
        if (missionData.hints && this.currentHintIndex < missionData.hints.length) {
            const hint = missionData.hints[this.currentHintIndex];
            this.els.hintBtn.innerText = `Unlock Hint (Cost: ${hint.cost} Coins)`;
            this.els.hintBtn.disabled = false;
        } else {
            this.els.hintBtn.innerText = `No more hints`;
            this.els.hintBtn.disabled = true;
        }
    }

    unlockNextHint() {
        const missionData = this.manager.journey.missions[this.manager.currentMissionIndex];
        if (!missionData.hints || this.currentHintIndex >= missionData.hints.length) return;
        
        const hint = missionData.hints[this.currentHintIndex];
        const res = this.manager.hints.unlockHint(this.manager.journey.id, missionData.id, this.currentHintIndex, hint.cost);
        
        if (res.success) {
            const el = document.createElement('div');
            el.className = 'hint-item';
            el.innerHTML = `<strong>Hint ${this.currentHintIndex + 1}:</strong> ${hint.text}`;
            this.els.hintPanel.appendChild(el);
            
            this.currentHintIndex++;
            this.updateStats();
            this.updateHintButton(missionData);
        } else {
            alert(res.reason);
        }
    }

    clearTerminal() {
        if (this.els.termOutput) this.els.termOutput.innerHTML = '';
    }

    showTimeline(historyArr, callback) {
        // Find the mission object from manager
        const missionData = this.manager.journey.missions[this.manager.currentMissionIndex];
        
        // Hide terminal, show dashboard overlay
        const dashboard = document.getElementById('v3-dashboard-overlay');
        if (!dashboard) {
            // Fallback if not updated in HTML yet
            alert("Mission Complete! Moving to next...");
            if(callback) callback();
            return;
        }
        
        // Compute Analytics
        const totalAttempts = historyArr.length;
        const failed = historyArr.filter(h => !h.success).length;
        const successLog = historyArr.filter(h => h.success);
        const finalPayload = successLog.length > 0 ? successLog[successLog.length - 1].input : "N/A";
        
        const timeTakenMs = Date.now() - this.manager.startTime;
        const timeTakenMins = Math.max(1, Math.round(timeTakenMs / 60000));

        // Build HTML
        let html = `
            <div class="dashboard-content">
                <h2>Mission Accomplished: ${missionData.title}</h2>
                
                <div class="dash-section stats-grid">
                    <div class="stat-box"><h4>Attempts</h4><p>${totalAttempts}</p></div>
                    <div class="stat-box"><h4>Failed</h4><p>${failed}</p></div>
                    <div class="stat-box"><h4>Time</h4><p>${timeTakenMins} min</p></div>
                    <div class="stat-box highlight"><h4>Winning Payload</h4><code>${finalPayload}</code></div>
                </div>
                
                <div class="dash-section">
                    <h3>Replay Timeline</h3>
                    <div class="timeline">
        `;
        
        historyArr.forEach((h, index) => {
            let icon = h.success ? '🟢' : '🔴';
            let label = h.success ? 'Executed' : 'Blocked';
            html += `
                <div class="timeline-item">
                    <div class="timeline-icon">${icon}</div>
                    <div class="timeline-data">
                        <strong>Step ${index + 1}: ${label}</strong>
                        <code>${h.input}</code>
                        ${h.note ? `<p class="timeline-note">${h.note}</p>` : ''}
                    </div>
                </div>
            `;
        });
        
        html += `
                    </div>
                </div>
                
                <div class="dash-actions">
                    <button id="dash-next-btn" class="btn btn-primary">Proceed to Next Mission</button>
                </div>
            </div>
        `;
        
        dashboard.innerHTML = html;
        dashboard.style.display = 'block';
        
        document.getElementById('dash-next-btn').addEventListener('click', () => {
            dashboard.style.display = 'none';
            if(callback) callback();
        });
    }

    renderMasteryDashboard() {
        if(this.els.dashboard) {
            this.els.dashboard.innerHTML = `
                <div class="mastery-content">
                    <h1>Journey Completed!</h1>
                    <p>You have mastered this vulnerability.</p>
                    <a href="/academy" class="btn btn-primary">Return to Academy</a>
                </div>
            `;
            this.els.dashboard.style.display = 'flex';
        }
    }
}
