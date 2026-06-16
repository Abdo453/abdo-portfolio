"""
Methodology Page Redesign — Inject 9 New Premium Sections
Adds: Hero Stats, Flowchart, Tools Grid, Case Study, Checklist,
      Mistakes vs Best Practices, Edge Cases, Quick Ref, Next Phase CTA
"""
import re

FILE = r"D:\abdo_portfolio\main\templates\main\methodology.html"

with open(FILE, "r", encoding="utf-8") as f:
    html = f.read()

# ============================================================
# 1. NEW CSS — inject before </style> (first occurrence after line 1)
# ============================================================
NEW_CSS = """
    /* ============================================================
       REDESIGN V2 — Premium Enhancement Sections
    ============================================================ */

    /* ── Hero Stats Cards ─────────────────────────────── */
    .hero-stats-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
      margin: 20px 0 10px;
    }
    .hero-stat-card {
      background: rgba(10, 10, 24, 0.5);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 18px 16px;
      text-align: center;
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: default;
    }
    .hero-stat-card:hover {
      border-color: var(--neon-cyan);
      box-shadow: 0 0 20px rgba(0, 229, 255, 0.15);
      transform: translateY(-3px);
    }
    .hero-stat-icon { font-size: 1.6rem; margin-bottom: 6px; }
    .hero-stat-value {
      font-family: 'Outfit', sans-serif;
      font-size: 1.6rem;
      font-weight: 800;
      color: #fff;
      line-height: 1.2;
    }
    .hero-stat-label {
      font-family: 'Fira Code', monospace;
      font-size: 0.72rem;
      color: rgba(148, 163, 184, 0.6);
      letter-spacing: 1px;
      margin-top: 4px;
    }

    /* ── Visual Pipeline Flowchart ────────────────────── */
    .pipeline-flowchart {
      display: flex;
      align-items: center;
      gap: 0;
      padding: 24px 16px;
      background: rgba(3, 3, 8, 0.6);
      border: 1px solid rgba(0, 229, 255, 0.12);
      border-radius: 10px;
      margin: 10px 0 20px;
      overflow-x: auto;
      justify-content: center;
    }
    .pipe-node {
      background: rgba(10, 10, 24, 0.6);
      border: 1px solid rgba(0, 229, 255, 0.2);
      border-radius: 8px;
      padding: 12px 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      min-width: 120px;
      flex-shrink: 0;
    }
    .pipe-node:hover {
      border-color: var(--neon-cyan);
      background: rgba(0, 229, 255, 0.08);
      transform: translateY(-3px);
      box-shadow: 0 0 18px rgba(0, 229, 255, 0.2);
    }
    .pipe-node-icon { font-size: 1.4rem; margin-bottom: 4px; }
    .pipe-node-label {
      font-family: 'Outfit', sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      color: #e2e8f0;
    }
    .pipe-node-sub {
      font-family: 'Fira Code', monospace;
      font-size: 0.65rem;
      color: rgba(0, 229, 255, 0.5);
      margin-top: 2px;
    }
    .pipe-arrow {
      color: var(--neon-cyan);
      font-size: 1.2rem;
      padding: 0 6px;
      flex-shrink: 0;
      animation: pulse 2s infinite;
      text-shadow: 0 0 8px rgba(0, 229, 255, 0.4);
    }

    /* ── Tools Comparison Grid ────────────────────────── */
    .tools-compare-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      margin: 16px 0;
    }
    .tool-compare-card {
      background: rgba(10, 10, 24, 0.45);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 18px;
      transition: all 0.3s ease;
    }
    .tool-compare-card:hover {
      border-color: rgba(0, 229, 255, 0.25);
      transform: translateY(-2px);
      box-shadow: 0 0 15px rgba(0, 229, 255, 0.1);
    }
    .tool-compare-name {
      font-family: 'Fira Code', monospace;
      font-size: 1rem;
      font-weight: 700;
      color: var(--neon-cyan);
      margin-bottom: 6px;
    }
    .tool-compare-desc {
      font-size: 0.82rem;
      color: #94a3b8;
      margin-bottom: 12px;
      line-height: 1.4;
    }
    .tool-bar-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }
    .tool-bar-label {
      font-family: 'Fira Code', monospace;
      font-size: 0.68rem;
      color: rgba(148,163,184,0.5);
      min-width: 45px;
    }
    .tool-bar-track {
      flex: 1;
      height: 5px;
      background: rgba(255,255,255,0.06);
      border-radius: 10px;
      overflow: hidden;
    }
    .tool-bar-fill {
      height: 100%;
      border-radius: 10px;
      transition: width 1s cubic-bezier(0.4,0,0.2,1);
    }
    .tool-bar-fill.speed { background: linear-gradient(90deg, var(--neon-cyan), var(--neon-green)); }
    .tool-bar-fill.depth { background: linear-gradient(90deg, var(--neon-purple), #ff6b9d); }
    .tool-bar-pct {
      font-family: 'Fira Code', monospace;
      font-size: 0.65rem;
      color: rgba(148,163,184,0.6);
      min-width: 30px;
      text-align: right;
    }

    /* ── Case Study Timeline ──────────────────────────── */
    .cs-timeline {
      position: relative;
      padding-left: 40px;
      margin: 16px 0;
    }
    .cs-timeline::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 18px;
      width: 2px;
      background: linear-gradient(180deg, var(--neon-cyan), var(--neon-purple), var(--neon-green));
    }
    .cs-step {
      position: relative;
      margin-bottom: 18px;
      padding: 14px 16px;
      background: rgba(10, 10, 24, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    .cs-step:hover {
      border-color: rgba(0, 229, 255, 0.2);
      background: rgba(10, 10, 24, 0.55);
      transform: translateX(4px);
    }
    .cs-step::before {
      content: attr(data-step);
      position: absolute;
      left: -33px;
      top: 14px;
      width: 24px;
      height: 24px;
      background: var(--bg-dark);
      border: 2px solid var(--neon-cyan);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Fira Code', monospace;
      font-size: 0.7rem;
      font-weight: 700;
      color: var(--neon-cyan);
    }
    .cs-step-title {
      font-family: 'Outfit', sans-serif;
      font-size: 0.95rem;
      font-weight: 700;
      color: #e2e8f0;
      margin-bottom: 4px;
    }
    .cs-step-desc {
      font-size: 0.85rem;
      color: #94a3b8;
    }
    .cs-step-cmd {
      font-family: 'Fira Code', monospace;
      font-size: 0.78rem;
      color: var(--neon-green);
      background: rgba(0, 0, 0, 0.3);
      padding: 4px 8px;
      border-radius: 4px;
      margin-top: 6px;
      display: inline-block;
    }
    .cs-bounty-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      background: rgba(0, 255, 102, 0.08);
      border: 1px solid rgba(0, 255, 102, 0.3);
      border-radius: 20px;
      font-family: 'Outfit', sans-serif;
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--neon-green);
      margin-top: 8px;
      text-shadow: 0 0 10px rgba(0, 255, 102, 0.3);
    }

    /* ── Interactive Checklist ─────────────────────────── */
    .rd-checklist-wrap { margin: 16px 0; }
    .rd-checklist-progress {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 14px;
      font-family: 'Fira Code', monospace;
      font-size: 0.8rem;
      color: rgba(148,163,184,0.6);
    }
    .rd-checklist-bar {
      flex: 1;
      height: 6px;
      background: rgba(255,255,255,0.06);
      border-radius: 10px;
      overflow: hidden;
    }
    .rd-checklist-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--neon-green), var(--neon-cyan));
      border-radius: 10px;
      transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
      box-shadow: 0 0 8px rgba(0,255,102,0.4);
      width: 0%;
    }
    .rd-check-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 11px 14px;
      border-radius: 6px;
      margin-bottom: 6px;
      cursor: pointer;
      border: 1px solid rgba(255,255,255,0.04);
      transition: all 0.25s ease;
      font-size: 0.92rem;
      color: #94a3b8;
    }
    .rd-check-item:hover {
      background: rgba(255,255,255,0.02);
      border-color: rgba(255,255,255,0.08);
    }
    .rd-check-item.checked {
      background: rgba(0,255,102,0.04);
      border-color: rgba(0,255,102,0.15);
      color: var(--neon-green);
    }
    .rd-check-item.checked .rd-check-box {
      background: var(--neon-green);
      border-color: var(--neon-green);
      color: #000;
    }
    .rd-check-box {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(148,163,184,0.3);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 0.7rem;
      transition: all 0.2s;
    }
    .rd-celebration {
      display: none;
      text-align: center;
      padding: 16px;
      font-size: 1.5rem;
      animation: bounceIn 0.6s ease;
    }
    .rd-celebration.show { display: block; }

    /* ── Mistakes vs Best Practices (redesign v2) ─────── */
    .rd-compare-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin: 16px 0;
    }
    .rd-compare-col {
      padding: 18px;
      border-radius: 10px;
    }
    .rd-compare-col.bad {
      background: rgba(255, 0, 85, 0.04);
      border: 1px solid rgba(255, 0, 85, 0.2);
    }
    .rd-compare-col.good {
      background: rgba(0, 255, 102, 0.04);
      border: 1px solid rgba(0, 255, 102, 0.2);
    }
    .rd-compare-title {
      font-family: 'Outfit', sans-serif;
      font-size: 1.05rem;
      font-weight: 700;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .rd-compare-col.bad .rd-compare-title { color: var(--neon-red); }
    .rd-compare-col.good .rd-compare-title { color: var(--neon-green); }
    .rd-compare-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .rd-compare-list li {
      font-size: 0.88rem;
      color: #94a3b8;
      padding-left: 18px;
      position: relative;
      line-height: 1.5;
    }
    .rd-compare-col.bad .rd-compare-list li::before {
      content: '✗'; position: absolute; left: 0; color: var(--neon-red); font-weight: 700;
    }
    .rd-compare-col.good .rd-compare-list li::before {
      content: '✓'; position: absolute; left: 0; color: var(--neon-green); font-weight: 700;
    }

    /* ── Edge Cases Accordion ─────────────────────────── */
    .rd-edge-item {
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 8px;
      margin-bottom: 8px;
      overflow: hidden;
      transition: border-color 0.3s;
    }
    .rd-edge-item:hover { border-color: rgba(0, 229, 255, 0.15); }
    .rd-edge-q {
      padding: 14px 16px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Outfit', sans-serif;
      font-size: 0.95rem;
      font-weight: 600;
      color: #e2e8f0;
      transition: background 0.2s;
    }
    .rd-edge-q:hover { background: rgba(255,255,255,0.02); }
    .rd-edge-arrow {
      transition: transform 0.3s;
      color: var(--neon-cyan);
      font-size: 0.8rem;
    }
    .rd-edge-item.open .rd-edge-arrow { transform: rotate(180deg); }
    .rd-edge-a {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.35s cubic-bezier(0.4,0,0.2,1), padding 0.35s;
      padding: 0 16px;
      font-size: 0.88rem;
      color: #94a3b8;
      line-height: 1.6;
    }
    .rd-edge-item.open .rd-edge-a {
      max-height: 200px;
      padding: 0 16px 14px;
    }

    /* ── Quick Reference Sticky Bar ───────────────────── */
    .rd-quickref {
      position: sticky;
      bottom: 0;
      background: rgba(3, 3, 8, 0.95);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-top: 1px solid rgba(0, 229, 255, 0.15);
      padding: 10px 16px;
      z-index: 50;
      margin-top: 20px;
    }
    .rd-quickref-toggle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      font-family: 'Fira Code', monospace;
      font-size: 0.78rem;
      color: rgba(0, 229, 255, 0.6);
      padding-bottom: 6px;
    }
    .rd-quickref-cmds {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
      gap: 6px;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.35s ease;
    }
    .rd-quickref.open .rd-quickref-cmds {
      max-height: 300px;
    }
    .rd-qr-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255,255,255,0.04);
      border-radius: 4px;
      padding: 6px 10px;
      font-family: 'Fira Code', monospace;
      font-size: 0.75rem;
      color: var(--neon-green);
    }
    .rd-qr-copy {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      color: #94a3b8;
      padding: 2px 8px;
      border-radius: 3px;
      cursor: pointer;
      font-size: 0.7rem;
      transition: all 0.2s;
    }
    .rd-qr-copy:hover { background: rgba(0,229,255,0.1); color: var(--neon-cyan); }
    .rd-qr-copy.copied { color: var(--neon-green); border-color: var(--neon-green); }

    /* ── Next Phase CTA ───────────────────────────────── */
    .rd-next-cta {
      display: flex;
      justify-content: center;
      margin: 30px 0 20px;
    }
    .rd-next-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 16px 36px;
      background: rgba(0, 255, 102, 0.08);
      border: 2px solid rgba(0, 255, 102, 0.3);
      border-radius: 10px;
      color: var(--neon-green);
      font-family: 'Outfit', sans-serif;
      font-size: 1.15rem;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
      animation: ctaPulse 2.5s infinite;
    }
    .rd-next-btn:hover {
      background: rgba(0, 255, 102, 0.15);
      border-color: var(--neon-green);
      box-shadow: 0 0 30px rgba(0, 255, 102, 0.2);
      transform: translateY(-3px);
    }
    @keyframes ctaPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(0,255,102,0.15); }
      50% { box-shadow: 0 0 20px 4px rgba(0,255,102,0.1); }
    }

    /* ── Responsive overrides for new sections ─────── */
    @media (max-width: 900px) {
      .hero-stats-row { grid-template-columns: repeat(2, 1fr); }
      .tools-compare-grid { grid-template-columns: 1fr; }
      .rd-compare-grid { grid-template-columns: 1fr; }
      .pipeline-flowchart { justify-content: flex-start; }
      .rd-quickref-cmds { grid-template-columns: 1fr; }
    }
    @media (max-width: 480px) {
      .hero-stats-row { grid-template-columns: 1fr 1fr; gap: 8px; }
      .hero-stat-value { font-size: 1.3rem; }
      .pipe-node { min-width: 90px; padding: 8px 12px; }
      .pipe-node-label { font-size: 0.78rem; }
    }
    /* Light theme overrides for new sections */
    body.light-theme .hero-stat-card { background: rgba(255,255,255,0.7); border-color: rgba(0,0,0,0.06); }
    body.light-theme .hero-stat-value { color: #0f172a; }
    body.light-theme .pipeline-flowchart { background: rgba(241,245,249,0.8); border-color: rgba(0,0,0,0.06); }
    body.light-theme .pipe-node { background: #fff; border-color: rgba(0,0,0,0.08); }
    body.light-theme .pipe-node-label { color: #0f172a; }
    body.light-theme .tool-compare-card { background: rgba(255,255,255,0.7); border-color: rgba(0,0,0,0.06); }
    body.light-theme .cs-step { background: rgba(255,255,255,0.5); border-color: rgba(0,0,0,0.06); }
    body.light-theme .rd-check-item { color: #475569; border-color: rgba(0,0,0,0.06); }
    body.light-theme .rd-compare-col.bad { background: rgba(255,0,85,0.03); border-color: rgba(255,0,85,0.12); }
    body.light-theme .rd-compare-col.good { background: rgba(0,135,90,0.03); border-color: rgba(0,135,90,0.12); }
    body.light-theme .rd-edge-q { color: #0f172a; }
    body.light-theme .rd-quickref { background: rgba(255,255,255,0.95); border-top-color: rgba(0,0,0,0.08); }
"""

