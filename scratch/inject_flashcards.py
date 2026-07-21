import json
import re

html_file = r"d:\abdo_portfolio\main\templates\main\methodology.html"
css_file = r"d:\abdo_portfolio\main\static\main\css\methodology.css"

# --- JSON DATA ---
scenarios_json = {
  "exam_scenarios": [
    {
      "id": "sc01",
      "title": "🔴 Boot Failure: Reset Root Password",
      "difficulty": "Easy",
      "time_limit": 15,
      "description": "The system rebooted after a power outage. GRUB loads but the system stops at emergency mode. You need to reset the root password to 'RedHat123' and fix the boot issue.",
      "hint": "Interrupt GRUB → rd.break → remount sysroot → passwd → relabel",
      "solution_steps": [
        "Reboot and press 'e' on GRUB entry",
        "Add rd.break to kernel line",
        "Ctrl+X to boot",
        "mount -o remount,rw /sysroot",
        "chroot /sysroot",
        "passwd root",
        "touch /.autorelabel",
        "exit; exit"
      ],
      "verification_commands": ["id root", "getenforce"],
      "points": 20
    },
    {
      "id": "sc02",
      "title": "🔴 LVM Storage Extension",
      "difficulty": "Medium",
      "time_limit": 20,
      "description": "The /var partition is running out of space (currently 2GB). Add a new 5GB disk (/dev/sdb), create a physical volume, extend the volume group 'vg_sys', and grow the logical volume 'lv_var' to use all available space. Resize the filesystem.",
      "hint": "pvcreate → vgextend → lvextend → xfs_growfs",
      "solution_steps": [
        "pvcreate /dev/sdb",
        "vgextend vg_sys /dev/sdb",
        "lvextend -l +100%FREE /dev/vg_sys/lv_var",
        "xfs_growfs /dev/vg_sys/lv_var"
      ],
      "verification_commands": ["lvs", "vgs", "df -h /var"],
      "points": 25
    },
    {
      "id": "sc03",
      "title": "🔴 SELinux Blocking Apache",
      "difficulty": "Medium",
      "time_limit": 15,
      "description": "Apache (httpd) is installed and configured to serve files from /webdata. The service starts but clients get 403 Forbidden. SELinux is in Enforcing mode. Fix the context permanently.",
      "hint": "semanage fcontext -a → restorecon -Rv",
      "solution_steps": [
        "semanage fcontext -a -t httpd_sys_content_t '/webdata(/.*)?'",
        "restorecon -Rv /webdata",
        "systemctl restart httpd"
      ],
      "verification_commands": ["ls -Z /webdata", "curl http://localhost"],
      "points": 20
    },
    {
      "id": "sc04",
      "title": "🔴 Network Configuration (nmcli)",
      "difficulty": "Easy",
      "time_limit": 15,
      "description": "Configure eth0 with static IP: 192.168.50.10/24, gateway 192.168.50.1, DNS 8.8.8.8. Hostname must be server01.lab.local. Ensure persistence after reboot.",
      "hint": "nmcli con mod → nmcli con up → hostnamectl",
      "solution_steps": [
        "nmcli con mod 'eth0' ipv4.addresses 192.168.50.10/24",
        "nmcli con mod 'eth0' ipv4.gateway 192.168.50.1",
        "nmcli con mod 'eth0' ipv4.dns 8.8.8.8",
        "nmcli con mod 'eth0' ipv4.method manual",
        "nmcli con up 'eth0'",
        "hostnamectl set-hostname server01.lab.local"
      ],
      "verification_commands": ["ip a", "cat /etc/resolv.conf", "hostname"],
      "points": 15
    },
    {
      "id": "sc05",
      "title": "🔴 Container with Persistent Storage",
      "difficulty": "Hard",
      "time_limit": 25,
      "description": "Run a rootless container named 'web-test' using image registry.access.redhat.com/ubi9/httpd-24. Map host port 8080 to container port 8080. Mount /home/student/webfiles to /var/www/html in the container. Ensure the container auto-starts on boot.",
      "hint": "podman run -p -v --name → podman generate systemd → systemctl --user enable",
      "solution_steps": [
        "mkdir -p /home/student/webfiles",
        "podman run -d --name web-test -p 8080:8080 -v /home/student/webfiles:/var/www/html:Z registry.access.redhat.com/ubi9/httpd-24",
        "podman generate systemd --name web-test --files",
        "mv container-web-test.service ~/.config/systemd/user/",
        "systemctl --user daemon-reload",
        "systemctl --user enable --now container-web-test"
      ],
      "verification_commands": ["podman ps", "curl http://localhost:8080", "systemctl --user status container-web-test"],
      "points": 30
    },
    {
      "id": "sc06",
      "title": "🔴 Stratis Storage + NFS Auto-mount",
      "difficulty": "Hard",
      "time_limit": 25,
      "description": "Create a Stratis pool named 'pool1' using /dev/sdc. Create a filesystem named 'fs_docs'. Mount it permanently at /docs. Configure autofs to mount NFS share 192.168.1.100:/exports/data on /mnt/data.",
      "hint": "stratis pool create → stratis fs create → /etc/fstab → autofs",
      "solution_steps": [
        "stratis pool create pool1 /dev/sdc",
        "stratis fs create pool1 fs_docs",
        "mkdir /docs",
        "echo 'UUID=$(blkid -s UUID -o value /dev/stratis/pool1/fs_docs) /docs xfs defaults 0 0' >> /etc/fstab",
        "dnf install autofs -y",
        "echo '/mnt/data /etc/auto.data' >> /etc/auto.master",
        "echo 'data -fstype=nfs,rw 192.168.1.100:/exports/data' > /etc/auto.data",
        "systemctl enable --now autofs"
      ],
      "verification_commands": ["stratis pool list", "df -h /docs", "ls /mnt/data"],
      "points": 30
    },
    {
      "id": "sc07",
      "title": "🔴 User & Group Management + Sudo",
      "difficulty": "Easy",
      "time_limit": 10,
      "description": "Create group 'devops' (GID 5000). Create users 'ahmed' and 'sara' with home directories. Add them to 'devops' and 'wheel'. Set password policy: min 8 chars, max 90 days. Allow 'devops' group to run ALL commands without password via sudo.",
      "hint": "groupadd -g → useradd -G → visudo → /etc/login.defs",
      "solution_steps": [
        "groupadd -g 5000 devops",
        "useradd -m -G devops,wheel ahmed",
        "useradd -m -G devops,wheel sara",
        "echo 'PASS_MIN_LEN 8' >> /etc/login.defs",
        "echo 'PASS_MAX_DAYS 90' >> /etc/login.defs",
        "echo '%devops ALL=(ALL) NOPASSWD: ALL' > /etc/sudoers.d/devops",
        "chmod 440 /etc/sudoers.d/devops"
      ],
      "verification_commands": ["id ahmed", "getent group devops", "sudo -l -U ahmed"],
      "points": 15
    },
    {
      "id": "sc08",
      "title": "🔴 Firewall & SELinux Port",
      "difficulty": "Medium",
      "time_limit": 15,
      "description": "A custom application runs on port 8080/tcp. Configure firewalld to allow this port permanently in the 'public' zone. Also configure SELinux to allow httpd to bind to port 8080 (if not already allowed).",
      "hint": "firewall-cmd --add-port --permanent → semanage port -a",
      "solution_steps": [
        "firewall-cmd --permanent --add-port=8080/tcp",
        "firewall-cmd --reload",
        "semanage port -a -t http_port_t -p tcp 8080"
      ],
      "verification_commands": ["firewall-cmd --list-ports", "semanage port -l | grep 8080"],
      "points": 15
    }
  ]
}

