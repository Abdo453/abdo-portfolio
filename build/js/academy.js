

// ==========================================
// REAL HUNTING SIMULATOR ENGINE
// ==========================================

const simScenarios = {
    'admin_bypass': {
        startNode: 'init',
        nodes: {
            'init': {
                text: "You discovered an endpoint `/admin` but it returns a `403 Forbidden` response.\nWhat is your first step?",
                choices: [
                    { text: "A) Try SQL Injection (e.g. ' OR 1=1 --)", next: "sqli_fail", xp: 0, time: 10 },
                    { text: "B) Try Path Traversal (e.g. /admin/../)", next: "path_fail", xp: 5, time: 5 },
                    { text: "C) Check HTTP Headers (X-Forwarded-For: 127.0.0.1)", next: "header_win", xp: 20, time: 2 },
                    { text: "D) Brute-force admin directory with ffuf", next: "brute_waf", xp: 0, time: 30 }
                ]
            },
            'sqli_fail': {
                text: "You spent 10 minutes throwing SQLi payloads. The WAF blocked your IP for 5 minutes.\nResult: Wasted time.",
                choices: [ { text: "Try another approach", next: "init", xp: 0, time: 0 } ]
            },
            'path_fail': {
                text: "You tried `/admin/../` and got a 404 Not Found. Good idea, but the server normalizes paths properly.",
                choices: [ { text: "Back to drawing board", next: "init", xp: 0, time: 0 } ]
            },
            'brute_waf': {
                text: "You fired up ffuf with 100 threads. The WAF immediately permanently banned your IP.\nResult: Scenario Failed.",
                choices: [ { text: "Restart Scenario", next: "init", xp: 0, time: 0 } ]
            },
            'header_win': {
                text: "You intercepted the request in Burp and added `X-Forwarded-For: 127.0.0.1` and `X-Custom-IP-Authorization: 127.0.0.1`.\nThe server responded with `200 OK`! You bypassed the restriction.\nWhat's next?",
                choices: [
                    { text: "A) Report the bug immediately!", next: "report_low", xp: 10, time: 5 },
                    { text: "B) Explore the admin panel for higher impact bugs.", next: "admin_explore", xp: 30, time: 10 }
                ]
            },
            'report_low': {
                text: "You reported the Auth Bypass. The triager accepted it as a Medium severity. Good job, but you missed a P1 by not exploring further.\nScenario Complete.",
                choices: [ { text: "Finish", next: "end", xp: 0, time: 0 } ]
            },
            'admin_explore': {
                text: "You find a 'Generate PDF Report' feature. It takes a URL as input.\nWhat's your payload?",
                choices: [
                    { text: "A) http://169.254.169.254/latest/meta-data/", next: "ssrf_win", xp: 50, time: 15 },
                    { text: "B) '><script>alert(1)</script>", next: "xss_fail", xp: 5, time: 5 }
                ]
            },
            'xss_fail': {
                text: "The PDF generator converts it to literal text. No XSS execution.",
                choices: [ { text: "Try again", next: "admin_explore", xp: 0, time: 0 } ]
            },
            'ssrf_win': {
                text: "AWS Metadata retrieved! You dumped the IAM credentials!\nYou successfully escalated a Medium severity 403 Bypass into a Critical P1 SSRF.\nScenario Complete! 🎉",
                choices: [ { text: "Finish", next: "end", xp: 0, time: 0 } ]
            }
        }
    },
    'blind_sqli': {
        startNode: 'init',
        nodes: {
            'init': {
                text: "You are testing a search form `?q=test`. It returns no errors, but you notice a slight delay when you inject `?q=test' AND SLEEP(5)--`.\nWhat do you do?",
                choices: [
                    { text: "A) Fire up sqlmap immediately: sqlmap -u '...' -p q", next: "sqlmap_waf", xp: 0, time: 20 },
                    { text: "B) Verify the delay manually with different sleep times (SLEEP(10)).", next: "verify_delay", xp: 15, time: 5 },
                    { text: "C) Ignore it, probably network lag.", next: "ignore_fail", xp: 0, time: 0 }
                ]
            },
            'sqlmap_waf': {
                text: "Sqlmap sent hundreds of aggressive payloads. The Cloudflare WAF blocked you immediately.",
                choices: [ { text: "Try another approach", next: "init", xp: 0, time: 0 } ]
            },
            'ignore_fail': {
                text: "You moved on and missed a Critical SQLi. Another hunter found it tomorrow.",
                choices: [ { text: "Restart", next: "init", xp: 0, time: 0 } ]
            },
            'verify_delay': {
                text: "The server slept for exactly 10 seconds. Time-based Blind SQLi confirmed!\nNow, how do you extract the database name?",
                choices: [
                    { text: "A) Run sqlmap with --tamper scripts and --delay=2 to bypass WAF.", next: "sqlmap_win", xp: 30, time: 40 },
                    { text: "B) Write a custom Python script to extract it char by char.", next: "script_win", xp: 50, time: 60 }
                ]
            },
            'sqlmap_win': {
                text: "With a 2-second delay and random-agent, sqlmap successfully bypassed the WAF and extracted the DB name after 40 minutes.\nScenario Complete!",
                choices: [ { text: "Finish", next: "end", xp: 0, time: 0 } ]
            },
            'script_win': {
                text: "Your custom Python script using binary search extracted the DB name. It took an hour to write, but you leveled up your coding skills.\nScenario Complete! 🎉",
                choices: [ { text: "Finish", next: "end", xp: 0, time: 0 } ]
            }
        }
    },
    'ssrf_cloud': {
        startNode: 'init',
        nodes: {
            'init': {
                text: "You found a Webhook integration that accepts a URL. You send `http://169.254.169.254` but get an error: `Invalid IP address: Internal IPs are blocked.`\nHow do you bypass this?",
                choices: [
                    { text: "A) Try decimal encoding: http://2852039166", next: "decimal_win", xp: 20, time: 5 },
                    { text: "B) Try localhost: http://127.0.0.1", next: "local_fail", xp: 0, time: 2 },
                    { text: "C) Set up a redirect on your VPS pointing to 169.254.169.254", next: "redirect_win", xp: 30, time: 10 }
                ]
            },
            'local_fail': {
                text: "Error: Internal IPs are blocked. 127.0.0.1 is also caught by the filter.",
                choices: [ { text: "Try another approach", next: "init", xp: 0, time: 0 } ]
            },
            'decimal_win': {
                text: "The decimal encoded IP bypassed the regex filter! The server attempted to fetch the URL, but the request timed out. Why?",
                choices: [
                    { text: "A) The cloud provider requires a specific Host header (e.g., IMDSv2 token).", next: "imds_win", xp: 30, time: 10 },
                    { text: "B) The target isn't hosted on AWS.", next: "not_aws", xp: 5, time: 5 }
                ]
            },
            'redirect_win': {
                text: "Your VPS returned a 301 Redirect to 169.254.169.254. The application followed the redirect and bypassed the initial URL check!\nHowever, the request timed out.",
                choices: [
                    { text: "A) Try getting an IMDSv2 token via PUT request (if possible via redirect).", next: "imds_redirect_fail", xp: 5, time: 5 },
                    { text: "B) Assume it's GCP and try `http://metadata.google.internal/computeMetadata/v1/` with `Metadata-Flavor: Google` header.", next: "gcp_fail", xp: 10, time: 10 }
                ]
            },
            'not_aws': {
                text: "You tried probing for Azure and DigitalOcean metadata endpoints, but got no response. You are stuck.",
                choices: [ { text: "Try another approach", next: "decimal_win", xp: 0, time: 0 } ]
            },
            'imds_redirect_fail': {
                text: "You can't easily force an HTTP method change (to PUT) and add custom headers through a simple 301 redirect in this Webhook.",
                choices: [ { text: "Backtrack", next: "redirect_win", xp: 0, time: 0 } ]
            },
            'gcp_fail': {
                text: "The Webhook feature doesn't let you add custom headers like `Metadata-Flavor: Google`. The request fails.",
                choices: [ { text: "Backtrack", next: "redirect_win", xp: 0, time: 0 } ]
            },
            'imds_win': {
                text: "It's AWS IMDSv2! It requires a PUT request to `/latest/api/token` first. Unfortunately, the webhook only sends GET requests.\nWhat is your final play?",
                choices: [
                    { text: "A) Look for a DNS rebinding vulnerability.", next: "dns_rebind", xp: 15, time: 30 },
                    { text: "B) Look for another parameter in the app that allows header injection.", next: "crlf_win", xp: 50, time: 20 }
                ]
            },
            'dns_rebind': {
                text: "You set up a DNS rebinding server, but the application caches DNS resolution. Rebinding failed.",
                choices: [ { text: "Try another approach", next: "imds_win", xp: 0, time: 0 } ]
            },
            'crlf_win': {
                text: "You found a CRLF injection in the custom Webhook Name parameter! You used it to inject the `X-aws-ec2-metadata-token` header.\nAWS Metadata successfully dumped! CRITICAL P1! 🎉",
                choices: [ { text: "Finish", next: "end", xp: 0, time: 0 } ]
            }
        }
    }
};

