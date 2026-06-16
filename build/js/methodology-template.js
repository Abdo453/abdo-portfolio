// Templating Engine for the New Phase Architecture

document.addEventListener('DOMContentLoaded', () => {
  if (typeof MethodologyData === 'undefined') return;

  const viewer = document.querySelector('.meth-viewer');
  const sidebar = document.querySelector('.meth-sidebar-nav'); // Check if it's nav or something else.
  // Actually the sidebar menu is usually ul inside nav. Let's find the first ul or create a section.
  
  // Create a new section in the sidebar for the "Professional Phases"
  const newPhasesHeader = document.createElement('div');
  newPhasesHeader.innerHTML = '<h3 style="color:var(--neon-cyan); margin: 20px 10px 10px 10px; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">V2 Professional Phases</h3>';
  
  const newPhasesList = document.createElement('ul');
  newPhasesList.className = 'sidebar-ul-v2';
  newPhasesList.style.listStyle = 'none';
  newPhasesList.style.padding = '0';
  newPhasesList.style.margin = '0';

  MethodologyData.phases.forEach((phase, index) => {
    // 1. Create Sidebar Link
    const li = document.createElement('li');
    li.style.marginBottom = '5px';
    const a = document.createElement('a');
    a.href = '#' + phase.id;
    a.id = phase.sidebarId;
    a.innerText = phase.title;
    a.style.cssText = `display:block; padding:8px 12px; color:#94a3b8; text-decoration:none; border-radius:4px; transition:all 0.3s; border-left: 3px solid transparent;`;
    a.onmouseover = () => { a.style.background = 'rgba(255,255,255,0.05)'; a.style.color = '#fff'; };
    a.onmouseout = () => { a.style.background = 'transparent'; a.style.color = '#94a3b8'; };
    a.onclick = (e) => {
      e.preventDefault();
      // Hide all phases
      document.querySelectorAll('.meth-content-view').forEach(p => p.style.display = 'none');
      // Show this phase
      document.getElementById(phase.id).style.display = 'block';
    };
    li.appendChild(a);
    newPhasesList.appendChild(li);

    // 2. Create the Phase View
    const phaseDiv = document.createElement('div');
    phaseDiv.className = 'meth-content-view';
    phaseDiv.id = phase.id;
    phaseDiv.style.display = index === 0 ? 'block' : 'none'; // Show first by default
    phaseDiv.style.setProperty('--tool-color', phase.color);
    
    // Commands HTML
    let cmdsHtml = '';
    phase.commands.forEach(cmd => {
      cmdsHtml += `<div class="cmd-box" style="background:#111; padding:10px; border-radius:4px; border-left:3px solid ${phase.color}; font-family:monospace; margin-bottom:10px; position:relative;">
        <span style="color:#0f0;">$</span> <span style="color:#fff;">${cmd}</span>
      </div>`;
    });

    phaseDiv.innerHTML = `
      <div class="phase-header" style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom:15px; margin-bottom:20px;">
        <h1 class="phase-module-title" style="color:${phase.color}; margin:0; font-size:2rem; display:flex; align-items:center; gap:10px;">
          <span class="pulse-dot" style="width:12px; height:12px; background:${phase.color}; border-radius:50%; box-shadow:0 0 10px ${phase.color};"></span>
          ${phase.title}
        </h1>
      </div>

      <div class="cyber-card" style="margin-bottom:20px; border-color:${phase.color};">
        <h3 style="color:${phase.color}; margin-top:0;">🎯 Objective</h3>
        <p style="color:#e2e8f0; line-height:1.6;">${phase.objective}</p>
        
        <h3 style="color:${phase.color}; margin-top:20px;">⏱️ When to use</h3>
        <p style="color:#e2e8f0; line-height:1.6;">${phase.whenToUse}</p>
        
        <h3 style="color:${phase.color}; margin-top:20px;">📥 Inputs Required</h3>
        <ul style="color:#e2e8f0; line-height:1.6;">
          ${phase.inputs.map(i => `<li>${i}</li>`).join('')}
        </ul>
      </div>

      <div class="cyber-card" style="margin-bottom:20px; border-color:${phase.color};">
        <h3 style="color:${phase.color}; margin-top:0;">🛠️ Tools & Commands</h3>
        <p style="color:#aaa;">Recommended Tools: <strong>${phase.tools.join(', ')}</strong></p>
        ${cmdsHtml}
      </div>

      <div class="cyber-card" style="margin-bottom:20px; border-color:${phase.color};">
        <h3 style="color:${phase.color}; margin-top:0;">✅ Verification & Findings</h3>
        <p style="color:#e2e8f0; line-height:1.6;"><strong>Verification:</strong> ${phase.verification}</p>
        <p style="color:#e2e8f0; line-height:1.6;"><strong>Common Findings:</strong> ${phase.commonFindings.join(', ')}</p>
        <p style="color:#e2e8f0; line-height:1.6;"><strong>False Positives:</strong> ${phase.falsePositives.join(', ')}</p>
        <p style="color:#e2e8f0; line-height:1.6;"><strong>Stop Conditions:</strong> ${phase.stopConditions}</p>
      </div>

      <div class="cyber-card" style="margin-bottom:20px; border-color:${phase.color}; background: rgba(0,0,0,0.4);">
        <h3 style="color:${phase.color}; margin-top:0;">📝 Reporting & Evidence</h3>
        <p style="color:#e2e8f0; line-height:1.6;"><strong>Evidence to Save:</strong> ${phase.evidenceToSave}</p>
        <div style="background:rgba(255,255,255,0.05); padding:10px; border-radius:4px; font-style:italic; color:#ccc;">
          "${phase.reportNotes}"
        </div>
      </div>
    `;

    // Prepend to viewer
    if (viewer) viewer.insertBefore(phaseDiv, viewer.firstChild);
  });

  // Inject Sidebar
  const sidebarNav = document.querySelector('.meth-sidebar');
  if (sidebarNav) {
    // Put the new links at the top of the sidebar, after the Hunt UI
    const huntUI = document.getElementById('hunt-ui-container');
    if (huntUI && huntUI.nextSibling) {
      sidebarNav.insertBefore(newPhasesHeader, huntUI.nextSibling);
      sidebarNav.insertBefore(newPhasesList, newPhasesHeader.nextSibling);
    } else {
      sidebarNav.insertBefore(newPhasesList, sidebarNav.firstChild);
      sidebarNav.insertBefore(newPhasesHeader, newPhasesList);
    }
  }

  // Inject Decision Matrix
  injectDecisionMatrix();

  // Inject Labs
  injectLabs();
});

