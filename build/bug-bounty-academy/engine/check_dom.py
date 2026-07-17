from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto('file:///d:/abdo_portfolio/build/bug-bounty-academy/pages/scenario.html?id=scenario-001')
        page.wait_for_timeout(2000)
        page.evaluate('window.ScenarioEngine.loadStep(7)')
        page.wait_for_timeout(2000)
        
        markdown_info = page.evaluate('''() => {
            const el = document.getElementById("step-content-markdown");
            if (!el) return null;
            const style = window.getComputedStyle(el);
            return {
                html: el.innerHTML.substring(0, 200),
                display: style.display,
                visibility: style.visibility,
                color: style.color,
                height: style.height,
                opacity: style.opacity
            };
        }''')
        
        quiz_info = page.evaluate('''() => {
            const el = document.getElementById("workspace-quiz");
            if (!el) return null;
            const style = window.getComputedStyle(el);
            return {
                html: el.innerHTML.substring(0, 200),
                display: style.display,
                visibility: style.visibility,
                color: style.color,
                height: style.height,
                opacity: style.opacity
            };
        }''')
        import json
        with open('dom_output.json', 'w', encoding='utf-8') as f:
            json.dump({'MARKDOWN': markdown_info, 'QUIZ': quiz_info}, f, indent=2, ensure_ascii=False)
        browser.close()

if __name__ == '__main__':
    main()