let currentScenario = null;
let currentNode = null;
let simXP = 0;
let simTime = 0;

function startSimulator(scenarioId) {
    currentScenario = simScenarios[scenarioId];
    currentNode = currentScenario.startNode;
    simXP = 0;
    simTime = 0;
    
    document.getElementById('sim-menu').style.display = 'none';
    document.getElementById('sim-engine').style.display = 'block';
    document.getElementById('sim-stats').style.display = 'block';
    
    document.getElementById('sim-log').innerHTML = '';
    updateSimStats();
    renderSimNode();
}

function updateSimStats() {
    document.getElementById('sim-xp').innerText = simXP;
    document.getElementById('sim-time').innerText = simTime;
}

function appendSimLog(text, type='system') {
    const logDiv = document.getElementById('sim-log');
    const entry = document.createElement('div');
    entry.style.marginBottom = '10px';
    entry.style.lineHeight = '1.5';
    
    if(type === 'user') {
        entry.innerHTML = `<span style="color:var(--neon-green)">></span> <span style="color:#a8b2c8">${text}</span>`;
    } else {
        entry.innerHTML = `<span style="color:var(--accent-cyan)">[SYS]</span> ${text.replace(/\n/g, '<br>')}`;
    }
    
    logDiv.appendChild(entry);
    logDiv.scrollTop = logDiv.scrollHeight;
}

