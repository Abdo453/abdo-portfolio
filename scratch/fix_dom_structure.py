import re

html_path = r"d:\abdo_portfolio\main\templates\main\methodology.html"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Fix the mark-complete-btn being outside its parent
btn_str = """
        <!-- MARK PHASE COMPLETE -->
        <button class="mark-complete-btn" id="complete-btn-p_scen_takeover" onclick="markPhaseComplete('p_scen_takeover','complete')">
          ✅ Mark Phase Complete ➔ Subdomain Takeover Scenario Done ➔ Proceed to Complete Playbook!
        </button>"""

# It's currently right after a `</div>` and before `</div>\n<!-- OSCP`
# We'll extract the OSCP block first.

start_oscp = "<!-- OSCP: Buffer Overflow -->"
end_oscp = "<!-- Popup Modal structure for alert testing -->"

if start_oscp in content:
    idx_oscp_start = content.find(start_oscp)
    idx_oscp_end = content.find(end_oscp)
    
    oscp_content = content[idx_oscp_start:idx_oscp_end]
    content = content[:idx_oscp_start] + content[idx_oscp_end:]

# Now content ends with something like:
#         </div>
#       </div>
#
#     
#         <!-- MARK PHASE COMPLETE -->
#         <button class="mark-complete-btn" id="complete-btn-p_scen_takeover" onclick="markPhaseComplete('p_scen_takeover','complete')">
#           ✅ Mark Phase Complete ➔ Subdomain Takeover Scenario Done ➔ Proceed to Complete Playbook!
#         </button>
# </div>
# <!-- Popup Modal structure for alert testing -->

# Let's fix this mess using regex. We want the button INSIDE the preceding </div></div>
# Wait, the string to match is hard because of encoding.
# Let's do it cleanly:

btn_regex = re.compile(r"(\s*</div>\s*</div>\s*)(<!-- MARK PHASE COMPLETE -->\s*<button class=\"mark-complete-btn\" id=\"complete-btn-p_scen_takeover\".*?</button>\s*)</div>", re.DOTALL)

match = btn_regex.search(content)
if match:
    # We want: button THEN </div></div> THEN the meth-viewer closing </div>
    # Actually, the first `</div>` closes the `.cyber-card`.
    # The second `</div>` closes `meth-content-p_scen_takeover`.
    # So the button goes BEFORE the second `</div>`.
    
    # Original matched string:
    # \n        </div>\n      </div>\n\n    \n        <!-- MARK PHASE COMPLETE -->\n        <button... \n        </button>\n</div>
    
    # We want to change it to:
    # \n        </div>\n
    #         <!-- MARK PHASE COMPLETE -->\n        <button... \n        </button>\n
    #       </div>\n
    # [OSCP CONTENT GOES HERE]
    # </div>
    
    replacement = r"\n        </div>\n\2      </div>\n" + oscp_content + "\n</div>"
    
    content = content[:match.start()] + replacement + content[match.end():]
    
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Fixed layout of takeover button and OSCP content.")
else:
    print("Regex did not match. Let's try another way.")
