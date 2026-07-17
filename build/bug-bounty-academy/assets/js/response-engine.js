// ==========================================
// SHARED RESPONSE ENGINE (v1.0)
// ==========================================

const ResponseEngine = (function() {
  function build(statusCode, statusText, headersObj, bodyObj) {
    const statusLine = `HTTP/1.1 ${statusCode} ${statusText}`;
    let defaultHeaders = {
      "Date": new Date().toUTCString(),
      "Server": "Apache/2.4.41 (Ubuntu)",
      "Content-Type": "application/json; charset=UTF-8"
    };

    const finalHeaders = Object.assign({}, defaultHeaders, headersObj || {});
    const bodyStr = typeof bodyObj === "string" ? bodyObj : JSON.stringify(bodyObj, null, 2);
    finalHeaders["Content-Length"] = bodyStr.length;

    let headersStr = "";
    for (let k in finalHeaders) {
      headersStr += `${k}: ${finalHeaders[k]}\r\n`;
    }

    return `${statusLine}\r\n${headersStr}\r\n${bodyStr}`;
  }

  return {
    build: build
  };
})();