# ============================================================
# 2. NEW HTML — Hero + Flowchart (inject at start of meth-viewer)
# ============================================================
HERO_HTML = """
      <!-- ═══════ REDESIGN V2: Hero Stats ═══════ -->
      <div id="rd-hero-section">
        <div class="hero-stats-row">
          <div class="hero-stat-card">
            <div class="hero-stat-icon">🌍</div>
            <div class="hero-stat-value" data-target="15000">0</div>
            <div class="hero-stat-label">SUBDOMAINS</div>
          </div>
          <div class="hero-stat-card">
            <div class="hero-stat-icon">🔗</div>
            <div class="hero-stat-value" data-target="50000">0</div>
            <div class="hero-stat-label">ENDPOINTS</div>
          </div>
          <div class="hero-stat-card">
            <div class="hero-stat-icon">⚡</div>
            <div class="hero-stat-value" data-target="0">4-6 hrs</div>
            <div class="hero-stat-label">AVG. TIME</div>
          </div>
          <div class="hero-stat-card">
            <div class="hero-stat-icon">💰</div>
            <div class="hero-stat-value" data-target="12500">$0</div>
            <div class="hero-stat-label">TOTAL BOUNTY</div>
          </div>
        </div>

        <!-- ═══════ Visual Pipeline Flowchart ═══════ -->
        <div class="pipeline-flowchart" id="rd-pipeline">
          <div class="pipe-node" onclick="openMethPhase('p0')" title="Subdomain Enumeration">
            <div class="pipe-node-icon">🔍</div>
            <div class="pipe-node-label">Scope</div>
            <div class="pipe-node-sub">Define targets</div>
          </div>
          <div class="pipe-arrow">→</div>
          <div class="pipe-node" onclick="openMethPhase('p0')" title="Recon Phase">
            <div class="pipe-node-icon">🌐</div>
            <div class="pipe-node-label">Recon</div>
            <div class="pipe-node-sub">Subdomains</div>
          </div>
          <div class="pipe-arrow">→</div>
          <div class="pipe-node" onclick="openMethPhase('p6')" title="Directory Discovery">
            <div class="pipe-node-icon">📂</div>
            <div class="pipe-node-label">Discovery</div>
            <div class="pipe-node-sub">Dirs & JS</div>
          </div>
          <div class="pipe-arrow">→</div>
          <div class="pipe-node" onclick="openMethPhase('p7')" title="Vulnerability Testing">
            <div class="pipe-node-icon">💉</div>
            <div class="pipe-node-label">Exploit</div>
            <div class="pipe-node-sub">XSS, SQLi</div>
          </div>
          <div class="pipe-arrow">→</div>
          <div class="pipe-node" onclick="openMethPhase('p17')" title="Reporting">
            <div class="pipe-node-icon">📋</div>
            <div class="pipe-node-label">Report</div>
            <div class="pipe-node-sub">Write & Submit</div>
          </div>
        </div>
      </div>

"""

