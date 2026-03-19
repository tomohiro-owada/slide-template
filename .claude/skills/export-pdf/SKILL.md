---
name: export-pdf
description: |
  Playwrightでスライドをスクリーンショットし、PDFまたはPNG画像として出力する。html2canvasより確実で表示通りの出力が得られる。
  PDF出力、画像出力、エクスポート、スライドをPDFにして、PNGで出力、export slides と言われたら必ずこのスキルを使う。
  ワークフローの最終ステップとして使う。
argument-hint: "[ファイル名（省略時: deck.json）] [pdf|png（省略時: pdf）]"
disable-model-invocation: true
allowed-tools: Bash(node *), Bash(mkdir *), Read
---

# Export PDF / PNG

Playwrightで全スライドをスクリーンショットし、PDF or PNG として出力する。

## 手順

1. 引数からファイル名とフォーマットを取得（デフォルト: `deck.json`, `pdf`）
2. `mkdir -p output/screenshots output/slides`
3. スクリーンショット撮影スクリプトを実行
4. pdf の場合: PDF結合スクリプトを実行 → `output/slides.pdf`
5. png の場合: `output/screenshots/` のファイル一覧を報告

## スクリーンショット撮影

```javascript
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const deckFile = process.argv[2] || 'deck.json';
fs.mkdirSync('output/screenshots', { recursive: true });
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto(`http://localhost:5173/?deck=${deckFile}`);
  await page.waitForTimeout(3000);
  const items = await page.locator('div[style*="cursor: pointer"]').all();
  console.log(`Found ${items.length} slides`);
  for (let i = 0; i < items.length; i++) {
    await items[i].click();
    await page.waitForTimeout(500);
    const el = await page.locator('[data-slide-index]').first();
    const file = path.join('output/screenshots', `slide-${String(i+1).padStart(2,'0')}.png`);
    await el.screenshot({ path: file });
    console.log(`Captured: ${file}`);
  }
  await browser.close();
  console.log('Done');
})();
```

## PDF結合

```javascript
const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');
const dir = 'output/screenshots';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png')).sort();
const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1920, 1080] });
files.forEach((file, i) => {
  if (i > 0) pdf.addPage();
  const base64 = 'data:image/png;base64,' + fs.readFileSync(path.join(dir, file)).toString('base64');
  pdf.addImage(base64, 'PNG', 0, 0, 1920, 1080);
  console.log(`Added: ${file}`);
});
fs.mkdirSync('output/slides', { recursive: true });
fs.writeFileSync('output/slides/slides.pdf', Buffer.from(pdf.output('arraybuffer')));
console.log(`PDF: output/slides/slides.pdf (${files.length} pages)`);
```

## 前提
- `npm run dev` で http://localhost:5173/ が起動していること
