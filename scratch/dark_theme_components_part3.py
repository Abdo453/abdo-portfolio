import re

css_path = r"d:\abdo_portfolio\main\static\main\css\methodology.css"

new_css = """
/* 16. Real World Case (Starbucks) */
.real-world-case {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 32px;
}
.rwc-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 24px; border-bottom: 1px solid var(--border-color); padding-bottom: 12px;
}
.rwc-title { font-weight: bold; font-size: 16px; color: var(--text-primary); display: flex; align-items: center; gap: 8px;}
.rwc-badge { background: #332200; color: #ffd700; border: 1px solid #ffd700; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: bold;}
.rwc-timeline { position: relative; padding-left: 20px; border-left: 2px solid #334155; margin-left: 14px; }
[dir="rtl"] .rwc-timeline { padding-left: 0; padding-right: 20px; border-left: none; border-right: 2px solid #334155; margin-left: 0; margin-right: 14px; }
.rwc-step { position: relative; margin-bottom: 24px; }
.rwc-step:last-child { margin-bottom: 0; }
.rwc-step-number {
    position: absolute; left: -35px; top: 0; width: 28px; height: 28px;
    background: var(--bg-elevated); border: 2px solid var(--accent-secondary);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-family: var(--font-mono); font-size: 12px; font-weight: bold; color: var(--text-primary);
}
[dir="rtl"] .rwc-step-number { left: auto; right: -35px; }
.rwc-step-content { font-size: 14px; color: var(--text-secondary); line-height: 1.6; }
.rwc-step-content strong { color: var(--text-primary); }
.hot-label { background: #ff4757; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; margin-left: 6px; display: inline-block;}
[dir="rtl"] .hot-label { margin-left: 0; margin-right: 6px; }

/* 23. Practice Lab CTA */
.practice-lab-cta {
    background: var(--bg-card);
    border: 2px solid transparent;
    border-image: linear-gradient(45deg, var(--accent-primary), var(--accent-secondary)) 1;
    border-radius: 12px; /* border-image usually drops radius, we might need a wrapper or pseudo element, but keeping simple for now */
    padding: 24px;
    margin-bottom: 32px;
    display: flex; align-items: center; gap: 20px;
}
.pl-icon { font-size: 40px; }
.pl-content { flex: 1; }
.pl-title { font-weight: bold; font-size: 16px; color: var(--text-primary); margin-bottom: 4px;}
.pl-desc { font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;}
.pl-btn {
    background: transparent; border: 1px solid var(--accent-primary); color: var(--accent-primary);
    padding: 8px 20px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px;
}
.pl-btn:hover { background: var(--accent-primary); color: var(--bg-primary); box-shadow: 0 0 15px rgba(0, 229, 160, 0.4); }

/* Confetti Animation for Mark Complete */
@keyframes confetti {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
"""

with open(css_path, "r", encoding="utf-8") as f:
    content = f.read()

if "DARK HACKER THEME - UI COMPONENTS Part 3" not in content:
    with open(css_path, "a", encoding="utf-8") as f:
        f.write("\n/* DARK HACKER THEME - UI COMPONENTS Part 3 */\n" + new_css)
    print("Dark Hacker Theme Components Part 3 injected.")
else:
    print("Components Part 3 already injected.")
