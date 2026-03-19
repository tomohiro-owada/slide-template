---
name: validate-deck
description: |
  deck.jsonの品質検証を行う。Playwrightで全ページスクリーンショットを撮影し、スキーマとの突き合わせで未使用・欠損フィールドを検出、修正提案する。
  デッキ検証、JSON検証、バリデーション、スライドチェック、validate、check deck と言われたら必ずこのスキルを使う。
  /slide-generator で deck.json を作った後に実行するのが標準フロー。
argument-hint: "[deck.jsonのファイル名（省略時: deck.json）]"
disable-model-invocation: true
allowed-tools: Read, Write, Glob, Grep, Bash(node *), Bash(npx playwright *)
---

# Validate Deck

deck.json の各スライドを検証し、Playwrightで全ページスクショを撮ってレビューする。

## Phase 1: スクリーンショット撮影

`$ARGUMENTS` のファイル名（省略時: `deck.json`）を使い、以下のスクリプトで撮影する：

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
  await page.waitForTimeout(2000);
  const items = await page.locator('div[style*="cursor: pointer"]').all();
  for (let i = 0; i < items.length; i++) {
    await items[i].click();
    await page.waitForTimeout(500);
    const el = await page.locator('[data-slide-index]').first();
    await el.screenshot({ path: `output/screenshots/slide-${String(i+1).padStart(2,'0')}.png` });
  }
  await browser.close();
})();
```

撮影後、各スクショを Read で確認し視覚的問題もチェックする。

## Phase 2: スキーマ検証

deck.json を Read し、[reference.md](../slide-generator/reference.md) のスペックと突き合わせる：

- **欠損**: required フィールドが存在しない
- **不要**: スキーマにないフィールドが含まれている
- **文字数超過**: スペックの目安を大幅に超えている
- **リスト個数**: min/max を外れている
- **アイコン名**: Lucide キー名以外が使われている
- **デコレーション**: decoration: false のレイアウトに decoration 指定がある

## Phase 3: 報告と修正

### 修正方針
- **欠損 required** → 文脈から適切な値を提案
- **不要フィールド** → 削除を提案
- **optional 未使用** → 見栄えが良くなるなら提案、不要なら放置
- **文字数超過** → 短縮案を提案
- **視覚的問題** → レイアウト崩れ、余白過多、文字切れを報告

### 報告フォーマット

```
## Validation Report

### Slide 1 (#1 title)
📸 output/screenshots/slide-01.png
- ✅ 問題なし

### Slide 3 (#28 statistics)
📸 output/screenshots/slide-03.png
- ❌ stats[0].value が欠損 → 補完必要
- ⚠️ title が25字（目安11字）→ 短縮を提案

### Summary
- 📸 スクショ: output/screenshots/ に {N}枚
- ✅ 正常: N / ⚠️ 要確認: N / ❌ 要修正: N
```

ユーザーの承認を得てから修正を適用する。