flashcards_json = {
  "flashcards": [
    {
      "id": "fc01",
      "category": "LVM",
      "question": "How do you create a Physical Volume from /dev/sdb1?",
      "answer": "pvcreate /dev/sdb1",
      "explanation": "Initializes the disk partition for use by LVM."
    },
    {
      "id": "fc02",
      "category": "LVM",
      "question": "Create a Volume Group named 'vg_data' using /dev/sdb1?",
      "answer": "vgcreate vg_data /dev/sdb1",
      "explanation": "Groups one or more PVs into a VG."
    },
    {
      "id": "fc03",
      "category": "LVM",
      "question": "Create a 5GB Logical Volume named 'lv_web' in 'vg_data'?",
      "answer": "lvcreate -L 5G -n lv_web vg_data",
      "explanation": "-L specifies size, -n specifies name."
    },
    {
      "id": "fc04",
      "category": "LVM",
      "question": "Extend lv_web to use ALL remaining space in vg_data?",
      "answer": "lvextend -l +100%FREE /dev/vg_data/lv_web",
      "explanation": "-l +100%FREE uses all remaining extents."
    },
    {
      "id": "fc05",
      "category": "LVM",
      "question": "Grow the XFS filesystem after extending the LV?",
      "answer": "xfs_growfs /dev/vg_data/lv_web",
      "explanation": "For XFS, you must use xfs_growfs (not resize2fs)."
    },
    {
      "id": "fc06",
      "category": "SELinux",
      "question": "Check current SELinux mode?",
      "answer": "getenforce",
      "explanation": "Returns Enforcing, Permissive, or Disabled."
    },
    {
      "id": "fc07",
      "category": "SELinux",
      "question": "Temporarily change SELinux to Permissive mode?",
      "answer": "setenforce 0",
      "explanation": "0=Permissive, 1=Enforcing. Not persistent!"
    },
    {
      "id": "fc08",
      "category": "SELinux",
      "question": "Permanently set SELinux to Enforcing?",
      "answer": "Edit /etc/selinux/config → SELINUX=enforcing",
      "explanation": "Requires reboot to take full effect."
    },
    {
      "id": "fc09",
      "category": "SELinux",
      "question": "Add permanent SELinux context for /webdir to httpd_sys_content_t?",
      "answer": "semanage fcontext -a -t httpd_sys_content_t '/webdir(/.*)?'",
      "explanation": "The regex (/.*)? ensures subdirectories are covered."
    },
    {
      "id": "fc10",
      "category": "SELinux",
      "question": "Apply/restore the context rules to the filesystem?",
      "answer": "restorecon -Rv /webdir",
      "explanation": "-R recursive, -v verbose. Reads rules from semanage."
    },
    {
      "id": "fc11",
      "category": "SELinux",
      "question": "Allow httpd to bind to TCP port 8080?",
      "answer": "semanage port -a -t http_port_t -p tcp 8080",
      "explanation": "Adds port 8080 to the http_port_t type."
    },
    {
      "id": "fc12",
      "category": "Networking",
      "question": "Set static IP 192.168.1.50/24 on connection 'eth0' using nmcli?",
      "answer": "nmcli con mod 'eth0' ipv4.addresses 192.168.1.50/24 ipv4.method manual",
      "explanation": "Must set ipv4.method to manual for static IPs."
    },
    {
      "id": "fc13",
      "category": "Networking",
      "question": "Set hostname permanently to server01.example.com?",
      "answer": "hostnamectl set-hostname server01.example.com",
      "explanation": "Updates /etc/hostname and triggers transient hostname."
    },
    {
      "id": "fc14",
      "category": "Networking",
      "question": "Add DNS server 8.8.8.8 to connection 'eth0'?",
      "answer": "nmcli con mod 'eth0' ipv4.dns 8.8.8.8",
      "explanation": "Use '+' prefix to append: ipv4.dns +8.8.4.4"
    },
    {
      "id": "fc15",
      "category": "Networking",
      "question": "Open port 8080/tcp permanently in firewalld public zone?",
      "answer": "firewall-cmd --permanent --add-port=8080/tcp && firewall-cmd --reload",
      "explanation": "--permanent writes to config, --reload applies without restart."
    },
    {
      "id": "fc16",
      "category": "Users",
      "question": "Create user 'ali' with home dir, UID 2000, and secondary group 'wheel'?",
      "answer": "useradd -m -u 2000 -G wheel ali",
      "explanation": "-m creates home, -u sets UID, -G adds secondary groups."
    },
    {
      "id": "fc17",
      "category": "Users",
      "question": "Set password expiry to 30 days for user 'ali'?",
      "answer": "chage -M 30 ali",
      "explanation": "-M sets maximum password age in days."
    },
    {
      "id": "fc18",
      "category": "Users",
      "question": "Allow 'developers' group to run ALL commands as root via sudo?",
      "answer": "echo '%developers ALL=(ALL) ALL' > /etc/sudoers.d/developers",
      "explanation": "Use visudo or redirect carefully. File must be chmod 440."
    },
    {
      "id": "fc19",
      "category": "Boot",
      "question": "Reset root password using rd.break method?",
      "answer": "GRUB → e → rd.break → Ctrl+X → mount -o remount,rw /sysroot → chroot /sysroot → passwd → touch /.autorelabel",
      "explanation": "rd.break stops initramfs before pivot_root."
    },
    {
      "id": "fc20",
      "category": "Boot",
      "question": "Set default systemd target to graphical?",
      "answer": "systemctl set-default graphical.target",
      "explanation": "Creates symlink /etc/systemd/system/default.target."
    },
    {
      "id": "fc21",
      "category": "Containers",
      "question": "Run rootless container 'web' from ubi9/httpd-24, map host 8080→container 8080?",
      "answer": "podman run -d --name web -p 8080:8080 registry.access.redhat.com/ubi9/httpd-24",
      "explanation": "-d detached, -p port mapping. Rootless runs as unprivileged user."
    },
    {
      "id": "fc22",
      "category": "Containers",
      "question": "Generate systemd service for running container 'web' persistently?",
      "answer": "podman generate systemd --name web --files → mv to ~/.config/systemd/user/ → systemctl --user enable --now container-web",
      "explanation": "Rootless containers use --user systemd services."
    },
    {
      "id": "fc23",
      "category": "Storage",
      "question": "Create Stratis pool 'pool1' using /dev/sdc?",
      "answer": "stratis pool create pool1 /dev/sdc",
      "explanation": "Stratis manages pool of block devices."
    },
    {
      "id": "fc24",
      "category": "Storage",
      "question": "Create Stratis filesystem 'fs_docs' in pool1?",
      "answer": "stratis fs create pool1 fs_docs",
      "explanation": "Stratis filesystems are thinly provisioned."
    },
    {
      "id": "fc25",
      "category": "Storage",
      "question": "Configure autofs to mount NFS 192.168.1.100:/exports on /mnt/data?",
      "answer": "echo '/mnt/data /etc/auto.data' >> /etc/auto.master && echo 'data -fstype=nfs,rw 192.168.1.100:/exports' > /etc/auto.data && systemctl enable --now autofs",
      "explanation": "auto.master defines mount point map. auto.data defines actual NFS share."
    }
  ]
}

