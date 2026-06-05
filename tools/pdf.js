// Generate per-project case-study PDFs.
// Usage:
//   node pdf.js                 → regenerate all 6
//   node pdf.js --slug=magna    → only magna.pdf

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const SLUGS = ['magna','stratos','ivory','wahed','ipg','passion-projects'];
const OUT = path.join(ROOT, 'case-studies');
fs.mkdirSync(OUT, { recursive: true });

const args = process.argv.slice(2);
const only = args.find(a => a.startsWith('--slug='))?.split('=')[1];

const projects = only ? [only] : SLUGS;
const missing = projects.filter(s => !fs.existsSync(path.join(ROOT, `${s}.html`)));
if (missing.length) {
  console.error(`Missing per-project pages: ${missing.join(', ')}`);
  process.exit(1);
}

(async () => {
  const browser = await chromium.launch();
  for (const slug of projects) {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const url = `file://${path.join(ROOT, slug + '.html')}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.emulateMedia({ media: 'print' });
    // Give Instagram embeds + fonts a beat to settle
    await page.waitForTimeout(800);
    const file = path.join(OUT, `${slug}.pdf`);
    await page.pdf({
      path: file,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '18mm', bottom: '18mm', left: '14mm', right: '14mm' },
    });
    await ctx.close();
    const size = (fs.statSync(file).size / 1024).toFixed(0);
    console.log(`✓ ${slug.padEnd(18)} → ${path.relative(ROOT, file)}  (${size} KB)`);
  }
  await browser.close();
  console.log(`\nDone. ${projects.length} PDF${projects.length===1?'':'s'} in ${path.relative(ROOT, OUT)}/`);
})().catch(err => { console.error(err); process.exit(1); });
