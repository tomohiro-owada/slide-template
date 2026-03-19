---
name: chart-designer
description: データと主張からChart.jsのチャート設定を生成する。チャート作成、グラフ作成、データ可視化と言われたときに使う。主張に合わせた色のintentを自動選択する。
argument-hint: "[データの説明と伝えたいメッセージ]"
disable-model-invocation: false
allowed-tools: Read, Write
---

# Chart Designer

データと「何を主張したいか」から、deck.json 用のチャート設定（ChartBlockData）を生成する。

## 最も重要な原則

**チャートの目的はデータを見せることではなく、主張を伝えること。**

- 「売上が伸びた」を伝えたいなら → 最新の値だけハイライト、他はグレー
- 「A vs B の差」を見せたいなら → 2色の対比
- 「全体の構成」を見せたいなら → カテゴリ別に均等な色分け
- 「段階的に増えた」を見せたいなら → 同系色のグラデーション
- 「良い/悪いの判定」を見せたいなら → 緑/赤の diverging

## intent の選択基準

| 主張 | intent | 色の振る舞い |
|---|---|---|
| 1つの値が重要 | `highlight` | 指定した1つだけ濃色、他は全部 `gray[200]` |
| カテゴリの比較 | `categorical` | 全項目に異なる色（blue, emerald, amber, red, violet, pink） |
| 時系列・段階 | `sequential` | 同系色の薄→濃グラデーション |
| 良い↔悪い | `diverging` | 正の値=emerald、負の値=red、ゼロ=gray |
| 2者の比較 | `comparison` | A=navy、B=warm（2色のみ） |

## チャートタイプの選択基準

| データの性質 | type | 理由 |
|---|---|---|
| 時系列の推移 | `line` | 連続的な変化を表現 |
| カテゴリ別の量 | `bar` | 離散的な比較に最適 |
| 構成比・割合 | `pie` or `doughnut` | 全体に対する部分を表現 |
| 多軸の評価 | `radar` | 複数指標のバランスを表現 |
| カテゴリ別の割合 | `polarArea` | 角度=カテゴリ、面積=量 |

## 出力フォーマット

deck.json のスライドに含める `chart` フィールド：

```json
{
  "type": "bar",
  "intent": "highlight",
  "highlightIndex": 3,
  "labels": ["Q1", "Q2", "Q3", "Q4"],
  "datasets": [
    { "label": "売上（億円）", "data": [2.8, 3.1, 3.4, 4.2] }
  ]
}
```

### intent 別の追加フィールド

- `highlight`: `highlightIndex` (number) — 目立たせるデータのインデックス
- `comparison`: datasets を2つにする（A群とB群）
- `diverging`: data の値の正負で自動的に色が変わる

## 手順

1. ユーザーからデータと主張を受け取る
2. **何を伝えたいか**を確認（推測で intent を決めない）
3. 適切な type と intent を選択
4. ChartBlockData を JSON で生成
5. deck.json のどのスライドに入れるか確認
   - 新規スライド: layout #45（チャートのみ）or #46（チャート＋テキスト）
   - 既存スライドへの追加も可能
6. deck.json を更新

## やってはいけないこと

- **全部の値に色を付ける**（highlight intent なのに全色バラバラにしない）
- **虹色にする**（categorical 以外で6色使わない）
- **3D効果**（Chart.js にはないし、データを歪める）
- **凡例が本体より大きい**（datasets が1つなら凡例非表示）
- **デッキの配色と合わない色**（chart-theme.ts の定義内の色のみ使用）

## 主張と intent の具体例

### 「Q4の売上が過去最高」
```json
{ "type": "bar", "intent": "highlight", "highlightIndex": 3 }
```
→ Q4だけ navy[900]、Q1-Q3 は gray[200]

### 「自社 vs 競合の差」
```json
{ "type": "bar", "intent": "comparison" }
→ datasets を2つ: 自社=navy, 競合=warm
```

### 「満足度が月ごとに改善」
```json
{ "type": "line", "intent": "sequential" }
```
→ blue[100]→blue[900] のグラデーション

### 「事業の収支」
```json
{ "type": "bar", "intent": "diverging" }
```
→ 利益=emerald, 損失=red

### 「部門別の売上構成」
```json
{ "type": "doughnut", "intent": "categorical" }
```
→ 各部門に異なる色
