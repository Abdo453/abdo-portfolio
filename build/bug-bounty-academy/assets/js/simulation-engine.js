// ==========================================
// UNIFIED SIMULATION ENGINE CORE (v2.0)
// ==========================================

const SimulationEngine = (function() {
  const mockDB = {
    users: {
      "15": { id: 15, name: "John Doe (You)", email: "john@target.com", role: "user", balance: 500 },
      "16": { id: 16, name: "Sarah Connor (Victim)", email: "sarah@target.com", role: "user", balance: 9500, secret_token: "tok_sarah_991823" },
      "1":  { id: 1,  name: "System Administrator", email: "admin@target.com", role: "admin", balance: 1000000 }
    },
    products: {
      "phone": { name: "iPhone 15 Pro", price: 500 }
    }
  };

  // V2 Dynamic Flag Generator
  function getDynamicFlag(ctfKey) {
    let flags = JSON.parse(localStorage.getItem("bba_dynamic_flags") || "{}");
    if (!flags[ctfKey]) {
      const randStr = Math.random().toString(36).substring(2, 7).toUpperCase();
      flags[ctfKey] = `FLAG-${ctfKey.toUpperCase()}-${randStr}`;
      localStorage.setItem("bba_dynamic_flags", JSON.stringify(flags));
    }
    return flags[ctfKey];
  }

  // V2 Instructor Mode ("Explain My Mistake") Assistant
  function explainMistake(labType, userInput) {
    let explanation = "";
    if (labType === "idor") {
      explanation = "💡 **Instructor Feedback:**\n- **أين الخطأ؟** لقد قمت بإرسال رقم تعريفك الخاص (id=15).\n- **لماذا لم تنجح؟** ثغرة IDOR تحدث عندما تطلب الوصول لبيانات مستخدم آخر دون التثبت من الجلسة.\n- **ماذا كان يجب أن تفعل؟** قم بتغيير /user/15 إلى /user/16 في الطلب لاستخراج بيانات الضحية!";
    } else if (labType === "role") {
      explanation = "💡 **Instructor Feedback:**\n- **أين الخطأ؟** الـ Payload لا يزال يحتوي على role=user.\n- **لماذا لم تنجح؟** السيرفر يثق ببارامتر الدور المتبادل.\n- **ماذا كان يجب أن تفعل؟** قم بتعديل قيمة role=user إلى role=admin في جسم الطلب لتجاوز الصلاحيات!";
    } else if (labType === "sqli") {
      explanation = "💡 **Instructor Feedback:**\n- **أين الخطأ؟** الطلب عادي ولا يحتوي على حروف خاصة لاختبار الـ Database.\n- **ماذا كان يجب أن تفعل؟** أضف علامة التنصيص (') بعد رقم الكود لإحداث كسرة في استعلام قاعدة البيانات وشاهد خطأ الـ MySQL!";
    } else {
      explanation = "💡 **Instructor Feedback:** قم بمراجعة ترويسات الطلب والبارامترات وتأكد من تعديل القيمة الحسّاسة!";
    }
    return explanation;
  }

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
          resData.flag = getDynamicFlag("idor");
          unlockBadge("idor_hunter", "🛡️ IDOR Hunter");
        }
      } else {
        status = "HTTP/1.1 404 Not Found";
        resData = { status: "error", message: "User profile not found." };
      }
    } 
    else if (labType === "role") {
      if (body.includes("role=admin")) {
        resData = { status: "success", role: "admin", message: "Access Granted to Admin Dashboard!", flag: getDynamicFlag("role") };
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
      resData = { status: "success", message: "Request processed dynamically by SimulationEngine Core V2." };
    }

    const jsonStr = JSON.stringify(resData, null, 2);
    return `${status}\r\n${headers}\r\nContent-Length: ${jsonStr.length}\r\n\r\n${jsonStr}`;
  }

  return {
    processRequest: processRequest,
    unlockBadge: unlockBadge,
    getDynamicFlag: getDynamicFlag,
    explainMistake: explainMistake
  };
})();