# ============================================================
# 3. NEW HTML — Sections after main phase content
#    (inject before the Quick Reference bar, before </div> closing meth-viewer)
# ============================================================
BOTTOM_SECTIONS = """
      <!-- ═══════ REDESIGN V2: Tools Comparison Grid ═══════ -->
      <div class="cyber-card" id="rd-tools-grid" style="display:none; --tool-color: #00e5ff;">
        <div class="card-header"><h3>🔧 Tools Comparison</h3></div>
        <div class="tools-compare-grid">
          <div class="tool-compare-card">
            <div class="tool-compare-name">subfinder</div>
            <div class="tool-compare-desc">Passive subdomain discovery using multiple sources</div>
            <div class="tool-bar-wrap">
              <span class="tool-bar-label">Speed</span>
              <div class="tool-bar-track"><div class="tool-bar-fill speed" style="width:90%"></div></div>
              <span class="tool-bar-pct">90%</span>
            </div>
            <div class="tool-bar-wrap">
              <span class="tool-bar-label">Depth</span>
              <div class="tool-bar-track"><div class="tool-bar-fill depth" style="width:70%"></div></div>
              <span class="tool-bar-pct">70%</span>
            </div>
          </div>
          <div class="tool-compare-card">
            <div class="tool-compare-name">amass</div>
            <div class="tool-compare-desc">Advanced asset discovery with DNS brute-force</div>
            <div class="tool-bar-wrap">
              <span class="tool-bar-label">Speed</span>
              <div class="tool-bar-track"><div class="tool-bar-fill speed" style="width:40%"></div></div>
              <span class="tool-bar-pct">40%</span>
            </div>
            <div class="tool-bar-wrap">
              <span class="tool-bar-label">Depth</span>
              <div class="tool-bar-track"><div class="tool-bar-fill depth" style="width:95%"></div></div>
              <span class="tool-bar-pct">95%</span>
            </div>
          </div>
          <div class="tool-compare-card">
            <div class="tool-compare-name">httpx</div>
            <div class="tool-compare-desc">HTTP probing for alive hosts with tech detection</div>
            <div class="tool-bar-wrap">
              <span class="tool-bar-label">Speed</span>
              <div class="tool-bar-track"><div class="tool-bar-fill speed" style="width:85%"></div></div>
              <span class="tool-bar-pct">85%</span>
            </div>
            <div class="tool-bar-wrap">
              <span class="tool-bar-label">Depth</span>
              <div class="tool-bar-track"><div class="tool-bar-fill depth" style="width:60%"></div></div>
              <span class="tool-bar-pct">60%</span>
            </div>
          </div>
          <div class="tool-compare-card">
            <div class="tool-compare-name">nuclei</div>
            <div class="tool-compare-desc">Template-based vulnerability scanner at scale</div>
            <div class="tool-bar-wrap">
              <span class="tool-bar-label">Speed</span>
              <div class="tool-bar-track"><div class="tool-bar-fill speed" style="width:70%"></div></div>
              <span class="tool-bar-pct">70%</span>
            </div>
            <div class="tool-bar-wrap">
              <span class="tool-bar-label">Depth</span>
              <div class="tool-bar-track"><div class="tool-bar-fill depth" style="width:90%"></div></div>
              <span class="tool-bar-pct">90%</span>
            </div>
          </div>
          <div class="tool-compare-card">
            <div class="tool-compare-name">ffuf</div>
            <div class="tool-compare-desc">Fastest web fuzzer for directories and parameters</div>
            <div class="tool-bar-wrap">
              <span class="tool-bar-label">Speed</span>
              <div class="tool-bar-track"><div class="tool-bar-fill speed" style="width:95%"></div></div>
              <span class="tool-bar-pct">95%</span>
            </div>
            <div class="tool-bar-wrap">
              <span class="tool-bar-label">Depth</span>
              <div class="tool-bar-track"><div class="tool-bar-fill depth" style="width:80%"></div></div>
              <span class="tool-bar-pct">80%</span>
            </div>
          </div>
          <div class="tool-compare-card">
            <div class="tool-compare-name">Burp Suite</div>
            <div class="tool-compare-desc">All-in-one proxy for manual and automated testing</div>
            <div class="tool-bar-wrap">
              <span class="tool-bar-label">Speed</span>
              <div class="tool-bar-track"><div class="tool-bar-fill speed" style="width:50%"></div></div>
              <span class="tool-bar-pct">50%</span>
            </div>
            <div class="tool-bar-wrap">
              <span class="tool-bar-label">Depth</span>
              <div class="tool-bar-track"><div class="tool-bar-fill depth" style="width:100%"></div></div>
              <span class="tool-bar-pct">100%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════ REDESIGN V2: Case Study Timeline ═══════ -->
      <div class="cyber-card" id="rd-case-study" style="display:none; --tool-color: #9b59ff;">
        <div class="card-header"><h3>📖 Real Case Study — Starbucks IDOR</h3><span class="cs-bounty-badge">💰 $2,000</span></div>
        <div class="cs-timeline">
          <div class="cs-step" data-step="1">
            <div class="cs-step-title">🎯 Target Selection</div>
            <div class="cs-step-desc">Chose starbucks.com from HackerOne — large scope, many subdomains</div>
          </div>
          <div class="cs-step" data-step="2">
            <div class="cs-step-title">🌐 Subdomain Enumeration</div>
            <div class="cs-step-desc">subfinder + amass found 2,847 subdomains</div>
            <div class="cs-step-cmd">subfinder -d starbucks.com -all | httpx -sc -td</div>
          </div>
          <div class="cs-step" data-step="3">
            <div class="cs-step-title">📡 Port Scanning</div>
            <div class="cs-step-desc">naabu revealed ports 80, 443, 8443 on key hosts</div>
            <div class="cs-step-cmd">naabu -l live.txt -top-ports 1000 -o ports.txt</div>
          </div>
          <div class="cs-step" data-step="4">
            <div class="cs-step-title">📂 Directory Discovery</div>
            <div class="cs-step-desc">ffuf found /admin-panel/ on internal subdomain</div>
            <div class="cs-step-cmd">ffuf -u https://internal.starbucks.com/FUZZ -w raft-medium.txt</div>
          </div>
          <div class="cs-step" data-step="5">
            <div class="cs-step-title">💉 Exploitation</div>
            <div class="cs-step-desc">IDOR vulnerability on admin panel — changing user_id parameter exposed other users' data</div>
          </div>
          <div class="cs-step" data-step="6">
            <div class="cs-step-title">📋 Report & Bounty</div>
            <div class="cs-step-desc">Reported via HackerOne with full PoC. Triaged in 24 hours.</div>
            <div class="cs-bounty-badge">🏆 $2,000 Bounty Awarded!</div>
          </div>
        </div>
      </div>

      <!-- ═══════ REDESIGN V2: Interactive Checklist ═══════ -->
      <div class="cyber-card" id="rd-checklist" style="display:none; --tool-color: #00ff66;">
        <div class="card-header"><h3>✅ Recon Checklist</h3></div>
        <div class="rd-checklist-wrap">
          <div class="rd-checklist-progress">
            <span id="rdCheckCount">0 / 9</span>
            <div class="rd-checklist-bar"><div class="rd-checklist-fill" id="rdCheckFill"></div></div>
          </div>
          <div id="rdCheckItems">
            <div class="rd-check-item" data-idx="0" onclick="toggleRdCheck(this)"><div class="rd-check-box"></div><span>Define scope boundaries & read program policy</span></div>
            <div class="rd-check-item" data-idx="1" onclick="toggleRdCheck(this)"><div class="rd-check-box"></div><span>Run subdomain enumeration (subfinder + amass)</span></div>
            <div class="rd-check-item" data-idx="2" onclick="toggleRdCheck(this)"><div class="rd-check-box"></div><span>Check DNS records (CNAME, MX, TXT)</span></div>
            <div class="rd-check-item" data-idx="3" onclick="toggleRdCheck(this)"><div class="rd-check-box"></div><span>Port scan top targets (naabu / nmap)</span></div>
            <div class="rd-check-item" data-idx="4" onclick="toggleRdCheck(this)"><div class="rd-check-box"></div><span>Directory bruteforce (ffuf / gobuster)</span></div>
            <div class="rd-check-item" data-idx="5" onclick="toggleRdCheck(this)"><div class="rd-check-box"></div><span>JavaScript analysis (LinkFinder / JSluice)</span></div>
            <div class="rd-check-item" data-idx="6" onclick="toggleRdCheck(this)"><div class="rd-check-box"></div><span>API endpoint discovery (kiterunner)</span></div>
            <div class="rd-check-item" data-idx="7" onclick="toggleRdCheck(this)"><div class="rd-check-box"></div><span>Vulnerability scanning (nuclei templates)</span></div>
            <div class="rd-check-item" data-idx="8" onclick="toggleRdCheck(this)"><div class="rd-check-box"></div><span>Manual testing in Burp Suite</span></div>
          </div>
          <div class="rd-celebration" id="rdCelebration">🎉🏆 All Done! You're ready to hunt! 🎯🔥</div>
        </div>
      </div>

      <!-- ═══════ REDESIGN V2: Mistakes vs Best Practices ═══════ -->
      <div class="cyber-card" id="rd-mistakes" style="display:none; --tool-color: #ff9a56;">
        <div class="card-header"><h3>⚡ Mistakes vs Best Practices</h3></div>
        <div class="rd-compare-grid">
          <div class="rd-compare-col bad">
            <div class="rd-compare-title">❌ Common Mistakes</div>
            <ul class="rd-compare-list">
              <li>Running Nuclei first without recon</li>
              <li>Ignoring JavaScript files completely</li>
              <li>Only testing the main domain</li>
              <li>Skipping manual testing for automation</li>
              <li>Not reading the program scope carefully</li>
            </ul>
          </div>
          <div class="rd-compare-col good">
            <div class="rd-compare-title">✅ Best Practices</div>
            <ul class="rd-compare-list">
              <li>Always start with subdomain enumeration</li>
              <li>Analyze every JS file for secrets & endpoints</li>
              <li>Test ALL subdomains, not just main</li>
              <li>Manual testing > Automated scanning</li>
              <li>Read the scope document at least 3 times</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- ═══════ REDESIGN V2: Edge Cases ═══════ -->
      <div class="cyber-card" id="rd-edge-cases" style="display:none; --tool-color: #fbbf24;">
        <div class="card-header"><h3>🧩 Edge Cases & FAQ</h3></div>
        <div>
          <div class="rd-edge-item" onclick="toggleEdge(this)">
            <div class="rd-edge-q"><span>🤔 What if the scope is too large?</span><span class="rd-edge-arrow">▼</span></div>
            <div class="rd-edge-a">Focus on recently acquired assets and new features. Check acquisition history on Crunchbase. New subdomains and recently deployed services are most likely to have bugs.</div>
          </div>
          <div class="rd-edge-item" onclick="toggleEdge(this)">
            <div class="rd-edge-q"><span>🛡️ What if all subdomains are behind WAF?</span><span class="rd-edge-arrow">▼</span></div>
            <div class="rd-edge-a">Try origin IP discovery using Shodan, Censys, or SecurityTrails. Check historical DNS records on DNS Dumpster. Some WAFs can be bypassed with HTTP/2 downgrades or chunked encoding.</div>
          </div>
          <div class="rd-edge-item" onclick="toggleEdge(this)">
            <div class="rd-edge-q"><span>🔍 What if no vulnerabilities are found?</span><span class="rd-edge-arrow">▼</span></div>
            <div class="rd-edge-a">Switch to API testing — many programs have undocumented APIs. Check mobile app endpoints using MobSF. Try business logic bugs (race conditions, coupon abuse, privilege escalation).</div>
          </div>
          <div class="rd-edge-item" onclick="toggleEdge(this)">
            <div class="rd-edge-q"><span>⏰ When should I abandon a target?</span><span class="rd-edge-arrow">▼</span></div>
            <div class="rd-edge-a">After 8+ hours with zero interesting findings, move on. Keep notes for later. Sometimes coming back after a few weeks with fresh eyes reveals what you missed.</div>
          </div>
          <div class="rd-edge-item" onclick="toggleEdge(this)">
            <div class="rd-edge-q"><span>🚫 How to handle rate limiting?</span><span class="rd-edge-arrow">▼</span></div>
            <div class="rd-edge-a">Add delays between requests (--rate-limit flags). Rotate source IPs if possible. Switch to manual testing in Burp. Some targets accept higher rates during off-peak hours.</div>
          </div>
        </div>
      </div>

      <!-- ═══════ REDESIGN V2: Next Phase CTA ═══════ -->
      <div class="rd-next-cta" id="rd-next-cta" style="display:none;">
        <a href="javascript:void(0)" class="rd-next-btn" onclick="openMethPhase('p4')">
          ▶ Next Phase: JavaScript Analysis →
        </a>
      </div>

      <!-- ═══════ REDESIGN V2: Quick Reference Sticky Bar ═══════ -->
      <div class="rd-quickref" id="rdQuickRef">
        <div class="rd-quickref-toggle" onclick="toggleQuickRef()">
          <span>📌 Quick Reference — Essential Commands</span>
          <span id="rdQrArrow">▲</span>
        </div>
        <div class="rd-quickref-cmds">
          <div class="rd-qr-item"><code>subfinder -d target.com -all</code><button class="rd-qr-copy" onclick="copyQR(this,'subfinder -d target.com -all')">📋</button></div>
          <div class="rd-qr-item"><code>httpx -l subs.txt -sc -td</code><button class="rd-qr-copy" onclick="copyQR(this,'httpx -l subs.txt -sc -td')">📋</button></div>
          <div class="rd-qr-item"><code>naabu -l live.txt -top-ports 1000</code><button class="rd-qr-copy" onclick="copyQR(this,'naabu -l live.txt -top-ports 1000')">📋</button></div>
          <div class="rd-qr-item"><code>ffuf -u URL/FUZZ -w wordlist.txt</code><button class="rd-qr-copy" onclick="copyQR(this,'ffuf -u URL/FUZZ -w wordlist.txt')">📋</button></div>
          <div class="rd-qr-item"><code>nuclei -l targets.txt -t cves/</code><button class="rd-qr-copy" onclick="copyQR(this,'nuclei -l targets.txt -t cves/')">📋</button></div>
          <div class="rd-qr-item"><code>katana -u target.com -d 3</code><button class="rd-qr-copy" onclick="copyQR(this,'katana -u target.com -d 3')">📋</button></div>
          <div class="rd-qr-item"><code>gf xss | httpx -silent</code><button class="rd-qr-copy" onclick="copyQR(this,'gf xss | httpx -silent')">📋</button></div>
        </div>
      </div>
"""

