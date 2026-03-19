---
name: slide-generator
description: |
  slide-plan.mdまたはユーザーの情報からdeck.jsonを生成する。44種類のレイアウトから最適なものを選び、コンテンツスキーマに従ってJSONを出力する。
  スライド生成、deck.json作成、JSON生成、generate slides、プレゼンをJSONにして と言われたら必ずこのスキルを使う。
  /slide-planner の出力を入力として受け取ることが多い。
argument-hint: "[プレゼンの内容 or slide-plan.mdの内容]"
allowed-tools: Read, Write, Glob, Grep, Bash(npx tsc *)
---

# Slide Generator

情報を受け取り、`public/deck.json` を生成する。

## 出力
- `public/deck.json` — スライドデッキ定義
- `output/image-prompts/*.md` — 画像プレースホルダーがあれば自動生成

## 手順

1. 入力を分析し、スライド構成を決定（`public/slide-plan.md` があれば優先的に参照）
2. レイアウト選択（[reference.md](reference.md) のユースケースとスペックを参照）
3. コンテンツスキーマの制約内で値を生成
4. `public/deck.json` に出力
5. `http://localhost:5173/?deck=deck.json` で確認するよう案内

## 重要なルール

### デコレーション
スライドの性質に応じて選択する。**1スライドにラインとカーブを混在させない。**
- **lines-double / lines-mixed**: データ、数値、比較、分析 → 理性的な内容
- **corners 指定**: ビジョン、メッセージ、挨拶 → 感情的な内容（`{ "corners": ["top-left", "bottom-right"] }` 形式）
- **none**: 全画面背景(#24,#25,#27)、ガラス風(#21,#37)、全画面動画(#40)

### スライド構成
1. タイトルスライド(#1)で始める
2. 3セクション以上なら目次(#4)を入れる
3. 同じテンプレートを3回連続で使わない
4. 2〜3スライドに1枚は画像付きテンプレートを入れる
5. クロージング(#5)またはQ&A(#30)で終える

### アイコン
Lucideアイコンのキー名のみ使用。**絵文字禁止。**
ビジネス: lightbulb, handshake, target, globe, rocket, trophy, award, crown
状態: check, check-circle, star, shield, shield-check, lock
時間: clock, calendar, timer, hourglass
データ: chart, trending-up, trending-down, pie-chart, activity, database
テクノロジー: code, terminal, cpu, cloud, wifi, zap, settings, wrench
その他: search, eye, users, heart, mail, building, briefcase, dollar, layers, sparkles, leaf, flame

### 画像プレースホルダー
```json
"image": { "description": "画像の説明", "style": "photo", "mood": "professional" }
```

### フォント
```json
"fonts": {
  "en": { "heading": "Cormorant Garamond", "body": "Poppins" },
  "ja": { "heading": "Shippori Mincho", "body": "Zen Kaku Gothic New" }
}
```

### ブランディング
```json
"branding": { "logo": "/assets/logo.svg", "logoPosition": "bottom-right", "confidential": true }
```

## 参考資料
- 全46レイアウトのユースケース・スペック: [reference.md](reference.md)
- サンプル: `public/deck-all-ja.json` を Read で確認可能
