# 吐いて捨てるほどある「AIスライド生成」をあえて自分で作ってますという話

## なぜ既存ツールを使わないのか

Gamma、SlidesGPT、Beautiful.ai、Tome。AIでスライドを作るSaaSは山ほどあります。どれも「テキスト入れたらそれっぽいスライドが出てくる」。

でも、実際に仕事で使うと微妙にかゆいところに手が届かない。

- フォントを「見出しだけ明朝体、本文はゴシック、しかも英文は別」にしたい → できない
- 社外秘マークとロゴを全ページに入れたい → 有料プランでも制約あり
- チャートの「この棒だけ目立たせて他はグレーにしたい」 → そんな細かい指定通らない
- 画像は自社の画像生成AIで作りたい → 組み込み画像しか選べない

結局、**見た目の最終調整に既存ツール以上の時間がかかる**という本末転倒な状況になるんです。

だから自分で作りました。React + Chart.js + Claude Code Skills で、情報を渡すだけでスライドが完成するテンプレートシステムです。

https://github.com/tomohiro-owada/slide-template

この記事では「なぜそう設計したか」を中心に、技術的な判断と工夫をお話しします。

## 全体像

6つの Claude Code Skills がパイプラインとして繋がっています。

```
/slide-planner → /slide-generator → /chart-designer
                                          ↓
                              /validate-deck → /generate-image-prompts → /export-pdf
```

`/slide-planner` と呼ぶだけで起動し、各Skillの出力が次のSkillの入力になるようフォーマットを統一してあります。

ただし**全部自動では走らせません**。各ステップで人間が確認・承認するポイントを設けています。AI任せにしすぎると品質が崩壊するので、ここは意図的に人間をループに入れています。

## テンプレートは「配置だけ」、見た目は持たない

コンポーネントを4層に分離しました。

```
① tokens     色・フォント・余白（ここを変えれば全部変わる）
② primitives Text / Flex / Grid / Spacer / Icon
③ composites ChartBlock / ImagePlaceholder
④ templates  46種のレイアウト（配置だけ）
```

テンプレートのコードを見てもらえると分かりますが、色もフォントサイズも一切書いていません。

```tsx
function TwoColumnTextImageSlide({ content }) {
  return (
    <Flex direction="row" gap="xl">
      <Flex direction="col" flex={1} justify="center">
        <Text variant="h2">{content.title}</Text>
        <Text variant="h3">{content.body}</Text>
      </Flex>
      <Flex flex={1}>
        <ImagePlaceholder data={content.image} />
      </Flex>
    </Flex>
  );
}
```

全部 `Text` や `Flex` が tokens から値を引いてきます。だから **tokens.ts を1行変えるだけで46テンプレート全部の見た目が変わる**。テンプレートが46個もあるのに1ファイルずつ色を直して回る、なんてことは起きません。

## 色を3層に分けた理由

```
palette.ts       → 色そのもの（意味を持たない絵の具）
layout-theme.ts  → レイアウト用（背景色、文字色、パネル色）
chart-theme.ts   → チャート用（表現意図別の色セット）
```

**レイアウトの色を変えてもチャートに影響しない。** 逆も然り。

これが効いてくるのはチャートの色設計です。普通のチャートライブラリは「カテゴリごとに色を割り当てる」だけですが、このシステムではチャートの色を**「何を主張したいか（intent）」で決めます**。

```typescript
const chartTheme = {
  highlight: {
    active: palette.navy[900],  // 目立たせたい値だけ
    muted:  palette.gray[200],  // 他は全部グレー
  },
  diverging: {
    positive: palette.emerald[500],
    negative: palette.red[500],
  },
};
```

「Q4の売上が過去最高」を伝えたいなら `intent: "highlight"` を指定する。Q4だけ濃い色で、Q1〜Q3は全部グレー。全部の棒に色を付けるのは「データを見せている」だけ。1つだけ色を付けるのは「主張を伝えている」。この区別をシステムレベルで強制できるようにしました。

## AIが46テンプレートから迷わず選べる仕掛け

各テンプレートに「いつ使うか」をユースケースとして定義しています。

```typescript
28: {
  id: 'statistics',
  useCase: {
    primary: '1〜4個のキー数値がスライドの主役のとき',
    bestFor: ['kpi', 'metrics', 'numbers'],
    notFor: ['narrative', 'process'],
  },
}
```

「統計数値スライド」という**構造の説明ではなく**、「キー数値がスライドの主役のとき」という**目的の記述**にしているのがポイントです。AIは入力から「数値が主役だな」→ `bestFor: 'metrics'` → #28 と辿れます。`notFor` で不適切なケースも明示しているので、誤選択が減ります。

## 文字数制約は「理論値」ではなく「実測値」

各レイアウトの文字数上限を、**実際にサンプルデータを表示してレイアウトが崩れないことを確認した実測値**で定義しています。

```
### #28 statistics
- title: ~11字 / stats[].value: ~5字 / stats[].label: ~7字
```

`deck-all-ja.json`（全46レイアウトの日本語サンプル）を作り、Playwrightでスクショを撮って1枚ずつ目視確認して確定しました。「理論的にN文字入るはず」ではなく「実際にN文字入れて崩れなかった」という事実に基づいています。

Skillにこの制約を埋め込んであるので、AIが生成するコンテンツは必ず収まります。文字数オーバーで見切れる、という事故が原理的に起きません。

## デコレーション：直線は理性、曲線は感情

スライドの飾り（角のS字カーブ、上下の水平ライン）をどう使い分けるか。これを明確なルールにしました。

- **直線（lines）**：データ、数値、分析 → 正確さと信頼性
- **曲線（curves）**：ビジョン、メッセージ、挨拶 → 共感と印象
- **なし（none）**：全画面背景、動画 → 飾りが邪魔になるもの

