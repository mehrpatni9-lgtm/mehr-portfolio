// Visual review — headless screenshots of the local site at multiple viewports + targeted sections.
// Usage:
//   node screenshot.js              → screenshots into .review/latest/
//   node screenshot.js --live       → screenshot the deployed URL instead of local file
//   node screenshot.js --section=inventory → only the inventory diagram

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ROOT = __dirname;
const REPO_FILE_URL = `file://${path.join(ROOT, 'index.html')}`;
const LIVE_URL = 'https://mehrpatni9-lgtm.github.io/mehr-portfolio/';

const args = process.argv.slice(2);
const useLive = args.includes('--live');
const sectionArg = args.find(a => a.startsWith('--section='));
const onlySection = sectionArg ? sectionArg.split('=')[1] : null;

const targetUrl = useLive ? LIVE_URL : REPO_FILE_URL;

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet',  width: 768,  height: 1024 },
  { name: 'mobile',  width: 375,  height: 800 },
];

// Sections to spot-shot. Selectors must exist in index.html.
const sections = [
  { slug: 'hero',       selector: 'header.hero' },
  { slug: 'marquee',    selector: '.marquee-wrap' },
  { slug: 'sell',       selector: '.framework:nth-of-type(1) .fw-diagram' },
  { slug: 'ruleoffive', selector: '.framework:nth-of-type(2) .fw-diagram' },
  { slug: 'inventory',  selector: '.framework:nth-of-type(3) .fw-diagram' },
  { slug: 'cases',      selector: '#cases' },
  { slug: 'work',       selector: '#work' },
  { slug: 'contact',    selector: '#contact' },
];

const outDir = path.join(ROOT, '.review', 'latest');
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ deviceScaleFactor: 2 });
  const page = await ctx.newPage();

  // Full-page screenshots at each viewport
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(targetUrl, { waitUntil: 'networkidle' });
    // Give marquee animation a beat so first paint settles
    await page.waitForTimeout(400);
    const file = path.join(outDir, `${vp.name}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log(`✓ ${vp.name.padEnd(8)} ${vp.width}x${vp.height} → ${path.relative(ROOT, file)}`);
  }

  // Targeted section screenshots at desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(targetUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  for (const s of sections) {
    if (onlySection && s.slug !== onlySection) continue;
    const el = await page.$(s.selector);
    if (!el) { console.log(`✗ section ${s.slug} — selector not found (${s.selector})`); continue; }
    const file = path.join(outDir, `section-${s.slug}.png`);
    await el.screenshot({ path: file });
    console.log(`✓ section  ${s.slug.padEnd(11)} → ${path.relative(ROOT, file)}`);
  }

  await browser.close();
  console.log(`\nDone. Screenshots in ${path.relative(ROOT, outDir)}/`);
  if (fs.existsSync(path.join(ROOT, 'reference'))) {
    const refs = fs.readdirSync(path.join(ROOT, 'reference')).filter(f => f.endsWith('.png'));
    if (refs.length) {
      console.log(`\nReference images available for comparison:`);
      refs.forEach(r => console.log(`  reference/${r}`));
    }
  }
})().catch(err => { console.error(err); process.exit(1); });
