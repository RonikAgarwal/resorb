const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1080 });

  const artifactDir = '/Users/ronikagarwal/.gemini/antigravity-ide/brain/344ebc5a-5ed4-4972-a034-006e0662c101';

  console.log('Capturing home page...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: `${artifactDir}/home.png`, fullPage: true });

  console.log('Capturing products page...');
  await page.goto('http://localhost:3000/products', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: `${artifactDir}/products.png`, fullPage: true });

  console.log('Capturing track page...');
  await page.goto('http://localhost:3000/track', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: `${artifactDir}/track.png`, fullPage: true });

  console.log('Logging into admin...');
  await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle0' });
  await page.type('input[type="email"]', 'admin@resorb.in');
  await page.type('input[type="password"]', 'resorb2025');
  
  await page.click('button[type="submit"]');
  // Wait for client side navigation and data fetch
  await new Promise(r => setTimeout(r, 3000));

  console.log('Capturing admin dashboard...');
  await page.screenshot({ path: `${artifactDir}/admin_dashboard.png`, fullPage: true });

  console.log('Capturing admin orders...');
  await page.goto('http://localhost:3000/admin/orders', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: `${artifactDir}/admin_orders.png`, fullPage: true });

  await browser.close();
  console.log('Screenshots completed.');
})();