**1つのスライドにラインとカーブを混在させません。**

このルールをSkillに組み込んであるので、「売上データのスライドだからlines」「ビジョンを語るスライドだからcurves」という判断をAIが毎回自動で行います。デザイナーがいなくても、スライドの性質に合った飾りが付きます。

## 画像は生成しない。依頼書を生成する

画像生成AIはどれも一長一短で、プロジェクトによって使いたいサービスが違います。だからシステム内では画像を生成せず、代わりに**1画像1MDファイルの「生成依頼書」を出力**します。

```markdown
# Image Generation Request

## Prompt for Image Generation
> A professional minimalist illustration of a senior mentor
> figure in silhouette style. Warm navy and beige color palette
> matching a presentation slide...
```

deck.json の `description: "頼れる先輩エンジニアのシルエット"` という素朴な記述を、構図・照明・色調まで含む詳細プロンプトに拡張します。あとはこのMDをGeminiでもDALL-Eでもお好みの画像生成AIに渡すだけ。

画像生成AIに依存しない設計にしたことで、サービスの流行り廃りに左右されません。

## PDF出力：html2canvasは崩れる。Playwrightは崩れない

当初 html2canvas + jsPDF でブラウザ内PDF出力を実装しましたが、チャートのcanvas要素やカスタムフォントの描画が崩れる問題が頻発しました。

結局 **Playwrightでスクショを撮ってPDFに結合**する方式に切り替えました。ブラウザで見えている通りの出力が確実に得られます。Claude CodeのSkillとして実装しているので `/export-pdf` と呼ぶだけです。

## フォント：英文と日本語を独立して指定できる

日本語プレゼンでは「DM Serif Display の数字はかっこいいけど日本語は Shippori Mincho がいい」みたいなことが頻繁に起きます。

```json
"fonts": {
  "en": { "heading": "DM Serif Display", "body": "Poppins" },
  "ja": { "heading": "Shippori Mincho", "body": "Zen Kaku Gothic New" }
}
```

deck.json で指定するだけ。内部ではCSS変数で合成してテンプレートに適用しています。12書体をGoogle Fontsから読み込み済みなので、組み合わせを変えるだけで雰囲気がガラッと変わります。

## deck.json が真実の源泉。GUIは作らない

設定画面のGUIは最小限です。テンプレート一覧のプレビューとexposureスライダーくらい。

これは意図的で、**deck.json が全情報の源泉**だからです。

- Claude Code が deck.json を生成・編集
- ブラウザが deck.json を読み込んで描画
- VSCodeから直接編集しても即反映（Vite HMR）

GUIを作り込むと「GUIとJSONの同期」という問題が生まれます。JSONだけなら、どこからでも編集できて、git管理もできて、差分も見やすい。

## Skillの設計で気をつけたこと

### description は「pushy」に書く

Claude Code のSkillは `description` でトリガー判定されます。控えめに書くと使いたいときに発火しません。

```yaml
# ❌ 控えめすぎる
description: deck.jsonを検証する

# ✅ 積極的
description: |
  deck.jsonの品質検証を行う。Playwrightで全ページスクリーンショットを撮影し、
  スキーマとの突き合わせで未使用・欠損フィールドを検出、修正提案する。
  デッキ検証、JSON検証、バリデーション、スライドチェック、validate、check deck
  と言われたら必ずこのスキルを使う。
```

日本語と英語の両方のトリガーワードを入れ、「〜と言われたら必ずこのスキルを使う」と明示的に書いています。

### 副作用のあるSkillは手動トリガーのみ

`/validate-deck`、`/generate-image-prompts`、`/export-pdf` はファイル生成やブラウザ起動という副作用があるので、`disable-model-invocation: true` でAIが勝手に実行しないようにしています。対話的なSkill（planner, generator, chart-designer）は自動トリガーOK。

### reference.md で Progressive Disclosure

Skill本体は手順とルールだけ。46レイアウトのスペック詳細は `reference.md` に分離して、必要なときだけ参照する設計です。コンテキストウィンドウを無駄に消費しないための工夫です。

## 実際にプレゼンを作ってみた

「Claude Code 徹底活用ガイド」という13枚のプレゼンを、このシステムで作りました。

1. 7セクション分の情報テキストを `/slide-planner` に渡す
2. 5つの質問に答える（非エンジニア向け、カジュアルなトーンで）
3. 情報を仕分け（MCP詳細やCI/CDの話は🔴で除外）
4. 13枚の構成案を確認・承認
5. `/slide-generator` で deck.json 生成
6. ブラウザで確認（数字が見にくかったのでフォントを DM Serif Display に変更）
7. `/generate-image-prompts` で画像依頼書を3枚出力
8. Gemini で画像生成して assets に配置
9. `/export-pdf` でPDF出力

人間がやったのは「対話に答える」「スクショを見て確認する」「フォントの好みを伝える」「画像生成AIにMDを渡す」だけです。

## まとめ：全自動にしないことが品質の鍵

既存のAIスライドツールは「全自動」を売りにしています。でも全自動にすると、**AIが作った感じの均質なスライド**が出てきます。

このシステムの設計思想は逆です。

- **AIに任せる**：レイアウト選択、文字数調整、デコレーション判定、チャートの色、画像プロンプト拡張
- **人間が判断する**：構成の承認、デザインの好み、最終品質の目視確認

全自動にせず、人間の判断ポイントを意図的に残すことで、「自分のプレゼン」が作れます。

AIでスライドを作る手法は吐いて捨てるほどネットに転がっていますが、エンジニアが「自分の手で仕組みから作る」アプローチの一例として、参考になれば幸いです。

https://github.com/tomohiro-owada/slide-template
