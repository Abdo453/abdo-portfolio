import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const require = createRequire('C:/Users/Computer Market/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/playwright@1.60.0/node_modules/playwright/package.json');
const { chromium } = require('playwright');

const target = process.argv[2] || 'build/methodology.html';
const url = target.startsWith('http') ? target : pathToFileURL(target).href;

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const cdp = await page.context().newCDPSession(page);
await cdp.send('Runtime.enable');

const messages = [];
cdp.on('Runtime.exceptionThrown', (event) => {
  messages.push({ type: 'exceptionThrown', details: event.exceptionDetails });
});
await page.addInitScript(() => {
  window.__capturedErrors = [];
  window.addEventListener('error', (event) => {
    window.__capturedErrors.push({
      message: event.message,
      source: event.filename,
      line: event.lineno,
      column: event.colno,
      stack: event.error?.stack || null,
    });
  });
});
page.on('console', (msg) => {
  if (['error', 'warning'].includes(msg.type())) {
    messages.push({ type: msg.type(), text: msg.text(), location: msg.location() });
  }
});
page.on('pageerror', (err) => {
  messages.push({ type: 'pageerror', text: err.message });
});

await page.goto(url, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);

const state = await page.evaluate(() => ({
  title: document.title,
  visiblePhases: document.querySelectorAll('.meth-phase').length,
  activePhase: document.querySelector('.meth-phase.active')?.id || null,
  sidebarItems: document.querySelectorAll('.meth-item').length,
  stats: [...document.querySelectorAll('.stat-number')].map((el) => el.textContent.trim()),
  capturedErrors: window.__capturedErrors || [],
}));

console.log(JSON.stringify({ url, state, messages }, null, 2));
await browser.close();
