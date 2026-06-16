// Methodology Structured Data
// This file contains the professional phase templates and labs

const MethodologyData = {
  phases: [
    {
      id: "p0_new",
      sidebarId: "phase-p0",
      title: "Core Reconnaissance",
      color: "#00e5ff",
      objective: "Gather maximum possible subdomains, IPs, and assets belonging to the target.",
      whenToUse: "Always. This is the first step when starting a new target.",
      inputs: ["Root Domain (e.g., target.com)", "CIDR Ranges", "ASN Numbers"],
      tools: ["subfinder", "amass", "httpx", "massdns"],
      commands: [
        "subfinder -d target.com -all -silent | httpx -silent -title -tech-detect -status-code",
        "amass enum -passive -d target.com"
      ],
      verification: "Ensure resolved IPs belong to the target's ASN. Verify live hosts with httpx.",
      commonFindings: ["Exposed Admin Panels", "Dev/Staging Environments", "Subdomain Takeover", "Unlinked APIs"],
      falsePositives: ["Third-party SaaS platforms hosted on subdomains", "Parked domains"],
      stopConditions: "When you have a verified list of live HTTP(s) servers and IPs. No new assets found after passive/active enum.",
      evidenceToSave: "List of alive subdomains, screenshots of interesting panels.",
      reportNotes: "Reconnaissance itself is not a vulnerability, but findings like Subdomain Takeover should be reported immediately.",
      nextPhase: "Content Discovery & Port Scanning"
    },
    {
      id: "p1_new",
      sidebarId: "phase-p1",
      title: "Content Discovery (Fuzzing)",
      color: "#ff0055",
      objective: "Discover hidden directories, files, and endpoints on the live web servers.",
      whenToUse: "After identifying live web servers from the Recon phase.",
      inputs: ["Live URLs (e.g., https://sub.target.com)"],
      tools: ["ffuf", "feroxbuster", "dirsearch"],
      commands: [
        "ffuf -w wordlist.txt -u https://target.com/FUZZ -mc 200,301,403",
        "feroxbuster -u https://target.com -w wordlist.txt -d 2"
      ],
      verification: "Manually visit the discovered endpoints to verify they are not false positives (e.g., custom 404 pages returning 200).",
      commonFindings: ["Exposed .git/.env files", "Admin endpoints", "Backup files (.bak, .zip)", "Unauthenticated APIs"],
      falsePositives: ["Wildcard DNS/Routing returning 200 for everything (Custom 404)"],
      stopConditions: "When you've fuzzed main endpoints with standard wordlists and identified key application routes.",
      evidenceToSave: "Full URL of the sensitive file/endpoint, HTTP response showing leakage.",
      reportNotes: "I discovered a sensitive file/directory at [URL] which exposes [Data]. This can be accessed without authentication.",
      nextPhase: "Parameter Fuzzing / Vulnerability Specific Testing (XSS, SQLi, etc.)"
    }
  ],

  decisionMatrix: [
    {
      condition: "Found JavaScript files (.js)",
      action: "Extract endpoints, secrets, and API keys. Look for hidden parameters.",
      nextPhase: "JS Recon & Analysis"
    },
    {
      condition: "Found API endpoints (/api/v1/)",
      action: "Test for BOLA/IDOR, Mass Assignment, and Information Disclosure.",
      nextPhase: "API Testing"
    },
    {
      condition: "Found User Input / Parameters (?id=1)",
      action: "Fuzz for XSS, SQLi, SSRF, and LFI.",
      nextPhase: "Parameter Fuzzing"
    },
    {
      condition: "Found Cloud Storage (s3.amazonaws.com)",
      action: "Check for public read/write access and bucket enumeration.",
      nextPhase: "Cloud Security"
    },
    {
      condition: "Found Login / Registration Forms",
      action: "Test OAuth bypass, JWT flaws, No Rate Limiting, and SQLi in auth.",
      nextPhase: "Authentication & Authorization"
    }
  ],

  labs: [
    {
      id: "lab_recon_xss",
      title: "From Recon to XSS",
      story: "You found a large scope program but the main site is secure. You need to find a forgotten dev server.",
      startingPoint: "example.com (wildcard scope)",
      expectedPath: "subfinder -> httpx -> feroxbuster -> find /api/debug -> fuzz parameter -> reflected XSS",
      hints: [
        "Use Amass/Subfinder to find dev.example.com",
        "Fuzz the dev subdomain for hidden endpoints",
        "Look for reflected parameters in error messages"
      ]
    }
  ]
};


