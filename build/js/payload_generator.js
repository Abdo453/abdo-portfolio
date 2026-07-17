/**
 * Advanced Payload Generator Engine (V2)
 * Data-Driven JSON Architecture with Burp Suite Grade UI
 */

class PayloadGenerator {
    constructor(mountId) {
        this.mountEl = document.getElementById(mountId);
        if (!this.mountEl) return;
        
        this.vulnType = this.mountEl.getAttribute('data-vuln') || 'xss';
        
        this.state = {
            context: 'html',
            waf: 'none',
            encodings: [],
            difficulty: 'All'
        };

        this.data = null;
        this.currentPayloadObj = null;

        this.init();
    }

    async init() {
        this.mountEl.innerHTML = `<div style="color: var(--neon-cyan); padding: 20px; text-align: center; font-family: var(--font-mono);">[+] Fetching ${this.vulnType.toUpperCase()} payloads...</div>`;
        
        try {
            const response = await fetch(`data/payloads/${this.vulnType}.json`);
            if (!response.ok) throw new Error("Failed to load payload data.");
            this.data = await response.json();
            
            // Set default context
            this.state.context = Object.keys(this.data.contexts)[0];
            
            this.renderUI();
            this.filterAndDisplayPayload();
        } catch (error) {
            this.mountEl.innerHTML = `<div style="color: var(--neon-red); padding: 20px;">[-] Error initializing Payload Engine: ${error.message}</div>`;
            console.error(error);
        }
    }

