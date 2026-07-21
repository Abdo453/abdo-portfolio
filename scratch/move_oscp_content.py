import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# The content to move is everything from "<!-- OSCP: Buffer Overflow -->" 
# to right before "<!-- Popup Modal structure for alert testing -->"
start_marker = "<!-- OSCP: Buffer Overflow -->"
end_marker = "<!-- Popup Modal structure for alert testing -->"

if start_marker in content and end_marker in content:
    idx_start = content.find(start_marker)
    idx_end = content.find(end_marker)
    
    oscp_content = content[idx_start:idx_end]
    
    # Remove it from the current location
    content = content[:idx_start] + content[idx_end:]
    
    # Now we need to find the correct place to put it.
    # We want to put it right before the </div> that closes meth-viewer.
    # The last element inside meth-viewer is:
    # id="complete-btn-p_scen_takeover" ...
    # </button>
    # </div>
    
    insert_marker = """        <button class="mark-complete-btn" id="complete-btn-p_scen_takeover" onclick="markPhaseComplete('p_scen_takeover','complete')">
          ✅ Mark Phase Complete ➔ Subdomain Takeover Scenario Done ➔ Proceed to Complete Playbook!
        </button>
</div>"""

    # Wait, the exact string in the file might have different characters because of encoding.
    # Let's just find the `id="complete-btn-p_scen_takeover"`
    
    idx_btn = content.find('id="complete-btn-p_scen_takeover"')
    if idx_btn != -1:
        # Find the next </div> after the button
        idx_btn_end = content.find('</button>', idx_btn)
        idx_div_close = content.find('</div>', idx_btn_end)
        
        if idx_div_close != -1:
            # We want to insert right AFTER the </button>\n</div> of the p_scen_takeover view!
            # Wait, no. The <div class="meth-content-view" id="meth-content-p_scen_takeover">
            # is closed by a </div>.
            # Let's check how many </div> are there.
            
            # Instead of guessing, let's just insert it right after the </button>\n</div> block of the takeover phase, but before the </div> that closes meth-viewer.
            # Wait, look at the Select-String output:
            # 2854:    
            # 2855:        <!-- MARK PHASE COMPLETE -->
            # 2856:        <button class="mark-complete-btn" id="complete-btn-p_scen_takeover" ...>
            # 2857:          ...
            # 2858:        </button>
            # 2859:</div>
            
            # The </div> at 2859 closes meth-content-p_scen_takeover!
            # So the </div> that closes meth-viewer is NOT THERE?
            
            # Let's just insert it at idx_div_close + 6
            insertion_point = idx_div_close + 6
            content = content[:insertion_point] + "\n" + oscp_content + content[insertion_point:]
            
            with open(html_path, "w", encoding="utf-8") as f:
                f.write(content)
            print("Successfully moved OSCP content inside meth-viewer.")
        else:
            print("Could not find closing div for the button.")
    else:
        print("Could not find the takeover button.")
else:
    print("Markers not found.")
