import re

css_path = r"d:\abdo_portfolio\main\static\main\css\methodology.css"

new_css = """
/* 9. What is it? / Goal Cards */
.goal-cards-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 32px;
}
.goal-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 24px;
}
.goal-card.what { border-top: 3px solid var(--accent-secondary); }
.goal-card.goal { border-top: 3px solid var(--accent-primary); }
.goal-card-header {
    display: flex; align-items: center; gap: 8px;
    font-weight: bold; font-size: 14px; text-transform: uppercase;
    margin-bottom: 12px;
}
.goal-card p { font-size: 14px; color: #94a3b8; line-height: 1.7; margin: 0; }

/* 10. Interactive Decision Tree */
.decision-tree-container {
    background: var(--bg-card);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 32px;
}
.decision-node {
    background: var(--bg-elevated);
    border: 1px solid #334155;
    border-radius: 10px;
    padding: 16px;
    text-align: center;
    position: relative;
    margin-bottom: 20px;
}
.decision-node.result { background: #0f1520; border-color: var(--accent-primary); font-style: italic; }
.decision-btns { display: flex; justify-content: center; gap: 12px; margin-top: 12px; }
.decision-btn {
    padding: 8px 24px; border-radius: 6px; font-weight: bold; cursor: pointer; border: none;
    color: var(--bg-primary);
}
.decision-btn.yes { background: var(--accent-primary); }
.decision-btn.no { background: var(--accent-danger); }
.decision-path {
    width: 2px; height: 20px; background: #334155; margin: 0 auto;
}
.bonus-tip {
    background: #332200; border: 1px solid var(--accent-warning);
    border-radius: 8px; padding: 12px; margin-top: 16px;
    color: var(--accent-warning); font-size: 13px;
}

/* 11. Tools Grid */
.tools-hacker-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
    margin-bottom: 32px;
}
.tool-hacker-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    padding: 20px;
    border-radius: 12px;
    transition: all 0.2s ease;
}
.tool-hacker-card:hover {
    border-color: var(--accent-secondary);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 180, 216, 0.1);
}
.tool-h-name { font-family: var(--font-mono); font-size: 14px; font-weight: bold; color: var(--accent-secondary); margin-bottom: 8px;}
.tool-h-desc { font-size: 13px; color: #94a3b8; }

/* 12. Commands Section (Terminal) Overhaul */
.hacker-terminal {
    background: #0a0e17;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 24px;
    border: 1px solid #1e293b;
}
.h-term-header {
    background: #111827;
    padding: 10px 16px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid #1e293b;
}
.h-term-dots { display: flex; gap: 6px; }
.h-term-dot { width: 12px; height: 12px; border-radius: 50%; }
.h-term-dot.r { background: #ff5f56; }
.h-term-dot.y { background: #ffbd2e; }
.h-term-dot.g { background: #27c93f; }
.h-term-title { font-family: var(--font-mono); font-size: 12px; color: #64748b; }
.h-term-copy { cursor: pointer; color: #64748b; transition: color 0.2s; }
.h-term-copy:hover { color: var(--text-primary); }
.h-term-body {
    padding: 16px;
    font-family: var(--font-mono);
    font-size: 13px;
    color: #f8f8f2;
    overflow-x: auto;
}
/* Basic Syntax Highlighting Classes for injection */
.hl-cmd { color: #ff79c6; }
.hl-flag { color: #8be9fd; }
.hl-val { color: #f1fa8c; }
.hl-comment { color: #6272a4; }

.h-term-footer {
    padding: 10px 16px; background: #0f1520; border-top: 1px solid #1e293b;
}
.sim-btn {
    background: transparent; border: 1px solid var(--accent-primary); color: var(--accent-primary);
    padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer; display: flex; gap: 6px; align-items: center;
}
.h-term-output {
    border-left: 3px solid #27c93f;
    background: #0a0e17; padding: 12px; font-family: var(--font-mono); font-size: 12px; color: #a8b2d1;
    margin-top: 10px; display: none;
}

/* 13. Checklist */
.hacker-checklist {
    background: var(--bg-card);
    border-radius: 12px;
    margin-bottom: 32px;
    border: 1px solid var(--border-color);
    overflow: hidden;
}
.hk-check-header {
    padding: 16px; background: var(--bg-elevated); border-bottom: 1px solid var(--border-color);
    font-size: 14px; font-weight: bold; color: var(--text-primary); display: flex; align-items: center; justify-content: space-between;
}
.hk-check-item {
    padding: 12px 16px; border-bottom: 1px solid var(--border-color);
    display: flex; gap: 12px; align-items: flex-start;
}
.hk-check-item:last-child { border-bottom: none; }
.hk-checkbox {
    width: 18px; height: 18px; border: 1px solid #334155; border-radius: 4px; cursor: pointer;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;
}
.hk-checkbox.checked { background: var(--accent-primary); border-color: var(--accent-primary); color: var(--bg-primary); }
.hk-check-text .cmd { font-family: var(--font-mono); font-size: 12px; color: var(--accent-secondary); display: block; margin-bottom: 4px;}
.hk-check-text .desc { font-size: 13px; color: var(--text-secondary); }
.hk-check-item.completed .hk-check-text { text-decoration: line-through; opacity: 0.5; }

/* 15. Mistakes vs Best Practices */
.mistakes-practices-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 32px;
}
.mp-col { background: var(--bg-card); border-radius: 12px; padding: 20px; }
.mp-col.mistakes { border-top: 3px solid var(--accent-danger); }
.mp-col.practices { border-top: 3px solid var(--accent-primary); }
.mp-header { display: flex; align-items: center; gap: 8px; font-weight: bold; margin-bottom: 16px; }
.mp-item { padding: 10px 0; border-bottom: 1px solid var(--border-color); display: flex; gap: 10px; font-size: 13px; }
.mp-item:last-child { border-bottom: none; }

/* Responsive adjustments */
@media (max-width: 768px) {
    .goal-cards-grid, .mistakes-practices-grid { grid-template-columns: 1fr; }
}
"""

with open(css_path, "r", encoding="utf-8") as f:
    content = f.read()

if "DARK HACKER THEME - UI COMPONENTS Part 2" not in content:
    with open(css_path, "a", encoding="utf-8") as f:
        f.write("\n/* DARK HACKER THEME - UI COMPONENTS Part 2 */\n" + new_css)
    print("Dark Hacker Theme Components Part 2 injected.")
else:
    print("Components Part 2 already injected.")
