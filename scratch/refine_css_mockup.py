import re

css_path = r"d:\abdo_portfolio\main\static\main\css\methodology.css"

new_css = """
/* ========================================================
   MOCKUP EXACT REFINEMENTS
   ======================================================== */

/* Sidebar Tree Structure */
.meth-sidebar {
    background: #06090e; /* Extremely dark */
}
.sidebar-category {
    margin-top: 16px;
}
.category-title {
    color: #64748b;
    font-size: 11px;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    gap: 8px;
}
.tree-item {
    display: flex;
    align-items: center;
    color: #94a3b8;
    font-family: var(--font-mono);
    font-size: 13px;
    padding: 6px 0 6px 12px;
    cursor: pointer;
    transition: color 0.2s;
}
.tree-item:hover { color: #e2e8f0; }
.tree-item.active { color: var(--accent-primary); }
.tree-line { color: #334155; margin-right: 8px; white-space: pre;}
.tree-icon { margin-right: 8px; font-family: 'Segoe UI Emoji', sans-serif;}

/* Section Headers (e.g. 🛠 TOOLS, 💻 COMMANDS) */
.section-header-hacker {
    font-family: var(--font-sans);
    font-size: 12px;
    font-weight: 700;
    color: var(--accent-primary);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 40px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
}

/* Terminal Refinements */
.h-term-header {
    background: #0f1520;
    padding: 8px 16px;
}
.h-term-filename {
    font-family: var(--font-mono);
    font-size: 11px;
    color: #64748b;
    margin-left: auto;
}
.h-term-body-wrap {
    position: relative;
}
.h-term-actions {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.term-action-btn {
    background: rgba(255,255,255,0.05);
    border: 1px solid #334155;
    color: #94a3b8;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 11px;
    cursor: pointer;
    display: flex; align-items: center; gap: 6px;
    transition: all 0.2s;
}
.term-action-btn:hover { background: rgba(255,255,255,0.1); color: #fff;}
.term-action-btn.sim { border-color: var(--accent-primary); color: var(--accent-primary); background: rgba(0,229,160,0.05);}
.term-action-btn.sim:hover { background: var(--accent-primary); color: #000; }

.expected-output-block {
    background: #0f1520;
    border: 1px solid #1e293b;
    border-left: 3px solid var(--success);
    border-radius: 8px;
    padding: 16px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: #a8b2d1;
    margin-top: 16px;
}
.expected-output-header {
    font-size: 10px; color: var(--success); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; font-weight: bold;
}

/* Checklist bottom progress */
.hk-check-progress {
    padding: 16px;
    background: #0f1520;
    border-top: 1px solid var(--border-color);
}
.hk-prog-bar {
    height: 4px; background: #334155; border-radius: 2px; margin-top: 8px;
}
.hk-prog-fill { height: 100%; background: #334155; width: 0%; border-radius: 2px; }

/* Real World Case refinements */
.rwc-title { color: #e2e8f0; font-family: var(--font-sans); font-size: 14px;}
.rwc-header { padding-bottom: 16px; margin-bottom: 24px; }
.rwc-badge { padding: 4px 8px; border-radius: 4px; }

/* Tools Grid Refinements */
.tool-hacker-card { background: #0b111a; }
.tool-h-name { font-size: 15px; }
.tool-metrics { display: flex; gap: 12px; margin-bottom: 12px; font-size: 11px;}
.tool-metric { color: var(--accent-warning); }
.tool-metric.wide { color: var(--accent-secondary); }

/* Decision Tree Refinements */
.decision-tree-container { background: transparent; border: 1px solid #1e293b; padding: 20px;}
.decision-node { background: #0b111a; text-align: right; }

/* Fix Typography */
.phase-title-new { font-size: 32px; letter-spacing: -0.5px; }

"""

with open(css_path, "r", encoding="utf-8") as f:
    content = f.read()

if "MOCKUP EXACT REFINEMENTS" not in content:
    with open(css_path, "a", encoding="utf-8") as f:
        f.write("\n" + new_css)
    print("Mockup CSS refinements injected.")
else:
    print("Mockup CSS refinements already present.")
