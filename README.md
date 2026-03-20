# Slide Template

**情報を渡すだけでプレゼン資料が完成する**、React + Chart.js ベースのスライドテンプレートシステム。

Claude Code のスキルと組み合わせることで、対話的にプレゼンの構成を設計し、JSONからスライドを自動生成、画像生成AIへの依頼まで一気通貫で行えます。

![slide-template demo](https://img.shields.io/badge/layouts-46-blue) ![skills](https://img.shields.io/badge/skills-6-green) ![license](https://img.shields.io/badge/license-MIT-lightgrey)

---

## クイックスタート

### 1. セットアップ

```bash
git clone https://github.com/tomohiro-owada/slide-template.git
cd slide-template
npm install
npm run dev
```

### 2. ブラウザで確認

- テンプレート一覧: http://localhost:5173/
- サンプルデッキ: http://localhost:5173/?deck=deck-all-ja.json

### 3. Claude Code でスライドを作る

```
/slide-planner Q3の業績報告。売上4.2億、成長率23%、新規顧客3社獲得
```

あとは対話に答えていくだけで、構成設計 → JSON生成 → 検証 → PDF出力まで完了します。

---

## ワークフロー

情報からPDFまで、6つのスキルがパイプラインとして繋がっています。

```
① /slide-planner     情報整理 → 対話で構成設計 → slide-plan.md
        ↓
② /slide-generator   構成案 → deck.json 生成
        ↓
③ /chart-designer    データ＋主張 → チャート設定生成
        ↓
④ /validate-deck     Playwrightスクショ＋スキーマ検証
        ↓
⑤ /generate-image-prompts   画像生成AI用プロンプトMD出力
        ↓
⑥ /export-pdf        Playwright → PDF / PNG 出力
```

### 各スキルの詳細

#### `/slide-planner` — 構成設計（最初に使う）

大量の情報やメモを渡すと、対話を通じてプレゼンの骨格を設計します。

**5つの質問で核心を引き出す：**
1. 誰に向けて？
2. 何を持ち帰ってほしい？
3. 一言で言うと？
4. 制約は？（持ち時間、ページ数）
5. トーンは？

情報を🟢（使う）🟡（付録）🔴（使わない）に仕分けし、使わなかった情報も記録するので後から復活できます。

#### `/slide-generator` — JSON生成

slide-plan.md や直接の情報から `deck.json` を生成します。46種類のレイアウトから最適なものを自動選択し、コンテンツの文字数制約も守ります。

#### `/chart-designer` — チャート設計

**チャートの目的はデータを見せることではなく、主張を伝えること。** データと「何を伝えたいか」から、色の使い方（intent）を自動決定します。

| 伝えたいこと | intent | 色の動き |
|---|---|---|
| 1つの値が重要 | `highlight` | その値だけ濃色、他は全部グレー |
| カテゴリの比較 | `categorical` | 各項目に異なる色 |
| 段階的な変化 | `sequential` | 同系色の薄→濃 |
| 良い↔悪い | `diverging` | 正=緑、負=赤 |
| 2者の比較 | `comparison` | A=navy、B=warm |

#### `/validate-deck` — 検証

Playwrightで全ページのスクリーンショットを撮影し、スキーマとの突き合わせで問題を検出します。修正はユーザーの承認後に適用。

#### `/generate-image-prompts` — 画像生成依頼

deck.json のプレースホルダー画像から、画像生成AI用のプロンプトMDファイルを1画像1ファイルで出力します。description をそのまま使うのではなく、構図・照明・色調まで拡張した詳細プロンプトを生成します。

#### `/export-pdf` — PDF / PNG 出力

Playwrightで全スライドをスクリーンショットし、PDFまたはPNG画像として出力します。html2canvas より確実で、表示通りの出力が得られます。

---

## deck.json の構造

スライドの全情報は1つのJSONファイルで管理されます。

```json
{
  "meta": {
    "title": "プレゼンタイトル",
    "author": "発表者名",
    "date": "2026-03-20"
  },
  "fonts": {
    "en": { "heading": "DM Serif Display", "body": "Poppins" },
    "ja": { "heading": "Shippori Mincho", "body": "Zen Kaku Gothic New" }
  },
  "branding": {
    "logo": "/assets/logo.svg",
    "logoPosition": "bottom-right",
    "confidential": true,
    "confidentialText": "社外秘"
  },
  "defaults": {
    "decoration": "curves-diagonal",
    "exposure": 0.8
  },
  "slides": [
    {
      "layout": 1,
      "decoration": { "corners": ["top-left", "bottom-right"] },
      "content": {
        "title": "タイトル",
        "subtitle": "サブタイトル"
      },
      "notes": "スピーカーノート（発表者だけが見るメモ）"
    }
  ]
}
```

### レイアウト番号

各スライドは `"layout": 番号` で指定します。番号とテンプレートの対応：

| カテゴリ | 番号 | テンプレート |
|---|---|---|
| **A. タイトル・セクション** | 1-5 | タイトル、セクション開始/終了、目次、クロージング |
| **B. カラムレイアウト** | 6-14 | 2カラム比較、テキスト+画像、3-5カラム、グリッド |
| **C. 箇条リスト** | 15-18 | 3ステップ、番号付き、タイムライン、アイコンリスト |
| **D. パネルデザイン** | 19-23 | 基本パネル、強調、ガラス風、グラデ、カード |
| **E. 背景・画像** | 24-27 | 全画面背景、右配置、日月、分割 |
| **F. 特殊** | 28-30, 45-46 | 統計数値、中央メッセージ、Q&A、チャート |
| **G. 応用パターン** | 31-39 | QRコード、問いかけ、比率、パネル混在 等 |
| **H. 動画** | 40-44 | 全画面動画、動画+テキスト、2動画比較 |

### デコレーション

スライドの飾り（角のカーブ、上下のライン）を制御します。

```json
// カーブ系（感情的な内容に）
"decoration": { "corners": ["top-left", "bottom-right"] }

// ライン系（データ・論理的な内容に）
"decoration": "lines-double"

// なし（全画面背景・動画に）
"decoration": "none"
```

**設計思想：** データを見せるスライドには直線（理性）、メッセージを伝えるスライドには曲線（感情）。内容の性質に合わせた飾りにすることで、伝わり方が変わります。

### フォント

英文と日本語を独立して指定できます。

```json
"fonts": {
  "en": { "heading": "DM Serif Display", "body": "Poppins" },
  "ja": { "heading": "Shippori Mincho", "body": "Zen Kaku Gothic New" }
}
```

**利用可能なフォント：**

| 用途 | 英文 | 日本語 |
|---|---|---|
| 見出し | Playfair Display, Cormorant Garamond, DM Serif Display, Montserrat | Noto Serif JP, Shippori Mincho, Zen Old Mincho, BIZ UDMincho |
| 本文 | Inter, Poppins | Noto Sans JP, Zen Kaku Gothic New, BIZ UDGothic, M PLUS Rounded 1c |

### ブランディング

ロゴと社外秘バッジを全ページに表示できます。同じ位置を指定しても重ならず横並びになります。

```json
"branding": {
  "logo": "/assets/logo.svg",
  "logoPosition": "bottom-right",
  "confidential": true
}
```

### スピーカーノート

各スライドに `"notes"` フィールドでスピーカーノートを記述できます。サイドバーに表示され、PDF出力には含まれません。

```json
{
  "layout": 29,
  "content": { "message": "2日 → 4時間" },
  "notes": "ここで一呼吸置いて、数字のインパクトを浸透させる"
}
```

---

## アーキテクチャ

### 4層のコンポーネント設計

```
① tokens（デザイントークン）
   色・フォント・余白・角丸 → ここだけ変えれば全体が変わる
       ↓
② primitives（最小部品）
   Text / Flex / Grid / Spacer / Icon
       ↓
③ composites（組み合わせ部品）
   ChartBlock / ImagePlaceholder / VideoPlaceholder
       ↓
④ templates（配置だけ）
   46種類のレイアウト。見た目は持たない。
```

テンプレートは**パーツの配置図でしかない**ので、パーツ側を変えれば全テンプレートの見た目が一気に変わります。

### 色の3層分離

```
colors/
  ├── palette.ts        色そのもの（意味を持たない絵の具）
  ├── layout-theme.ts   レイアウト用（どこにどの色を当てるか）
  └── chart-theme.ts    チャート用（表現意図別の色セット）
```

レイアウトの色を変えてもチャートに影響しません。チャートの色を変えてもスライドの背景に影響しません。

### アイコン

[Lucide Icons](https://lucide.dev/) を70個以上マッピング済み。deck.json ではキー名で指定するだけです。

```json
{ "icon": "lightbulb", "title": "革新", "body": "常に新しい挑戦を" }
```

**利用可能なアイコン：**
- ビジネス: `lightbulb`, `handshake`, `target`, `globe`, `rocket`, `trophy`, `award`, `crown`
- 状態: `check`, `check-circle`, `star`, `shield`, `shield-check`, `lock`
- 時間: `clock`, `calendar`, `timer`, `hourglass`
- データ: `chart`, `trending-up`, `trending-down`, `pie-chart`, `activity`, `database`
- テクノロジー: `code`, `terminal`, `cpu`, `cloud`, `wifi`, `zap`, `settings`, `wrench`
- その他: `search`, `eye`, `users`, `heart`, `mail`, `building`, `briefcase`, `dollar`, `layers`, `sparkles`, `leaf`, `flame`

---

## 設計上の工夫

### レイアウト選択をAIが迷わない仕組み

各レイアウトには「いつ使うか」のユースケースが定義されています。「2カラムレイアウト」という構造の説明ではなく、「2つの概念を並べて比較するとき」という**目的ベースの記述**にしているため、AIが内容に応じて適切なレイアウトを選べます。

### コンテンツの文字数制約

46レイアウトすべてに、**実際にレイアウトが崩れないことを確認済みの文字数**が定義されています。サンプルデータ（deck-all-ja.json）で正常に表示されることを検証済みの実測値なので、この範囲内であれば確実に収まります。

### デコレーションの exposure 制御

デコレーション（角のカーブ、上下のライン）は `exposure`（0.0〜1.0）の1つの数値で「せり出し具合」を制御できます。0にすると全パーツが枠外に逃げて非表示に。全パーツが同じルール（自分の方向に逃げる）で動くため、数値1つで統一的に調整可能です。

### チャートの色は「主張」に従う

Chart.js のチャートは、データの種類ではなく**何を主張したいか（intent）**で色が決まります。「この値が重要」なら他は全部グレーにして1つだけ目立たせる。「良い/悪い」なら緑/赤。AIがデータの文脈から自動判断できる設計です。

### 画像生成の分離

画像は生成せず、プレースホルダーとして配置します。代わりに画像1枚につきMD1ファイルの生成依頼書を出力。具体的な構図・照明・色調まで含む詳細プロンプトに拡張されるので、好みの画像生成AI（Gemini、DALL-E、Midjourney等）にそのまま渡せます。

### PDF出力の信頼性

html2canvas ではなく Playwright のスクリーンショットを使用。ブラウザで見えている通りの出力が確実に得られます。

---

## こんなこともできます

### 全画面プレゼンテーション

ブラウザで `?deck=deck.json` を開いてF11（フルスクリーン）にすれば、そのままプレゼンテーションに使えます。

### 複数デッキの管理

`public/` ディレクトリに複数の deck.json を置けます。

```
public/
  ├── deck.json          ← メインのプレゼン
  ├── deck-quarterly.json ← 四半期報告
  └── deck-proposal.json  ← 提案資料
```

URLパラメータで切り替え: `?deck=deck-quarterly.json`

### カスタムロゴ

`public/assets/` にSVGやPNGを置いて、deck.json の `branding.logo` で指定するだけです。

### テンプレート一覧の確認

`http://localhost:5173/`（URLパラメータなし）で全46レイアウトをプリセット切替・exposure スライダー付きで確認できます。

### deck.json の直接編集

GUIは最小限の設計です。基本は deck.json を直接編集するか、Claude Code から操作します。Vite の HMR で保存即反映されるので、JSON を書き換えながらリアルタイムでプレビューを確認できます。

---

## 技術スタック

| 技術 | 用途 |
|---|---|
| React + TypeScript | UIフレームワーク |
| Vite | ビルド・開発サーバー |
| Chart.js + react-chartjs-2 | チャート描画 |
| Lucide React | アイコン（70+） |
| qrcode.react | QRコード生成 |
| Playwright | スクショ撮影・PDF出力 |
| jsPDF | PDF結合 |
| Google Fonts | 日英フォント（12書体） |

---

## ライセンス

MIT