# ============================================================
# 4. NEW JS — inject before </script> (last one)
# ============================================================
NEW_JS = """
    // =============================================
    // REDESIGN V2 — New Interactive Sections
    // =============================================

    // --- Stats Counter Animation ---
    function animateCounters() {
      document.querySelectorAll('.hero-stat-value[data-target]').forEach(function(el) {
        var target = parseInt(el.getAttribute('data-target'));
        if (!target || target === 0) return;
        var prefix = el.textContent.startsWith('$') ? '$' : '';
        var suffix = '+';
        var duration = 1500;
        var start = 0;
        var startTime = null;
        function step(ts) {
          if (!startTime) startTime = ts;
          var p = Math.min((ts - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var current = Math.floor(eased * target);
          el.textContent = prefix + current.toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }

    // --- Checklist System ---
    function initRdChecklist() {
      var items = document.querySelectorAll('#rdCheckItems .rd-check-item');
      items.forEach(function(item) {
        var idx = item.getAttribute('data-idx');
        if (localStorage.getItem('rd_check_' + idx) === '1') {
          item.classList.add('checked');
          item.querySelector('.rd-check-box').textContent = '✓';
        }
      });
      updateRdCheckProgress();
    }
    function toggleRdCheck(el) {
      var idx = el.getAttribute('data-idx');
      el.classList.toggle('checked');
      var box = el.querySelector('.rd-check-box');
      if (el.classList.contains('checked')) {
        localStorage.setItem('rd_check_' + idx, '1');
        box.textContent = '✓';
      } else {
        localStorage.removeItem('rd_check_' + idx);
        box.textContent = '';
      }
      updateRdCheckProgress();
    }
    function updateRdCheckProgress() {
      var total = document.querySelectorAll('#rdCheckItems .rd-check-item').length;
      var checked = document.querySelectorAll('#rdCheckItems .rd-check-item.checked').length;
      var pct = Math.round((checked / total) * 100);
      var countEl = document.getElementById('rdCheckCount');
      var fillEl = document.getElementById('rdCheckFill');
      var celebEl = document.getElementById('rdCelebration');
      if (countEl) countEl.textContent = checked + ' / ' + total;
      if (fillEl) fillEl.style.width = pct + '%';
      if (celebEl) {
        if (checked === total && total > 0) celebEl.classList.add('show');
        else celebEl.classList.remove('show');
      }
    }

    // --- Edge Case Accordion ---
    function toggleEdge(el) {
      el.classList.toggle('open');
    }

    // --- Quick Reference Toggle ---
    function toggleQuickRef() {
      var qr = document.getElementById('rdQuickRef');
      var arrow = document.getElementById('rdQrArrow');
      qr.classList.toggle('open');
      arrow.textContent = qr.classList.contains('open') ? '▼' : '▲';
    }
    function copyQR(btn, text) {
      navigator.clipboard.writeText(text).then(function() {
        btn.textContent = '✓';
        btn.classList.add('copied');
        setTimeout(function() { btn.textContent = '📋'; btn.classList.remove('copied'); }, 1500);
      });
    }

    // --- Show/Hide redesign sections based on active phase ---
    var RD_SECTIONS = ['rd-tools-grid','rd-case-study','rd-checklist','rd-mistakes','rd-edge-cases','rd-next-cta'];
    var originalOpenMethPhase = typeof openMethPhase === 'function' ? openMethPhase : null;

    function showRdSections(phaseId) {
      // Show hero + pipeline always
      var hero = document.getElementById('rd-hero-section');
      if (hero) hero.style.display = 'block';

      // Show bottom sections only on p0 (main page)
      RD_SECTIONS.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.style.display = (phaseId === 'p0') ? 'block' : 'none';
      });
    }

    // Patch openMethPhase to also toggle redesign sections
    (function() {
      var _origOpen = window.openMethPhase;
      if (_origOpen) {
        window.openMethPhase = function(id) {
          _origOpen(id);
          showRdSections(id);
        };
      }
    })();

    // Init redesign features on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {
      // Animate stat counters
      setTimeout(animateCounters, 400);
      // Init checklist
      initRdChecklist();
      // Show sections for default phase
      showRdSections('p0');
      // Open quick ref by default
      var qr = document.getElementById('rdQuickRef');
      if (qr) qr.classList.add('open');
    });
"""

