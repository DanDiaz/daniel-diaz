/* Build the résumé PDF from the site, using the print stylesheet.
 *
 *   npm run build && node tools/make-resume-pdf.cjs ["out/Daniel Diaz Resume.pdf"]
 *   (or: npm run resume)
 *
 * The résumé is the web page, so there is one source of truth: edit the data
 * files under src/app/data and re-run this. The PDF is Letter, two pages, and
 * @media print in src/styles.scss decides what is on it (astrophotography,
 * screenshots and screen-only prose are left out there).
 *
 * Serves dist/ with tools/serve-dist.cjs, prints with puppeteer-core + the
 * installed Edge/Chrome, then checks the printed text for the strings that
 * must be present (and the ones that must not). Dev tool only - the site
 * itself has no dependencies.
 */
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist/daniel-diaz/browser');
const PORT = 8870 + Math.floor(Math.random() * 20);

function requirePuppeteer() {
  for (const c of ['puppeteer-core', path.resolve(ROOT, '../paradise-pines/node_modules/puppeteer-core')]) {
    try { return require(c); } catch (e) { /* try next */ }
  }
  console.error('puppeteer-core not found. Run: npm i -D puppeteer-core');
  process.exit(1);
}

function findBrowser() {
  if (process.env.SHOT_BROWSER) return process.env.SHOT_BROWSER;
  return [
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  ].find((c) => fs.existsSync(c));
}

// What the résumé must and must not say. Keep in step with the data files.
const MUST = [
  'Security Champion', 'OWASP Dependency-Check', 'Black Duck', 'FIDO2', 'WebAuthn',
  'Tomcat', 'Jetty', 'facial recognition', 'fingerprint', 'OAuth 2.0', 'SAML 2.0',
  'Lead Software Engineer', 'OpenText', 'Utah Valley University', 'danielhdiaz88@gmail.com',
];
const MUST_NOT = ['Quarkus', 'Milky Way', 'Astrophotograph', 'astrophotography', 'Senior Software Engineer'];

(async () => {
  if (!fs.existsSync(path.join(DIST, 'index.html'))) {
    console.error('No build found. Run: npm run build');
    process.exit(1);
  }
  const out = process.argv[2] || path.join(ROOT, 'Daniel Diaz Resume.pdf');
  const server = spawn(process.execPath, [path.join(ROOT, 'tools/serve-dist.cjs'), String(PORT)], {
    stdio: ['ignore', 'ignore', 'inherit'],
  });
  await new Promise((r) => setTimeout(r, 1200));

  const puppeteer = requirePuppeteer();
  const browser = await puppeteer.launch({
    executablePath: findBrowser(),
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu'],
  });
  let code = 0;
  try {
    const page = await browser.newPage();
    const problems = [];
    page.on('pageerror', (e) => problems.push('pageerror: ' + e.message));
    page.on('console', (m) => { if (m.type() === 'error') problems.push('console: ' + m.text()); });

    await page.setViewport({ width: 816, height: 1056, deviceScaleFactor: 1 }); // Letter at 96dpi
    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForSelector('#experience li', { timeout: 15000 });

    await page.pdf({ path: out, format: 'Letter', printBackground: true, preferCSSPageSize: true });

    // Read the printed text back out of the file (no PDF library needed: the
    // page is what the print stylesheet produced, so check the DOM instead).
    await page.emulateMediaType('print');
    await new Promise((r) => setTimeout(r, 400));
    const printed = await page.evaluate(() => document.body.innerText);
    const flat = printed.replace(/\s+/g, ' ');

    const missing = MUST.filter((s) => !flat.includes(s));
    const leaked = MUST_NOT.filter((s) => new RegExp(s, 'i').test(flat));
    const invisible = await page.evaluate(
      () => [...document.querySelectorAll('html.js-reveal .reveal')].filter((e) => getComputedStyle(e).opacity === '0').length,
    );

    console.log('wrote ' + out + '  (' + Math.round(fs.statSync(out).size / 1024) + ' KB)');
    if (missing.length) { problems.push('missing from print: ' + missing.join(', ')); }
    if (leaked.length) { problems.push('should not print: ' + leaked.join(', ')); }
    if (invisible) { problems.push(invisible + ' element(s) still transparent in print (reveal not neutralised)'); }
    if (problems.length) { problems.forEach((p) => console.error('  ! ' + p)); code = 1; }
    else console.log('print check OK: all required content present, nothing screen-only leaked');
  } finally {
    await browser.close();
    server.kill();
  }
  process.exit(code);
})();
