// ==========================================
// SCENARIO REGISTRY DATABASE (100 SCENARIOS)
// ==========================================

(function() {
  const categories = [
    { name: "Recon Driven", count: 15 },
    { name: "Authentication", count: 15 },
    { name: "Authorization", count: 15 },
    { name: "API Security", count: 15 },
    { name: "Business Logic", count: 15 },
    { name: "Chaining", count: 10 },
    { name: "Mobile", count: 5 },
    { name: "Cloud", count: 5 },
    { name: "AI & LLM", count: 5 }
  ];

  const levels = ["Beginner", "Easy", "Medium", "Hard", "Expert", "Real Reports"];
  
  const companyNames = [
    "Shopify", "Stripe", "Tesla", "Airbnb", "Uber", "GitHub", "GitLab", "Nextcloud",
    "Snapchat", "Yahoo", "Slack", "Coinbase", "Steam", "PayPal", "Dropbox", "Meta",
    "TikTok", "Hidden Corp", "Fintech Local", "Gov Staging", "Autonomous Vehicle Inc"
  ];

  const bugTitles = {
    "Recon Driven": [
      "Subdomain Takeover on Staging Target",
      "Unsecured S3 Bucket containing HR backup logs",
      "Git Repository exposed via directory listing on public domain",
      "API Documentation page leaked on development subdomain",
      "Config file backup.zip exposed in public webroot",
      "WordPress debug log leak revealing DB passwords",
      "Django DEBUG mode enabled exposing settings file",
      "Jenkins CI instance accessible without authentication",
      "Prometheus metrics endpoint leaking container metadata",
      "Firebase DB database rules set to read/write all",
      "Docker Registry API exposed allowing image pull",
      "Expired DNS records leading to elastic beanstalk takeover",
      "Laravel env file configuration leak on target app",
      "Apache server-status endpoint revealing admin paths",
      "Swagger UI path found exposing private user management api"
    ],
    "Authentication": [
      "Host Header Injection leading to Reset Token Leakage",
      "OAuth account takeover via redirect_uri tampering",
      "JWT Signature bypass via None algorithm vulnerability",
      "Brute force protection bypass using X-Forwarded-For header",
      "Password reset token guessing due to weak PRNG",
      "2FA verification bypass via response manipulation",
      "Session fixation leading to admin account hijack",
      "SSO login bypass via XML Signature Wrapping (XSW)",
      "Remember-me cookie deserialization vulnerability",
      "Insecure authentication check in registration flow",
      "OAuth token leakage in referer header",
      "Password reset link valid indefinitely after email change",
      "CAPTCHA bypass via API parameter removal",
      "MFA bypass by removing cookie headers",
      "JWT Token verification bypass using key confusion"
    ],
    "Authorization": [
      "IDOR to Bank Account Takeover",
      "Bypass of workspace access control using crafted tenant header",
      "IDOR leading to private PDF invoice download",
      "Horizontal privilege escalation on user settings update",
      "Vertical privilege escalation via API role parameter modification",
      "IDOR in chat endpoint allowing reading other users' conversations",
      "Bypass of billing gate via parameter tampering",
      "Accessing restricted reports via backend URL rewriting",
      "API authorization bypass via uppercase method changing",
      "IDOR in account cancellation deleting random users",
      "Insecure Direct Object Reference on dashboard reports export",
      "Accessing enterprise admin logs via sub-tenant account",
      "IDOR in ticket support systems leaking attachments",
      "API key authorization bypass by injecting null bytes",
      "Missing function-level access control on user listing API"
    ],
    "API Security": [
      "Mass Assignment Privilege Escalation",
      "GraphQL query depth limit bypass leading to Denial of Service",
      "Bypassing API rate limits using client IP spoofing",
      "GraphQL Introspection query revealing internal mutations",
      "Excessive data exposure in API response payloads",
      "API endpoint returns complete password hashes in user profiles",
      "Bypassing CORS policy on critical authenticated endpoints",
      "Server-side parameter pollution on search query api",
      "Insecure XML parsing (XXE) in SOAP API payload",
      "REST API injection leading to MongoDB query manipulation",
      "GraphQL IDOR in query parameters exposing profiles",
      "Bypassing JWT access control via custom JWKS header url",
      "Improper API versioning exposing deprecated vulnerable endpoint",
      "XML external entity injection via API file import",
      "API endpoint leaking internal backend server paths"
    ],
    "Business Logic": [
      "Price Manipulation in Checkout Cart via negative values",
      "Double spending coupon code using application logic flaws",
      "Referral bonus abuse via self-referral race condition",
      "Bypassing subscription gate by modifying API response code",
      "Negative quantity item purchase leading to credit addition",
      "Free premium upgrade via parameter override in billing profile",
      "Unintended currency conversion arbitrage in checkout",
      "Abusing trust level privileges to auto-approve reviews",
      "Bypassing transaction limits in wallet system",
      "Overwriting order details after payment verification",
      "Gift card enumeration leading to monetary theft",
      "Abusing flight cancellation refund logic to gain cash back",
      "Bypassing auction bid timer using client-side timezone override",
      "Inventory locked indefinitely via incomplete cart requests",
      "Bypassing verification step by directly triggering success hook"
    ],
    "Chaining": [
      "Self-XSS escalated to CSRF leading to Account Takeover",
      "Open Redirect chained with OAuth flow for Token Leakage",
      "Path Traversal chained with LFI to execute Remote Code",
      "CSRF chained with account settings to achieve full RCE",
      "Stored XSS in user bio chained with admin session hijack",
      "SSRF chained with Redis access to compromise backend databases",
      "CORS misconfiguration chained with CSRF for dashboard data extraction",
      "SQL injection chained with file upload to write web shell",
      "Information disclosure chained with weak crypto to forge admin cookies",
      "Host header injection chained with web cache poisoning for site-wide defacement"
    ],
    "Mobile": [
      "Insecure local storage of credentials in iOS plist",
      "API key leakage in compiled Android APK source code",
      "Deep link hijacking leading to session takeover",
      "Bypassing SSL pinning on Android using Frida scripts",
      "Insecure Android intent exporting exposing internal database"
    ],
    "Cloud": [
      "IMDSv2 SSRF CRLF bypass",
      "Exposed AWS Access Keys in public JavaScript files",
      "Azure Blob storage misconfiguration leaking db backups",
      "Kubernetes dashboard exposed without authentication",
      "Google Cloud Storage bucket takeover due to dangling domain"
    ],
    "AI & LLM": [
      "Indirect Prompt Injection bypassing system safety filters",
      "Data exfiltration from LLM history via Markdown image rendering",
      "AI chatbot manipulated into executing backend API calls (IDOR)",
      "Model poisoning via insecure user feedback loop",
      "Bypassing LLM prompt filters to retrieve system instructions"
    ]
  };

  const db = [];
  let scenarioCounter = 1;

  const overrides = {
    "scenario-001": {
      title: "IDOR in API Endpoint - Full User Data Leak",
      level: "Beginner",
      category: "Authorization",
      company: "Shopify",
      reward: "$6,500",
      time: "30 Min",
      status: "Unlocked"
    },
    "scenario-002": {
      title: "Stored XSS in PDF Viewer - Slack Compromise",
      level: "Easy",
      category: "API Security",
      company: "Slack",
      reward: "$5,000",
      time: "1 Hour",
      status: "Unlocked"
    },
    "scenario-003": {
      title: "SSRF to AWS Metadata - EC2 IAM Keys Theft",
      level: "Medium",
      category: "Cloud",
      company: "Airbnb",
      reward: "$4,500",
      time: "2 Hours",
      status: "Unlocked"
    },
    "scenario-004": {
      title: "JWT Authentication Bypass - Weak Secret",
      level: "Hard",
      category: "Authentication",
      company: "Stripe",
      reward: "$10,000",
      time: "3+ Hours",
      status: "Unlocked"
    },
    "scenario-005": {
      title: "Time-Based Blind SQLi - Admin Password Extraction",
      level: "Expert",
      category: "API Security",
      company: "Tesla",
      reward: "$3,500",
      time: "3+ Hours",
      status: "Unlocked"
    },
    "scenario-006": {
      title: "Business Logic - Price Manipulation in Checkout",
      level: "Easy",
      category: "Business Logic",
      company: "Uber",
      reward: "$2,000",
      time: "1 Hour",
      status: "Unlocked"
    },
    "scenario-007": {
      title: "Information Disclosure - Exposed .git & .env",
      level: "Beginner",
      category: "Recon Driven",
      company: "GitHub",
      reward: "$750",
      time: "30 Min",
      status: "Unlocked"
    },
    "scenario-008": {
      title: "File Upload to RCE - ImageMagick GIF Shell",
      level: "Hard",
      category: "API Security",
      company: "Meta",
      reward: "$8,000",
      time: "3+ Hours",
      status: "Unlocked"
    },
    "scenario-009": {
      title: "Chain Bug - IDOR to Stored XSS Account Takeover",
      level: "Expert",
      category: "Chaining",
      company: "TikTok",
      reward: "$12,000",
      time: "3+ Hours",
      status: "Unlocked"
    },
    "scenario-010": {
      title: "Race Condition - Promo Coupon Double-Redeem",
      level: "Hard",
      category: "Business Logic",
      company: "Stripe",
      reward: "$5,000",
      time: "3+ Hours",
      status: "Unlocked"
    }
  };

  // Generate 100 scenarios systematically
  categories.forEach(cat => {
    const list = bugTitles[cat.name];
    for (let i = 0; i < cat.count; i++) {
      const idNum = String(scenarioCounter).padStart(3, '0');
      const title = list[i] || `${cat.name} Scenario #${i + 1}`;
      
      // Determine level based on scenario index
      let level;
      if (scenarioCounter <= 5) {
        level = scenarioCounter === 1 ? "Beginner" : 
                scenarioCounter === 2 ? "Easy" :
                scenarioCounter === 3 ? "Medium" :
                scenarioCounter === 4 ? "Hard" : "Expert";
      } else if (scenarioCounter % 15 === 0) {
        level = "Real Reports";
      } else {
        level = levels[i % levels.length];
      }

      // First 5 scenarios are unlocked, rest are locked or premium
      let status = "Locked";
      if (scenarioCounter <= 5) {
        status = "Unlocked";
      } else if (scenarioCounter % 4 === 0) {
        status = "Premium";
      }

      // Generate realistic reward
      let reward = 250;
      if (level === "Beginner") reward = 250 + (i * 50);
      else if (level === "Easy") reward = 800 + (i * 100);
      else if (level === "Medium") reward = 2000 + (i * 200);
      else if (level === "Hard") reward = 4500 + (i * 500);
      else if (level === "Expert") reward = 8000 + (i * 1000);
      else if (level === "Real Reports") reward = 5000 + (i * 700);

      const id = `scenario-${idNum}`;
      const record = {
        id: id,
        title: title,
        level: level,
        category: cat.name,
        company: companyNames[scenarioCounter % companyNames.length],
        reward: `$${reward.toLocaleString()}`,
        time: level === "Beginner" ? "30 Min" : level === "Easy" ? "1 Hour" : level === "Medium" ? "2 Hours" : "3+ Hours",
        status: status,
        solved: false
      };

      // Apply overrides for custom scenarios
      if (overrides[id]) {
        Object.assign(record, overrides[id]);
      }

      db.push(record);

      scenarioCounter++;
    }
  });

  window.scenariosDatabase = db;
})();
