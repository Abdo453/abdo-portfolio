// ==========================================
// SHARED WORKFLOW & GLOBAL SESSION ENGINE (v1.0)
// ==========================================

const WorkflowEngine = (function() {
  const SESSION_KEY = "bba_global_session_request";
  const TIMELINE_KEY = "bba_global_timeline";

  function setGlobalRequest(rawReq, sourceTool) {
    localStorage.setItem(SESSION_KEY, rawReq);
    addTimelineEntry(sourceTool, "Updated Global HTTP Request");
  }

  function getGlobalRequest() {
    return localStorage.getItem(SESSION_KEY) || "GET /api/v1/user HTTP/1.1\r\nHost: target.com\r\nUser-Agent: BurpSuiteSimulator/1.0\r\n\r\n";
  }

  function addTimelineEntry(toolName, actionDesc) {
    let timeline = JSON.parse(localStorage.getItem(TIMELINE_KEY) || "[]");
    const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    timeline.push({ time: timeStr, tool: toolName, action: actionDesc });
    if (timeline.length > 20) timeline.shift();
    localStorage.setItem(TIMELINE_KEY, JSON.stringify(timeline));
    renderTimelineWidget();
  }

  function renderTimelineWidget() {
    const container = document.getElementById("global-timeline-bar");
    if (!container) return;
    let timeline = JSON.parse(localStorage.getItem(TIMELINE_KEY) || "[]");
    if (timeline.length === 0) {
      container.innerHTML = `<span style="color:#8b949e; font-size:0.75rem;">Timeline Empty. Perform actions across tools to log activity.</span>`;
      return;
    }
    let html = "";
    timeline.slice(-5).reverse().forEach((t) => {
      html += `<span style="background:#21262d; border:1px solid #30363d; padding:2px 8px; border-radius:4px; margin-left:6px; font-size:0.75rem; color:#c9d1d9;"><strong style="color:#f97316;">${t.time}</strong> [${t.tool}] ${t.action}</span>`;
    });
    container.innerHTML = html;
  }

  return {
    setGlobalRequest: setGlobalRequest,
    getGlobalRequest: getGlobalRequest,
    addTimelineEntry: addTimelineEntry,
    renderTimelineWidget: renderTimelineWidget
  };
})();
