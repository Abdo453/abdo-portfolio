const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Open the local file
  const filePath = `file:///${path.resolve('methodology.html').replace(/\\/g, '/')}`;
  console.log('Navigating to', filePath);
  await page.goto(filePath);
  
  // Wait for load
  await page.waitForTimeout(2000);
  
  // Take screenshot of default state
  await page.screenshot({ path: 'screenshot_default.png', fullPage: true });
  console.log('Took default screenshot');
  
  // Click on XSS Workflow (p7)
  console.log('Clicking on XSS Workflow...');
  // Force click the phase 7 item
  await page.evaluate(() => {
    const el = document.getElementById('meth-ef-p7');
    if(el) el.click();
    else console.log('Element meth-ef-p7 not found!');
  });
  
  await page.waitForTimeout(1000);
  
  // Take screenshot after clicking
  await page.screenshot({ path: 'screenshot_p7.png', fullPage: true });
  console.log('Took p7 screenshot');
  
  // Check if there are JS errors
  page.on('pageerror', error => {
    console.error('PAGE ERROR:', error.message);
  });
  
  await browser.close();
})();
