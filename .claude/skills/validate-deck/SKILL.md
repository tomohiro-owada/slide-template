---
name: validate-deck
description: deck.jsonを検証し、各スライドのテンプレートスキーマと突き合わせて未使用フィールドの補完または削除を行う。Playwrightで全ページスクショも撮る。deck検証、JSON検証、バリデーションと言われたときに使う。
argument-hint: "[deck.jsonのパス（省略時: public/deck.json）]"
disable-model-invocation: false
allowed-tools: Read, Write, Glob, Grep, Bash(node *), Bash(npx playwright *)
---

# Validate Deck

deck.json の各スライドを検証し、Playwrightで全ページスクリーンショットを撮ってレビューしやすくする。

## 手順

### Phase 1: スクリーンショット撮影

1. `$ARGUMENTS` で指定された deck.json のファイル名を取得（省略時: `deck.json`）
2. 以下のスクリプトで全スライドのスクショを `output/screenshots/` に保存:

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:5173/?deck={ファイル名}');
  await page.waitForTimeout(2000);
  const items = await page.locator('div[style*="cursor: pointer"]').all();
  for (let i = 0; i < items.length; i++) {
    await items[i].click();
    await page.waitForTimeout(500);
    const slideEl = await page.locator('[data-slide-index]').first();
    await slideEl.screenshot({ path: `output/screenshots/slide-${String(i+1).padStart(2,'0')}.png` });
  }
  await browser.close();
})();
```

3. 撮影したスクショを Read で1枚ずつ確認し、視覚的な問題もチェック

### Phase 2: スキーマ検証

1. deck.json を Read する
2. レイアウト別コンテンツスペックを [reference.md](../slide-generator/reference.md) から確認
3. 各スライドについて以下をチェック:
   - **欠損フィールド**: スキーマで required なフィールドが content に存在しないもの
   - **未使用フィールド**: スキーマに定義がないのに content に含まれているもの
   - **文字数超過**: スペックの目安文字数を大幅に超えているもの
   - **リスト個数**: min/max を外れているもの
   - **アイコン名**: Lucide アイコンキー名以外が使われていないか
   - **デコレーション**: decoration: false のレイアウトに decoration 指定がないか
4. スクショで確認した視覚的問題も報告に含める

### Phase 3: 報告と修正

1. 問題を一覧で報告する（スクショのパスも添える）
2. 修正方針をユーザーに提示する:
   - **欠損 required**: スライドの文脈から適切な値を提案
   - **未使用フィールド**: 削除を提案（無駄な情報は出さない）
   - **optional 未使用**: 見栄えが良くなるなら値を提案、不要なら放置
   - **文字数超過**: 短縮案を提案
   - **視覚的問題**: レイアウト崩れ、余白過多、文字切れ等を報告
3. ユーザーの承認を得てから deck.json を修正して Write する

## 判断基準

### 補完すべきケース
- required フィールドが空 → スライドの内容・文脈から適切な値を生成
- 画像の description が空 → スライドのタイトルや本文から推測して記述
- stats の trend が未指定 → 数値の文脈から up/down/neutral を推定

### 削除すべきケース
- スキーマに存在しないフィールド → 削除
- optional で空文字 "" や null → 削除
- 意味のない値（"TBD", "TODO", "xxx" 等） → 削除するか適切な値に置換

### 放置してよいケース
- optional フィールドが未指定 → テンプレートが正常に描画されるなら不要
- presenter, contactUrl 等の個人情報系 → 強制しない

## 報告フォーマット

```
## Validation Report

### Slide 1 (#1 title)
📸 output/screenshots/slide-01.png
- ✅ 問題なし

### Slide 2 (#4 table-of-contents)
📸 output/screenshots/slide-02.png
- ⚠️ items[2].description が空 → 「今後の展望と計画」を提案
- 🗑️ unknownField → 削除

### Slide 3 (#28 statistics)
📸 output/screenshots/slide-03.png
- ❌ stats[0].value が欠損（required）→ 補完必要
- ⚠️ title が25字（目安11字）→ 短縮を提案
- 👁️ 視覚: 数字が右端で切れている

### Summary
- 📸 スクショ: output/screenshots/ に {N}枚保存
- ✅ 正常: 5 スライド
- ⚠️ 要確認: 2 スライド
- ❌ 要修正: 1 スライド
```
