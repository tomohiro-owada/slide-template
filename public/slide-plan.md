# Claude Code 徹底活用ガイド

## メタ情報
- 視聴者: 非エンジニア（AI導入を検討中の方）
- 持ち時間: 10〜15分
- トーン: 砕けすぎずカジュアル。親しみやすく、でも説得力のある語り口
- 一言要約: AI導入してない人、もうやばいですよ
- フォント: en=Cormorant Garamond/Poppins / ja=Shippori Mincho/Zen Kaku Gothic New

## スライド構成

### Slide 1 — タイトル
- layout: 1 (title)
- decoration: corners [top-left, bottom-right]
- content:
  - title: Claude Code\n徹底活用ガイド
  - subtitle: 非エンジニアのためのAI生産性革命
- notes: 「今日は、エンジニアじゃなくても使えるAIツールの話をします。難しい技術の話はしません。」

### Slide 2 — つかみ：問いかけ
- layout: 32 (question-prompt)
- decoration: corners [top-left, bottom-right]
- content:
  - question: まだ手作業でやってるんですか？
  - subtext: 経費精算、レポート作成、メール整理...
- notes: 「皆さん、毎月の経費精算にどれくらい時間かかってますか？レポート作成は？メールの整理は？」少し間を置く。

### Slide 3 — 衝撃の数字
- layout: 29 (center-message)
- decoration: corners [top-left, top-right, bottom-left, bottom-right]
- content:
  - message: 2日 → 4時間
  - subtext: AI導入による開発時間の変化（75%削減）
- notes: 「これ、エンジニアの開発時間の話ですけど、実は同じことが皆さんの日常業務でも起きてるんです。」数字のインパクトを一呼吸おいて浸透させる。

### Slide 4 — Before/After
- layout: 6 (two-col-comparison)
- decoration: corners [top-right]
- content:
  - title: 何が変わった？
  - leftLabel: Before
  - leftPoints:
    - Excelを手入力
    - 資料作成に半日
    - メール確認で1日が終わる
  - rightLabel: After
  - rightPoints:
    - データを渡すだけで完成
    - 数分でスライド生成
    - 重要なメールだけ通知
- notes: 「左が今の皆さんの日常。右がAI導入後の世界です。大げさじゃなく、こうなります。」

### Slide 5 — 目次
- layout: 4 (table-of-contents)
- decoration: corners [top-right, bottom-left]
- content:
  - items:
    - 01: エンジニアだけじゃない / AIが使える日常業務
    - 02: 魔法の杖じゃない / 正しい使い方のコツ
    - 03: チームで使い分ける / ツールの適材適所
- notes: 「今日は3つのポイントに絞ってお話しします。」

### Slide 6 — セクション① 開始
- layout: 2 (section-start)
- decoration: corners [top-left]
- content:
  - sectionNumber: 01
  - title: エンジニアだけの\nツールじゃない
  - subtitle: AIが活躍する日常業務
- notes: 「まず最初に、これはエンジニア専用のツールじゃないということをお伝えしたい。」

### Slide 7 — 日常業務の自動化事例
- layout: 18 (icon-list)
- decoration: lines-double
- content:
  - title: こんな業務が数分に
  - items:
    - icon: dollar / title: 経費精算 / body: CSVと領収書メールを突合して入力形式に自動変換
    - icon: file / title: レポート作成 / body: カレンダーの予定から案件別の稼働報告書を自動生成
    - icon: mail / title: メール整理 / body: 未処理メールを監視し対応が必要なものだけSlackに通知
    - icon: layers / title: スライド作成 / body: メモを渡すだけでプレゼン資料を自動レイアウト
- notes: 「経費精算、毎月やってますよね。AIに領収書のメールとCSVを渡すだけで、freeeの入力形式に変換してくれます。人間がやるのは最終チェックだけ。」各事例を具体的に説明。

### Slide 8 — セクション② 開始
- layout: 2 (section-start)
- decoration: corners [bottom-right]
- content:
  - sectionNumber: 02
  - title: 魔法の杖じゃない
  - subtitle: 丸投げすると逆に生産性が下がる
- notes: 「ただし、注意点があります。AIは魔法の杖じゃないんです。」

### Slide 9 — 正しい使い方3ステップ
- layout: 15 (bullet-three-step)
- decoration: lines-double
- content:
  - title: AIとの正しい付き合い方
  - steps:
    - title: 小さく頼む / body: 一度に大量の作業を丸投げしない。「まずこれだけやって」と区切ることで精度が劇的に上がる
    - title: 背景を伝える / body: 「誰向けか」「どんなルールがあるか」を最初に共有する。コンテキストが品質を決める
    - title: 必ず確認する / body: AIの出力は「優秀な部下の下書き」。最終判断は人間が行う。これが品質の担保
- notes: 「3つだけ覚えてください。小さく頼む、背景を伝える、必ず確認する。この3つを守るだけで、AIの精度は段違いに上がります。」

### Slide 10 — セクション③ 開始
- layout: 2 (section-start)
- decoration: corners [top-left]
- content:
  - sectionNumber: 03
  - title: チームで使い分ける
  - subtitle: ツールの適材適所
- notes: 「最後に、AIツールにも得意不得意があるので、使い分けが大事という話をします。」

### Slide 11 — ツールの役割分担
- layout: 9 (three-col-image-text)
- decoration: corners [top-left, top-right]
- content:
  - title: AIツールの役割分担
  - columns:
    - image: description=頼れる先輩のイラスト / title: Claude Code / body: 頼れる先輩。設計相談から複雑な作業まで
    - image: description=テキパキ動く新人のイラスト / title: GitHub Copilot / body: 優秀な新人。言われたことを爆速でこなす
    - image: description=専門家のイラスト / title: Cursor / body: 専門家。大量の資料を一気に整理
- notes: 「人間のチームと同じで、AIにも役割があります。Claude Codeは設計から相談できる先輩。Copilotは言われたことをすぐやってくれる新人。Cursorは大量の作業を一気にやる専門家。使い分けると効果が最大化します。」

### Slide 12 — 締めのメッセージ
- layout: 29 (center-message)
- decoration: corners [top-left, top-right, bottom-left, bottom-right]
- content:
  - message: 導入しない理由\nもうないですよね？
  - subtext: まずは小さな業務から。今日から始められます。
- notes: 「2日かかってた作業が4時間。経費精算もレポートも数分。しかも使い方は3つ覚えるだけ。導入しない理由、もうないですよね？」力強く、でも押しつけがましくなく。

### Slide 13 — クロージング
- layout: 5 (closing)
- decoration: corners [top-left, bottom-right]
- content:
  - title: ありがとうございました
  - subtitle: ご質問があればお気軽にどうぞ
- notes: 「ご清聴ありがとうございました。質問があればなんでもどうぞ。『うちの業務でも使える？』みたいな具体的なご相談も大歓迎です。」

## 使わなかった情報（参考）
- MCP各ツールの詳細（Serena, Cipher, Playwright, Context7, Readability）→ エンジニア向けの別プレゼンで使用
- System1/System2の認知科学モデル → 専門的すぎる
- Vibe Codingの技術負債 → エンジニア向け
- CI/CD, Featureフラグ, カナリアリリース → インフラの話
- Hooks, サブエージェント, Progressive Disclosure → 技術詳細
- CLAUDE.md, PLAN.md等のファイル構成 → 実践編で使う
- 制約理論（TOC）のレビューボトルネック → マネージャー向け別セッション向き
