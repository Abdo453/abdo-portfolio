// ==========================================
// SHARED REQUEST ENGINE (v1.0)
// ==========================================

const RequestEngine = (function() {
  function parse(rawText) {
    if (!rawText) return { method: "GET", url: "/", headers: {}, body: "" };
    const lines = rawText.split("\n");
    const firstLine = lines[0] || "GET / HTTP/1.1";
    const parts = firstLine.trim().split(" ");
    const method = parts[0] || "GET";
    const url = parts[1] || "/";
    
    let headers = {};
    let bodyIndex = -1;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === "") {
        bodyIndex = i + 1;
        break;
      }
      const colonIdx = line.indexOf(":");
      if (colonIdx !== -1) {
        const key = line.substring(0, colonIdx).trim();
        const val = line.substring(colonIdx + 1).trim();
        headers[key] = val;
      }
    }

    let body = "";
    if (bodyIndex !== -1 && bodyIndex < lines.length) {
      body = lines.slice(bodyIndex).join("\n").trim();
    }

    return {
      method: method,
      url: url,
      headers: headers,
      body: body,
      raw: rawText
    };
  }

  return {
    parse: parse
  };
})();
