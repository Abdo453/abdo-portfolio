import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"
css_path = r"d:\abdo_portfolio\main\static\main\css\methodology.css"

# 1. Add Google Font to HTML if not present
with open(html_path, "r", encoding="utf-8") as f:
    html_content = f.read()

if "family=Cairo" not in html_content:
    font_link = '<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">\n'
    # Inject right before </head>
    html_content = html_content.replace('</head>', font_link + '</head>')
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)

# 2. Append CSS for RTL premium styling
css_addition = """

/* ========================================================
   PREMIUM RTL STYLING (CEH & Arabic Content)
   ======================================================== */
[dir="rtl"] {
    font-family: 'Cairo', 'Inter', sans-serif !important;
    line-height: 1.9 !important;
    font-size: 1.05rem !important;
    letter-spacing: 0.2px;
}

[dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3, [dir="rtl"] h4, [dir="rtl"] h5 {
    font-family: 'Cairo', 'Inter', sans-serif !important;
    font-weight: 700;
    line-height: 1.5;
    margin-bottom: 15px;
}

[dir="rtl"] h3 {
    font-size: 1.4rem;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    padding-bottom: 10px;
}

[dir="rtl"] p {
    color: #cbd5e1; /* Soft slate color for better readability */
    margin-bottom: 16px;
}

/* Fix RTL Lists */
[dir="rtl"] ul, [dir="rtl"] ol {
    padding-right: 25px !important;
    padding-left: 0 !important;
    margin-bottom: 20px;
}

[dir="rtl"] li {
    margin-bottom: 12px;
    color: #cbd5e1;
}

/* Highlighted English terms inside Arabic text */
[dir="rtl"] strong {
    color: #ffffff;
    font-weight: 700;
    background: rgba(255, 255, 255, 0.05);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Inter', sans-serif; /* Keep English terms in Inter */
    display: inline-block; /* Helps with bi-directional text flow */
    direction: ltr; /* Ensure english words render correctly LTR */
}

/* Ensure command blocks remain LTR */
[dir="rtl"] .cmd-block {
    direction: ltr !important;
    text-align: left !important;
    font-family: 'Fira Code', monospace !important;
    margin-top: 15px;
    margin-bottom: 20px;
}

[dir="rtl"] .cmd-block * {
    direction: ltr !important;
    text-align: left !important;
}

/* Info Box specific spacing */
.info-box[dir="rtl"] {
    padding: 25px;
}
.info-box[dir="rtl"] h5 {
    color: #fff;
    font-size: 1.2rem;
}

"""

with open(css_path, "r", encoding="utf-8") as f:
    css_content = f.read()

if "PREMIUM RTL STYLING" not in css_content:
    with open(css_path, "a", encoding="utf-8") as f:
        f.write(css_addition)
    print("Added premium RTL CSS.")
else:
    print("Premium RTL CSS already exists.")

print("Styling script complete.")