# --- HTML GENERATION ---

# 1. Scenarios HTML
html_scenarios = ""
for sc in scenarios_json["exam_scenarios"]:
    diff_color = "#3ddc84" if sc["difficulty"] == "Easy" else ("#f59e0b" if sc["difficulty"] == "Medium" else "#ef4444")
    
    sol_steps = "\\n".join([f"    {step}" for step in sc["solution_steps"]])
    ver_cmds = "\\n".join([f"    {cmd}" for cmd in sc["verification_commands"]])
    
    html_scenarios += f"""
        <div class="cyber-card" style="margin-bottom: 20px; border-left: 4px solid {diff_color};">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h4 style="margin:0; color:var(--text-color);">{sc['title']}</h4>
            <div style="font-size:0.8rem; display:flex; gap:10px;">
              <span style="color:{diff_color};">{sc['difficulty']}</span>
              <span style="color:var(--text-secondary);">⏱️ {sc['time_limit']}m</span>
              <span style="color:var(--neon-purple);">💎 {sc['points']} pts</span>
            </div>
          </div>
          <p style="font-size:0.9rem; margin-top:10px;">{sc['description']}</p>
          
          <div style="margin-top:15px;">
            <button class="cyber-btn" style="padding: 5px 10px; font-size:0.8rem; background:#1e293b;" onclick="document.getElementById('hint_{sc['id']}').style.display='block'">💡 Hint</button>
            <button class="cyber-btn" style="padding: 5px 10px; font-size:0.8rem; background:var(--neon-cyan); color:#000;" onclick="document.getElementById('sol_{sc['id']}').style.display='block'">✅ Solution</button>
          </div>
          
          <div id="hint_{sc['id']}" style="display:none; margin-top:10px; padding:10px; background:rgba(245,158,11,0.1); border-left:2px solid #f59e0b; font-size:0.85rem; color:#f59e0b;">
            {sc['hint']}
          </div>
          
          <div id="sol_{sc['id']}" style="display:none; margin-top:10px;">
            <h5 style="color:#00e5ff; font-size:0.85rem; margin-bottom:5px;">Steps:</h5>
            <pre style="background:#0f172a; padding:10px; border-radius:5px; color:#e2e8f0; font-family:'Fira Code', monospace; font-size:0.8rem; overflow-x:auto;">{sol_steps}</pre>
            <h5 style="color:#3ddc84; font-size:0.85rem; margin-top:10px; margin-bottom:5px;">Verify:</h5>
            <pre style="background:#0f172a; padding:10px; border-radius:5px; color:#e2e8f0; font-family:'Fira Code', monospace; font-size:0.8rem; overflow-x:auto;">{ver_cmds}</pre>
          </div>
        </div>
"""

