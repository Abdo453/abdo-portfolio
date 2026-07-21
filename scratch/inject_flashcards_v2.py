import json
import re

html_file = r"d:\abdo_portfolio\main\templates\main\methodology.html"
css_file  = r"d:\abdo_portfolio\main\static\main\css\methodology.css"

# ---------- DATA ----------
scenarios_json = {"exam_scenarios":[{"id":"sc01","title":"Boot Failure: Reset Root Password","difficulty":"Easy","time_limit":15,"description":"The system rebooted after a power outage. GRUB loads but the system stops at emergency mode. Reset the root password to 'RedHat123' and fix the boot issue.","hint":"Interrupt GRUB → rd.break → remount sysroot → passwd → relabel","solution_steps":["Reboot and press 'e' on GRUB entry","Add rd.break to kernel line","Ctrl+X to boot","mount -o remount,rw /sysroot","chroot /sysroot","passwd root","touch /.autorelabel","exit; exit"],"verification_commands":["id root","getenforce"],"points":20},{"id":"sc02","title":"LVM Storage Extension","difficulty":"Medium","time_limit":20,"description":"The /var partition is running out of space (2GB). Add a new 5GB disk (/dev/sdb), extend vg_sys, and grow lv_var to use all space. Resize the filesystem.","hint":"pvcreate → vgextend → lvextend → xfs_growfs","solution_steps":["pvcreate /dev/sdb","vgextend vg_sys /dev/sdb","lvextend -l +100%FREE /dev/vg_sys/lv_var","xfs_growfs /dev/vg_sys/lv_var"],"verification_commands":["lvs","vgs","df -h /var"],"points":25},{"id":"sc03","title":"SELinux Blocking Apache","difficulty":"Medium","time_limit":15,"description":"Apache is installed and running but serving files from /data/web instead of /var/www/html. The service starts but pages return 403 Forbidden errors.","hint":"semanage fcontext + restorecon","solution_steps":["semanage fcontext -a -t httpd_sys_content_t '/data/web(/.*)?'","restorecon -Rv /data/web"],"verification_commands":["curl localhost","ls -lZ /data/web"],"points":20},{"id":"sc04","title":"Firewall & Service Management","difficulty":"Easy","time_limit":10,"description":"Open port 8080/tcp persistently in firewalld and ensure the service 'myapp' starts automatically on boot.","hint":"firewall-cmd --permanent + systemctl enable","solution_steps":["firewall-cmd --permanent --add-port=8080/tcp","firewall-cmd --reload","systemctl enable --now myapp"],"verification_commands":["firewall-cmd --list-ports","systemctl is-enabled myapp"],"points":15}]}

flashcards_json = {"flashcards":[{"id":"fc01","category":"LVM","question":"Create a Physical Volume from /dev/sdb1?","answer":"pvcreate /dev/sdb1","explanation":"Initializes the partition for LVM use."},{"id":"fc02","category":"LVM","question":"Create a 5GB LV 'lv_web' in 'vg_data'?","answer":"lvcreate -L 5G -n lv_web vg_data","explanation":"-L specifies size, -n specifies name."},{"id":"fc03","category":"LVM","question":"Extend lv_web using ALL remaining VG space?","answer":"lvextend -l +100%FREE /dev/vg_data/lv_web","explanation":"-l +100%FREE uses all remaining extents."},{"id":"fc04","category":"SELinux","question":"Check current SELinux mode?","answer":"getenforce","explanation":"Returns Enforcing, Permissive, or Disabled."},{"id":"fc05","category":"SELinux","question":"Persistently set context for /webdata?","answer":"semanage fcontext -a -t httpd_sys_content_t '/webdata(/.*)?'\nrestorecon -Rv /webdata","explanation":"semanage makes it persistent; restorecon applies it."},{"id":"fc06","category":"Boot","question":"Reset root password: first step after GRUB?","answer":"Add rd.break to the kernel line, then Ctrl+X","explanation":"rd.break drops you to a shell before root mounts."},{"id":"fc07","category":"Networking","question":"Set static IP permanently with nmcli?","answer":"nmcli con mod 'eth0' ipv4.addresses 192.168.1.10/24 ipv4.gateway 192.168.1.1 ipv4.method manual\nnmcli con up 'eth0'","explanation":"Use con mod then con up to apply."},{"id":"fc08","category":"Storage","question":"Format LV as XFS and mount persistently?","answer":"mkfs.xfs /dev/vg_data/lv_web\necho '/dev/vg_data/lv_web /mnt/web xfs defaults 0 0' >> /etc/fstab\nmount -a","explanation":"Always add to /etc/fstab for persistence."}]}

