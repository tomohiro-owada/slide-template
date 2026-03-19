---
name: chart-designer
description: |
  データと「何を主張したいか」からChart.jsのチャート設定を生成する。主張に合わせた色のintentを自動選択し、deck.jsonに組み込む。
  チャート作りたい、グラフ作りたい、データを可視化したい、chart作成、棒グラフ、円グラフ、折れ線グラフ と言われたら必ずこのスキルを使う。
  データの見せ方について相談された場合もこのスキルが適切。
argument-hint: "[データの説明と伝えたいメッセージ]"
allowed-tools: Read, Write
---

# Chart Designer

データと主張から、deck.json 用のチャート設定（ChartBlockData）を生成する。

## 最重要原則

**チャートの目的はデータを見せることではなく、主張を伝えること。**
色は主張に従う。全部に色を付けない。

## intent 選択基準

| 何を伝えたいか | intent | 色の振る舞い |
|---|---|---|
| 1つの値が重要 | `highlight` | 指定した1つだけ濃色、他は全部グレー |
| カテゴリの比較 | `categorical` | 全項目に異なる色 |
| 時系列・段階 | `sequential` | 同系色の薄→濃グラデーション |
| 良い↔悪い | `diverging` | 正=emerald、負=red、ゼロ=gray |
| 2者の比較 | `comparison` | A=navy、B=warm（2色のみ） |

## チャートタイプ選択

| データの性質 | type | 理由 |
|---|---|---|
| 時系列の推移 | `line` | 連続的な変化 |
| カテゴリ別の量 | `bar` | 離散的な比較 |
| 構成比・割合 | `pie` / `doughnut` | 全体に対する部分 |
| 多軸の評価 | `radar` | 複数指標のバランス |

## 出力フォーマット

```json
{
  "type": "bar",
  "intent": "highlight",
  "highlightIndex": 3,
  "labels": ["Q1", "Q2", "Q3", "Q4"],
  "datasets": [{ "label": "売上（億円）", "data": [2.8, 3.1, 3.4, 4.2] }]
}
```

## 手順

1. データと主張を受け取る
2. **何を伝えたいか**を確認（推測で intent を決めない）
3. type と intent を選択
4. ChartBlockData を生成
5. deck.json のスライドに組み込む（#45 チャートのみ / #46 チャート＋テキスト）

## やってはいけないこと

- highlight intent なのに全色バラバラにする
- categorical 以外で6色使う
- datasets が1つなのに凡例を表示する
- chart-theme.ts の定義外の色を使う