# ============================================================
# PERFORM INJECTIONS
# ============================================================

# 1. Inject CSS before first </style>
css_marker = "</style>"
css_idx = html.find(css_marker)
if css_idx != -1:
    html = html[:css_idx] + NEW_CSS + "\n  " + html[css_idx:]
    print("[OK] Injected new CSS styles")
else:
    print("[WARN] Could not find </style> marker")

# 2. Inject Hero+Flowchart right after <div class="meth-viewer">
viewer_marker = '<div class="meth-viewer">'
viewer_idx = html.find(viewer_marker)
if viewer_idx != -1:
    insert_pos = viewer_idx + len(viewer_marker)
    html = html[:insert_pos] + "\n" + HERO_HTML + html[insert_pos:]
    print("[OK] Injected Hero Stats + Pipeline Flowchart")
else:
    print("[WARN] Could not find meth-viewer marker")

# 3. Inject bottom sections before the Quick Jump Overlay
# Find the closing </div> of meth-viewer (before Quick Jump)
qj_marker = '<!-- Quick Jump Modal'
qj_idx = html.find(qj_marker)
if qj_idx == -1:
    # Try alternate: find closing of meth-container
    qj_marker = '</main>'
    qj_idx = html.find(qj_marker)

if qj_idx != -1:
    # Find the </div> that closes meth-viewer just before this
    # Insert our sections before that closing </div>
    # Actually, let's insert right before the marker
    close_viewer = html.rfind('</div>', 0, qj_idx)
    if close_viewer != -1:
        html = html[:close_viewer] + BOTTOM_SECTIONS + "\n    " + html[close_viewer:]
        print("[OK] Injected bottom sections (Tools, Case Study, Checklist, etc.)")
    else:
        # Fallback: insert before </main>
        html = html[:qj_idx] + BOTTOM_SECTIONS + "\n  " + html[qj_idx:]
        print("[OK] Injected bottom sections (fallback position)")
else:
    print("[WARN] Could not find injection point for bottom sections")

# 4. Inject JS before last </script>
last_script_close = html.rfind('</script>')
if last_script_close != -1:
    html = html[:last_script_close] + NEW_JS + "\n  " + html[last_script_close:]
    print("[OK] Injected new JavaScript")
else:
    print("[WARN] Could not find </script> marker")

# Write the final file
with open(FILE, "w", encoding="utf-8") as f:
    f.write(html)

print(f"\n✅ Redesign complete! File size: {len(html):,} bytes")
print(f"   Output: {FILE}")