# Build scenario HTML
html_scenarios = '<div class="exam-scenarios-grid" style="display:grid; grid-template-columns: repeat(auto-fill,minmax(300px,1fr)); gap:15px; margin:20px 0;">\n'
for sc in scenarios_json["exam_scenarios"]:
    diff_color = {"Easy":"#3ddc84","Medium":"#f59e0b","Hard":"#ff0055"}.get(sc["difficulty"],"#ccc")
    steps_html = "".join(f'<code style="display:block; background:rgba(0,0,0,0.3); padding:3px 8px; margin:2px 0; border-left:2px solid #3ddc84; font-size:0.75rem;">{s}</code>' for s in sc["solution_steps"])
    verify_html = "".join(f'<code style="font-size:0.75rem; background:rgba(0,217,255,0.1); padding:2px 6px; margin:2px; display:inline-block;">{v}</code>' for v in sc["verification_commands"])
    html_scenarios += f'''  <div class="cyber-card" style="border-left:3px solid {diff_color};">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
      <span style="font-weight:700;color:{diff_color};font-size:0.9rem;">{sc["title"]}</span>
      <span style="font-size:0.7rem;background:{diff_color};color:#000;padding:2px 8px;border-radius:4px;">{sc["difficulty"]}</span>
    </div>
    <p style="font-size:0.8rem;color:var(--text-secondary);margin:5px 0;">{sc["description"]}</p>
    <div style="margin:8px 0;">
      <button onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==\'none\'?\'block\':\'none\'" style="background:rgba(245,158,11,0.15);border:1px solid #f59e0b;color:#f59e0b;padding:3px 10px;border-radius:4px;cursor:pointer;font-size:0.75rem;">💡 Hint</button>
      <div style="display:none;background:rgba(245,158,11,0.05);border:1px solid rgba(245,158,11,0.2);padding:8px;border-radius:4px;margin-top:5px;font-size:0.8rem;">{sc["hint"]}</div>
    </div>
    <div>
      <button onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==\'none\'?\'block\':\'none\'" style="background:rgba(61,220,132,0.15);border:1px solid #3ddc84;color:#3ddc84;padding:3px 10px;border-radius:4px;cursor:pointer;font-size:0.75rem;">✅ Solution</button>
      <div style="display:none;margin-top:5px;">{steps_html}<div style="margin-top:5px;">Verify: {verify_html}</div></div>
    </div>
    <div style="text-align:right;margin-top:8px;font-size:0.75rem;color:{diff_color};">⏱ {sc["time_limit"]} min &nbsp; 🏆 {sc["points"]} pts</div>
  </div>\n'''
html_scenarios += '</div>\n'

# Build flashcard HTML
html_flashcards = '<div class="flashcard-container" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:18px;margin:20px 0;">\n'
for fc in flashcards_json["flashcards"]:
    html_flashcards += f'''  <div class="flashcard" onclick="this.classList.toggle(\'flipped\')" style="background:#0a0a0a;border:1px solid #e94560;border-radius:8px;height:180px;perspective:1000px;cursor:pointer;position:relative;">
    <div class="flashcard-inner" style="position:relative;width:100%;height:100%;transition:transform 0.6s;transform-style:preserve-3d;">
      <div class="flashcard-front" style="position:absolute;width:100%;height:100%;backface-visibility:hidden;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:20px;background:#1e293b;color:#00d9ff;border-radius:8px;box-sizing:border-box;">
        <span style="position:absolute;top:8px;right:8px;font-size:10px;background:#e94560;color:#fff;padding:2px 6px;border-radius:4px;">{fc["category"]}</span>
        <p style="font-size:0.85rem;text-align:center;margin:0;font-family:\'Outfit\',sans-serif;">{fc["question"]}</p>
      </div>
      <div class="flashcard-back" style="position:absolute;width:100%;height:100%;backface-visibility:hidden;transform:rotateY(180deg);display:flex;flex-direction:column;justify-content:center;align-items:center;padding:15px;background:#0f172a;color:#3ddc84;border-radius:8px;box-sizing:border-box;">
        <code style="font-size:0.8rem;text-align:center;white-space:pre-wrap;word-break:break-all;">{fc["answer"]}</code>
        <p style="font-size:0.7rem;color:#94a3b8;margin-top:8px;text-align:center;">{fc["explanation"]}</p>
      </div>
    </div>
  </div>\n'''
html_flashcards += '</div>\n'

full_injection = f"""
        <hr style="border: 1px solid var(--border-color); margin: 40px 0;">
        <h2 style="color:var(--neon-purple); text-align:center; margin-bottom:20px;">🏆 EX200 Exam Simulator &amp; Scenarios</h2>
        <p style="text-align:center; color:var(--text-secondary); margin-bottom:30px;">Practice these real-world scenarios. Don't look at the solution until you've tried!</p>
        {html_scenarios}
        
        <hr style="border: 1px solid var(--border-color); margin: 40px 0;">
        <h2 style="color:#00d9ff; text-align:center; margin-bottom:20px;">🗂️ Interactive Flashcards</h2>
        <p style="text-align:center; color:var(--text-secondary); margin-bottom:30px;">Click a card to flip it and reveal the answer.</p>
        {html_flashcards}
"""

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Find the RHCSA content section end (before <!-- Phase: Android Reversing -->)
rhcsa_id = 'id="meth-content-p_rhcsa"'
android_marker = 'class="meth-content-view" id="meth-content-p0"'

rhcsa_pos = html.find(rhcsa_id)
android_pos = html.find(android_marker, rhcsa_pos)

if rhcsa_pos != -1 and android_pos != -1:
    # Find the last </div> before android_marker within RHCSA
    # The section ends with "      </div>\n\n      <!-- Phase: Android..."
    # Let's insert just before the closing </div> of the rhcsa section
    # The RHCSA section ends with:  "      </div>\n\n      <!-- Phase: Android"
    # We want to inject right before "      </div>\n\n      <!-- Phase: Android"
    insert_point = html.rfind('      </div>', rhcsa_pos, android_pos)
    if insert_point != -1:
        html = html[:insert_point] + full_injection + '\n' + html[insert_point:]
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(html)
        print("Flashcards and Scenarios injected into RHCSA section successfully.")
        # Verify
        checks = ['flashcard', 'EX200 Exam Simulator', 'Boot Failure']
        for c in checks:
            print(f"  [{'OK' if c in html else 'MISSING'}] {c}")
    else:
        print("ERROR: Could not find RHCSA closing div.")
else:
    print(f"ERROR: rhcsa_pos={rhcsa_pos}, android_pos={android_pos}")
