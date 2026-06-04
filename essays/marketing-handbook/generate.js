// Marketing handbook — 10 pages at 1200×1500, deviceScaleFactor 2.
// Outputs: png/NN-*.png + handbook.pdf (one PDF, 10 pages).

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const PNG_OUT = path.join(ROOT, 'png');
const PDF_OUT = path.join(ROOT, 'handbook.pdf');

fs.mkdirSync(PNG_OUT, { recursive: true });

const slides = fs.readdirSync(SRC)
  .filter(f => f.endsWith('.html'))
  .sort();

(async () => {
  const browser = await chromium.launch();

  // 1) Per-page PNGs — dpr 1.25 (sharp on phone retina, sensible file size)
  const ctx = await browser.newContext({
    viewport: { width: 1200, height: 1500 },
    deviceScaleFactor: 1.25,
  });
  const page = await ctx.newPage();
  for (const f of slides) {
    const url = `file://${path.join(SRC, f)}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const out = path.join(PNG_OUT, f.replace(/\.html$/, '.jpg'));
    await page.locator('.page').screenshot({ path: out, type: 'jpeg', quality: 92 });
    const size = (fs.statSync(out).size / 1024).toFixed(0);
    console.log(`✓ ${f.replace('.html','.jpg').padEnd(30)}  ${size} KB`);
  }
  await ctx.close();

  // 2) Bundled PDF
  const pdfCtx = await browser.newContext({
    viewport: { width: 1200, height: 1500 },
  });
  const pdfPage = await pdfCtx.newPage();
  const combinedHTML = `<!doctype html><html><head>
    <meta charset="utf-8"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Italiana&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="file://${path.join(SRC,'handbook.css')}">
    <style>body{margin:0}.page{page-break-after:always;break-after:page}.page:last-child{page-break-after:auto;break-after:auto}</style>
    </head><body>
    ${slides.map(f => {
      const html = fs.readFileSync(path.join(SRC,f),'utf8');
      const m = html.match(/<div class="page">[\s\S]*?<\/div>\s*<\/body>/);
      return m ? m[0].replace(/<\/body>$/,'') : '';
    }).join('\n')}
    </body></html>`;

  await pdfPage.setContent(combinedHTML, { waitUntil: 'networkidle' });
  await pdfPage.waitForTimeout(800);
  await pdfPage.pdf({
    path: PDF_OUT,
    width: '1200px',
    height: '1500px',
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  await pdfCtx.close();

  const pdfSize = (fs.statSync(PDF_OUT).size / 1024).toFixed(0);
  console.log(`\n✓ ${path.relative(ROOT, PDF_OUT)}  ${pdfSize} KB  (${slides.length} pages)`);

  await browser.close();
})().catch(err => { console.error(err); process.exit(1); });