MethodologyData.reconHtml = MethodologyData.reconHtml.replace(/display:none;/g, '');
MethodologyData.caseStudyHtml = MethodologyData.caseStudyHtml.replace(/display:none;/g, '');
MethodologyData.reconHtml = "<div class=\"cyber-card\" id=\"rd-tools-grid\" style=\"display:none; --tool-color: #00e5ff;\">\n<div class=\"card-header\"><h3>\ud83d\udd27 Tools Comparison</h3></div>\n<div class=\"tools-compare-grid\">\n<div class=\"tool-compare-card\">\n<div class=\"tool-compare-name\">subfinder</div>\n<div class=\"tool-compare-desc\">Passive subdomain discovery using multiple sources</div>\n<div class=\"tool-bar-wrap\">\n<span class=\"tool-bar-label\">Speed</span>\n<div class=\"tool-bar-track\"><div class=\"tool-bar-fill speed\" style=\"width:90%\"></div></div>\n<span class=\"tool-bar-pct\">90%</span>\n</div>\n<div class=\"tool-bar-wrap\">\n<span class=\"tool-bar-label\">Depth</span>\n<div class=\"tool-bar-track\"><div class=\"tool-bar-fill depth\" style=\"width:70%\"></div></div>\n<span class=\"tool-bar-pct\">70%</span>\n</div>\n</div>\n<div class=\"tool-compare-card\">\n<div class=\"tool-compare-name\">amass</div>\n<div class=\"tool-compare-desc\">Advanced asset discovery with DNS brute-force</div>\n<div class=\"tool-bar-wrap\">\n<span class=\"tool-bar-label\">Speed</span>\n<div class=\"tool-bar-track\"><div class=\"tool-bar-fill speed\" style=\"width:40%\"></div></div>\n<span class=\"tool-bar-pct\">40%</span>\n</div>\n<div class=\"tool-bar-wrap\">\n<span class=\"tool-bar-label\">Depth</span>\n<div class=\"tool-bar-track\"><div class=\"tool-bar-fill depth\" style=\"width:95%\"></div></div>\n<span class=\"tool-bar-pct\">95%</span>\n</div>\n</div>\n<div class=\"tool-compare-card\">\n<div class=\"tool-compare-name\">httpx</div>\n<div class=\"tool-compare-desc\">HTTP probing for alive hosts with tech detection</div>\n<div class=\"tool-bar-wrap\">\n<span class=\"tool-bar-label\">Speed</span>\n<div class=\"tool-bar-track\"><div class=\"tool-bar-fill speed\" style=\"width:85%\"></div></div>\n<span class=\"tool-bar-pct\">85%</span>\n</div>\n<div class=\"tool-bar-wrap\">\n<span class=\"tool-bar-label\">Depth</span>\n<div class=\"tool-bar-track\"><div class=\"tool-bar-fill depth\" style=\"width:60%\"></div></div>\n<span class=\"tool-bar-pct\">60%</span>\n</div>\n</div>\n<div class=\"tool-compare-card\">\n<div class=\"tool-compare-name\">nuclei</div>\n<div class=\"tool-compare-desc\">Template-based vulnerability scanner at scale</div>\n<div class=\"tool-bar-wrap\">\n<span class=\"tool-bar-label\">Speed</span>\n<div class=\"tool-bar-track\"><div class=\"tool-bar-fill speed\" style=\"width:70%\"></div></div>\n<span class=\"tool-bar-pct\">70%</span>\n</div>\n<div class=\"tool-bar-wrap\">\n<span class=\"tool-bar-label\">Depth</span>\n<div class=\"tool-bar-track\"><div class=\"tool-bar-fill depth\" style=\"width:90%\"></div></div>\n<span class=\"tool-bar-pct\">90%</span>\n</div>\n</div>\n<div class=\"tool-compare-card\">\n<div class=\"tool-compare-name\">ffuf</div>\n<div class=\"tool-compare-desc\">Fastest web fuzzer for directories and parameters</div>\n<div class=\"tool-bar-wrap\">\n<span class=\"tool-bar-label\">Speed</span>\n<div class=\"tool-bar-track\"><div class=\"tool-bar-fill speed\" style=\"width:95%\"></div></div>\n<span class=\"tool-bar-pct\">95%</span>\n</div>\n<div class=\"tool-bar-wrap\">\n<span class=\"tool-bar-label\">Depth</span>\n<div class=\"tool-bar-track\"><div class=\"tool-bar-fill depth\" style=\"width:80%\"></div></div>\n<span class=\"tool-bar-pct\">80%</span>\n</div>\n</div>\n<div class=\"tool-compare-card\">\n<div class=\"tool-compare-name\">Burp Suite</div>\n<div class=\"tool-compare-desc\">All-in-one proxy for manual and automated testing</div>\n<div class=\"tool-bar-wrap\">\n<span class=\"tool-bar-label\">Speed</span>\n<div class=\"tool-bar-track\"><div class=\"tool-bar-fill speed\" style=\"width:50%\"></div></div>\n<span class=\"tool-bar-pct\">50%</span>\n</div>\n<div class=\"tool-bar-wrap\">\n<span class=\"tool-bar-label\">Depth</span>\n<div class=\"tool-bar-track\"><div class=\"tool-bar-fill depth\" style=\"width:100%\"></div></div>\n<span class=\"tool-bar-pct\">100%</span>\n</div>\n</div>\n</div>\n</div><div class=\"cyber-card\" id=\"rd-checklist\" style=\"display:none; --tool-color: #00ff66;\">\n<div class=\"card-header\"><h3>\u2705 Recon Checklist</h3></div>\n<div class=\"rd-checklist-wrap\">\n<div class=\"rd-checklist-progress\">\n<span id=\"rdCheckCount\">0 / 9</span>\n<div class=\"rd-checklist-bar\"><div class=\"rd-checklist-fill\" id=\"rdCheckFill\"></div></div>\n</div>\n<div id=\"rdCheckItems\">\n<div class=\"rd-check-item\" data-idx=\"0\" onclick=\"toggleRdCheck(this)\"><div class=\"rd-check-box\"></div><span>Define scope boundaries &amp; read program policy</span></div>\n<div class=\"rd-check-item\" data-idx=\"1\" onclick=\"toggleRdCheck(this)\"><div class=\"rd-check-box\"></div><span>Run subdomain enumeration (subfinder + amass)</span></div>\n<div class=\"rd-check-item\" data-idx=\"2\" onclick=\"toggleRdCheck(this)\"><div class=\"rd-check-box\"></div><span>Check DNS records (CNAME, MX, TXT)</span></div>\n<div class=\"rd-check-item\" data-idx=\"3\" onclick=\"toggleRdCheck(this)\"><div class=\"rd-check-box\"></div><span>Port scan top targets (naabu / nmap)</span></div>\n<div class=\"rd-check-item\" data-idx=\"4\" onclick=\"toggleRdCheck(this)\"><div class=\"rd-check-box\"></div><span>Directory bruteforce (ffuf / gobuster)</span></div>\n<div class=\"rd-check-item\" data-idx=\"5\" onclick=\"toggleRdCheck(this)\"><div class=\"rd-check-box\"></div><span>JavaScript analysis (LinkFinder / JSluice)</span></div>\n<div class=\"rd-check-item\" data-idx=\"6\" onclick=\"toggleRdCheck(this)\"><div class=\"rd-check-box\"></div><span>API endpoint discovery (kiterunner)</span></div>\n<div class=\"rd-check-item\" data-idx=\"7\" onclick=\"toggleRdCheck(this)\"><div class=\"rd-check-box\"></div><span>Vulnerability scanning (nuclei templates)</span></div>\n<div class=\"rd-check-item\" data-idx=\"8\" onclick=\"toggleRdCheck(this)\"><div class=\"rd-check-box\"></div><span>Manual testing in Burp Suite</span></div>\n</div>\n<div class=\"rd-celebration\" id=\"rdCelebration\">\ud83c\udf89\ud83c\udfc6 All Done! You're ready to hunt! \ud83c\udfaf\ud83d\udd25</div>\n</div>\n</div><div class=\"cyber-card\" id=\"rd-mistakes\" style=\"display:none; --tool-color: #ff9a56;\">\n<div class=\"card-header\"><h3>\u26a1 Mistakes vs Best Practices</h3></div>\n<div class=\"rd-compare-grid\">\n<div class=\"rd-compare-col bad\">\n<div class=\"rd-compare-title\">\u274c Common Mistakes</div>\n<ul class=\"rd-compare-list\">\n<li>Running Nuclei first without recon</li>\n<li>Ignoring JavaScript files completely</li>\n<li>Only testing the main domain</li>\n<li>Skipping manual testing for automation</li>\n<li>Not reading the program scope carefully</li>\n</ul>\n</div>\n<div class=\"rd-compare-col good\">\n<div class=\"rd-compare-title\">\u2705 Best Practices</div>\n<ul class=\"rd-compare-list\">\n<li>Always start with subdomain enumeration</li>\n<li>Analyze every JS file for secrets &amp; endpoints</li>\n<li>Test ALL subdomains, not just main</li>\n<li>Manual testing &gt; Automated scanning</li>\n<li>Read the scope document at least 3 times</li>\n</ul>\n</div>\n</div>\n</div><div class=\"cyber-card\" id=\"rd-edge-cases\" style=\"display:none; --tool-color: #fbbf24;\">\n<div class=\"card-header\"><h3>\ud83e\udde9 Edge Cases &amp; FAQ</h3></div>\n<div>\n<div class=\"rd-edge-item\" onclick=\"toggleEdge(this)\">\n<div class=\"rd-edge-q\"><span>\ud83e\udd14 What if the scope is too large?</span><span class=\"rd-edge-arrow\">\u25bc</span></div>\n<div class=\"rd-edge-a\">Focus on recently acquired assets and new features. Check acquisition history on Crunchbase. New subdomains and recently deployed services are most likely to have bugs.</div>\n</div>\n<div class=\"rd-edge-item\" onclick=\"toggleEdge(this)\">\n<div class=\"rd-edge-q\"><span>\ud83d\udee1\ufe0f What if all subdomains are behind WAF?</span><span class=\"rd-edge-arrow\">\u25bc</span></div>\n<div class=\"rd-edge-a\">Try origin IP discovery using Shodan, Censys, or SecurityTrails. Check historical DNS records on DNS Dumpster. Some WAFs can be bypassed with HTTP/2 downgrades or chunked encoding.</div>\n</div>\n<div class=\"rd-edge-item\" onclick=\"toggleEdge(this)\">\n<div class=\"rd-edge-q\"><span>\ud83d\udd0d What if no vulnerabilities are found?</span><span class=\"rd-edge-arrow\">\u25bc</span></div>\n<div class=\"rd-edge-a\">Switch to API testing \u2014 many programs have undocumented APIs. Check mobile app endpoints using MobSF. Try business logic bugs (race conditions, coupon abuse, privilege escalation).</div>\n</div>\n<div class=\"rd-edge-item\" onclick=\"toggleEdge(this)\">\n<div class=\"rd-edge-q\"><span>\u23f0 When should I abandon a target?</span><span class=\"rd-edge-arrow\">\u25bc</span></div>\n<div class=\"rd-edge-a\">After 8+ hours with zero interesting findings, move on. Keep notes for later. Sometimes coming back after a few weeks with fresh eyes reveals what you missed.</div>\n</div>\n<div class=\"rd-edge-item\" onclick=\"toggleEdge(this)\">\n<div class=\"rd-edge-q\"><span>\ud83d\udeab How to handle rate limiting?</span><span class=\"rd-edge-arrow\">\u25bc</span></div>\n<div class=\"rd-edge-a\">Add delays between requests (--rate-limit flags). Rotate source IPs if possible. Switch to manual testing in Burp. Some targets accept higher rates during off-peak hours.</div>\n</div>\n</div>\n</div>";
MethodologyData.caseStudyHtml = "<div class=\"cyber-card\" id=\"rd-case-study\" style=\"display:none; --tool-color: #9b59ff;\">\n<div class=\"card-header\"><h3>\ud83d\udcd6 Real Case Study \u2014 Starbucks IDOR</h3><span class=\"cs-bounty-badge\">\ud83d\udcb0 $2,000</span></div>\n<div class=\"cs-timeline\">\n<div class=\"cs-step\" data-step=\"1\">\n<div class=\"cs-step-title\">\ud83c\udfaf Target Selection</div>\n<div class=\"cs-step-desc\">Chose starbucks.com from HackerOne \u2014 large scope, many subdomains</div>\n</div>\n<div class=\"cs-step\" data-step=\"2\">\n<div class=\"cs-step-title\">\ud83c\udf10 Subdomain Enumeration</div>\n<div class=\"cs-step-desc\">subfinder + amass found 2,847 subdomains</div>\n<div class=\"cs-step-cmd\">subfinder -d starbucks.com -all | httpx -sc -td</div>\n</div>\n<div class=\"cs-step\" data-step=\"3\">\n<div class=\"cs-step-title\">\ud83d\udce1 Port Scanning</div>\n<div class=\"cs-step-desc\">naabu revealed ports 80, 443, 8443 on key hosts</div>\n<div class=\"cs-step-cmd\">naabu -l live.txt -top-ports 1000 -o ports.txt</div>\n</div>\n<div class=\"cs-step\" data-step=\"4\">\n<div class=\"cs-step-title\">\ud83d\udcc2 Directory Discovery</div>\n<div class=\"cs-step-desc\">ffuf found /admin-panel/ on internal subdomain</div>\n<div class=\"cs-step-cmd\">ffuf -u https://internal.starbucks.com/FUZZ -w raft-medium.txt</div>\n</div>\n<div class=\"cs-step\" data-step=\"5\">\n<div class=\"cs-step-title\">\ud83d\udc89 Exploitation</div>\n<div class=\"cs-step-desc\">IDOR vulnerability on admin panel \u2014 changing user_id parameter exposed other users' data</div>\n</div>\n<div class=\"cs-step\" data-step=\"6\">\n<div class=\"cs-step-title\">\ud83d\udccb Report &amp; Bounty</div>\n<div class=\"cs-step-desc\">Reported via HackerOne with full PoC. Triaged in 24 hours.</div>\n<div class=\"cs-bounty-badge\">\ud83c\udfc6 $2,000 Bounty Awarded!</div>\n</div>\n</div>\n</div>";
