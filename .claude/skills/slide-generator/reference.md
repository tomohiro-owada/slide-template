# Slide Generator Skill

プレゼンテーション情報を受け取り、deck.json と画像生成依頼MDファイルを出力する。

## 出力先
- `public/deck.json` — スライドデッキ定義
- `output/image-requests/*.md` — 画像/動画1件につき1ファイル

## deck.json フォーマット

```json
{
  "meta": {
    "title": "プレゼンタイトル",
    "author": "発表者名",
    "date": "YYYY-MM-DD"
  },
  "colors": {
    "palette": "default",
    "layout": "warm-minimal",
    "chart": "default"
  },
  "defaults": {
    "decoration": "プリセット名",
    "exposure": 0.8
  },
  "slides": [
    {
      "layout": レイアウト番号,
      "content": { ... レイアウトのスキーマに従う ... }
    }
  ]
}
```

## デコレーション選択ルール

スライドの内容に応じてデコレーションを選択する。**ラインとカーブは混在させない。**

- **lines-double**: データ、数値、比較、分析、KPI、チャート → 理性的・論理的な内容。正確さと信頼性。
- **curves-diagonal**: ビジョン、メッセージ、ストーリー、挨拶、問いかけ → 感情的・情緒的な内容。共感と印象。
- **none**: 全画面背景(#24,#25,#27)、ガラス風(#21,#37)、全画面動画(#40)

decoration はデッキの defaults で1つ選ぶ。内容が混在する場合は主たるトーンで決める。

## レイアウト番号一覧

### A. タイトル・セクション系
| # | ID | いつ使う？ |
|---|---|---|
| 1 | title | プレゼンの冒頭で、テーマ・発表者・日付を伝えるとき |
| 2 | section-start | 大きなトピックが切り替わるとき |
| 3 | section-end | セクションの要点を振り返って次に繋げるとき |
| 4 | table-of-contents | プレゼン全体の構成を俯瞰させるとき |
| 5 | closing | プレゼンを締めくくり、連絡先やお礼を伝えるとき |

### B. カラムレイアウト系
| # | ID | いつ使う？ |
|---|---|---|
| 6 | two-col-comparison | 2つの概念を並べて比較するとき（Before/After、Pros/Cons） |
| 7 | two-col-text-image | テキストで説明しながら画像で補強するとき |
| 8 | two-col-image-text | 画像が主役で、テキストは補足説明のとき |
| 9 | three-col-image-text | 3つの項目をビジュアル付きで並列に紹介するとき |
| 10 | three-col-accent | 3つの選択肢のうち1つを推奨・強調するとき |
| 11 | four-col | 4つの項目を均等に並べて一覧するとき |
| 12 | five-col | 5段階のレベル・進捗・成熟度を示すとき |
| 13 | two-by-two-grid | 4つの項目をマトリクス表示するとき |
| 14 | two-by-three-grid | 6つの項目を一覧表示するとき |

### C. 箇条リスト系
| # | ID | いつ使う？ |
|---|---|---|
| 15 | bullet-three-step | 3段階のプロセスや方法論を示すとき |
| 16 | numbered-steps | 順番に進むプロセスフローを横に並べて見せるとき |
| 17 | timeline | 時系列で出来事やマイルストーンを見せるとき |
| 18 | icon-list | 箇条書きをアイコンで視覚的に区別して並べるとき |

### D. パネルデザイン系
| # | ID | いつ使う？ |
|---|---|---|
| 19 | basic-panel | 1つのトピックを画像付きのカード形式で丁寧に紹介するとき |
| 20 | emphasis-panel | 重要な引用・ポイント・注意事項を強調するとき |
| 21 | glass-panel | リッチな背景画像の上にモダンなテキストを重ねるとき |
| 22 | gradient-panel | シンプルな内容を上品に見せたいとき |
| 23 | card | 画像付きのカードで1つのアイテムを紹介するとき |

### E. 背景・画像系
| # | ID | いつ使う？ |
|---|---|---|
| 24 | fullscreen-bg | ドラマチックな画像そのものがメッセージのとき |
| 25 | right-aligned-bg | テキストと大きな画像を半々で見せるとき |
| 26 | day-month | 特定の日付を大きく印象的に見せるとき |
| 27 | split-background | 複数の画像を並べてビジュアルインパクトを出すとき |

### F. 特殊系
| # | ID | いつ使う？ |
|---|---|---|
| 28 | statistics | 1〜4個のキー数値がスライドの主役のとき |
| 29 | center-message | たった一言の強烈なメッセージを届けるとき |
| 30 | qanda | 質疑応答の時間を案内するとき |

### G. 応用パターン系
| # | ID | いつ使う？ |
|---|---|---|
| 31 | qr-code | 聴衆にURLやリソースへのアクセスを促すとき |
| 32 | question-prompt | 聴衆に問いを投げかけて考えさせるとき |
| 33 | decorative | シンプルな内容を装飾的に引き立てるとき |
| 34 | inline-images | テキスト説明の下に複数の画像を並べるとき |
| 35 | statistics-ratio | 割合やパーセンテージをバー表示で視覚化するとき |
| 36 | text-stats-panel | 文章の説明と数値を左右に並べて見せるとき |
| 37 | glass-summary | ビジュアルリッチにまとめポイントを提示するとき |
| 38 | list-stats-panel | 箇条書きの横に数値を添えて説得力を増すとき |
| 39 | comparison-stats | 複数カテゴリを代表数値とポイントで比較するとき |

### H. 動画系
| # | ID | いつ使う？ |
|---|---|---|
| 40 | fullscreen-video | デモ動画やプロモーション映像をスライド全面で見せるとき |
| 41 | video-text | 動画で見せながら横にポイントを文字で補足するとき |
| 42 | text-video | 説明文が主役で、動画は補足・エビデンスとして添えるとき |
| 43 | video-caption | 短い動画に一言キャッチコピーや解説を添えるとき |
| 44 | two-video-comparison | Before/Afterや2つの手法を動画で並べて比較するとき |

## コンテンツスキーマの制約（重要）

各フィールドには文字数制限がある。**必ず守ること。**

| role | 文字数目安 | 用途 |
|---|---|---|
| headline | 2〜40字 | 最も強調。画面の主役 |
| subheadline | 5〜50字 | セクション見出し |
| body | 〜200字 | 本文 |
| caption | 〜80字 | 補足・注釈 |
| stat-value | 1〜8字 | 数字ドーン（"23%", "$4.2M"） |
| stat-label | 3〜15字 | 数字の説明 |
| step-title | 3〜20字 | ステップの見出し |
| step-body | 〜60字 | ステップの説明 |

## スライド構成のヒューリスティクス

1. **タイトルスライド(#1)で始める**
2. 3セクション以上なら**目次(#4)**を入れる
3. セクションの区切りに**セクション開始(#2)**を使う
4. データ中心のスライドの前後に**中央メッセージ(#29)**を入れてメリハリをつける
5. **同じテンプレートを3回連続で使わない**
6. 2〜3スライドに1枚は**画像付きテンプレート**でビジュアルを入れる
7. **クロージング(#5)**またはQ&A(#30)で終える

## アイコン（Lucide Icons）

icon フィールドには以下のキー名のみ使用可能。絵文字は使わないこと。

**ビジネス**: lightbulb, handshake, target, globe, rocket, trophy, award, crown
**状態**: check, check-circle, circle-check, star, shield, shield-check, lock
**時間**: clock, calendar, timer, hourglass
**通信**: message, mail, phone, send, megaphone
**データ**: chart, trending-up, trending-down, pie-chart, activity, database
**ユーザー**: users, user-check, user-plus, heart, thumbs-up
**テクノロジー**: code, terminal, cpu, cloud, wifi, zap, settings, wrench
**ドキュメント**: file, book, clipboard, image, video, camera
**ナビ**: arrow-right, arrow-up, chevron-right, external-link, download, upload
**その他**: search, eye, map-pin, building, briefcase, dollar, credit-card, dot, layers, package, puzzle, sparkles, leaf, flame

## 画像プレースホルダー

画像が必要なテンプレートでは、content 内に以下の形式で指定する：

```json
"image": {
  "description": "画像の説明（Nano Banana への生成指示になる）",
  "style": "photo | illustration | icon | abstract",
  "mood": "professional, modern, warm 等"
}
```

この情報から自動的に画像生成依頼MDファイルが生成される。

## レイアウト別コンテンツスペック（実測値）

以下はレイアウトが崩れないことを確認済みの文字数・個数・メディア形式。**この範囲内で生成すること。**

### #1 title
- title: ~15字 / subtitle: ~26字 / presenter: ~6字 / date: ~10字

### #2 section-start
- sectionNumber: 2字 / title: ~13字 / subtitle: ~31字

### #3 section-end
- title: ~13字 / keyPoints: 3個 / keyPoints[].text: ~31字

### #4 table-of-contents
- items: 3〜6個 / items[].number: 2字 / items[].label: ~12字 / items[].description: ~23字

### #5 closing
- title: ~9字 / subtitle: ~23字 / contactName: ~6字 / contactEmail: ~18字 / contactUrl: ~19字

### #6 two-col-comparison
- title: ~15字 / leftLabel: ~6字 / rightLabel: ~5字 / leftPoints: 3個 / leftPoints[].text: ~16字 / rightPoints: 3個 / rightPoints[].text: ~15字

### #7 two-col-text-image
- title: ~12字 / body: ~100字 / image: [16:9]

### #8 two-col-image-text
- title: ~16字 / body: ~100字 / image: [16:9]

### #9 three-col-image-text
- title: ~12字 / columns: 3個 / columns[].title: ~10字 / columns[].body: ~15字 / columns[].image: [1:1]

### #10 three-col-accent
- title: ~13字 / columns: 3個 / columns[].title: ~7字 / columns[].body: ~30字 / accentIndex: 0-2

### #11 four-col
- title: ~11字 / columns: 4個 / columns[].icon: Lucideアイコン名 / columns[].title: ~10字 / columns[].body: ~18字

### #12 five-col
- title: ~16字 / columns: 5個 / columns[].title: ~8字 / columns[].body: ~8字 / columns[].level: 1-5

### #13 two-by-two-grid
- title: ~15字 / items: 4個 / items[].title: ~7字 / items[].body: ~16字 / items[].image: [4:3]

### #14 two-by-three-grid
- title: ~9字 / items: 6個 / items[].title: ~5字 / items[].body: ~4字 / items[].image: [4:3]

### #15 bullet-three-step
- title: ~11字 / steps: 3個 / steps[].title: ~9字 / steps[].body: ~53字

### #16 numbered-steps
- title: ~15字 / steps: 3〜4個 / steps[].number: 2字 / steps[].title: ~7字 / steps[].body: ~14字

### #17 timeline
- title: ~15字 / events: 3〜4個 / events[].date: ~2字 / events[].title: ~8字 / events[].description: ~15字

### #18 icon-list
- title: ~13字 / items: 3〜4個 / items[].icon: アイコン名 / items[].title: ~19字 / items[].body: ~28字

### #19 basic-panel
- title: ~14字 / body: ~126字 / footer: ~20字 / image: [16:9]

### #20 emphasis-panel
- title: ~14字 / body: ~102字 / highlight: ~37字

### #21 glass-panel
- title: ~10字 / body: ~48字 / backgroundImage: [16:9]

### #22 gradient-panel
- title: ~17字 / body: ~79字

### #23 card
- title: ~9字 / body: ~87字 / tags: 3個 / tags[].text: ~10字 / image: [4:3]

### #24 fullscreen-bg
- title: ~20字 / subtitle: ~33字 / backgroundImage: [16:9]

### #25 right-aligned-bg
- title: ~16字 / body: ~79字 / backgroundImage: [9:16]

### #26 day-month
- day: 2字 / month: ~5字 / title: ~14字 / body: ~56字

### #27 split-background
- title: ~13字 / body: ~23字 / images: 2〜3個 / images[].image: [9:16]

### #28 statistics
- title: ~11字 / stats: 1〜3個 / stats[].value: ~5字 / stats[].label: ~7字 / stats[].trend: up|down|neutral / footnote: ~19字

### #29 center-message
- message: ~15字 / subtext: ~57字

### #30 qanda
- title: ~3字 / subtitle: ~32字

### #31 qr-code
- title: ~16字 / url: URL文字列 / description: ~44字

### #32 question-prompt
- question: ~37字 / subtext: ~20字

### #33 decorative
- title: ~17字 / body: ~79字

### #34 inline-images
- title: ~14字 / body: ~61字 / images: 3個 / images[].caption: ~9字 / images[].image: [4:3]

### #35 statistics-ratio
- title: ~12字 / ratios: 2〜3個 / ratios[].value: ~3字 / ratios[].label: ~11字 / ratios[].total: number

### #36 text-stats-panel
- title: ~12字 / body: ~95字 / stats: 2個 / stats[].value: ~4字 / stats[].label: ~11字

### #37 glass-summary
- title: ~17字 / keyPoints: 3個 / keyPoints[].text: ~31字 / backgroundImage: [16:9]

### #38 list-stats-panel
- title: ~12字 / items: 3個 / items[].text: ~31字 / stats: 2個 / stats[].value: ~5字 / stats[].label: ~6字

### #39 comparison-stats
- title: ~16字 / categories: 2〜3個 / categories[].label: ~10字 / categories[].stat: ~5字 / categories[].points: 2個 / categories[].points[].text: ~20字

### #40 fullscreen-video
- title: ~12字 / overlay: ~23字 / video: [16:9]

### #41 video-text
- title: ~12字 / body: ~85字 / video: [16:9]

### #42 text-video
- title: ~14字 / body: ~85字 / video: [16:9]

### #43 video-caption
- caption: ~29字 / video: [16:9]

### #44 two-video-comparison
- title: ~14字 / leftLabel: ~6字 / rightLabel: ~5字 / leftVideo: [16:9] / rightVideo: [16:9]

## 実行手順

1. ユーザーの情報を分析し、セクション構成を決める
2. 各セクションに適切なレイアウト番号を選択
3. コンテンツスキーマの制約に従って値を埋める
4. deck.json を `public/deck.json` に出力
5. 画像プレースホルダーがあれば `output/image-requests/` に MD を出力
6. `http://localhost:5173/?deck=deck.json` で確認するよう案内
