// ==========================================
// V3 HTTP PARSER & RESPONSE BUILDER HELPERS
// ==========================================

class HttpRequestParser {
  static parse(rawText) {
    if (!rawText) {
      return { method: '', path: '', headers: {}, body: '', fullText: '' };
    }
    const lines = rawText.split('\n');
    const requestLine = (lines[0] || '').trim();
    const requestLineParts = requestLine.split(/\s+/);
    const method = (requestLineParts[0] || '').toUpperCase();
    const path = requestLineParts[1] || '';
    const protocol = requestLineParts[2] || '';

    const headers = {};
    let bodyStart = -1;
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === '') {
        bodyStart = i + 1;
        break;
      }
      const colonIndex = lines[i].indexOf(':');
      if (colonIndex !== -1) {
        const key = lines[i].substring(0, colonIndex).trim();
        const val = lines[i].substring(colonIndex + 1).trim();
        headers[key] = val;
        headers[key.toLowerCase()] = val; // support case-insensitive headers
      }
    }

    let body = '';
    if (bodyStart > 0 && bodyStart < lines.length) {
      body = lines.slice(bodyStart).join('\n').trim();
    }

    return { method, path, headers, body, fullText: rawText };
  }
}

class HttpResponseBuilder {
  constructor() {
    this.status = 200;
    this.statusText = "OK";
    this.headers = {};
    this.body = "";
    this.isCorrect = false;
    this.outcomeMessage = "";
    this.penalty = 0;
    this.logs = "";
    this.evidenceData = null;
  }

  setStatus(code, text = null) {
    this.status = code;
    const statusTexts = {
      200: "OK",
      201: "Created",
      400: "Bad Request",
      401: "Unauthorized",
      403: "Forbidden",
      404: "Not Found",
      500: "Internal Server Error"
    };
    this.statusText = text || statusTexts[code] || "OK";
    return this;
  }

  setHeader(key, val) {
    this.headers[key] = val;
    return this;
  }

  setBody(bodyObj) {
    this.body = typeof bodyObj === 'string' ? bodyObj : JSON.stringify(bodyObj, null, 2);
    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/json';
    }
    return this;
  }

  setCorrect(val) {
    this.isCorrect = !!val;
    return this;
  }

  setOutcome(message) {
    this.outcomeMessage = message;
    return this;
  }

  setTimePenalty(minutes) {
    this.penalty = minutes;
    return this;
  }

  setObservabilityLog(logText) {
    this.logs = logText;
    return this;
  }

  setEvidence(title, content) {
    this.evidenceData = { title, content };
    return this;
  }

  build() {
    // Build HTTP headers block
    let headerStr = `HTTP/1.1 ${this.status} ${this.statusText}`;
    for (const key in this.headers) {
      headerStr += `\n${key}: ${this.headers[key]}`;
    }

    return {
      responseHeaders: headerStr,
      responseBody: this.body,
      correct: this.isCorrect,
      outcome: this.outcomeMessage,
      timePenalty: this.penalty,
      observabilityLog: this.logs,
      evidence: this.evidenceData
    };
  }
}

window.HttpRequestParser = HttpRequestParser;
window.HttpResponseBuilder = HttpResponseBuilder;
window.scenarioState = window.scenarioState || {};
