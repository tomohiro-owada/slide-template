---
name: generate-image-prompts
description: |
  deck.jsonの画像・動画プレースホルダーから、画像生成AI用のプロンプトMDファイルを1件1ファイルで生成する。
  画像プロンプト作って、image prompt、画像生成依頼、プレースホルダーの画像を用意して と言われたら必ずこのスキルを使う。
  /validate-deck の後に実行するのが標準フロー。
argument-hint: "[deck.jsonのファイル名（省略時: deck.json）]"
disable-model-invocation: true
allowed-tools: Read, Write, Glob
---

# Generate Image Prompts

deck.json 内のプレースホルダーを抽出し、`output/image-prompts/` に1件1MDで生成プロンプトを出力する。

## 手順

1. `public/$ARGUMENTS`（省略時: `public/deck.json`）を Read
2. 各スライドの content を再帰的に走査し、`description` フィールドを持つオブジェクトを抽出
3. 抽出した画像/動画ごとに `output/image-prompts/{スライド番号}-{フィールド名}.md` を Write
4. 生成ファイル一覧を報告

## 出力フォーマット

ファイル名: `{2桁スライド番号}-{フィールド名}.md`（例: `03-image.md`, `09-columns-0-image.md`）

```markdown
# Image Generation Request

## Context
- **Deck**: {デッキタイトル}
- **Slide**: {番号} / {全スライド数}
- **Layout**: #{レイアウト番号} {レイアウト名}
- **Field**: {フィールドパス}

## Specification
- **Description**: {description}
- **Style**: {style、なければ "photo"}
- **Mood**: {mood、なければ "professional"}
- **Aspect Ratio**: {16:9 / 4:3 / 1:1 / 9:16}

## Prompt for Image Generation
> {descriptionを画像生成AIに最適化した詳細プロンプトに拡張。具体的な構図・照明・色調・被写体を追記。スライドのタイトルや本文の文脈も考慮する}

## Negative Prompt
> blurry, low quality, watermark, text overlay, cartoonish, amateur
```

## ルール

- description をそのまま使わず、画像生成AIに適した詳細プロンプトに**拡張する**
- video フィールドの場合は `# Video Generation Request` とする
- 既存ファイルがある場合は上書き
