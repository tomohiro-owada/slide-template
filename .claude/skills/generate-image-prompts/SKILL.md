---
name: generate-image-prompts
description: deck.jsonのプレースホルダー画像から、画像生成AI用のプロンプトMDファイルを1画像1ファイルで生成する。画像生成、プロンプト生成、image promptと言われたときに使う。
argument-hint: "[deck.jsonのパス（省略時: public/deck.json）]"
disable-model-invocation: false
allowed-tools: Read, Write, Glob
---

# Generate Image Prompts

deck.json 内の画像・動画プレースホルダーを抽出し、`output/image-prompts/` に1画像1MDファイルで生成プロンプトを出力する。

## 手順

1. `$ARGUMENTS` で指定された deck.json を Read する（省略時: `public/deck.json`）
2. 各スライドの content を再帰的に走査し、`description` フィールドを持つオブジェクトを抽出
3. 抽出した画像/動画ごとに `output/image-prompts/{スライド番号}-{フィールド名}.md` を Write する
4. 生成したファイル一覧を報告

## 出力MDフォーマット

```markdown
# Image Generation Request

## Context
- **Deck**: {デッキタイトル}
- **Slide**: {スライド番号} / {全スライド数}
- **Layout**: #{レイアウト番号} {レイアウト名}
- **Field**: {フィールドパス（例: image, columns[0].image）}

## Specification
- **Description**: {description の値}
- **Style**: {style の値、なければ "photo"}
- **Mood**: {mood の値、なければ "professional"}
- **Aspect Ratio**: {レイアウトのスペックから判定（16:9, 4:3, 1:1, 9:16）}

## Prompt for Image Generation
> {description を画像生成AIに最適化した詳細プロンプトに拡張}
> スタイル: {style}、ムード: {mood}
> 高品質、プロフェッショナル、プレゼンテーション用途

## Negative Prompt
> blurry, low quality, watermark, text overlay, cartoonish, amateur
```

## ルール

- ファイル名は `{2桁スライド番号}-{フィールド名}.md`（例: `03-image.md`, `09-columns-0-image.md`）
- video フィールド（key名に video を含む）の場合は `# Video Generation Request` とする
- description の内容をそのまま使うのではなく、画像生成AIに適した詳細なプロンプトに拡張する
  - 具体的な構図、照明、色調、被写体の詳細を追加
  - スライドの文脈（タイトルや本文）も考慮して適切な画像を指示
- 既存のファイルがある場合は上書きする
