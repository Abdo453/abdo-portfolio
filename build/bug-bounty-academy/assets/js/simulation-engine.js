// ==========================================
// UNIFIED SIMULATION ENGINE CORE (v1.0)
// ==========================================

const SimulationEngine = (function() {
  // Stateful Mock Database
  const mockDB = {
    users: {
      "15": { id: 15, name: "John Doe (You)", email: "john@target.com", role: "user", balance: 500 },
      "16": { id: 16, name: "Sarah Connor (Victim)", email: "sarah@target.com", role: "user", balance: 9500, secret_token: "tok_sarah_991823" },
      "1":  { id: 1,  name: "System Administrator", email: "admin@target.com", role: "admin", balance: 1000000, flag: "FLAG{IDOR_MASTER_EXPLORER_2026}" }
    },
    products: {
      "phone": { name: "iPhone 15 Pro", price: 500 }
    }
  };

  // Badges Management
  function unlockBadge(badgeId, badgeTitle) {
    let badges = JSON.parse(localStorage.getItem("bba_user_badges") || "[]");
    if (!badges.includes(badgeId)) {
      badges.push(badgeId);
      localStorage.setItem("bba_user_badges", JSON.stringify(badges));
      
      const toast = document.createElement("div");
      toast.className = "badge-unlock-toast";
      toast.innerHTML = `<div style="font-size:1.2rem; color:#facc15;"><i class='bx bx-award'></i> BADGE UNLOCKED!</div><div style="font-weight:bold; color:#fff;">${badgeTitle}</div>`;
      toast.style.cssText = `
        position: fixed; top: 25px; right: 25px; background: linear-gradient(135deg, #161b22, #0d1117);
        border: 2px solid #facc15; padding: 15px 22px; border-radius: 10px; z-index: 9999;
        box-shadow: 0 10px 30px rgba(250, 204, 21, 0.3); animation: slideInRight 0.4s ease;
      `;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 4000);
    }
  }

  // Dynamic Request Processor
  function processRequest(rawRequest, labType) {
    const lines = rawRequest.split("\n");
    const firstLine = lines[0] || "";
    const body = lines[lines.length - 1] || "";

    let status = "HTTP/1.1 200 OK";
    let headers = "Date: " + new Date().toUTCString() + "\r\nServer: Apache/2.4.41 (Ubuntu)\r\nContent-Type: application/json; charset=UTF-8";
    let resData = {};

    if (labType === "idor") {
      const match = firstLine.match(/\/user\/(\d+)/);
      const targetId = match ? match[1] : "15";
      if (mockDB.users[targetId]) {
        resData = { status: "success", data: mockDB.users[targetId] };
        if (targetId !== "15") {
          unlockBadge("idor_hunter", "🛡️ IDOR Hunter");
        }
      } else {
        status = "HTTP/1.1 404 Not Found";
        resData = { status: "error", message: "User profile not found." };
      }
    } 
    else if (labType === "role") {
      if (body.includes("role=admin")) {
        resData = { status: "success", role: "admin", message: "Access Granted to Admin Dashboard!", flag: "FLAG{ROLE_ESCALATION_EXPERT}" };
        unlockBadge("priv_esc", "👑 Privilege Escalation Master");
      } else {
        resData = { status: "success", role: "user", message: "User profile updated." };
      }
    }
    else if (labType === "sqli") {
      if (rawRequest.includes("'") || rawRequest.includes("UNION")) {
        status = "HTTP/1.1 500 Internal Server Error";
        resData = { error: "SQL Syntax Error", db_message: "You have an error in your SQL syntax near '\'' at line 1 in MySQL server", leaked_tables: ["users", "admin_passwords"] };
        unlockBadge("sqli_master", "💉 SQLi Ninja");
      } else {
        resData = { status: "success", products: [mockDB.products["phone"]] };
      }
    }
    else if (labType === "price") {
      if (body.includes("price=1") || body.includes("price=0")) {
        resData = { status: "success", message: "Checkout Complete! Item purchased at altered price: $1", invoice_id: "INV-99182" };
        unlockBadge("price_manipulator", "💰 Business Logic Specialist");
      } else {
        resData = { status: "success", message: "Checkout Complete! Standard price charged: $500" };
      }
    }
    else {
      resData = { status: "success", message: "Request processed dynamically by SimulationEngine Core." };
    }

    const jsonStr = JSON.stringify(resData, null, 2);
    return `${status}\r\n${headers}\r\nContent-Length: ${jsonStr.length}\r\n\r\n${jsonStr}`;
  }

  return {
    processRequest: processRequest,
    unlockBadge: unlockBadge
  };
})();