function renderSimNode() {
    const node = currentScenario.nodes[currentNode];
    if(!node) return exitSimulator();
    
    appendSimLog(node.text, 'system');
    
    const choicesDiv = document.getElementById('sim-choices');
    choicesDiv.innerHTML = '';
    
    if(node.choices) {
        node.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'cyber-tab-btn';
            btn.style.textAlign = 'left';
            btn.style.padding = '12px';
            btn.style.height = 'auto';
            btn.style.whiteSpace = 'normal';
            btn.innerHTML = choice.text;
            btn.onclick = () => makeSimChoice(choice);
            choicesDiv.appendChild(btn);
        });
    }
}

function makeSimChoice(choice) {
    appendSimLog(choice.text, 'user');
    
    simXP += choice.xp;
    simTime += choice.time;
    updateSimStats();
    
    currentNode = choice.next;
    
    if(currentNode === 'end') {
        appendSimLog(`Scenario Completed! Total XP Earned: ${simXP} | Time Taken: ${simTime} mins`, 'system');
        const choicesDiv = document.getElementById('sim-choices');
        choicesDiv.innerHTML = '';
        const btn = document.createElement('button');
        btn.className = 'hunt-btn primary';
        btn.innerHTML = 'Return to Menu';
        btn.onclick = exitSimulator;
        choicesDiv.appendChild(btn);
    } else {
        setTimeout(() => {
            renderSimNode();
        }, 800);
    }
}

function exitSimulator() {
    document.getElementById('sim-engine').style.display = 'none';
    document.getElementById('sim-stats').style.display = 'none';
    document.getElementById('sim-menu').style.display = 'block';
    
    // Add XP to global academy progress if applicable
    if(simXP > 0) {
        addXP(simXP, `Completed Simulator Scenario`);
    }
}
