---
name: slide-generator
description: プレゼンテーション情報からdeck.jsonとスライドを自動生成する。プレゼン作成、スライド生成、資料作成と言われたときに使う。
argument-hint: "[プレゼンの内容やテーマを記述]"
disable-model-invocation: false
allowed-tools: Read, Write, Glob, Grep, Bash(npx tsc *)
---

# Slide Generator

ユーザーから受け取った情報をもとに、スライドプレゼンテーション用の `deck.json` を生成する。

## 出力先
- `public/deck.json` — スライドデッキ定義
- `output/image-requests/*.md` — 画像/動画1件につき1ファイル

## 手順

1. ユーザーの情報（$ARGUMENTS）を分析し、セクション構成を決める
2. 各セクションに適切なレイアウト番号を選択（レイアウト一覧とユースケースは [reference.md](reference.md) を参照）
3. コンテンツスキーマの制約に従って値を埋める（レイアウト別スペックは [reference.md](reference.md) の「レイアウト別コンテンツスペック」を参照）
4. `public/deck.json` にJSON出力
5. 画像プレースホルダーがあれば `output/image-requests/` にMDファイルを出力
6. `http://localhost:5173/?deck=deck.json` で確認するよう案内

## 重要なルール

### デコレーション選択
- **lines-double**: データ、数値、比較、分析 → 理性的な内容
- **curves + corners指定**: ビジョン、メッセージ、挨拶 → 感情的な内容
- **none**: 全画面背景(#24,#25,#27)、ガラス風(#21,#37)、全画面動画(#40)
- ラインとカーブは1スライドに混在させない
- corners は `{ "corners": ["top-left", "bottom-right"] }` の形式でスライドごとに指定

### スライド構成
1. タイトルスライド(#1)で始める
2. 3セクション以上なら目次(#4)を入れる
3. セクション区切りにセクション開始(#2)を使う
4. 同じテンプレートを3回連続で使わない
5. 2〜3スライドに1枚は画像付きテンプレートを入れる
6. クロージング(#5)またはQ&A(#30)で終える

### アイコン（icon フィールド）
Lucideアイコンのキー名のみ使用。**絵文字は使わない。**
ビジネス: lightbulb, handshake, target, globe, rocket, trophy, award, crown
状態: check, check-circle, star, shield, shield-check, lock
時間: clock, calendar, timer, hourglass
データ: chart, trending-up, trending-down, pie-chart, activity, database
テクノロジー: code, terminal, cpu, cloud, wifi, zap, settings, wrench
その他: search, eye, users, heart, mail, building, briefcase, dollar, layers, sparkles, leaf, flame

### 画像プレースホルダー
```json
"image": {
  "description": "画像の説明（生成AIへの指示になる）",
  "style": "photo | illustration | icon | abstract",
  "mood": "professional, modern 等"
}
```

### フォント
```json
"fonts": {
  "en": { "heading": "Cormorant Garamond", "body": "Poppins" },
  "ja": { "heading": "Shippori Mincho", "body": "Zen Kaku Gothic New" }
}
```
利用可能: Playfair Display, Cormorant Garamond, DM Serif Display, Montserrat, Inter, Poppins / Noto Serif JP, Shippori Mincho, Zen Old Mincho, BIZ UDMincho, Noto Sans JP, Zen Kaku Gothic New, BIZ UDGothic, M PLUS Rounded 1c

## 参考資料
- 全44レイアウトの番号・ユースケース・コンテンツスペック: [reference.md](reference.md)
- サンプルJSON: `public/deck-all-ja.json` を Read で確認可能
