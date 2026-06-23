// ==========================================================
// SCENARIO 003: IDOR IN BANKING API
// ==========================================================

window.scenario_003 = {
  steps: [
    {
      name: "Mission Brief",
      workspace: "markdown",
      xpReward: 100,
      description: `
### Target: api.acme-bank.com
Acme Bank has recently launched a new mobile API backend. You are tasked with analyzing the API endpoints for potential Authorization or Access Control bypasses.

#### Objective:
- Audit API route structures.
- Analyze request headers and parameter identifiers.
- Attempt to read other users' financial records by altering account identifiers.

Click **Next Step** to launch passive directory scanning.
      `
    },
    {
      name: "API Discovery",
      workspace: "recon",
      xpReward: 150,
      description: `
### Endpoint Map Discovery
Let's discover hidden API routes. We will use directory search and path enumeration on the API host.
      `,
      terminalCommands: [
        {
          name: "katana -u https://api.acme-bank.com/ -silent",
          correct: true,
          evidence: {
            title: "Private API Routes",
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
      thoughts: `
> [!NOTE]
> Katana is a fast web crawling tool. It parses javascript links, documentation references, and robots.txt files to discover hidden api routes.
      `
    },
    {
      name: "Authorization Testing",
      workspace: "markdown",
      xpReward: 150,
      description: `
### Testing Access Controls
When you log in, the application sends:
\`GET /v1/accounts/me\`

Which returns your private bank details. But we also saw an endpoint:
\`GET /v1/accounts/ACC-10029\`

This indicates that accounts are indexed by unique IDs. If the backend fails to check if the current user owns the account ID requested, we have an IDOR vulnerability.
      `,
      choices: [
        {
          text: "A) Change Authorization token to see if it allows access",
          correct: false,
          xp: -10,
          timePenalty: 5,
          outcome: "Changing the auth token to invalid values blocks you with a 401 Unauthorized response. The signature checks out correctly."
        },
        {
          text: "B) Tamper with the account ID parameter in the URL",
          correct: true,
          xp: 50,
          outcome: "You decide to intercept the request in Burp and replace your account ID with Bob's ID (ACC-10030) to test access controls."
        },
        {
          text: "C) Try SQL Injection in the Account ID parameter",
          correct: false,
          xp: -15,
          timePenalty: 10,
          outcome: "The parameter expects a UUID format. Injecting quotes or SQL comments causes a 400 Bad Request error. WAF blocking rules detected."
        }
      ]
    },
    {
      name: "Burp Parameter Tampering",
      workspace: "burp",
      xpReward: 200,
      description: `
### Tampering Account IDs
Send a request to fetch details for \`ACC-10030\` instead of your own. Inspect if the server blocks the request or leaks another user's balance.
      `,
      burpRequest: "GET /v1/accounts/ACC-10029 HTTP/1.1\nHost: api.acme-bank.com\nAuthorization: Bearer alice_token_9918\nAccept: application/json",
      burpResponse: "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  \"account_id\": \"ACC-10029\",\n  \"owner\": \"Alice\",\n  \"balance\": \"$150.00\"\n}",
      burpActions: [
        {
          name: "Request Bob's Account (ACC-10030)",
          correct: true,
          modifiedRequest: "GET /v1/accounts/ACC-10030 HTTP/1.1\nHost: api.acme-bank.com\nAuthorization: Bearer alice_token_9918\nAccept: application/json",
          modifiedResponse: "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  \"account_id\": \"ACC-10030\",\n  \"owner\": \"Bob\",\n  \"balance\": \"$450,000.00\",\n  \"routing_flag\": \"FLAG{idor_account_data_leakage_confirmed}\"\n}",
          evidence: {
            title: "Leaked Account Data",
            content: "ID: ACC-10030\nOwner: Bob\nBalance: $450,000.00\nFlag: FLAG{idor_account_data_leakage_confirmed}"
          }
        }
      ]
    },
    {
      name: "Exploitation & Capture",
      workspace: "lab",
      xpReward: 300,
      instructions: "Query the staging API using Bob's account identifier (ACC-10030) using the Authorization header you gathered. Enter the flag retrieved from Bob's private JSON payload response below.",
      targetUrl: "https://api.acme-bank.com/v1/accounts/ACC-10030",
      correctFlag: "FLAG{idor_account_data_leakage_confirmed}"
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
          question: "What does IDOR stand for?",
          options: [
            "Insecure Database Object Recovery",
            "Insecure Direct Object Reference",
            "Internal Direct Option Resolver",
            "Indexed Database Object Registry"
          ],
          answer: 1
        },
        {
          question: "How do you mitigate IDOR vulnerabilities?",
          options: [
            "Encrypt parameters in the URL.",
            "Implement robust, object-level access controls checking if the logged-in user owns the resource.",
            "Use HTTPS on all endpoints.",
            "Change the IDs to random strings only."
          ],
          answer: 1
        }
      ]
    }
  ],
  realReport: {
    title: "Insecure Direct Object Reference (IDOR) on /v1/accounts/ leads to full access to other users bank details",
    severity: "Critical",
    type: "IDOR",
    desc: "The accounts endpoint on api.acme-bank.com/v1/accounts/{id} retrieves account balances and owner names based on a path identifier. However, the system fails to check if the user authorized by the Bearer token matches the owner of the requested account ID. Consequently, any authenticated user can read bank accounts of other users.",
    steps: "1. Log in and retrieve your authentication token.\n2. Query the endpoint with your account ID: /v1/accounts/ACC-10029.\n3. Change the account ID in the request path to ACC-10030 (Bob's account).\n4. View Bob's private financial data returned in the HTTP response.",
    impact: "An attacker can systematically enumerate all accounts database identifiers to dump balances, names, and credentials of all Acme Bank users.",
    feedback: "High severity IDOR verified. We have updated our authorization middleware to validate object ownership prior to querying database entities. Bounty awarded.",
    keywords: ["idor", "accounts"]
  }
};
