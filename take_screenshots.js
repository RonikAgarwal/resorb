const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1080 });

  console.log('Capturing home page...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: '/Users/ronikagarwal/.gemini/antigravity-ide/brain/344ebc5a-5ed4-4972-a034-006e0662c101/home.png', fullPage: true });

  console.log('Capturing products page...');
  await page.goto('http://localhost:3000/products', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: '/Users/ronikagarwal/.gemini/antigravity-ide/brain/344ebc5a-5ed4-4972-a034-006e0662c101/products.png', fullPage: true });

  console.log('Capturing cart page...');
  await page.goto('http://localhost:3000/cart', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: '/Users/ronikagarwal/.gemini/antigravity-ide/brain/344ebc5a-5ed4-4972-a034-006e0662c101/cart.png', fullPage: true });

  await browser.close();
  console.log('Done.');
})();