function injectLabs() {
  const viewer = document.querySelector('.meth-viewer');
  if (!viewer || !MethodologyData.labs || MethodologyData.labs.length === 0) return;

  const labsDiv = document.createElement('div');
  labsDiv.className = 'meth-content-view';
  labsDiv.id = 'labs-scenarios-view';
  labsDiv.style.display = 'none';
  labsDiv.style.setProperty('--tool-color', '#ff0055');

  let labsHtml = '';
  MethodologyData.labs.forEach(lab => {
    labsHtml += `
      <div class="cyber-card" style="margin-bottom:20px; border-left: 4px solid #ff0055;">
        <h3 style="color:#ff0055; margin-top:0;">🎮 ${lab.title}</h3>
        <p style="color:#e2e8f0; line-height:1.6;"><strong>Story:</strong> ${lab.story}</p>
        <p style="color:#e2e8f0; line-height:1.6;"><strong>Starting Point:</strong> ${lab.startingPoint}</p>
        <div style="background:rgba(255,0,85,0.1); padding:10px; border-radius:4px; margin:15px 0;">
          <strong style="color:#ff0055;">Expected Path:</strong><br>
          <code style="color:#fff;">${lab.expectedPath}</code>
        </div>
        <h4 style="color:#ff0055; margin-bottom:5px;">💡 Hints:</h4>
        <ul style="color:#e2e8f0; margin-top:0;">
          ${lab.hints.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    `;
  });

  labsDiv.innerHTML = `
    <div class="phase-header" style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom:15px; margin-bottom:20px;">
      <h1 class="phase-module-title" style="color:#ff0055; margin:0; font-size:2rem; display:flex; align-items:center; gap:10px;">
        <span class="pulse-dot" style="width:12px; height:12px; background:#ff0055; border-radius:50%; box-shadow:0 0 10px #ff0055;"></span>
        Advanced Labs & Scenarios
      </h1>
      <p style="color:#aaa; margin-top:10px;">Practice chaining vulnerabilities and real-world scenarios.</p>
    </div>
    ${labsHtml}
  `;

  viewer.appendChild(labsDiv);

  // Add to sidebar
  const sidebarNav = document.querySelector('.sidebar-ul-v2');
  if (sidebarNav) {
    const li = document.createElement('li');
    li.style.marginTop = '5px';
    const a = document.createElement('a');
    a.href = '#labs-scenarios-view';
    a.innerText = '⚔️ Labs & Scenarios';
    a.style.cssText = `display:block; padding:8px 12px; color:#ff0055; font-weight:bold; background: rgba(255, 0, 85, 0.1); text-decoration:none; border-radius:4px; border: 1px solid rgba(255, 0, 85, 0.3);`;
    a.onclick = (e) => {
      e.preventDefault();
      document.querySelectorAll('.meth-content-view').forEach(p => p.style.display = 'none');
      document.getElementById('labs-scenarios-view').style.display = 'block';
    };
    li.appendChild(a);
    sidebarNav.appendChild(li);
  }
}

