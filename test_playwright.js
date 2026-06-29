const { chromium } = require('playwright');

(async () => {
  try {
    console.log('Launching browser...');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000');
    
    // Wait for preloader
    await page.waitForTimeout(3000);
    await page.click('button');
    await page.waitForTimeout(9000);
    
    // Scroll to 7190px (which is the middle of PhilosophyBridge pin: 550vh + 1250px)
    console.log('Scrolling to 7190px (middle of Philosophy text projection)...');
    await page.evaluate(() => window.scrollTo(0, 7190));
    await page.waitForTimeout(2000);
    
    // Check computed styles
    const elementData = await page.evaluate(() => {
      const el = document.querySelector('.cylinder-text');
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        text: el.textContent,
        top: rect.top,
        opacity: style.opacity,
        transform: style.transform
      };
    });
    console.log('Cylinder element state at 7190px:', elementData);
    
    await page.screenshot({ path: 'C:/Users/godsw/.gemini/antigravity/brain/53f8c427-bd90-4f3f-b919-f2d200a1bf6e/playwright_philosophy_mid.png' });
    console.log('Screenshot of middle pin saved!');
    
    await page.close();
    await browser.close();
  } catch (e) {
    console.error('Error during Playwright scroll test:', e);
  }
})();
