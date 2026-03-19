---
name: export-pdf
description: Playwrightでスライドをスクリーンショットし、PDFまたはPNG画像として出力する。PDF出力、画像出力、エクスポートと言われたときに使う。
argument-hint: "[deck.jsonファイル名（省略時: deck.json）] [pdf|png（省略時: pdf）]"
disable-model-invocation: false
allowed-tools: Bash(node *), Bash(mkdir *), Read
---

# Export PDF / PNG

Playwrightで全スライドをスクリーンショットし、PDFまたはPNG画像として出力する。
html2canvasより確実で、表示通りの出力が得られる。

## 手順

1. 引数からファイル名とフォーマットを取得（デフォルト: `deck.json`, `pdf`）
2. `output/screenshots/` にスクショを撮影
3. フォーマットに応じて出力:
   - `pdf`: スクショを結合して1つのPDFに
   - `png`: スクショをそのまま `output/slides/` にコピー

## スクリーンショット撮影スクリプト

以下のNode.jsスクリプトを実行する。ファイル名は引数に応じて変更すること。

```javascript
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const deckFile = process.argv[2] || 'deck.json';
const outDir = 'output/screenshots';
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto(`http://localhost:5173/?deck=${deckFile}`);
  await page.waitForTimeout(3000);

  const items = await page.locator('div[style*="cursor: pointer"]').all();
  const count = items.length;
  console.log(`Found ${count} slides`);

  for (let i = 0; i < count; i++) {
    await items[i].click();
    await page.waitForTimeout(500);
    const slideEl = await page.locator('[data-slide-index]').first();
    const file = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    await slideEl.screenshot({ path: file });
    console.log(`Captured: ${file}`);
  }

  await browser.close();
  console.log(`Done: ${count} slides saved to ${outDir}/`);
})();
```

## PDF結合スクリプト

スクショ撮影後、以下でPDFに結合する：

```javascript
const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

const outDir = 'output/screenshots';
const files = fs.readdirSync(outDir)
  .filter(f => f.endsWith('.png'))
  .sort();

if (files.length === 0) {
  console.error('No screenshots found');
  process.exit(1);
}

// 16:9 landscape
const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1920, 1080] });

files.forEach((file, i) => {
  if (i > 0) pdf.addPage();
  const imgData = fs.readFileSync(path.join(outDir, file));
  const base64 = 'data:image/png;base64,' + imgData.toString('base64');
  pdf.addImage(base64, 'PNG', 0, 0, 1920, 1080);
  console.log(`Added: ${file}`);
});

const outputPath = 'output/slides.pdf';
fs.writeFileSync(outputPath, Buffer.from(pdf.output('arraybuffer')));
console.log(`PDF saved: ${outputPath} (${files.length} pages)`);
```

## 実行の流れ

1. `mkdir -p output/screenshots output/slides`
2. スクリーンショット撮影スクリプトを実行
3. フォーマットが `pdf` の場合:
   - PDF結合スクリプトを実行
   - `output/slides.pdf` の完成を報告
4. フォーマットが `png` の場合:
   - `output/screenshots/` のファイル一覧を報告

## 前提条件
- `npm run dev` でローカルサーバーが起動していること（http://localhost:5173/）
- playwright がインストール済みであること
