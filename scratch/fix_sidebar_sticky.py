import os

css_path = r"d:\abdo_portfolio\main\static\main\css\methodology.css"

css_addition = """

/* ========================================================
   SIDEBAR STICKY & FLEXBOX FIXES
   ======================================================== */
.meth-container {
    /* Prevent the container from stretching beyond the viewport */
    overflow: hidden !important;
}

.meth-viewer {
    /* Critical flexbox fix to allow scrolling inside the viewer */
    min-height: 0 !important;
    height: 100% !important;
}

.meth-sidebar {
    /* Guarantee the sidebar stays fixed */
    position: sticky !important;
    top: 0 !important;
    align-self: flex-start !important;
    height: calc(100vh - 65px) !important;
}
"""

with open(css_path, "r", encoding="utf-8") as f:
    content = f.read()

if "SIDEBAR STICKY & FLEXBOX FIXES" not in content:
    with open(css_path, "a", encoding="utf-8") as f:
        f.write(css_addition)
    print("Sidebar sticky CSS appended successfully.")
else:
    print("Sidebar sticky CSS already exists.")