# 2. Flashcards HTML
html_flashcards = '<div class="flashcard-container">\n'
for fc in flashcards_json["flashcards"]:
    html_flashcards += f"""
    <div class="flashcard" onclick="this.classList.toggle('flipped')">
      <div class="flashcard-inner">
        <div class="flashcard-front">
          <span class="category-tag">{fc['category']}</span>
          <p style="font-size: 0.9rem; margin: 0; font-family: 'Outfit', sans-serif;">{fc['question']}</p>
        </div>
        <div class="flashcard-back">
          <p style="font-size: 0.85rem; margin: 0 0 10px 0; color: #fff;">{fc['answer']}</p>
          <p style="font-size: 0.75rem; margin: 0; color: #aaa; font-family: 'Inter', sans-serif;">{fc['explanation']}</p>
        </div>
      </div>
    </div>
"""
html_flashcards += '</div>\n'

# --- HTML INJECTION ---
full_injection = f"""
        <hr style="border: 1px solid var(--border-color); margin: 40px 0;">
        <h2 style="color:var(--neon-purple); text-align:center; margin-bottom:20px;">🏆 EX200 Exam Simulator & Scenarios</h2>
        <p style="text-align:center; color:var(--text-secondary); margin-bottom:30px;">Practice these 8 real-world scenarios. Don't look at the solution until you've tried!</p>
        {html_scenarios}
        
        <hr style="border: 1px solid var(--border-color); margin: 40px 0;">
        <h2 style="color:#00d9ff; text-align:center; margin-bottom:20px;">🗂️ Interactive Flashcards</h2>
        <p style="text-align:center; color:var(--text-secondary); margin-bottom:30px;">Click on a card to flip it and reveal the answer. Great for rapid memorization.</p>
        {html_flashcards}
"""

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Insert before the end of meth-content-p_rhcsa
insert_marker_end = r"      </div>\s*<!-- Phase: Android Reversing -->"
# Wait, let's just insert before `<!-- Phase: Android Reversing -->`
insert_marker_end2 = r"(      </div>\s*)(<!-- Phase: Android Reversing -->)"

