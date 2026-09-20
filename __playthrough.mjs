import { chromium } from 'playwright';
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: 'dark' });
const page = await context.newPage();
page.on('console', m => { if (m.type()==='error') console.log('CONSOLE ERROR:', m.text()); });
page.on('pageerror', e => console.log('PAGE ERROR:', e.message));

await page.goto('http://localhost:3000/recall/choice', { waitUntil: 'networkidle' });
console.log('url', page.url());

// Term 1: choose Write -> type -> send -> should be clean pass
await page.click('text=Write');
await page.waitForURL('**/recall/answer**');
await page.fill('input, textarea', 'Test answer for term 1');
await page.click('text=Send');
await page.waitForURL('**/recall/processing**');
await page.waitForURL('**/recall/result**', { timeout: 5000 });
console.log('term1 result url', page.url());
await page.screenshot({ path: '/tmp/pt-term1-result.png' });
await page.click('text=Next');
await page.waitForURL('**/recall/answer**');
console.log('term2 answer url', page.url());

// Term 2: partial -> fail1 -> fail2 -> reveal path (script is partial, fail1, fail2)
await page.fill('input, textarea', 'partial attempt');
await page.click('text=Send');
await page.waitForURL('**/recall/result**', { timeout: 5000 });
console.log('term2 attempt1 result', page.url());
await page.screenshot({ path: '/tmp/pt-term2-partial.png' });
await page.click('text=Continue');
await page.waitForURL('**/recall/summary**').catch(()=>{});
console.log('after continue url', page.url());
