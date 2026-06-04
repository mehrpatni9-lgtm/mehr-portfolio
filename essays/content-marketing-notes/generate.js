// Render the 5 content-marketing-notes slides at 1200×1200, save as PNGs.
// Also bundle into one PDF.
// Usage:
//   node generate.js

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const PNG_OUT = path.join(ROOT, 'png');
const PDF_OUT = path.join(ROOT, 'content-marketing-notes.pdf');

fs.mkdirSync(PNG_OUT, { recursive: true });

const slides = fs.readdirSync(SRC)
  .filter(f => f.endsWith('.html'))
  .sort();

(async () => {
  const browser = await chromium.launch();

  // 1) PNGs at 1200x1200, deviceScaleFactor 2 (effective 2400px export, sharp)
  const ctx = await browser.newContext({
    viewport: { width: 1200, height: 1200 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  const generated = [];
  for (const f of slides) {
    const url = `file://${path.join(SRC, f)}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const out = path.join(PNG_OUT, f.replace(/\.html$/, '.png'));
    await page.locator('.slide').screenshot({ path: out });
    const size = (fs.statSync(out).size / 1024).toFixed(0);
    console.log(`✓ ${f.replace('.html','.png').padEnd(28)}  ${size} KB`);
    generated.push(out);
  }
  await ctx.close();

  // 2) Single PDF — one slide per page, square format
  const pdfCtx = await browser.newContext({
    viewport: { width: 1200, height: 1200 },
  });
  const pdfPage = await pdfCtx.newPage();

  // Build a combined HTML with all 5 slides stacked, each its own page
  const combinedHTML = `<!doctype html><html><head>
    <meta charset="utf-8"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Italiana&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="file://${path.join(SRC,'slide.css')}">
    <style>
      body{margin:0}
      .slide{page-break-after:always;break-after:page}
      .slide:last-child{page-break-after:auto;break-after:auto}
    </style>
    </head><body>
    ${slides.map(f => fs.readFileSync(path.join(SRC,f),'utf8')
        .match(/<div class="slide">[\s\S]*?<\/div>\s*<\/body>/)[0]
        .replace(/<\/body>$/,''))
       .join('\n')}
    </body></html>`;

  await pdfPage.setContent(combinedHTML, { waitUntil: 'networkidle' });
  await pdfPage.waitForTimeout(800);
  await pdfPage.pdf({
    path: PDF_OUT,
    width: '1200px',
    height: '1200px',
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  await pdfCtx.close();

  const pdfSize = (fs.statSync(PDF_OUT).size / 1024).toFixed(0);
  console.log(`\n✓ ${path.relative(ROOT, PDF_OUT)}  ${pdfSize} KB  (5 pages, square)`);

  await browser.close();
})().catch(err => { console.error(err); process.exit(1); });
