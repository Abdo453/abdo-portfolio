// ==========================================
// BURP SUITE EDUCATIONAL STUDIO ENGINE (v1.0)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // TAB NAVIGATION ENGINE
  const tabs = document.querySelectorAll(".burp-tab");
  const panes = document.querySelectorAll(".tab-pane");

  function switchTab(tabId) {
    tabs.forEach(t => t.classList.remove("active"));
    panes.forEach(p => p.classList.remove("active"));

    const activeTab = document.querySelector(`.burp-tab[data-tab="${tabId}"]`);
    const activePane = document.getElementById(`pane-${tabId}`);

    if (activeTab && activePane) {
      activeTab.classList.add("active");
      activePane.classList.add("active");
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      switchTab(tab.getAttribute("data-tab"));
    });
  });

  // PROXY ENGINE
  let isInterceptOn = true;
  const btnInterceptToggle = document.getElementById("btn-intercept-toggle");
  const btnProxyForward = document.getElementById("btn-proxy-forward");
  const proxyRequestEditor = document.getElementById("proxy-request-editor");
  const proxyHistoryTbody = document.getElementById("proxy-history-tbody");

  if (btnInterceptToggle) {
    btnInterceptToggle.addEventListener("click", () => {
      isInterceptOn = !isInterceptOn;
      if (isInterceptOn) {
        btnInterceptToggle.className = "burp-btn btn-intercept-on";
        btnInterceptToggle.innerHTML = `<i class="bx bx-pause-circle"></i> Intercept is ON`;
      } else {
        btnInterceptToggle.className = "burp-btn";
        btnInterceptToggle.innerHTML = `<i class="bx bx-play-circle"></i> Intercept is OFF`;
      }
    });
  }

  if (btnProxyForward) {
    btnProxyForward.addEventListener("click", () => {
      const reqText = proxyRequestEditor.value;
      const lines = reqText.split("\n");
      const firstLine = lines[0] || "POST /api/v1/login HTTP/1.1";
      const parts = firstLine.split(" ");
      const method = parts[0] || "GET";
      const url = parts[1] || "/";

      const count = proxyHistoryTbody.children.length + 1;
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${count}</td><td>target-vulnerable.com</td><td>${method}</td><td>${url}</td><td>200 OK</td><td>1,240</td>`;
      proxyHistoryTbody.prepend(tr);

      alert("HTTP Request Forwarded to Target Web Server!");
    });
  }

  // SEND TO REPEATER & INTRUDER
  const btnSendToRepeater = document.getElementById("btn-send-to-repeater");
  const btnSendToIntruder = document.getElementById("btn-send-to-intruder");
  const repeaterRequestEditor = document.getElementById("repeater-request-editor");
  const intruderPositionEditor = document.getElementById("intruder-position-editor");

  if (btnSendToRepeater) {
    btnSendToRepeater.addEventListener("click", () => {
      repeaterRequestEditor.value = proxyRequestEditor.value;
      switchTab("repeater");
    });
  }

  if (btnSendToIntruder) {
    btnSendToIntruder.addEventListener("click", () => {
      intruderPositionEditor.value = proxyRequestEditor.value.replace("admin' OR '1'='1", "§admin' OR '1'='1§");
      switchTab("intruder");
    });
  }

  // REPEATER ENGINE
  const btnRepeaterSend = document.getElementById("btn-repeater-send");
  const repeaterResponseEditor = document.getElementById("repeater-response-editor");
  const repeaterStatusBadge = document.getElementById("repeater-status-badge");

  if (btnRepeaterSend) {
    btnRepeaterSend.addEventListener("click", () => {
      const req = repeaterRequestEditor.value;
      repeaterStatusBadge.textContent = "200 OK";
      repeaterStatusBadge.style.color = "#22c55e";

      let resBody = "<html>\n  <body>\n    <h1>200 OK Response</h1>\n    <div>Request Processed successfully.</div>\n  </body>\n</html>";
      if (req.includes("OR 1=1") || req.includes("admin")) {
        resBody = "<html>\n  <body>\n    <h1>Welcome Administrator!</h1>\n    <div>FLAG{BURP_REPEATER_MASTER_992}</div>\n  </body>\n</html>";
      }

      repeaterResponseEditor.value = `HTTP/1.1 200 OK\r\nDate: ${new Date().toUTCString()}\r\nServer: Apache/2.4.41 (Ubuntu)\r\nContent-Type: text/html\r\nContent-Length: ${resBody.length}\r\n\r\n${resBody}`;
    });
  }

  // INTRUDER FUZZER ENGINE
  const btnStartAttack = document.getElementById("btn-start-attack");
  const intruderResultsTbody = document.getElementById("intruder-results-tbody");
  const intruderProgressText = document.getElementById("intruder-progress-text");

  if (btnStartAttack) {
    btnStartAttack.addEventListener("click", () => {
      intruderResultsTbody.innerHTML = "";
      intruderProgressText.textContent = "Fuzzing Attack Running...";

      const payloads = [
        { val: "admin' OR '1'='1", status: "200 OK", len: "1,420", time: "45" },
        { val: "admin'--", status: "200 OK", len: "1,420", time: "38" },
        { val: "<script>alert(1)</script>", status: "403 Blocked", len: "312", time: "12" },
        { val: "../../../etc/passwd", status: "200 OK", len: "2,840", time: "62" },
        { val: "UNION SELECT null,null--", status: "500 Error", len: "512", time: "85" }
      ];

      payloads.forEach((p, idx) => {
        setTimeout(() => {
          const tr = document.createElement("tr");
          const color = p.status.includes("200") ? "#4ade80" : (p.status.includes("403") ? "#f87171" : "#facc15");
          tr.innerHTML = `<td>${idx + 1}</td><td><code>${p.val}</code></td><td style="color:${color}; font-weight:bold;">${p.status}</td><td>${p.len}</td><td>${p.time} ms</td>`;
          intruderResultsTbody.appendChild(tr);

          if (idx === payloads.length - 1) {
            intruderProgressText.textContent = "Attack Complete (100%)";
          }
        }, idx * 300);
      });
    });
  }

  // DECODER ENGINE
  const decoderInput = document.getElementById("decoder-input");
  const decoderOutput = document.getElementById("decoder-output");

  document.getElementById("btn-dec-b64-enc").addEventListener("click", () => {
    try { decoderOutput.value = btoa(unescape(encodeURIComponent(decoderInput.value))); } catch(e) { decoderOutput.value = "Error Encoding"; }
  });
  document.getElementById("btn-dec-b64-dec").addEventListener("click", () => {
    try { decoderOutput.value = decodeURIComponent(escape(atob(decoderInput.value))); } catch(e) { decoderOutput.value = "Error Decoding"; }
  });
  document.getElementById("btn-dec-url-enc").addEventListener("click", () => {
    decoderOutput.value = encodeURIComponent(decoderInput.value);
  });
  document.getElementById("btn-dec-url-dec").addEventListener("click", () => {
    try { decoderOutput.value = decodeURIComponent(decoderInput.value); } catch(e) { decoderOutput.value = "Error Decoding"; }
  });

  // COMPARER ENGINE
  const btnRunDiff = document.getElementById("btn-run-diff");
  if (btnRunDiff) {
    btnRunDiff.addEventListener("click", () => {
      const itemA = document.getElementById("comparer-item-a").value;
      const itemB = document.getElementById("comparer-item-b").value;
      if (itemA === itemB) {
        alert("Comparer Result: Both HTTP Responses are 100% Identical!");
      } else {
        alert("Comparer Result: Differences Detected between Item A and Item B!\n- Item A Role: user (access: false)\n- Item B Role: admin (access: true)");
      }
    });
  }

  // COLLABORATOR ENGINE
  const btnCollabPoll = document.getElementById("btn-collab-poll");
  const collabTbody = document.getElementById("collaborator-tbody");
  if (btnCollabPoll) {
    btnCollabPoll.addEventListener("click", () => {
      const count = collabTbody.children.length + 1;
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${count}</td><td>DNS Query</td><td>192.168.1.105</td><td>${new Date().toLocaleTimeString()} GMT</td><td>Query for payload-outbound.bx91823.burpcollaborator.net</td>`;
      collabTbody.prepend(tr);
      alert("Collaborator Poll Success: New Out-of-Band Interaction Captured!");
    });
  }
});
