/**
 * V2 Architecture: Vanilla JS Components for Data-Driven Rendering
 */

// ToolCard Component
function renderToolCard(toolData) {
    const commandsHTML = toolData.commands.map(cmd => `
        <div style="background:rgba(0,0,0,0.3); border:1px solid #44475a; border-radius:8px; padding:15px;">
            <h5 style="color:#8be9fd; margin-top:0;">${cmd.title}</h5>
            <div class="cmd-ui-box" style="font-size:0.85em;">${cmd.syntax}</div>
            <p style="color:#aaa; font-size:0.85em; margin-top:8px;">${cmd.desc}</p>
        </div>
    `).join('');

    return `
    <div class="meth-content-view" id="meth-content-tool_${toolData.id}" style="display:block;" dir="rtl">
        <div class="cyber-hero">
            <h2 class="hero-title"><span class="hero-icon">${toolData.icon}</span> ${toolData.name}</h2>
            <p class="hero-tagline">${toolData.tagline}</p>
        </div>

        <div class="cyber-card" style="border-top:3px solid #ffb86c; margin-top:20px;">
            <div class="card-header">
                <h3 style="margin:0; color:#ffb86c;">📌 الأوامر الأساسية (Generated via Component)</h3>
            </div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:12px; margin-top:18px;">
                ${commandsHTML}
            </div>
        </div>
    </div>
    `;
}

// Function to fetch JSON and render the page
function loadToolFromJson(toolId, container) {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const basePath = isLocal ? '/static/main/data/' : 'data/';
    
    fetch(basePath + toolId + '.json')
        .then(res => res.json())
        .then(data => {
            const html = renderToolCard(data);
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            container.appendChild(tempDiv.firstElementChild);
            document.getElementById('lazy-loading-div').style.display = 'none';
        })
        .catch(err => {
            console.error("Error loading tool JSON:", err);
            document.getElementById('lazy-loading-div').innerText = "❌ Error loading tool data.";
        });
}
