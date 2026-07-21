import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const require = createRequire('C:/Users/Computer Market/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/playwright@1.60.0/node_modules/playwright/package.json');
const { chromium } = require('playwright');

const target = process.argv[2] || 'build/methodology.html';
const output = process.argv[3] || 'scratch/methodology-mobile.png';
const url = target.startsWith('http') ? target : pathToFileURL(target).href;

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});

const consoleMessages = [];
page.on('console', (msg) => {
  if (['error', 'warning'].includes(msg.type())) consoleMessages.push(`${msg.type()}: ${msg.text()}`);
});
page.on('pageerror', (err) => consoleMessages.push(`pageerror: ${err.message}`));

await page.goto(url, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1200);
await page.screenshot({ path: output, fullPage: true });

const metrics = await page.evaluate(() => ({
  viewport: { width: innerWidth, height: innerHeight },
  document: { width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight },
  bodyOverflow: getComputedStyle(document.body).overflow,
  bodyHeight: getComputedStyle(document.body).height,
  header: document.querySelector('.meth-header')?.getBoundingClientRect().toJSON(),
  container: document.querySelector('.meth-container')?.getBoundingClientRect().toJSON(),
  viewer: document.querySelector('.meth-viewer')?.getBoundingClientRect().toJSON(),
  sidebar: document.querySelector('.meth-sidebar')?.getBoundingClientRect().toJSON(),
}));

console.log(JSON.stringify({ url, output, metrics, consoleMessages }, null, 2));
await browser.close();
