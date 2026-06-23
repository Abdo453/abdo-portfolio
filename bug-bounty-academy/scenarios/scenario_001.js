// ==========================================================
// SCENARIO 001: SUBDOMAIN TAKEOVER ON STAGING TARGET
// ==========================================================

window.scenario_001 = {
  steps: [
    {
      name: "Mission Brief",
      workspace: "markdown",
      xpReward: 100,
      description: `
### Target Scope: Acme Corp (Staging Assets)
Welcome Hunter. You have been assigned to test Acme Corp's staging infrastructure. Acme Corp is a fast-growing SaaS provider, and they've recently migrated several testing domains.

#### Rules of Engagement:
- Only test domains under the \`*.staging.acme-corp.com\` wildcard.
- Automated vulnerability scanners are restricted on active production servers, but you are free to do passive recon.
- Look for orphaned DNS records or misconfigured staging sites.

Click **Next Step** to launch your recon workspace.
      `
    },
    {
      name: "Passive Recon",
      workspace: "recon",
      xpReward: 150,
      description: `
### Recon Workspace
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
            title: "Dangling GitHub Pages CNAME Header",
            content: "HTTP/1.1 404 Not Found\nServer: GitHub.com\nContent-Type: text/html; charset=utf-8\nX-GitHub-Request-Id: D79A:5F29:1F9E82B"
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
      thoughts: `
> [!TIP]
> Look closely at HTTP server headers. A 404 status code combined with a specific cloud service header (like \`GitHub.com\` or \`Amazon S3\`) is a strong indicator of a dangling DNS pointer.
      `,
      mistakes: [
        "Running aggressive directories brute-force on the main domain instead of testing active subdomains first.",
        "Ignoring 404 Not Found responses which contain cloud hosting headers."
      ]
    },
    {
      name: "DNS Verification",
      workspace: "markdown",
      xpReward: 150,
      description: `
### DNS Record Auditing
To confirm a subdomain takeover, we must check if the target domain has a CNAME record pointing to an external service (like GitHub Pages) that is no longer registered or associated with the target domain.

Let's audit the DNS records for \`sub.staging.acme-corp.com\`.
      `,
      choices: [
        {
          text: "A) Query MX records to see where emails are routed",
          correct: false,
          xp: -10,
          timePenalty: 5,
          outcome: "MX records only handle email routing. This does not help verify a subdomain takeover."
        },
        {
          text: "B) Run: 'dig CNAME sub.staging.acme-corp.com'",
          correct: true,
          xp: 50,
          outcome: "DNS Query Response:\nsub.staging.acme-corp.com. IN CNAME acme-testing-dev.github.io.\n\nThis confirms the subdomain points to a GitHub Pages address!"
        },
        {
          text: "C) Perform reverse DNS lookup on IP addresses",
          correct: false,
          xp: -5,
          timePenalty: 2,
          outcome: "Reverse DNS will only show GitHub's shared CDNs IPs. It will not tell us if the specific GitHub page repository is unregistered."
        }
      ]
    },
    {
      name: "Evidence Verification",
      workspace: "burp",
      xpReward: 200,
      description: `
### Intercepting Request
Verify the raw request and response details in Burp Suite Proxy. Ensure that the GitHub Pages repository named \`acme-testing-dev.github.io\` is indeed unregistered or throwing a claimable 404 status.
      `,
      burpRequest: "GET / HTTP/1.1\nHost: sub.staging.acme-corp.com\nUser-Agent: Mozilla/5.0\nAccept: */*",
      burpResponse: "HTTP/1.1 404 Not Found\nConnection: close\nContent-Length: 9385\nServer: GitHub.com\n\n<html>\n<head><title>404 Not Found</title></head>\n<body>There is no GitHub Pages site here.</body>\n</html>",
      burpActions: [
        {
          name: "Verify Repository Claimability",
          correct: true,
          modifiedRequest: "GET / HTTP/1.1\nHost: sub.staging.acme-corp.com\nUser-Agent: Mozilla/5.0",
          modifiedResponse: "HTTP/1.1 404 Not Found\nServer: GitHub.com\n\nThere is no GitHub Pages site here.",
          evidence: {
            title: "Unclaimed GitHub Pages Deployment",
            content: "Host: sub.staging.acme-corp.com\nCNAME: acme-testing-dev.github.io\nResponse: There is no GitHub Pages site here."
          }
        }
      ]
    },
    {
      name: "Exploitation & Capture",
      workspace: "lab",
      xpReward: 300,
      instructions: "To finalize the proof of concept, navigate to your custom GitHub Pages dashboard, register a new repository named 'acme-testing-dev.github.io', set its custom domain to 'sub.staging.acme-corp.com', and deploy a flag.txt file. Enter the resulting deployed flag below to claim the bounty.",
      targetUrl: "https://github.com/new?name=acme-testing-dev.github.io",
      correctFlag: "FLAG{subdomain_takeover_verified_github_pages}"
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
        },
        {
          question: "What is the best way for a company to prevent subdomain takeovers?",
          options: [
            "Use cloudflare firewalls.",
            "Delete DNS pointers immediately when dismantling third-party hosting services.",
            "Enable HTTPS on all websites.",
            "Implement multi-factor authentication on domain registrars."
          ],
          answer: 1
        }
      ]
    }
  ],
  realReport: {
    title: "Subdomain Takeover on sub.staging.acme-corp.com pointing to unclaimed GitHub Pages",
    severity: "High",
    type: "SubdomainTakeover",
    desc: "The subdomain sub.staging.acme-corp.com points via a CNAME record to acme-testing-dev.github.io. However, this GitHub Pages repository was unclaimed and deleted. By creating a GitHub Pages repository under the same username/organization name, an attacker can fully hijack the subdomain to serve malicious JavaScript and steal session cookies.",
    steps: "1. Perform host detection on sub.staging.acme-corp.com and notice GitHub Pages 404 response.\n2. Run DNS query: 'dig CNAME sub.staging.acme-corp.com' pointing to acme-testing-dev.github.io.\n3. Create a GitHub Pages repository named 'acme-testing-dev.github.io'.\n4. Add custom domain mapping to serve arbitrary HTML content on the target subdomain.",
    impact: "An attacker can hijack this staging subdomain to launch phishing attacks, bypass cookie protection rules (due to shared domain inheritance), and steal authorization tokens.",
    feedback: "Excellent submission! The DNS records were indeed orphaned. We verified the takeover immediately and removed the dangling CNAME pointer. Bounty awarded.",
    keywords: ["takeover", "cname"]
  }
};
