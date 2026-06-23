// ==========================================
// SCENARIO REGISTRY DATABASE
// ==========================================

(function() {
  const db = [
    {
      id: "scenario-001",
      title: "IDOR in API Endpoint - Full User Data Leak",
      level: "Beginner",
      category: "Authorization",
      company: "Shopify",
      reward: "$6,500",
      time: "30 Min",
      status: "Unlocked",
      solved: false
    },
    {
      id: "scenario-002",
      title: "Stored XSS in PDF Viewer - Slack Compromise",
      level: "Easy",
      category: "API Security",
      company: "Slack",
      reward: "$5,000",
      time: "1 Hour",
      status: "Unlocked",
      solved: false
    },
    {
      id: "scenario-003",
      title: "SSRF to AWS Metadata - EC2 IAM Keys Theft",
      level: "Medium",
      category: "Cloud",
      company: "Airbnb",
      reward: "$4,500",
      time: "2 Hours",
      status: "Unlocked",
      solved: false
    },
    {
      id: "scenario-004",
      title: "JWT Authentication Bypass - Weak Secret",
      level: "Hard",
      category: "Authentication",
      company: "Stripe",
      reward: "$10,000",
      time: "3+ Hours",
      status: "Unlocked",
      solved: false
    },
    {
      id: "scenario-005",
      title: "Time-Based Blind SQLi - Admin Password Extraction",
      level: "Expert",
      category: "API Security",
      company: "Tesla",
      reward: "$3,500",
      time: "3+ Hours",
      status: "Unlocked",
      solved: false
    },
    {
      id: "scenario-006",
      title: "Business Logic - The Alchemy of Negative Wealth",
      level: "Easy",
      category: "Business Logic",
      company: "CyberGear",
      reward: "$5,000",
      time: "1 Hour",
      status: "Unlocked",
      solved: false
    },
    {
      id: "scenario-007",
      title: "Information Disclosure - Exposed .git & .env",
      level: "Beginner",
      category: "Recon Driven",
      company: "GitHub",
      reward: "$750",
      time: "30 Min",
      status: "Unlocked",
      solved: false
    },
    {
      id: "scenario-008",
      title: "File Upload to RCE - ImageMagick GIF Shell",
      level: "Hard",
      category: "API Security",
      company: "Meta",
      reward: "$8,000",
      time: "3+ Hours",
      status: "Unlocked",
      solved: false
    },
    {
      id: "scenario-009",
      title: "Chain Bug - IDOR to Stored XSS Account Takeover",
      level: "Expert",
      category: "Chaining",
      company: "TikTok",
      reward: "$12,000",
      time: "3+ Hours",
      status: "Unlocked",
      solved: false
    },
    {
      id: "scenario-010",
      title: "Race Condition - Promo Coupon Double-Redeem",
      level: "Hard",
      category: "Business Logic",
      company: "Stripe",
      reward: "$5,000",
      time: "3+ Hours",
      status: "Unlocked",
      solved: false
    }
  ];

  window.scenariosDatabase = db;
})();
