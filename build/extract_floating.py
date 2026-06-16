import json
from bs4 import BeautifulSoup

def process_html():
    html_path = 'methodology.html'
    data_js_path = 'js/methodology-data.js'
    
    with open(html_path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')
        
    floating_sections = soup.find(id='rd-floating-sections')
    if not floating_sections:
        print("Floating sections not found!")
        return

    # Extract elements
    tools_grid = floating_sections.find(id='rd-tools-grid')
    case_study = floating_sections.find(id='rd-case-study')
    checklist = floating_sections.find(id='rd-checklist')
    mistakes = floating_sections.find(id='rd-mistakes')
    edge_cases = floating_sections.find(id='rd-edge-cases')
    quick_ref = floating_sections.find(id='rdQuickRef')
    
    recon_html = ""
    for el in [tools_grid, checklist, mistakes, edge_cases]:
        if el:
            recon_html += str(el)
            
    case_study_html = ""
    if case_study:
        case_study_html += str(case_study)
        
    # Remove floating sections from HTML
    floating_sections.decompose()
    
    # Put Quick Ref back into body
    if quick_ref:
        soup.body.append(quick_ref)
        
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(str(soup))
        
    # Append to methodology-data.js
    with open(data_js_path, 'a', encoding='utf-8') as f:
        f.write("\n\n// --- EXTRA HTML CONTENT ---\n")
        f.write(f"MethodologyData.reconHtml = {json.dumps(recon_html)};\n")
        f.write(f"MethodologyData.caseStudyHtml = {json.dumps(case_study_html)};\n")

    print("Successfully extracted HTML to methodology-data.js and cleaned methodology.html")

if __name__ == '__main__':
    process_html()
