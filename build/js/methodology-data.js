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