    renderUI() {
        let html = `
            <div class="cyber-card payload-gen-card" style="border-top: 3px solid var(--neon-cyan); margin-top: 20px;">
                <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(0, 229, 255, 0.2); padding-bottom: 15px;">
                    <h3 style="margin:0; color: var(--neon-cyan); display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.5rem;">⚙️</span> Advanced Payload Generator
                    </h3>
                    
                    <!-- Difficulty Selector -->
                    <select id="pg-difficulty" style="background: rgba(0,0,0,0.5); color: #bd93f9; border: 1px solid #6272a4; padding: 5px 10px; border-radius: 4px; font-family: var(--font-mono); outline: none;">
                        <option value="All">All Difficulties</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                    </select>
                </div>
                
                <div style="padding-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;" class="pg-main-grid">
                    
                    <!-- Left Column: Controls -->
                    <div class="pg-controls-col">
                        
                        <!-- Context Selector (Toggle Cards) -->
                        <div style="margin-bottom: 20px;">
                            <h5 style="color: #8be9fd; margin-bottom: 10px; font-family: var(--font-mono);">&gt; INJECTION_CONTEXT</h5>
                            <div class="pg-context-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                                ${Object.entries(this.data.contexts).map(([key, ctx]) => `
                                    <div class="pg-ctx-card ${key === this.state.context ? 'active' : ''}" data-val="${key}">
                                        <strong>${ctx.name}</strong>
                                        <p>${ctx.desc}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- WAF Bypass (Button Grid) -->
                        <div style="margin-bottom: 20px;">
                            <h5 style="color: #50fa7b; margin-bottom: 10px; font-family: var(--font-mono);">&gt; WAF_BYPASS</h5>
                            <div class="pg-waf-grid" style="display: flex; gap: 8px; flex-wrap: wrap;">
                                ${this.data.wafs.map(w => `
                                    <button class="pg-waf-btn ${w.id === this.state.waf ? 'active' : ''}" data-val="${w.id}">${w.name}</button>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Encoding (Chips - Multi Select) -->
                        <div style="margin-bottom: 20px;">
                            <h5 style="color: #ffb86c; margin-bottom: 10px; font-family: var(--font-mono);">&gt; ENCODING_LAYERS</h5>
                            <div class="pg-enc-grid" style="display: flex; gap: 8px; flex-wrap: wrap;">
                                ${this.data.encodings.map(e => `
                                    <div class="pg-chip" data-val="${e.id}">
                                        <div class="pg-chip-box"></div>
                                        <span>${e.name}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Output & Details -->
                    <div class="pg-output-col">
                        
                        <!-- Terminal Output -->
                        <div class="pg-terminal">
                            <div class="pg-term-header">
                                <span>Payload Terminal</span>
                                <div style="display: flex; gap: 10px;">
                                    <button class="pg-icon-btn" id="pg-copy-btn" title="Copy Payload">📋 Copy</button>
                                </div>
                            </div>
                            <div class="pg-term-body" id="pg-term-body">
                                <div class="pg-term-log" id="pg-term-log"></div>
                                <div class="pg-term-payload" id="pg-term-payload"></div>
                            </div>
                        </div>

                        <!-- Payload Metadata -->
                        <div class="pg-metadata" id="pg-metadata" style="margin-top: 20px; display: none;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                                <span class="pg-diff-badge" id="pg-meta-diff"></span>
                                <div class="pg-tags" id="pg-meta-tags" style="display: flex; gap: 5px; flex-wrap: wrap;"></div>
                            </div>

                            <div class="pg-scores">
                                <div class="pg-score-row">
                                    <span>Reliability</span>
                                    <div class="pg-progress"><div class="pg-progress-fill" id="pg-score-rel"></div></div>
                                    <span class="pg-score-val" id="pg-val-rel"></span>
                                </div>
                                <div class="pg-score-row">
                                    <span>Stealth</span>
                                    <div class="pg-progress"><div class="pg-progress-fill" id="pg-score-stl"></div></div>
                                    <span class="pg-score-val" id="pg-val-stl"></span>
                                </div>
                                <div class="pg-score-row">
                                    <span>Browser Support</span>
                                    <div class="pg-progress"><div class="pg-progress-fill" id="pg-score-brw"></div></div>
                                    <span class="pg-score-val" id="pg-val-brw"></span>
                                </div>
                            </div>

                            <div style="margin-top: 15px; font-size: 0.85rem; color: #aaa;">
                                <strong>Browsers:</strong> <span id="pg-meta-browsers"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Educational Sandbox -->
                <div style="margin-top: 25px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
                    <h5 style="color: #bd93f9; margin-bottom: 10px; font-family: var(--font-mono);">&gt; INJECTION_SIMULATOR (Safe Mode)</h5>
                    <div style="background: rgba(0,0,0,0.4); border: 1px dashed #6272a4; padding: 15px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.9rem; overflow-x: auto;">
                        <code id="pg-sandbox-code" style="color: #f8f8f2;"></code>
                    </div>
                </div>
            </div>

            <style>
                /* Layout */
                @media (max-width: 900px) {
                    .pg-main-grid { grid-template-columns: 1fr !important; }
                }

                /* Context Cards */
                .pg-ctx-card {
                    background: rgba(0,0,0,0.4);
                    border: 1px solid #334155;
                    border-radius: 6px;
                    padding: 12px;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .pg-ctx-card strong { display: block; color: #f8f8f2; font-size: 0.95rem; margin-bottom: 5px; }
                .pg-ctx-card p { margin: 0; color: #888; font-size: 0.8rem; line-height: 1.4; }
                .pg-ctx-card:hover { border-color: #8be9fd; transform: translateY(-2px); }
                .pg-ctx-card.active {
                    background: rgba(139, 233, 253, 0.1);
                    border-color: #8be9fd;
                    box-shadow: 0 0 15px rgba(139, 233, 253, 0.2);
                }
                .pg-ctx-card.active strong { color: #8be9fd; }

                /* WAF Buttons */
                .pg-waf-btn {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid #334155;
                    color: #aaa;
                    padding: 6px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.85rem;
                    transition: all 0.2s;
                }
                .pg-waf-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
                .pg-waf-btn.active {
                    background: rgba(80, 250, 123, 0.1);
                    border-color: #50fa7b;
                    color: #50fa7b;
                }

                /* Encoding Chips */
                .pg-chip {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid #334155;
                    padding: 6px 12px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 0.85rem;
                    color: #aaa;
                    transition: all 0.2s;
                }
                .pg-chip-box {
                    width: 12px; height: 12px;
                    border: 1px solid #aaa;
                    border-radius: 3px;
                    display: inline-block;
                }
                .pg-chip:hover { border-color: #ffb86c; color: #fff; }
                .pg-chip.active {
                    background: rgba(255, 184, 108, 0.1);
                    border-color: #ffb86c;
                    color: #ffb86c;
                }
                .pg-chip.active .pg-chip-box {
                    background: #ffb86c;
                    border-color: #ffb86c;
                }

                /* Terminal */
                .pg-terminal {
                    border: 1px solid #334155;
                    border-radius: 6px;
                    overflow: hidden;
                }
                .pg-term-header {
                    background: #1e293b;
                    padding: 8px 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #334155;
                    font-family: var(--font-mono);
                    font-size: 0.85rem;
                    color: #8be9fd;
                }
                .pg-icon-btn {
                    background: transparent;
                    border: none;
                    color: #aaa;
                    cursor: pointer;
                    transition: color 0.2s;
                    font-family: var(--font-sans);
                }
                .pg-icon-btn:hover { color: #fff; }
                .pg-term-body {
                    background: #0f172a;
                    padding: 15px;
                    min-height: 150px;
                    font-family: var(--font-mono);
                    font-size: 0.95rem;
                    position: relative;
                }
                .pg-term-log {
                    color: #6272a4;
                    margin-bottom: 15px;
                    font-size: 0.85rem;
                    line-height: 1.5;
                }
                .pg-term-payload {
                    color: #50fa7b;
                    word-break: break-all;
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                /* Metadata */
                .pg-diff-badge {
                    background: rgba(189, 147, 249, 0.2);
                    color: #bd93f9;
                    padding: 4px 10px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    font-weight: bold;
                    border: 1px solid rgba(189, 147, 249, 0.4);
                }
                .pg-tag {
                    background: rgba(255,255,255,0.05);
                    padding: 2px 8px;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    color: #aaa;
                }
                .pg-score-row {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 8px;
                    font-size: 0.85rem;
                    color: #ccc;
                }
                .pg-score-row > span:first-child { width: 120px; }
                .pg-progress {
                    flex-grow: 1;
                    height: 8px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 4px;
                    overflow: hidden;
                }
                .pg-progress-fill {
                    height: 100%;
                    background: var(--neon-cyan);
                    width: 0%;
                    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .pg-score-val { width: 30px; text-align: right; font-family: var(--font-mono); }
                
                /* Injected Span Animation */
                .pg-injected-payload {
                    color: #ff5555;
                    background: rgba(255,85,85,0.1);
                    padding: 2px 4px;
                    border-radius: 3px;
                }
            </style>
        `;

        this.mountEl.innerHTML = html;
        this.bindEvents();
    }

    bindEvents() {
        // Difficulty
        const diffSelect = this.mountEl.querySelector('#pg-difficulty');
        diffSelect.addEventListener('change', (e) => {
            this.state.difficulty = e.target.value;
            this.filterAndDisplayPayload();
        });

        // Context Cards
        const ctxCards = this.mountEl.querySelectorAll('.pg-ctx-card');
        ctxCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const target = e.currentTarget;
                ctxCards.forEach(c => c.classList.remove('active'));
                target.classList.add('active');
                this.state.context = target.getAttribute('data-val');
                this.filterAndDisplayPayload();
            });
        });

        // WAF Buttons
        const wafBtns = this.mountEl.querySelectorAll('.pg-waf-btn');
        wafBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget;
                wafBtns.forEach(b => b.classList.remove('active'));
                target.classList.add('active');
                this.state.waf = target.getAttribute('data-val');
                this.filterAndDisplayPayload();
            });
        });

        // Encoding Chips (Multi-Select)
        const encChips = this.mountEl.querySelectorAll('.pg-chip');
        encChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                const target = e.currentTarget;
                const val = target.getAttribute('data-val');
                
                if (target.classList.contains('active')) {
                    target.classList.remove('active');
                    this.state.encodings = this.state.encodings.filter(enc => enc !== val);
                } else {
                    target.classList.add('active');
                    this.state.encodings.push(val);
                }
                this.filterAndDisplayPayload();
            });
        });

        // Copy Button
        const copyBtn = this.mountEl.querySelector('#pg-copy-btn');
        copyBtn.addEventListener('click', () => {
            if (!this.currentPayloadObj) return;
            const output = this.mountEl.querySelector('#pg-term-payload').innerText;
            navigator.clipboard.writeText(output).then(() => {
                copyBtn.innerHTML = '✅ Copied!';
                copyBtn.style.color = '#50fa7b';
                setTimeout(() => {
                    copyBtn.innerHTML = '📋 Copy';
                    copyBtn.style.color = '#aaa';
                }, 2000);
            });
        });
    }

    filterAndDisplayPayload() {
        // 1. Find matching payload from JSON
        let matches = this.data.payloads.filter(p => 
            p.context === this.state.context && 
            p.waf.includes(this.state.waf)
        );

        if (this.state.difficulty !== 'All') {
            matches = matches.filter(p => p.difficulty === this.state.difficulty);
        }

        const logEl = this.mountEl.querySelector('#pg-term-log');
        const payloadEl = this.mountEl.querySelector('#pg-term-payload');
        const metaEl = this.mountEl.querySelector('#pg-metadata');
        
        payloadEl.style.opacity = '0'; // Hide for animation

        if (matches.length === 0) {
            this.currentPayloadObj = null;
            logEl.innerHTML = `> Context : ${this.state.context.toUpperCase()}<br>> WAF : ${this.state.waf.toUpperCase()}<br>> Encoding: ${this.state.encodings.length ? this.state.encodings.join(' + ') : 'None'}<br><br><span style="color:#ff5555;">[-] No payload found matching these criteria. Try lowering the WAF or changing the difficulty.</span>`;
            payloadEl.innerText = '';
            metaEl.style.display = 'none';
            this.renderSandbox('', null);
            return;
        }

        // Pick the first match
        this.currentPayloadObj = matches[0];
        let finalPayloadStr = this.currentPayloadObj.payload;

        // Apply Encodings sequentially
        this.state.encodings.forEach(enc => {
            if (enc === 'url') finalPayloadStr = encodeURIComponent(finalPayloadStr);
            else if (enc === 'double_url') finalPayloadStr = encodeURIComponent(encodeURIComponent(finalPayloadStr));
            else if (enc === 'base64') finalPayloadStr = btoa(finalPayloadStr);
            else if (enc === 'html') {
                finalPayloadStr = finalPayloadStr.replace(/&/g, '&amp;')
                             .replace(/</g, '&lt;')
                             .replace(/>/g, '&gt;')
                             .replace(/"/g, '&quot;')
                             .replace(/'/g, '&#39;');
            }
            else if (enc === 'hex') {
                finalPayloadStr = Array.from(finalPayloadStr).map(c => '\\x' + c.charCodeAt(0).toString(16)).join('');
            }
            else if (enc === 'unicode') {
                finalPayloadStr = Array.from(finalPayloadStr).map(c => '\\u00' + c.charCodeAt(0).toString(16)).join('');
            }
        });

        // 2. Terminal Animation
        logEl.innerHTML = `> Context : ${this.state.context.toUpperCase()}<br>> WAF : ${this.state.waf.toUpperCase()}<br>> Encoding: ${this.state.encodings.length ? this.state.encodings.join(' + ') : 'None'}<br><br>Generating payload`;
        
        let dots = 0;
        const animInterval = setInterval(() => {
            dots++;
            logEl.innerHTML += '<span style="color:#8be9fd;"> █</span>';
            if (dots >= 4) {
                clearInterval(animInterval);
                logEl.innerHTML += ' Done.<br>-----------------------------------';
                
                // Show Payload
                payloadEl.innerText = finalPayloadStr;
                payloadEl.style.opacity = '1';

                // Update Metadata
                this.updateMetadata();
                
                // Update Sandbox
                this.renderSandbox(finalPayloadStr, this.currentPayloadObj.context);
            }
        }, 100);
    }

    updateMetadata() {
        const p = this.currentPayloadObj;
        const metaEl = this.mountEl.querySelector('#pg-metadata');
        metaEl.style.display = 'block';

        // Difficulty Badge
        const diffColors = {
            'Beginner': '#50fa7b',
            'Intermediate': '#ffb86c',
            'Advanced': '#ff5555',
            'Expert': '#bd93f9'
        };
        const diffBadge = this.mountEl.querySelector('#pg-meta-diff');
        diffBadge.innerText = p.difficulty;
        diffBadge.style.color = diffColors[p.difficulty] || '#aaa';
        diffBadge.style.borderColor = diffColors[p.difficulty] || '#aaa';
        diffBadge.style.background = (diffColors[p.difficulty] || '#aaa') + '22';

        // Tags
        this.mountEl.querySelector('#pg-meta-tags').innerHTML = p.tags.map(t => `<span class="pg-tag">${t}</span>`).join('');

        // Scores
        setTimeout(() => {
            this.mountEl.querySelector('#pg-score-rel').style.width = p.score.reliability + '%';
            this.mountEl.querySelector('#pg-val-rel').innerText = p.score.reliability + '%';

            this.mountEl.querySelector('#pg-score-stl').style.width = p.score.stealth + '%';
            this.mountEl.querySelector('#pg-val-stl').innerText = p.score.stealth + '%';

            this.mountEl.querySelector('#pg-score-brw').style.width = p.score.browser_support + '%';
            this.mountEl.querySelector('#pg-val-brw').innerText = p.score.browser_support + '%';
        }, 50);

        // Browsers
        this.mountEl.querySelector('#pg-meta-browsers').innerText = p.browsers.join(', ');
    }

    renderSandbox(payloadStr, contextType) {
        const sandbox = this.mountEl.querySelector('#pg-sandbox-code');
        if (!sandbox) return;

        if (!payloadStr) {
            sandbox.innerHTML = `// No payload generated`;
            return;
        }

        // Safely escape the payload for display in the simulator
        const safePayload = payloadStr.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        const injHtml = `<span class="pg-injected-payload">${safePayload}</span>`;

        let simHtml = '';
        if (contextType === 'html') {
            simHtml = `&lt;div class="user-comment"&gt;\n  ${injHtml}\n&lt;/div&gt;`;
        } else if (contextType === 'attribute') {
            simHtml = `&lt;input type="text" name="search" value="${injHtml}"&gt;`;
        } else if (contextType === 'script') {
            simHtml = `&lt;script&gt;\n  var username = '${injHtml}';\n  console.log(username);\n&lt;/script&gt;`;
        } else if (contextType === 'svg') {
            simHtml = `&lt;!-- Profile Avatar SVG --&gt;\n${injHtml}`;
        }

        sandbox.innerHTML = simHtml;
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const mounts = document.querySelectorAll('[data-component="payload_generator"]');
    mounts.forEach(mount => {
        new PayloadGenerator(mount.id);
    });
});
