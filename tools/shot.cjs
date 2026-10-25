/* Local screenshot helper for checking the site without a browser session.
 *
 *   node tools/shot.cjs 1440 900 http://127.0.0.1:8848/ shot.png
 *   node tools/shot.cjs 390  844 http://127.0.0.1:8848/ shot.png full
 *
 * Uses puppeteer-core + the installed Edge/Chrome. It is a dev tool only -
 * the site itself has no dependencies. puppeteer-core is resolved from this
 * folder, then from the sibling `paradise-pines` site that already has it.
 */
const fs = require('fs');
const path = require('path');

function requirePuppeteer() {
  const candidates = [
    'puppeteer-core',
    path.resolve(__dirname, '../../paradise-pines/node_modules/puppeteer-core'),
  ];
  for (const c of candidates) {
    try { return require(c); } catch (e) { /* try next */ }
  }
  console.error('puppeteer-core not found. Run: npm i -D puppeteer-core');
  process.exit(1);
}

const puppeteer = requirePuppeteer();

function findBrowser() {
  if (process.env.SHOT_BROWSER) return process.env.SHOT_BROWSER;
  return [
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  ].find((c) => fs.existsSync(c));
}

(async () => {
  const [w, h, url, out, full] = process.argv.slice(2);
  if (!url || !out) {
    console.error('usage: node tools/shot.cjs <width> <height> <url> <out.png> [full]');
    process.exit(1);
  }
  const browser = await puppeteer.launch({
    executablePath: findBrowser(),
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage();
  const problems = [];
  page.on('console', (m) => { if (m.type() === 'error') problems.push('console: ' + m.text()); });
  page.on('pageerror', (e) => problems.push('pageerror: ' + e.message));
  page.on('requestfailed', (r) => problems.push('requestfailed: ' + r.url() + ' ' + r.failure().errorText));
  page.on('response', (r) => { if (r.status() >= 400) problems.push('HTTP ' + r.status() + ' ' + r.url()); });

  await page.setViewport({ width: Number(w), height: Number(h), deviceScaleFactor: 1 });
  if (process.env.SHOT_STATIC) {
    // Ask for reduced motion so scroll-reveal elements are visible in a
    // full-page capture (they animate in only when scrolled into view).
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  }
  await page.goto(url, { waitUntil: 'networkidle2' });
  // Walk the page so loading="lazy" images below the fold are fetched before
  // a full-page capture (puppeteer's fullPage does not scroll the document).
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto';
    const step = Math.round(window.innerHeight * 0.8);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
    await Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.addEventListener('load', resolve, { once: true });
              img.addEventListener('error', resolve, { once: true });
            }),
        ),
    );
  });
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: out, fullPage: full === 'full' });
  console.log('wrote ' + out);
  console.log(problems.length ? problems.join('\n') : 'no console errors, no failed requests');
  await browser.close();
})();