# Actually, the content view of RHCSA ends with `</div>` right before `<!-- Phase: Android Reversing -->`.
# Let's use a safer regex:
pattern = re.compile(r"(        <div class=\"info-duo\">.*?        </div>\s*)(      </div>\s*<!-- Phase: Android Reversing -->)", re.DOTALL)
html = pattern.sub(lambda m: m.group(1) + full_injection + m.group(2), html)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)

# --- CSS INJECTION ---
css_additions = """
/* Flashcards CSS */
.flashcard-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 10px 0;
}

.flashcard {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  height: 200px;
  perspective: 1000px;
  cursor: pointer;
}

.flashcard:hover {
  box-shadow: 0 0 15px rgba(0, 217, 255, 0.2);
}

.flashcard-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flashcard.flipped .flashcard-inner {
  transform: rotateY(180deg);
}

.flashcard-front, .flashcard-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
}

.flashcard-front {
  background: #1e293b;
  color: #00d9ff;
}
body.light-mode .flashcard-front {
  background: #f1f5f9;
  color: #0369a1;
}

.flashcard-back {
  background: #0f172a;
  color: #3ddc84;
  transform: rotateY(180deg);
}

.flashcard .category-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 10px;
  padding: 3px 8px;
  background: #e94560;
  color: white;
  border-radius: 4px;
}
"""

with open(css_file, 'a', encoding='utf-8') as f:
    f.write("\n" + css_additions)

print("Flashcards and Scenarios injected successfully.")
