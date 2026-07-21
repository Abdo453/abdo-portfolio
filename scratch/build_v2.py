import os
import json
import codecs

# Base Directories
DATA_DIR = r"d:\abdo_portfolio\data"
BUILD_DIR = r"d:\abdo_portfolio\build"
COMPONENTS_DIR = r"d:\abdo_portfolio\main\templates\components"

# HTML Template for Vulnerability (Like React Component but in Python/HTML)
def render_vulnerability(vuln_data):
    html = f"""
    <!-- V2 COMPONENT ARCHITECTURE GENERATED -->
    <div class="meth-content-view" id="meth-content-{vuln_data['id']}" style="display:block;" dir="rtl">
        <div class="cyber-hero" style="border-bottom: 2px solid #ff5555;">
            <h2 class="hero-title"><span class="hero-icon">{vuln_data['icon']}</span> {vuln_data['title']}</h2>
            <p class="hero-tagline">{vuln_data['theory']['definition']}</p>
        </div>

        <div class="cyber-card" style="border-top:3px solid #ffb86c; margin-top:20px;">
            <div class="card-header">
                <h3 style="margin:0; color:#ffb86c;">📖 النظري (Theory)</h3>
            </div>
            <div style="padding-top:15px;">
                <h5 style="color:#8be9fd;">التأثير (Impact)</h5>
                <ul style="color:#aaa;">
    """
    for impact in vuln_data['theory']['impact']:
        html += f"<li>{impact}</li>"
    html += """
                </ul>
            </div>
        </div>
        
        <div class="cyber-card" style="border-top:3px solid #50fa7b; margin-top:20px;">
            <div class="card-header">
                <h3 style="margin:0; color:#50fa7b;">🎯 الأنواع (Types)</h3>
            </div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:15px; margin-top:15px;">
    """
    for vtype in vuln_data['types']:
        html += f"""
                <div style="background:rgba(0,0,0,0.3); border:1px solid #44475a; border-radius:8px; padding:15px;">
                    <h5 style="color:#50fa7b; margin-top:0;">{vtype['name']}</h5>
                    <p style="color:#aaa; font-size:0.85em;">{vtype['desc']}</p>
                    <span style="color:#ff5555; font-size:0.8em; font-weight:bold;">الخطورة: {vtype['severity']}</span>
                </div>
        """
    html += """
            </div>
        </div>
        
        <!-- JS COMPONENT MOUNT POINT -->
        <div id="js-interactive-mount" data-component="payload_generator" data-vuln="xss" style="margin-top:20px;"></div>
    </div>
    """
    return html

def build_vulnerabilities():
    vuln_dir = os.path.join(DATA_DIR, "vulnerabilities")
    if not os.path.exists(vuln_dir):
        return
        
    out_dir = os.path.join(BUILD_DIR, "modules")
    os.makedirs(out_dir, exist_ok=True)
    
    for filename in os.listdir(vuln_dir):
        if filename.endswith(".json"):
            with codecs.open(os.path.join(vuln_dir, filename), 'r', 'utf-8') as f:
                data = json.load(f)
            
            html_content = render_vulnerability(data)
            out_file = os.path.join(out_dir, f"mod_v2_{data['id']}.html")
            
            with codecs.open(out_file, 'w', 'utf-8') as f:
                f.write(html_content)
            print(f"Built V2 Component for: {data['title']}")

if __name__ == "__main__":
    print("Starting V2 Architecture Build Engine...")
    build_vulnerabilities()
    print("Done!")
