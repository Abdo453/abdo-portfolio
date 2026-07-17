import json

filepath = 'd:/abdo_portfolio/build/ccna/data/lessons.json'
with open(filepath, 'r', encoding='utf-8') as f:
    lessons_data = json.load(f)

# Ensure the 6 Domains exist
expected_domains = [
    "Domain 1: Network Fundamentals",
    "Domain 2: Network Access",
    "Domain 3: IP Connectivity",
    "Domain 4: IP Services",
    "Domain 5: Security Fundamentals",
    "Domain 6: Automation and Programmability"
]

# Ensure we have 6 chapters
while len(lessons_data) < 6:
    lessons_data.append({"chapter": "", "lessons": []})

for i in range(6):
    lessons_data[i]["chapter"] = expected_domains[i]

# Template for fund_osi_tcp
for chap in lessons_data:
    for lesson in chap["lessons"]:
        if lesson["id"] == "fund_osi_tcp":
            lesson["title"] = "2. The OSI & TCP/IP Models (النموذج الاحترافي)"
            lesson["content"] = """
                <h1>The OSI & TCP/IP Models</h1>
                
                <div class="concept-box" style="border-color: var(--accent); background: rgba(88, 166, 255, 0.05);">
                    <h3 style="color: var(--accent);">💡 الفكرة ببساطة (ولماذا نحتاجها؟)</h3>
                    <p>في الماضي، كانت كل شركة (مثل IBM أو Apple) تصنع أجهزة تتحدث لغة خاصة بها. لحل هذه المشكلة، اجتمعت منظمة ISO عام 1984 وأصدرت معيار OSI كمرجع نظري يقسم عملية الاتصال إلى 7 طبقات لضمان التوافق (Interoperability).</p>
                </div>

                <h2>1. الطبقات السبعة (The 7 Layers)</h2>
                <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">
                    <div style="padding: 10px; background: #238636; color: white; border-radius: 5px;"><strong>7. Application:</strong> واجهة التطبيقات (HTTP, FTP).</div>
                    <div style="padding: 10px; background: #2ea043; color: white; border-radius: 5px;"><strong>6. Presentation:</strong> التشفير والضغط (JPEG, ASCII).</div>
                    <div style="padding: 10px; background: #3fb950; color: white; border-radius: 5px;"><strong>5. Session:</strong> فتح وإدارة الجلسات.</div>
                    <div style="padding: 10px; background: #d29922; color: white; border-radius: 5px;"><strong>4. Transport:</strong> النقل الموثوق (TCP/UDP). <em>(PDU: Segment)</em></div>
                    <div style="padding: 10px; background: #f85149; color: white; border-radius: 5px;"><strong>3. Network:</strong> التوجيه بالـ IP. <em>(PDU: Packet)</em></div>
                    <div style="padding: 10px; background: #8957e5; color: white; border-radius: 5px;"><strong>2. Data Link:</strong> التوصيل المحلي بالـ MAC. <em>(PDU: Frame)</em></div>
                    <div style="padding: 10px; background: #58a6ff; color: white; border-radius: 5px;"><strong>1. Physical:</strong> الكابلات والإشارات. <em>(PDU: Bits)</em></div>
                </div>

                <div class="concept-box" style="border-color: #2ea043; background: rgba(46, 160, 67, 0.05);">
                    <h3 style="color: #2ea043;">💻 Real Outputs (مخرجات حقيقية من الشغل)</h3>
                    <p>في الشغل، نستخدم أمر مثل Ping و Traceroute لمعرفة في أي طبقة تكمن المشكلة. إذا كان الـ Ping يفشل، المشكلة غالباً في Layer 1, 2 أو 3.</p>
                    <pre style="background: #161b22; color: #c9d1d9; padding: 10px; border-radius: 5px; font-family: monospace;">
C:\\> tracert 8.8.8.8

Tracing route to dns.google [8.8.8.8]
over a maximum of 30 hops:
  1    <1 ms    <1 ms    <1 ms  192.168.1.1  (Layer 3 Gateway)
  2    15 ms    14 ms    14 ms  10.0.0.1     (ISP Router)
                    </pre>
                </div>

                <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                    <h3 style="color: #ffb020;">⚠️ أخطاء شائعة في الشغل (Common Mistakes)</h3>
                    <ul>
                        <li><strong>الخلط في أسماء الـ PDU:</strong> في المقابلات، من الخطأ الفادح أن تقول "السويتش يرسل Packets". الصحيح: الراوتر يوجه Packets، السويتش يمرر Frames!</li>
                    </ul>
                </div>

                <div class="concept-box" style="border-color: #8957e5; background: rgba(137, 87, 229, 0.05);">
                    <h3 style="color: #8957e5;">🛡️ منظور الأمن السيبراني (Cybersecurity Perspective)</h3>
                    <p>المهاجمون يستهدفون طبقات محددة. هجمات حجب الخدمة (DDoS) مثل SYN Flood تستهدف (Layer 4)، بينما هجمات SQL Injection تستهدف (Layer 7). لذلك كل طبقة لها جدار حماية (Firewall) خاص بها.</p>
                </div>
            """
        
        elif lesson["id"] == "fund_ethernet":
            lesson["title"] = "3. Ethernet, MAC & ARP (النموذج الاحترافي)"
            lesson["content"] = """
                <h1>Ethernet, MAC & ARP (Layer 2)</h1>
                
                <div class="concept-box" style="border-color: var(--accent); background: rgba(88, 166, 255, 0.05);">
                    <h3 style="color: var(--accent);">💡 الفكرة ببساطة (ولماذا نحتاجها؟)</h3>
                    <p>بروتوكول الـ IP مسؤول عن إيصال البيانات من دولة لدولة، لكن داخل نفس الغرفة (LAN)، الأجهزة لا تتحدث بالـ IP بل تستخدم عناوين فيزيائية تُسمى MAC Address، واللغة الرسمية هنا هي Ethernet.</p>
                </div>

                <h2>1. معيار Ethernet و الـ MAC</h2>
                <p>عنوان الـ MAC يتكون من 48 بت (Hexadecimal)، ومحروق على كرت الشاشة.</p>

                <div class="concept-box" style="border-color: #2ea043; background: rgba(46, 160, 67, 0.05);">
                    <h3 style="color: #2ea043;">💻 Real Outputs (مخرجات حقيقية من الشغل)</h3>
                    <p>لمعرفة كيف يربط الجهاز الـ IP بالـ MAC نستخدم جدول הـ ARP:</p>
                    <pre style="background: #161b22; color: #c9d1d9; padding: 10px; border-radius: 5px; font-family: monospace;">
Router# show mac address-table
          Mac Address Table
-------------------------------------------
Vlan    Mac Address       Type        Ports
----    -----------       --------    -----
   1    0010.5a0c.ffba    DYNAMIC     Fa0/1
   1    0020.11aa.22bb    DYNAMIC     Fa0/2
                    </pre>
                </div>

                <div class="concept-box" style="border-color: #ffb020; background: rgba(255, 176, 32, 0.05);">
                    <h3 style="color: #ffb020;">⚠️ أخطاء شائعة في الشغل (Common Mistakes)</h3>
                    <ul>
                        <li><strong>Duplex Mismatch:</strong> توصيل جهاز يعمل بـ Full-Duplex مع جهاز Half-Duplex يؤدي إلى بطء شديد جداً وتصادمات (Collisions) لا نهائية.</li>
                    </ul>
                </div>

                <div class="concept-box" style="border-color: #8957e5; background: rgba(137, 87, 229, 0.05);">
                    <h3 style="color: #8957e5;">🛡️ منظور الأمن السيبراني (Cybersecurity Perspective)</h3>
                    <p><strong>ARP Spoofing (Poisoning):</strong> يمكن للمخترق إرسال رسائل ARP مزيفة ليقنع الأجهزة بأنه هو الـ Router، مما يجعله قادراً على التجسس على كل البيانات (Man-in-the-Middle). لحل هذا، نستخدم تقنية Dynamic ARP Inspection في سيسكو.</p>
                </div>
            """

with open(filepath, 'w', encoding='utf-8') as f:
    json.dump(lessons_data, f, indent=4, ensure_ascii=False)

print("Updated lessons.json domains and applied Template to Domain 1")
