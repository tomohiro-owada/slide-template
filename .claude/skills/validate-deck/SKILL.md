---
name: validate-deck
description: deck.jsonを検証し、各スライドのテンプレートスキーマと突き合わせて未使用フィールドの補完または削除を行う。deck検証、JSON検証、バリデーションと言われたときに使う。
argument-hint: "[deck.jsonのパス（省略時: public/deck.json）]"
disable-model-invocation: false
allowed-tools: Read, Write, Glob, Grep
---

# Validate Deck

deck.json の各スライドを、対応するレイアウトのコンテンツスキーマと突き合わせて検証・修正する。

## 手順

1. `$ARGUMENTS` で指定された deck.json を Read する（省略時: `public/deck.json`）
2. レイアウト別コンテンツスペックを [reference.md](../slide-generator/reference.md) から確認
3. 各スライドについて以下をチェック:
   - **欠損フィールド**: スキーマで required なフィールドが content に存在しないもの
   - **未使用フィールド**: スキーマに定義がないのに content に含まれているもの
   - **文字数超過**: スペックの目安文字数を大幅に超えているもの
   - **リスト個数**: min/max を外れているもの
   - **アイコン名**: Lucide アイコンキー名以外が使われていないか
   - **デコレーション**: decoration: false のレイアウトに decoration 指定がないか
4. 問題を一覧で報告する
5. 修正方針をユーザーに提示する:
   - **欠損 required**: スライドの文脈から適切な値を提案する
   - **未使用フィールド**: 削除を提案する（無駄な情報は出さない）
   - **optional 未使用**: そのテンプレートの見栄えが良くなるなら値を提案、不要なら放置
   - **文字数超過**: 短縮案を提案する
6. ユーザーの承認を得てから deck.json を修正して Write する

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
- ✅ 問題なし

### Slide 2 (#4 table-of-contents)
- ⚠️ items[2].description が空 → 「今後の展望と計画」を提案
- 🗑️ unknownField → 削除

### Slide 3 (#28 statistics)
- ❌ stats[0].value が欠損（required）→ 補完必要
- ⚠️ title が25字（目安11字）→ 短縮を提案

### Summary
- ✅ 正常: 5 スライド
- ⚠️ 要確認: 2 スライド
- ❌ 要修正: 1 スライド
```
