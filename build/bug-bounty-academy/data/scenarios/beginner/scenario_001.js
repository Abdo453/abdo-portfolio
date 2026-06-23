// ==========================================================
// SCENARIO 001: SUBDOMAIN TAKEOVER (BEGINNER) - V2 DATA
// ==========================================================

window.scenario_001 = {
  metadata: {
    id: "scenario-001",
    title: "Subdomain Takeover on Staging Target",
    level: "Beginner",
    category: "Recon Driven",
    company: "Shopify",
    reward: "$500",
    time: "30 Min"
  },

  decisionLog: [
    {
      hypothesis: "Company staging servers are hosted internally and protected by firewalls.",
      whyFailed: "Passive DNS records show their main testing subdomains are mapped to external cloud providers (GitHub Pages).",
      planB: "Audit CNAME records for dangling pointers to verify unclaimed third-party repositories.",
      ignored: "Active port scanning or brute-forcing endpoints on production hosts."
    }
  ],

  payloads: [
    {
      code: "CNAME sub.staging.acme-corp.com -> acme-testing-dev.github.io",
      explanation: "Mapping of target domain to an external third-party host.",
      whyWorked: "GitHub Pages allows claiming custom domains. Since the original repository was deleted, any GitHub user can claim it.",
      alternatives: ["S3 Bucket Takeover", "Heroku Dangling Alias"]
    }
  ],

  mistakes: [
    {
      mistake: "Aggressive directory fuzzing with dirsearch.",
      whyWrong: "Generates thousands of alerts on target firewalls without exposing structural cloud misconfigurations.",
      betterWay: "Use passive DNS enumeration and analyze response headers."
    }
  ],

  steps: [
    {
      name: "Mission Brief",
      time: "09:00",
      workspace: "markdown",
      xpReward: 100,
      description: `
### Target: Acme Corp (Staging wildcard scope)
Welcome Hunter. You have been assigned to test Acme Corp's staging infrastructure. They have recently migrated several testing domains.

#### Rules of Engagement:
- Only test domains under the \`*.staging.acme-corp.com\` wildcard.
- Automated vulnerability scanners are restricted, but you are free to do passive recon.
- Look for orphaned DNS records or misconfigured staging sites.

Click **Next Step** to launch passive subdomain scanning.
      `,
      aiAdvisor: {
        hint: "Your objective is to read the scope rules and proceed. No action is required in this step.",
        payloadExplanation: "No payload is required in this step.",
        failureExplanation: "You cannot fail this step."
      }
    },
    {
      name: "Passive Recon",
      time: "09:15",
      workspace: "recon",
      xpReward: 150,
      description: `
### Passive DNS Scan
Your first objective is to discover active subdomains belonging to Acme Corp.
Choose a tool to execute from the panel below to perform subdomain enumeration and live host detection.
      `,
      terminalCommands: [
        {
          name: "subfinder -d acme-corp.com -silent",
          correct: false,
          output: [
            { text: "[INF] Enumerating subdomains for acme-corp.com", type: "info" },
            { text: "www.acme-corp.com", type: "out" },
            { text: "mail.acme-corp.com", type: "out" },
            { text: "api.acme-corp.com", type: "out" },
            { text: "staging.acme-corp.com", type: "out" },
            { text: "sub.staging.acme-corp.com", type: "out" },
            { text: "portal.acme-corp.com", type: "out" },
            { text: "[INF] Subdomain enumeration completed.", type: "success" }
          ]
        },
        {
          name: "cat subs.txt | httpx -status-code -title",
          correct: true,
          evidence: {
            title: "Orphaned GitHub Pages Server Header",
            content: "HTTP/1.1 404 Not Found\nServer: GitHub.com\nContent-Type: text/html\nX-GitHub-Request-Id: D79A:5F2"
          },
          output: [
            { text: "https://www.acme-corp.com [200] [Acme Corp - Home]", type: "out" },
            { text: "https://api.acme-corp.com [401] [Unauthorized]", type: "out" },
            { text: "https://staging.acme-corp.com [200] [Staging Login]", type: "out" },
            { text: "https://sub.staging.acme-corp.com [404] [Not Found]", type: "error" },
            { text: "[!!!] Notice: sub.staging.acme-corp.com returned a GitHub Pages 404 Server Header!", type: "success" }
          ]
        }
      ],
      aiAdvisor: {
        hint: "Run the httpx command to check the status codes and server headers of discovered subdomains.",
        payloadExplanation: "httpx probes active HTTP hosts and reads response headers.",
        failureExplanation: "Failing to check status codes means you might miss dangling third-party headers."
      }
    },
    {
      name: "DNS Verification",
      time: "09:40",
      workspace: "markdown",
      xpReward: 150,
      description: `
### CNAME Pointer Auditing
To confirm a subdomain takeover, we must verify if the target domain has a CNAME record pointing to an external service (like GitHub Pages) that is no longer registered.
Choose your query method to audit the records.
      `,
      choices: [
        {
          text: "A) Query MX records to see where emails are routed",
          correct: false,
          xp: -10,
          timePenalty: 5,
          outcome: "MX records handle email routing. This does not help verify CNAME dangling pointers."
        },
        {
          text: "B) Run: 'dig CNAME sub.staging.acme-corp.com'",
          correct: true,
          xp: 50,
          outcome: "DNS Query Response:\nsub.staging.acme-corp.com. IN CNAME acme-testing-dev.github.io.\n\nThis confirms the CNAME points to an external GitHub Pages address!"
        },
        {
          text: "C) Perform reverse DNS lookup on IP addresses",
          correct: false,
          xp: -5,
          timePenalty: 2,
          outcome: "Reverse DNS will only show GitHub's shared CDNs IPs. It will not show if the specific GitHub page repository is unclaimed."
        }
      ],
      aiAdvisor: {
        hint: "We need to check CNAME records. Choose the dig command option (B).",
        payloadExplanation: "dig CNAME retrieves alias records mapping the domain to external services.",
        failureExplanation: "MX or reverse DNS lookups are irrelevant for mapping domain aliases."
      }
    },
    {
      name: "Burp Verification",
      time: "10:05",
      workspace: "burp",
      xpReward: 200,
      description: `
### Tampering Request
Analyze the response in Burp Suite. If the GitHub Pages repository is unclaimed, it will return the standard 'There is no GitHub Pages site here' claim message.
      `,
      burpRequest: "GET / HTTP/1.1\nHost: sub.staging.acme-corp.com\nUser-Agent: Mozilla/5.0\nAccept: */*",
      burpResponse: "HTTP/1.1 404 Not Found\nConnection: close\nContent-Length: 9385\nServer: GitHub.com\n\nThere is no GitHub Pages site here.",
      burpActions: [
        {
          name: "Verify Claimability",
          correct: true,
          modifiedRequest: "GET / HTTP/1.1\nHost: sub.staging.acme-corp.com\nUser-Agent: Mozilla/5.0",
          modifiedResponse: "HTTP/1.1 404 Not Found\nServer: GitHub.com\n\nThere is no GitHub Pages site here.",
          evidence: {
            title: "Unclaimed GitHub Pages Site",
            content: "Host: sub.staging.acme-corp.com\nCNAME: acme-testing-dev.github.io\nResponse: There is no GitHub Pages site here."
          }
        }
      ],
      aiAdvisor: {
        hint: "Click the Verify Claimability button to inspect the HTTP 404 response body.",
        payloadExplanation: "We send a standard request to observe if the response text matches the claimable signature.",
        failureExplanation: "Failing to check the response text will prevent you from verifying if the bucket/site is unclaimed."
      }
    },
    {
      name: "Exploitation & Flag",
      time: "10:30",
      workspace: "lab",
      xpReward: 300,
      instructions: "Deploy a repository named 'acme-testing-dev.github.io' on GitHub Pages, map the custom domain to 'sub.staging.acme-corp.com', and capture the flag.",
      targetUrl: "https://github.com/new?name=acme-testing-dev.github.io",
      correctFlag: "FLAG{subdomain_takeover_verified_github_pages}",
      aiAdvisor: {
        hint: "Deploy your repository, and enter the flag: FLAG{subdomain_takeover_verified_github_pages}",
        payloadExplanation: "The flag verifies successful custom domain mapping on GitHub Pages.",
        failureExplanation: "Providing an incorrect flag format will block submission."
      }
    },
    {
      name: "Report Writing",
      time: "11:00",
      workspace: "report",
      xpReward: 250,
      aiAdvisor: {
        hint: "Fill out the fields. Keywords: 'takeover', 'cname'.",
        payloadExplanation: "Explain the dangling CNAME pointer and threat impact.",
        failureExplanation: "Missing keywords will lower report accuracy score."
      }
    },
    {
      name: "Triage & Verdict",
      time: "5 Days Later",
      workspace: "review",
      aiAdvisor: {
        hint: "Triage step. Check results and click Finish.",
        payloadExplanation: "Review feedback from the security triage team.",
        failureExplanation: "No failures here."
      }
    },
    {
      name: "Lessons Learned",
      time: "Post-Incident",
      workspace: "quiz",
      quizData: [
        {
          question: "Why does a subdomain takeover happen?",
          options: [
            "Because DNS servers are compromised.",
            "Because a DNS record points to a third-party service that has been deleted or unclaimed.",
            "Because SSL certificates expired.",
            "Because of weak firewall rules."
          ],
          answer: 1
        },
        {
          question: "Which DNS record type is most commonly involved in subdomain takeovers?",
          options: [
            "A Record",
            "TXT Record",
            "CNAME Record",
            "MX Record"
          ],
          answer: 2
        }
      ],
      aiAdvisor: {
        hint: "Choose option B for question 1 and option C for question 2.",
        payloadExplanation: "Quiz testing DNS mapping logic.",
        failureExplanation: "Incorrect responses will penalize XP."
      }
    }
  ],

  realReport: {
    title: "Subdomain Takeover on sub.staging.acme-corp.com pointing to unclaimed GitHub Pages",
    severity: "High",
    type: "SubdomainTakeover",
    desc: "The subdomain sub.staging.acme-corp.com points via a CNAME record to acme-testing-dev.github.io. However, this GitHub Pages repository was unclaimed. By creating a GitHub Pages repository under the same name, an attacker can hijack the subdomain.",
    steps: "1. Perform host detection on sub.staging.acme-corp.com and notice GitHub Pages 404 response.\n2. Run DNS query: 'dig CNAME sub.staging.acme-corp.com' pointing to acme-testing-dev.github.io.\n3. Create a GitHub Pages repository named 'acme-testing-dev.github.io'.\n4. Add custom domain mapping.",
    impact: "An attacker can hijack this subdomain to launch phishing attacks, bypass cookie rules, and steal tokens.",
    feedback: "High quality subdomain takeover report! We removed the dangling CNAME pointer. Bounty awarded.",
    keywords: ["takeover", "cname"]
  }
};
