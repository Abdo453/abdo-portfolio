import os

css_path = r"d:\abdo_portfolio\main\static\main\css\methodology.css"

css_addition = """

/* ========================================================
   CEH MODULES ARABIC RTL FIXES
   ======================================================== */
[id^="meth-content-ceh_"] .cyber-card,
[id^="meth-content-ceh_"] .info-box,
[id^="meth-content-ceh_"] .hero-tagline {
    direction: rtl;
    text-align: right;
    font-family: 'Noto Kufi Arabic', 'Inter', sans-serif !important;
    line-height: 1.85;
}

[id^="meth-content-ceh_"] .cyber-card h1,
[id^="meth-content-ceh_"] .cyber-card h2,
[id^="meth-content-ceh_"] .cyber-card h3,
[id^="meth-content-ceh_"] .cyber-card h4,
[id^="meth-content-ceh_"] .cyber-card h5,
[id^="meth-content-ceh_"] .info-box h5 {
    font-family: 'Noto Kufi Arabic', 'Inter', sans-serif !important;
    font-weight: 700;
    color: #e2e8f0;
    margin-bottom: 12px;
}

[id^="meth-content-ceh_"] .cyber-card h3 {
    border-bottom: 1px solid rgba(255,255,255,0.05);
    padding-bottom: 8px;
    color: var(--neon-cyan);
}

[id^="meth-content-ceh_"] .cyber-card p,
[id^="meth-content-ceh_"] .info-box p {
    color: #cbd5e1;
    margin-bottom: 15px;
}

/* Ensure command blocks and code are LTR */
[id^="meth-content-ceh_"] .cmd-block,
[id^="meth-content-ceh_"] pre,
[id^="meth-content-ceh_"] .tree-container {
    direction: ltr !important;
    text-align: left !important;
}

/* Fix Lists */
[id^="meth-content-ceh_"] ul,
[id^="meth-content-ceh_"] ol {
    padding-right: 25px !important;
    padding-left: 0 !important;
}

[id^="meth-content-ceh_"] li {
    margin-bottom: 10px;
    color: #cbd5e1;
}

/* Fix English words inside Arabic text */
[id^="meth-content-ceh_"] strong,
[id^="meth-content-ceh_"] code {
    unicode-bidi: embed;
}

[id^="meth-content-ceh_"] .hero-tagline {
    color: rgba(0, 229, 255, 0.8);
    font-size: 1.25rem;
    margin-top: 10px;
}
"""

with open(css_path, "r", encoding="utf-8") as f:
    content = f.read()

if "CEH MODULES ARABIC RTL FIXES" not in content:
    with open(css_path, "a", encoding="utf-8") as f:
        f.write(css_addition)
    print("CEH RTL CSS appended successfully.")
else:
    print("CEH RTL CSS already exists.")
