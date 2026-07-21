import re

css_path = r"d:\abdo_portfolio\main\static\main\css\methodology.css"

new_css = """
/* ========================================================
   DARK HACKER THEME - UI COMPONENTS
   ======================================================== */

/* 3. Hunt Session Tracker */
.hunt-tracker {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 16px 24px;
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 50;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    backdrop-filter: blur(10px);
}
.hunt-tracker-left { display: flex; align-items: center; gap: 16px; flex: 1; }
.hunt-progress-container { flex: 1; max-width: 400px; margin: 0 20px; }
.hunt-progress-bar {
    height: 4px;
    background: var(--border-color);
    border-radius: 2px;
    position: relative;
    overflow: hidden;
}
.hunt-progress-fill {
    position: absolute;
    top: 0; left: 0; height: 100%;
    background: var(--accent-primary);
    width: 20%; /* Example width */
    transition: width 0.3s ease;
    box-shadow: 0 0 10px var(--accent-primary);
}
.hunt-phase-icons { display: flex; gap: 12px; }
.hunt-phase-icon {
    width: 36px; height: 36px;
    border-radius: 50%;
    background: #334155;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
    transition: all 0.3s ease;
}
.hunt-phase-icon.active {
    background: var(--accent-primary);
    color: var(--bg-primary);
    box-shadow: 0 0 15px var(--accent-primary);
    animation: pulse 2s infinite;
}
.start-hunt-btn {
    background: var(--accent-primary);
    color: var(--bg-primary);
    font-weight: 700;
    font-family: var(--font-sans);
    padding: 10px 24px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
.start-hunt-btn:hover {
    box-shadow: 0 0 20px rgba(0, 229, 160, 0.4);
    transform: scale(1.02);
}

@keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(0, 229, 160, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(0, 229, 160, 0); }
    100% { box-shadow: 0 0 0 0 rgba(0, 229, 160, 0); }
}

/* 4. Stats Dashboard */
.stats-dashboard {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 32px;
}
.stat-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    transition: all 0.2s ease;
}
.stat-card:hover {
    border-color: var(--accent-secondary);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}
.stat-icon {
    width: 48px; height: 48px;
    border-radius: 50%;
    background: var(--bg-elevated);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
}
.stat-info { display: flex; flex-direction: column; }
.stat-value {
    font-family: var(--font-mono);
    font-size: 28px;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.2;
}
.stat-label {
    font-size: 12px;
    text-transform: uppercase;
    color: var(--text-secondary);
    letter-spacing: 1px;
}

/* 5. Workflow Bar */
.workflow-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
    overflow-x: auto;
    padding-bottom: 8px;
    scroll-snap-type: x mandatory;
}
.workflow-step {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 13px;
    color: var(--text-secondary);
    display: flex; align-items: center; gap: 8px;
    scroll-snap-align: start;
    white-space: nowrap;
    transition: all 0.3s ease;
}
.workflow-step.active {
    border-color: var(--accent-primary);
    color: var(--text-primary);
    box-shadow: 0 0 15px rgba(0, 229, 160, 0.1);
}
.workflow-step.completed {
    border-color: var(--success);
}
.workflow-arrow {
    color: #334155;
    font-weight: bold;
}
.workflow-arrow.active {
    color: var(--success);
}

/* 7. Breadcrumb */
.hacker-breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: #64748b;
    margin-bottom: 20px;
}
.hacker-breadcrumb span.separator { color: #334155; }
.hacker-breadcrumb span.active { color: var(--accent-secondary); }

/* 8. Phase Header (Replaces cyber-hero partially) */
.phase-header-new {
    margin-bottom: 32px;
}
.phase-header-top { display: flex; align-items: center; gap: 16px; margin-bottom: 8px; }
.phase-icon-large { font-size: 48px; }
.phase-title-new {
    font-family: var(--font-sans);
    font-size: 28px;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
}
.phase-subtitle-new {
    font-size: 14px;
    color: #64748b;
    margin: 4px 0 16px 0;
}
.phase-meta-row { display: flex; gap: 12px; flex-wrap: wrap; }
.meta-pill {
    background: var(--bg-elevated);
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 500;
    display: flex; align-items: center; gap: 6px;
    letter-spacing: 0.5px;
    color: var(--text-primary);
}
.meta-pill.difficulty { background: #332200; color: var(--accent-warning); border: 1px solid var(--accent-warning); }

/* Responsive adjustments */
@media (max-width: 1200px) {
    .stats-dashboard { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
    .stats-dashboard { grid-template-columns: 1fr; }
    .hunt-tracker { flex-direction: column; gap: 16px; position: static; }
    .hunt-progress-container { display: none; }
}

"""

with open(css_path, "r", encoding="utf-8") as f:
    content = f.read()

if "DARK HACKER THEME - UI COMPONENTS" not in content:
    with open(css_path, "a", encoding="utf-8") as f:
        f.write(new_css)
    print("Dark Hacker Theme Components Part 1 injected.")
else:
    print("Components already injected.")
