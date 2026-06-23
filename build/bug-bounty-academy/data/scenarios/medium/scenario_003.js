// ==========================================================
// SCENARIO 003: IDOR IN BANKING API (MEDIUM) - V2 DATA
// ==========================================================

window.scenario_003 = {
  metadata: {
    id: "scenario-003",
    title: "IDOR to Bank Account Takeover",
    level: "Medium",
    category: "Authorization",
    company: "Stripe",
    reward: "$3,500",
    time: "2 Hours"
  },

  decisionLog: [
    {
      hypothesis: "The bank portal restricts endpoint parameter querying based on JWT tokens validation.",
      whyFailed: "Although JWT tokens are verified, the backend fails to validate resource ownership checks on ID queries.",
      planB: "Enumerate index routes and tamper with account path parameters to bypass object controls.",
      ignored: "Brute-forcing JWT key signatures or attempting database SQL injections."
    }
  ],

  payloads: [
    {
      code: "GET /v1/accounts/ACC-10030",
      explanation: "Manipulating resource identifier parameter directly in request path.",
      whyWorked: "Missing Object-Level Access Control (BOLA/IDOR). The server queries accounts records purely by index ID.",
      alternatives: ["Header injection parameter overriding", "JSON body parameter tampering"]
    }
  ],

  mistakes: [
    {
      mistake: "Injecting SQL statements into account indexes.",
      whyWrong: "UUID parameters are strictly handled via regex or WAF filters, blocking queries.",
      betterWay: "Tamper with valid numeric index values to inspect access check exceptions."
    }
  ],

  steps: [
    {
      name: "Mission Brief",
      time: "09:00",
      workspace: "markdown",
      xpReward: 100,
      description: `
### Target: api.acme-bank.com
Audit Acme Bank's accounts API. Check if authorization tokens are correctly bounded to resource queries.

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
### API Routes Mapping
Let's crawl the API mapping using Katana.
      `,
      terminalCommands: [
        {
          name: "katana -u https://api.acme-bank.com/ -silent",
          correct: true,
          evidence: {
            title: "Private API Path Map",
            content: "GET /v1/accounts/me\nGET /v1/accounts/{id}"
          },
          output: [
            { text: "[INF] Crawling API schema endpoints...", type: "info" },
            { text: "https://api.acme-bank.com/v1/health", type: "out" },
            { text: "https://api.acme-bank.com/v1/accounts/me", type: "out" },
            { text: "https://api.acme-bank.com/v1/accounts/ACC-10029", type: "out" },
            { text: "[INF] Katana completed. Found 3 endpoints.", type: "success" }
          ]
        }
      ],
      aiAdvisor: {
        hint: "Run the katana tool to find endpoint maps.",
        payloadExplanation: "Katana scans routes and javascript variables for active APIs.",
        failureExplanation: "Failing to crawl routes means missing hidden parameters."
      }
    },
    {
      name: "DNS Verification",
      time: "09:40",
      workspace: "markdown",
      xpReward: 150,
      description: `
### Access Control Auditing
We found endpoints indexed by UUID. Let's see if the backend validates our permission on foreign account IDs.
      `,
      choices: [
        {
          text: "A) Change Authorization token signature directly",
          correct: false,
          xp: -10,
          timePenalty: 5,
          outcome: "Token signature checks block you with 401 response."
        },
        {
          text: "B) Tamper with the account ID parameter in the URL path",
          correct: true,
          xp: 50,
          outcome: "Intercepting requests in Burp to check Bob's account ACC-10030."
        }
      ],
      aiAdvisor: {
        hint: "Select option B to execute ID tampering.",
        payloadExplanation: "Altering paths variables bypasses authorization.",
        failureExplanation: "Modifying token signatures fails local encryption checks."
      }
    },
    {
      name: "Burp Verification",
      time: "10:05",
      workspace: "burp",
      xpReward: 200,
      description: `
### Intercepting Request
Modify your account ID query to target Bob's details.
      `,
      burpRequest: "GET /v1/accounts/ACC-10029 HTTP/1.1\nHost: api.acme-bank.com\nAuthorization: Bearer alice_token_9918",
      burpResponse: "HTTP/1.1 200 OK\n\n{\n  \"account_id\": \"ACC-10029\",\n  \"owner\": \"Alice\",\n  \"balance\": \"$150.00\"\n}",
      burpActions: [
        {
          name: "Request ACC-10030",
          correct: true,
          modifiedRequest: "GET /v1/accounts/ACC-10030 HTTP/1.1\nHost: api.acme-bank.com\nAuthorization: Bearer alice_token_9918",
          modifiedResponse: "HTTP/1.1 200 OK\n\n{\n  \"account_id\": \"ACC-10030\",\n  \"owner\": \"Bob\",\n  \"balance\": \"$450,000.00\",\n  \"routing_flag\": \"FLAG{idor_account_data_leakage_confirmed}\"\n}",
          evidence: {
            title: "Bob's Financial Details Leakage",
            content: "Account: ACC-10030\nBalance: $450,000.00\nFlag: FLAG{idor_account_data_leakage_confirmed}"
          }
        }
      ],
      aiAdvisor: {
        hint: "Request Bob's account parameters ACC-10030 in Burp.",
        payloadExplanation: "TAMPER ID paths to bypass server auth filters.",
        failureExplanation: "Failing to update parameters queries default credentials."
      }
    },
    {
      name: "Exploitation & Flag",
      time: "10:30",
      workspace: "lab",
      xpReward: 300,
      instructions: "Query target server for Bob's financial record and enter the flag.",
      targetUrl: "https://api.acme-bank.com/v1/accounts/ACC-10030",
      correctFlag: "FLAG{idor_account_data_leakage_confirmed}",
      aiAdvisor: {
        hint: "Flag: FLAG{idor_account_data_leakage_confirmed}",
        payloadExplanation: "Flag extracted from leaked JSON body response.",
        failureExplanation: "Flag mismatch."
      }
    },
    {
      name: "Report Writing",
      time: "11:00",
      workspace: "report",
      xpReward: 250,
      aiAdvisor: {
        hint: "Keywords: 'idor', 'accounts'.",
        payloadExplanation: "Explain Broken Object Level Authorization (BOLA).",
        failureExplanation: "Report details missing."
      }
    },
    {
      name: "Triage & Verdict",
      time: "5 Days Later",
      workspace: "review",
      aiAdvisor: {
        hint: "Triage feedback.",
        payloadExplanation: "Triage verdict logs.",
        failureExplanation: "None."
      }
    },
    {
      name: "Lessons Learned",
      time: "Post-Incident",
      workspace: "quiz",
      quizData: [
        {
          question: "What does IDOR stand for?",
          options: [
            "Insecure Database Object Recovery",
            "Insecure Direct Object Reference"
          ],
          answer: 1
        }
      ],
      aiAdvisor: {
        hint: "Select option B.",
        payloadExplanation: "Verifies authorization terminology.",
        failureExplanation: "XP penalty."
      }
    }
  ],

  realReport: {
    title: "IDOR on /v1/accounts/ leads to access to foreign bank details",
    severity: "Critical",
    type: "IDOR",
    desc: "The accounts endpoint maps database records directly to URL paths. Since ownership verification is missing, users can retrieve details of other user accounts.",
    steps: "1. Query /v1/accounts/ACC-10029.\n2. Change account ID in path to ACC-10030.\n3. View leaked data.",
    impact: "Full data compromise of all user accounts.",
    feedback: "Critical IDOR confirmed. Middleware updated. Bounty awarded.",
    keywords: ["idor", "accounts"]
  }
};
