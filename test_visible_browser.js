const { chromium } = require('playwright');

(async () => {
  try {
    console.log('Launching browser (faster speed)...');
    
    // Reduced slowMo to 10ms just to keep things stable but much faster
    const browser = await chromium.launch({ headless: false, slowMo: 10 });
    const page = await browser.newPage();
    
    await page.setViewportSize({ width: 1280, height: 800 });

    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000');
    
    // Quick wait for preloader to be ready
    await page.waitForTimeout(500); 
    await page.click('text="ENTER"');
    
    // Wait for the main video transition to play smoothly
    console.log('Watching transition...');
    await page.waitForTimeout(2000); 

    // Scroll down to check interactions
    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(1000);
    
    await page.screenshot({ path: 'test_visible_browser.png' });
    
    console.log('Closing browser in 2 seconds...');
    await page.waitForTimeout(2000);
    
    await browser.close();
    
  } catch (error) {
    console.error('Error:', error);
  }
})();