function injectDecisionMatrix() {
  const viewer = document.querySelector('.meth-viewer');
  if (!viewer || !MethodologyData.decisionMatrix) return;

  const matrixDiv = document.createElement('div');
  matrixDiv.className = 'meth-content-view';
  matrixDiv.id = 'decision-matrix-view';
  matrixDiv.style.display = 'none';
  matrixDiv.style.setProperty('--tool-color', '#f59e0b');

  let tableRows = '';
  MethodologyData.decisionMatrix.forEach(row => {
    tableRows += `
      <tr style="border-bottom:1px solid rgba(255,255,255,0.1);">
        <td style="padding:15px; color:#f59e0b; font-weight:bold;">${row.condition}</td>
        <td style="padding:15px; color:#e2e8f0;">${row.action}</td>
        <td style="padding:15px; color:#00e5ff;">${row.nextPhase}</td>
      </tr>
    `;
  });

  matrixDiv.innerHTML = `
    <div class="phase-header" style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom:15px; margin-bottom:20px;">
      <h1 class="phase-module-title" style="color:#f59e0b; margin:0; font-size:2rem; display:flex; align-items:center; gap:10px;">
        <span class="pulse-dot" style="width:12px; height:12px; background:#f59e0b; border-radius:50%; box-shadow:0 0 10px #f59e0b;"></span>
        Interactive Decision Matrix
      </h1>
      <p style="color:#aaa; margin-top:10px;">What to do next based on your current findings?</p>
    </div>
    
    <table style="width:100%; border-collapse:collapse; background:rgba(0,0,0,0.4); border-radius:8px; overflow:hidden;">
      <thead style="background:rgba(245, 158, 11, 0.1);">
        <tr>
          <th style="padding:15px; text-align:left; color:#f59e0b;">If you found...</th>
          <th style="padding:15px; text-align:left; color:#f59e0b;">Action</th>
          <th style="padding:15px; text-align:left; color:#f59e0b;">Next Phase</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;

  viewer.appendChild(matrixDiv);

  // Add to sidebar
  const sidebarNav = document.querySelector('.sidebar-ul-v2');
  if (sidebarNav) {
    const li = document.createElement('li');
    li.style.marginTop = '15px';
    const a = document.createElement('a');
    a.href = '#decision-matrix-view';
    a.innerText = '🧠 Decision Matrix';
    a.style.cssText = `display:block; padding:8px 12px; color:#f59e0b; font-weight:bold; background: rgba(245, 158, 11, 0.1); text-decoration:none; border-radius:4px; border: 1px solid rgba(245, 158, 11, 0.3);`;
    a.onclick = (e) => {
      e.preventDefault();
      document.querySelectorAll('.meth-content-view').forEach(p => p.style.display = 'none');
      document.getElementById('decision-matrix-view').style.display = 'block';
    };
    li.appendChild(a);
    sidebarNav.appendChild(li);
  }
}
