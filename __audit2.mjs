import { chromium } from 'playwright';
import fs from 'fs';

function srgbToLin(c) { c/=255; return c <= 0.04045 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); }
function relLum([r,g,b]) { return 0.2126*srgbToLin(r)+0.7152*srgbToLin(g)+0.0722*srgbToLin(b); }
function parseRGB(str) {
  const m = str.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(',').map(s=>parseFloat(s.trim()));
  return parts;
}
function contrast(c1, c2) {
  const l1 = relLum(c1), l2 = relLum(c2);
  const [a,b] = l1>l2 ? [l1,l2]:[l2,l1];
  return (a+0.05)/(b+0.05);
}

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: 'dark' });
const page = await context.newPage();
page.on('pageerror', (err) => console.log('PAGE ERROR:', err.message));

const results = {};

// Effective background: walk up until non-transparent bg found
const effectiveBg = async (el) => {
  return await el.evaluate((node) => {
    let cur = node;
    while (cur) {
      const cs = getComputedStyle(cur);
      const bg = cs.backgroundColor;
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') return bg;
      cur = cur.parentElement;
    }
    return 'rgb(0,0,0)';
  });
};

const measureContrast = async (el) => {
  const color = await el.evaluate((node) => getComputedStyle(node).color);
  const bg = await effectiveBg(el);
  const fg = parseRGB(color), bgc = parseRGB(bg);
  if (!fg || !bgc) return null;
  return { color, bg, ratio: contrast(fg, bgc).toFixed(2) };
};

const shot = async (name) => { await page.screenshot({ path: `/tmp/rec_${name}.png` }); };

const dumpButtons = async (label) => {
  const btns = await page.$$('button');
  const out = [];
  for (const b of btns) {
    const box = await b.boundingBox();
    const txt = (await b.textContent())?.trim();
    const aria = await b.getAttribute('aria-label');
    out.push({ txt, aria, box });
  }
  results[label] = out;
};

// ---- 1. Permission ----
await page.goto('http://localhost:3000/recall/permission', { waitUntil: 'networkidle' });
await shot('01_permission');
await dumpButtons('permission');
const bodyText = page.locator('text=Saying an answer out loud').first();
results.permission_bodyContrast = await measureContrast(bodyText);

// ---- 2. Permission denied ----
await page.goto('http://localhost:3000/recall/permission/denied', { waitUntil: 'networkidle' });
await shot('02_denied_default');
await dumpButtons('denied_default');
await page.click('button:has-text("How to turn it back on")');
await page.waitForTimeout(200);
await shot('03_denied_help');
results.denied_helpVisible = await page.locator('text=Settings → Safari → Microphone').isVisible();
const helpText = page.locator('text=Settings → Safari → Microphone');
results.denied_helpContrast = await measureContrast(helpText);

// ---- 3. Choice ----
await page.goto('http://localhost:3000/recall/choice', { waitUntil: 'networkidle' });
await shot('04_choice_default');
await dumpButtons('choice_default');
// Race: click Speak and screenshot immediately without waiting for nav
await Promise.all([
  page.click('button:has-text("Speak")'),
  page.waitForTimeout(50),
]);
await shot('05_choice_selected_race');
console.log('URL right after click+50ms:', page.url());

