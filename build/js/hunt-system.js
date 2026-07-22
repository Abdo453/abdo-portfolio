// Hunt Session Manager & Report Builder

const HuntManager = {
  init: function() {
    this.session = JSON.parse(localStorage.getItem('hunt_session')) || null;
    this.renderHuntUI();
    this.injectEvidenceButtons();
    this.injectReportBuilder();
  },

  startHunt: function(target, type, scope) {
    this.session = {
      id: 'hunt_' + Date.now(),
      target: target,
      type: type,
      scope: scope,
      startTime: new Date().toISOString(),
      evidences: []
    };
    localStorage.setItem('hunt_session', JSON.stringify(this.session));
    this.renderHuntUI();
    alert('Hunt Started on ' + target + '!');
  },

  endHunt: function() {
    this.session = null;
    localStorage.removeItem('hunt_session');
    this.renderHuntUI();
    alert('Hunt Ended.');
  },

  exportSession: function() {
    if (!this.session) { alert('No active hunt session to export!'); return; }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.session, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `hunt_${this.session.target}_${Date.now()}.json`);
    document.body.appendChild(dlAnchorElem);
    dlAnchorElem.click();
    dlAnchorElem.remove();
  },

  importSession: function(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (imported && imported.target) {
          this.session = imported;
          localStorage.setItem('hunt_session', JSON.stringify(this.session));
          this.renderHuntUI();
          alert('Hunt Session Imported Successfully for ' + imported.target + '!');
        } else {
          alert('Invalid Hunt Session JSON file.');
        }
      } catch (err) {
        alert('Error parsing JSON file.');
      }
    };
    reader.readAsText(file);
  },

  addEvidence: function(phase, url, request, response, notes, severity) {
    if (!this.session) {
      alert('Please start a Hunt Session first!');
      return;
    }
    this.session.evidences.push({
      phase: phase,
      url: url,
      request: request,
      response: response,
      notes: notes,
      severity: severity,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('hunt_session', JSON.stringify(this.session));
    alert('Evidence added to Hunt Session!');
  },

  renderHuntUI: function() {
    let container = document.getElementById('hunt-ui-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'hunt-ui-container';
      container.style.cssText = 'padding: 15px; margin-bottom: 20px; border-radius: 8px; background: rgba(0, 229, 255, 0.05); border: 1px solid rgba(0, 229, 255, 0.2);';
      const sidebar = document.querySelector('.meth-sidebar');
      if(sidebar) sidebar.insertBefore(container, sidebar.firstChild);
    }

    if (this.session) {
      container.innerHTML = `
        <h4 style="margin:0 0 10px 0; color: var(--neon-cyan);">🎯 Active Hunt</h4>
        <div style="font-size: 0.9rem; color: #e2e8f0; margin-bottom: 5px;"><strong>Target:</strong> ${this.session.target}</div>
        <div style="font-size: 0.9rem; color: #e2e8f0; margin-bottom: 10px;"><strong>Scope:</strong> ${this.session.scope}</div>
        <div style="display:flex; gap: 5px; flex-wrap:wrap; margin-bottom:8px;">
          <button onclick="HuntManager.showReport()" style="flex:1; background: var(--neon-cyan); color:#000; border:none; padding:6px 10px; border-radius:4px; cursor:pointer; font-weight:bold; font-size:0.8rem;">Report</button>
          <button onclick="HuntManager.exportSession()" style="flex:1; background: rgba(0,255,102,0.15); color:#00ff66; border:1px solid #00ff66; padding:6px 10px; border-radius:4px; cursor:pointer; font-weight:bold; font-size:0.8rem;">Export JSON</button>
          <button onclick="HuntManager.endHunt()" style="flex:1; background: rgba(255,0,0,0.2); color:#ff4d4d; border:1px solid #ff4d4d; padding:6px 10px; border-radius:4px; cursor:pointer; font-size:0.8rem;">End</button>
        </div>
      `;
    } else {
      container.innerHTML = `
        <h4 style="margin:0 0 10px 0; color: #94a3b8;">No Active Hunt</h4>
        <button onclick="HuntManager.showStartModal()" style="width:100%; background: rgba(0, 229, 255, 0.1); color:var(--neon-cyan); border:1px solid var(--neon-cyan); padding:10px; border-radius:4px; cursor:pointer; font-weight:bold; margin-bottom:8px;">Start New Hunt</button>
        <label style="display:block; text-align:center; background:rgba(255,255,255,0.05); color:#aaa; border:1px dashed #555; padding:6px; border-radius:4px; cursor:pointer; font-size:0.8rem;">
          📂 Import Session JSON <input type="file" onchange="HuntManager.importSession(event)" style="display:none;" accept=".json">
        </label>
      `;
    }
  },

  showStartModal: function() {
    let modal = document.getElementById('hunt-start-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'hunt-start-modal';
      modal.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.8); z-index:9999; display:flex; justify-content:center; align-items:center; backdrop-filter: blur(5px);';
      modal.innerHTML = `
        <div class="cyber-card" style="width: 400px; max-width: 90%; background: var(--bg-dark); border: 1px solid var(--neon-cyan);">
          <h3 style="color: var(--neon-cyan); margin-top:0;">Start New Hunt</h3>
          <input type="text" id="hunt-target" placeholder="Target Domain (e.g., example.com)" style="width:100%; padding:10px; margin-bottom:15px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; box-sizing:border-box;">
          <select id="hunt-type" style="width:100%; padding:10px; margin-bottom:15px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; box-sizing:border-box;">
            <option value="Bug Bounty">Bug Bounty</option>
            <option value="VDP">VDP</option>
            <option value="Internal">Internal Pentest</option>
          </select>
          <textarea id="hunt-scope" placeholder="Scope Details (*.example.com, etc.)" style="width:100%; padding:10px; margin-bottom:15px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; height:80px; box-sizing:border-box;"></textarea>
          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button onclick="document.getElementById('hunt-start-modal').remove()" style="background:transparent; border:1px solid #666; color:#ccc; padding:8px 16px; border-radius:4px; cursor:pointer;">Cancel</button>
            <button onclick="HuntManager.startHuntSubmit()" style="background:var(--neon-cyan); border:none; color:#000; padding:8px 16px; border-radius:4px; cursor:pointer; font-weight:bold;">Start Hunt</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
  },

  startHuntSubmit: function() {
    let target = document.getElementById('hunt-target').value;
    let type = document.getElementById('hunt-type').value;
    let scope = document.getElementById('hunt-scope').value;
    if (!target) { alert('Target is required!'); return; }
    this.startHunt(target, type, scope);
    document.getElementById('hunt-start-modal').remove();
  },

  injectEvidenceButtons: function() {
    const phases = document.querySelectorAll('.meth-content-view');
    phases.forEach(phase => {
      let phaseId = phase.id;
      let phaseTitle = phase.querySelector('.phase-module-title');
      let titleText = phaseTitle ? phaseTitle.innerText : phaseId;

      let btnContainer = document.createElement('div');
      btnContainer.style.cssText = 'margin-top: 30px; padding-top: 20px; border-top: 1px dashed rgba(255,255,255,0.1); display:flex; justify-content:flex-end;';
      
      let addEvBtn = document.createElement('button');
      addEvBtn.innerHTML = '➕ Add Evidence';
      addEvBtn.style.cssText = 'background: rgba(0, 255, 102, 0.1); color: var(--neon-green); border: 1px solid var(--neon-green); padding: 10px 20px; border-radius: 4px; cursor: pointer; font-family: "Fira Code", monospace; transition: all 0.3s;';
      addEvBtn.onmouseover = () => addEvBtn.style.background = 'rgba(0, 255, 102, 0.2)';
      addEvBtn.onmouseout = () => addEvBtn.style.background = 'rgba(0, 255, 102, 0.1)';
      addEvBtn.onclick = () => HuntManager.showEvidenceModal(titleText);

      btnContainer.appendChild(addEvBtn);
      phase.appendChild(btnContainer);
    });
  },

  showEvidenceModal: function(phaseTitle) {
    if (!this.session) {
      alert('You must start a Hunt Session first!');
      this.showStartModal();
      return;
    }
    let modal = document.getElementById('evidence-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'evidence-modal';
      modal.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.8); z-index:9999; display:flex; justify-content:center; align-items:center; backdrop-filter: blur(5px);';
      modal.innerHTML = `
        <div class="cyber-card" style="width: 600px; max-width: 90%; background: var(--bg-dark); border: 1px solid var(--neon-green); max-height: 90vh; overflow-y: auto;">
          <h3 style="color: var(--neon-green); margin-top:0;">Add Evidence: <span id="ev-phase-title"></span></h3>
          
          <label style="display:block; margin-bottom:5px; color:#aaa; font-size:0.9rem;">URL / Endpoint</label>
          <input type="text" id="ev-url" placeholder="https://api.target.com/v1/users" style="width:100%; padding:10px; margin-bottom:15px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; box-sizing:border-box;">
          
          <label style="display:block; margin-bottom:5px; color:#aaa; font-size:0.9rem;">HTTP Request</label>
          <textarea id="ev-request" placeholder="GET /v1/users HTTP/1.1..." style="width:100%; padding:10px; margin-bottom:15px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; height:100px; box-sizing:border-box; font-family:monospace;"></textarea>
          
          <label style="display:block; margin-bottom:5px; color:#aaa; font-size:0.9rem;">HTTP Response Snippet</label>
          <textarea id="ev-response" placeholder="HTTP/1.1 200 OK..." style="width:100%; padding:10px; margin-bottom:15px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; height:100px; box-sizing:border-box; font-family:monospace;"></textarea>
          
          <label style="display:block; margin-bottom:5px; color:#aaa; font-size:0.9rem;">Notes & Impact</label>
          <textarea id="ev-notes" placeholder="Found IDOR on user profile..." style="width:100%; padding:10px; margin-bottom:15px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; height:80px; box-sizing:border-box;"></textarea>
          
          <label style="display:block; margin-bottom:5px; color:#aaa; font-size:0.9rem;">Severity</label>
          <select id="ev-severity" style="width:100%; padding:10px; margin-bottom:20px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; box-sizing:border-box;">
            <option value="Info">Info</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>

          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button onclick="document.getElementById('evidence-modal').style.display='none'" style="background:transparent; border:1px solid #666; color:#ccc; padding:8px 16px; border-radius:4px; cursor:pointer;">Cancel</button>
            <button onclick="HuntManager.submitEvidence()" style="background:var(--neon-green); border:none; color:#000; padding:8px 16px; border-radius:4px; cursor:pointer; font-weight:bold;">Save Evidence</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    document.getElementById('ev-phase-title').innerText = phaseTitle;
    document.getElementById('evidence-modal').style.display = 'flex';
  },

  submitEvidence: function() {
    let phase = document.getElementById('ev-phase-title').innerText;
    let url = document.getElementById('ev-url').value;
    let request = document.getElementById('ev-request').value;
    let response = document.getElementById('ev-response').value;
    let notes = document.getElementById('ev-notes').value;
    let severity = document.getElementById('ev-severity').value;

    this.addEvidence(phase, url, request, response, notes, severity);
    document.getElementById('evidence-modal').style.display = 'none';
    
    // clear inputs
    document.getElementById('ev-url').value = '';
    document.getElementById('ev-request').value = '';
    document.getElementById('ev-response').value = '';
    document.getElementById('ev-notes').value = '';
    document.getElementById('ev-severity').value = 'Info';
  },

  injectReportBuilder: function() {
    let modal = document.createElement('div');
    modal.id = 'report-modal';
    modal.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.9); z-index:10000; display:none; flex-direction:column; padding:40px; box-sizing:border-box; backdrop-filter: blur(10px);';
    modal.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px;">
        <h2 style="color:var(--neon-cyan); margin:0;">📋 Hunt Report</h2>
        <div style="display:flex; gap:10px;">
          <button onclick="HuntManager.copyReport()" style="background:var(--neon-cyan); color:#000; border:none; padding:10px 20px; border-radius:4px; cursor:pointer; font-weight:bold;">Copy Markdown</button>
          <button onclick="document.getElementById('report-modal').style.display='none'" style="background:transparent; color:#fff; border:1px solid #fff; padding:10px 20px; border-radius:4px; cursor:pointer;">Close</button>
        </div>
      </div>
      <textarea id="report-output" style="flex:1; width:100%; background:rgba(255,255,255,0.05); color:#fff; border:1px solid rgba(255,255,255,0.2); padding:20px; font-family:monospace; font-size:1rem; border-radius:8px; box-sizing:border-box;"></textarea>
    `;
    document.body.appendChild(modal);
  },

  showReport: function() {
    if (!this.session) return;
    let md = `# Hunt Report: ${this.session.target}\n\n`;
    md += `**Date:** ${new Date(this.session.startTime).toLocaleString()}\n`;
    md += `**Program Type:** ${this.session.type}\n`;
    md += `**Scope:**\n\`\`\`\n${this.session.scope}\n\`\`\`\n\n`;
    md += `---\n\n## Evidences & Findings\n\n`;

    if (this.session.evidences.length === 0) {
      md += `*No evidences collected yet.*\n`;
    } else {
      this.session.evidences.forEach((ev, i) => {
        md += `### ${i+1}. [${ev.severity}] ${ev.phase}\n`;
        if (ev.url) md += `**URL:** \`${ev.url}\`\n\n`;
        if (ev.notes) md += `**Notes:**\n${ev.notes}\n\n`;
        if (ev.request) md += `**Request:**\n\`\`\`http\n${ev.request}\n\`\`\`\n\n`;
        if (ev.response) md += `**Response Snippet:**\n\`\`\`http\n${ev.response}\n\`\`\`\n\n`;
        md += `---\n\n`;
      });
    }

    document.getElementById('report-output').value = md;
    document.getElementById('report-modal').style.display = 'flex';
  },

  copyReport: function() {
    let textarea = document.getElementById('report-output');
    textarea.select();
    document.execCommand('copy');
    alert('Report Markdown Copied to Clipboard!');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => HuntManager.init(), 500);
});
