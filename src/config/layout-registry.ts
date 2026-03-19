// layout-registry.ts — 全44レイアウトの番号→コンポーネント＋スキーマ＋ユースケースのマッピング

import { TitleSlide } from '../components/templates/title/TitleSlide';
import { SectionStartSlide } from '../components/templates/title/SectionStartSlide';
import { SectionEndSlide } from '../components/templates/title/SectionEndSlide';
import { TableOfContentsSlide } from '../components/templates/title/TableOfContentsSlide';
import { ClosingSlide } from '../components/templates/title/ClosingSlide';

import { TwoColumnComparisonSlide } from '../components/templates/columns/TwoColumnComparisonSlide';
import { TwoColumnTextImageSlide } from '../components/templates/columns/TwoColumnTextImageSlide';
import { TwoColumnImageTextSlide } from '../components/templates/columns/TwoColumnImageTextSlide';
import { ThreeColumnImageTextSlide } from '../components/templates/columns/ThreeColumnImageTextSlide';
import { ThreeColumnAccentSlide } from '../components/templates/columns/ThreeColumnAccentSlide';
import { FourColumnSlide } from '../components/templates/columns/FourColumnSlide';
import { FiveColumnSlide } from '../components/templates/columns/FiveColumnSlide';
import { TwoByTwoGridSlide } from '../components/templates/columns/TwoByTwoGridSlide';
import { TwoByThreeGridSlide } from '../components/templates/columns/TwoByThreeGridSlide';

import { BulletThreeStepSlide } from '../components/templates/list/BulletThreeStepSlide';
import { NumberedStepsSlide } from '../components/templates/list/NumberedStepsSlide';
import { TimelineSlide } from '../components/templates/list/TimelineSlide';
import { IconListSlide } from '../components/templates/list/IconListSlide';

import { BasicPanelSlide } from '../components/templates/panel/BasicPanelSlide';
import { EmphasisPanelSlide } from '../components/templates/panel/EmphasisPanelSlide';
import { GlassPanelSlide } from '../components/templates/panel/GlassPanelSlide';
import { GradientPanelSlide } from '../components/templates/panel/GradientPanelSlide';
import { CardSlide } from '../components/templates/panel/CardSlide';

import { FullScreenBgSlide } from '../components/templates/background-image/FullScreenBgSlide';
import { RightAlignedBgSlide } from '../components/templates/background-image/RightAlignedBgSlide';
import { DayMonthSlide } from '../components/templates/background-image/DayMonthSlide';
import { SplitBackgroundSlide } from '../components/templates/background-image/SplitBackgroundSlide';

import { StatisticsSlide } from '../components/templates/special/StatisticsSlide';
import { CenterMessageSlide } from '../components/templates/special/CenterMessageSlide';
import { QandASlide } from '../components/templates/special/QandASlide';

import { QrCodeSlide } from '../components/templates/applied/QrCodeSlide';
import { QuestionPromptSlide } from '../components/templates/applied/QuestionPromptSlide';
import { DecorativeSlide } from '../components/templates/applied/DecorativeSlide';
import { InlineImagesSlide } from '../components/templates/applied/InlineImagesSlide';
import { StatisticsRatioSlide } from '../components/templates/applied/StatisticsRatioSlide';
import { TextStatsPanelSlide } from '../components/templates/applied/TextStatsPanelSlide';
import { GlassSummarySlide } from '../components/templates/applied/GlassSummarySlide';
import { ListStatsPanelSlide } from '../components/templates/applied/ListStatsPanelSlide';
import { ComparisonStatsSlide } from '../components/templates/applied/ComparisonStatsSlide';

import { FullScreenVideoSlide } from '../components/templates/video/FullScreenVideoSlide';
import { VideoTextSlide } from '../components/templates/video/VideoTextSlide';
import { TextVideoSlide } from '../components/templates/video/TextVideoSlide';
import { VideoCaptionSlide } from '../components/templates/video/VideoCaptionSlide';
import { TwoVideoComparisonSlide } from '../components/templates/video/TwoVideoComparisonSlide';

import * as schemas from './schemas';
import type { TemplateCategory, TemplateUseCase, SlotPosition, SlotConfig } from '../types/slide';
import type { SchemaDefinition } from './schemas';

export interface LayoutEntry {
  id: string;
  name: string;
  category: TemplateCategory;
  component: React.ComponentType<any>;
  schema: SchemaDefinition;
  useCase: TemplateUseCase;
  decoration: boolean; // true=飾りON, false=飾りOFF（全画面背景等）
  slotOverride?: Partial<Record<SlotPosition, SlotConfig | false>>; // false=無効、SlotConfig=強制有効
}

export const layoutRegistry: Record<number, LayoutEntry> = {
  // ============================
  // A. タイトル・セクション系
  // ============================
  1: {
    id: 'title', name: 'タイトルスライド', category: 'title',
    component: TitleSlide, schema: schemas.titleSchema, decoration: true,
    useCase: {
      primary: 'プレゼンの冒頭で、テーマ・発表者・日付を伝えるとき',
      scenarios: ['プレゼン開始', '表紙', 'オープニング'],
      bestFor: ['opening', 'introduction'],
      notFor: ['mid-presentation', 'data-heavy'],
    },
  },
  2: {
    id: 'section-start', name: 'セクション開始スライド', category: 'title',
    component: SectionStartSlide, schema: schemas.sectionStartSchema, decoration: true,
    useCase: {
      primary: 'プレゼンの大きなトピックが切り替わるとき',
      scenarios: ['章の区切り', 'トピック遷移', '新テーマの導入'],
      bestFor: ['transition', 'section-break'],
      notFor: ['content-heavy', 'data'],
    },
  },
  3: {
    id: 'section-end', name: 'セクション終了・まとめ', category: 'title',
    component: SectionEndSlide, schema: schemas.sectionEndSchema, decoration: true,
    useCase: {
      primary: 'セクションの要点を振り返って次に繋げるとき',
      scenarios: ['章のまとめ', 'キーテイクアウェイ', '中間振り返り'],
      bestFor: ['summary', 'recap', 'key-takeaways'],
      notFor: ['opening', 'data-heavy'],
    },
  },
  4: {
    id: 'table-of-contents', name: '目次スライド', category: 'title',
    component: TableOfContentsSlide, schema: schemas.tocSchema, decoration: true,
    useCase: {
      primary: 'プレゼン全体の構成を俯瞰させるとき',
      scenarios: ['アジェンダ表示', '全体像の提示', '構成の説明'],
      bestFor: ['agenda', 'overview', 'structure'],
      notFor: ['short-presentation', 'single-topic'],
    },
  },
  5: {
    id: 'closing', name: 'クロージングスライド', category: 'title',
    component: ClosingSlide, schema: schemas.closingSchema, decoration: true,
    useCase: {
      primary: 'プレゼンを締めくくり、連絡先やお礼を伝えるとき',
      scenarios: ['Thank you', 'お礼', '連絡先共有'],
      bestFor: ['closing', 'contact', 'thank-you'],
      notFor: ['mid-presentation', 'content'],
    },
  },

  // ============================
  // B. カラムレイアウト系
  // ============================
  6: {
    id: 'two-col-comparison', name: '2カラム比較', category: 'columns',
    component: TwoColumnComparisonSlide, schema: schemas.twoColComparisonSchema, decoration: true,
    slotOverride: {
      'top-left': false, 'bottom-left': false, 'bottom-right': false, 'left': false, 'right': false,
      'top-right': { enabled: true, element: 'curve', size: 'lg' },
    },
    useCase: {
      primary: '2つの概念・状態・選択肢を並べて比較するとき',
      scenarios: ['Before/After', 'Pros/Cons', '旧方式vs新方式', '2案の比較'],
      bestFor: ['comparison', 'contrast', 'decision', 'evaluation'],
      notFor: ['single-topic', 'data-heavy', 'narrative'],
    },
  },
  7: {
    id: 'two-col-text-image', name: '2カラム（テキスト＋画像）', category: 'columns',
    component: TwoColumnTextImageSlide, schema: schemas.twoColTextImageSchema, decoration: true,
    useCase: {
      primary: 'テキストで説明しながら画像で補強するとき',
      scenarios: ['コンセプト説明+ビジュアル', '機能紹介+スクリーンショット'],
      bestFor: ['explanation', 'feature', 'concept-with-visual'],
      notFor: ['data-only', 'multi-point'],
    },
  },
  8: {
    id: 'two-col-image-text', name: '2カラム（画像＋テキスト）', category: 'columns',
    component: TwoColumnImageTextSlide, schema: schemas.twoColImageTextSchema, decoration: true,
    useCase: {
      primary: '画像が主役で、テキストは補足説明のとき',
      scenarios: ['写真メインの紹介', 'プロダクトビジュアル+説明'],
      bestFor: ['visual-first', 'product-showcase'],
      notFor: ['text-heavy', 'data-only'],
    },
  },
  9: {
    id: 'three-col-image-text', name: '3カラム（画像＋テキスト）', category: 'columns',
    component: ThreeColumnImageTextSlide, schema: schemas.threeColImageTextSchema, decoration: true,
    useCase: {
      primary: '3つの項目をビジュアル付きで並列に紹介するとき',
      scenarios: ['3つのサービス紹介', 'チームメンバー紹介', '3つの特徴'],
      bestFor: ['three-items', 'features', 'team', 'services'],
      notFor: ['comparison', 'sequential'],
    },
  },
  10: {
    id: 'three-col-accent', name: '3カラム（アクセント）', category: 'columns',
    component: ThreeColumnAccentSlide, schema: schemas.threeColAccentSchema, decoration: true,
    useCase: {
      primary: '3つの選択肢のうち1つを推奨・強調するとき',
      scenarios: ['料金プラン比較', '3段階の中でおすすめを強調', 'ティア紹介'],
      bestFor: ['pricing', 'recommendation', 'tier-comparison'],
      notFor: ['equal-weight', 'narrative'],
    },
  },
  11: {
    id: 'four-col', name: '4カラムレイアウト', category: 'columns',
    component: FourColumnSlide, schema: schemas.fourColSchema, decoration: true,
    useCase: {
      primary: '4つの項目を均等に並べて一覧するとき',
      scenarios: ['4つの機能', '4つの部門', '4つのステップ概要'],
      bestFor: ['four-items', 'overview', 'features-grid'],
      notFor: ['detailed-explanation', 'comparison'],
    },
  },
  12: {
    id: 'five-col', name: '5カラム（応用度レベル）', category: 'columns',
    component: FiveColumnSlide, schema: schemas.fiveColSchema, decoration: true,
    useCase: {
      primary: '5段階のレベル・進捗・成熟度を示すとき',
      scenarios: ['スキルレベル表示', '成熟度モデル', '5段階評価', '進捗度'],
      bestFor: ['levels', 'maturity', 'progression', 'rating'],
      notFor: ['detailed-text', 'comparison'],
    },
  },
  13: {
    id: 'two-by-two-grid', name: '2x2グリッド', category: 'columns',
    component: TwoByTwoGridSlide, schema: schemas.twoByTwoGridSchema, decoration: true,
    useCase: {
      primary: '4つの項目をビジュアル付きでマトリクス表示するとき',
      scenarios: ['SWOT分析', '2x2マトリクス', '4象限', '4つのカテゴリ'],
      bestFor: ['matrix', 'swot', 'four-quadrants', 'categorization'],
      notFor: ['sequential', 'timeline'],
    },
  },
  14: {
    id: 'two-by-three-grid', name: '2x3グリッドレイアウト', category: 'columns',
    component: TwoByThreeGridSlide, schema: schemas.twoByThreeGridSchema, decoration: true,
    useCase: {
      primary: '6つの項目を一覧表示するとき',
      scenarios: ['6つの機能', '6つのサービス', 'ポートフォリオ', '事例一覧'],
      bestFor: ['six-items', 'gallery', 'portfolio', 'catalog'],
      notFor: ['detailed-explanation', 'narrative'],
    },
  },

  // ============================
  // C. 箇条リスト系
  // ============================
  15: {
    id: 'bullet-three-step', name: '箇条3ステップ', category: 'list',
    component: BulletThreeStepSlide, schema: schemas.bulletThreeStepSchema, decoration: true,
    useCase: {
      primary: '3段階のプロセスや方法論を示すとき',
      scenarios: ['導入手順', '3つのフェーズ', '方法論の3ステップ'],
      bestFor: ['process', 'methodology', 'three-steps'],
      notFor: ['more-than-3', 'non-sequential'],
    },
  },
  16: {
    id: 'numbered-steps', name: '番号付きステップ（横型）', category: 'list',
    component: NumberedStepsSlide, schema: schemas.numberedStepsSchema, decoration: true,
    useCase: {
      primary: '順番に進むプロセスフローを横に並べて見せるとき',
      scenarios: ['ワークフロー', 'パイプライン', '手順説明', 'ファネル'],
      bestFor: ['workflow', 'pipeline', 'process-flow', 'funnel'],
      notFor: ['non-sequential', 'deep-explanation'],
    },
  },
  17: {
    id: 'timeline', name: 'タイムラインレイアウト', category: 'list',
    component: TimelineSlide, schema: schemas.timelineSchema, decoration: true,
    useCase: {
      primary: '時系列で出来事やマイルストーンを見せるとき',
      scenarios: ['プロジェクトロードマップ', '沿革', 'リリース計画', '歴史'],
      bestFor: ['timeline', 'roadmap', 'history', 'milestones'],
      notFor: ['non-chronological', 'comparison'],
    },
  },
  18: {
    id: 'icon-list', name: 'アイコン付きリスト', category: 'list',
    component: IconListSlide, schema: schemas.iconListSchema, decoration: true,
    useCase: {
      primary: '箇条書きをアイコンで視覚的に区別して並べるとき',
      scenarios: ['特徴一覧', 'メリット列挙', 'チェックリスト', 'サービス内容'],
      bestFor: ['features', 'benefits', 'checklist', 'list'],
      notFor: ['sequential', 'data-heavy'],
    },
  },

  // ============================
  // D. パネルデザイン系
  // ============================
  19: {
    id: 'basic-panel', name: '基本パネル（画像ヘッダー付き）', category: 'panel',
    component: BasicPanelSlide, schema: schemas.basicPanelSchema, decoration: true,
    useCase: {
      primary: '1つのトピックを画像付きのカード形式で丁寧に紹介するとき',
      scenarios: ['記事風レイアウト', 'ブログカード', 'ニュース紹介'],
      bestFor: ['single-topic', 'article-style', 'introduction'],
      notFor: ['multi-item', 'comparison'],
    },
  },
  20: {
    id: 'emphasis-panel', name: '強調パネル（左ボーダー付き）', category: 'panel',
    component: EmphasisPanelSlide, schema: schemas.emphasisPanelSchema, decoration: true,
    useCase: {
      primary: '重要な引用・ポイント・注意事項を強調するとき',
      scenarios: ['引用', '重要な注記', 'ハイライト', '警告'],
      bestFor: ['quote', 'highlight', 'important-note', 'callout'],
      notFor: ['multi-item', 'data'],
    },
  },
  21: {
    id: 'glass-panel', name: 'ガラス風パネル', category: 'panel',
    component: GlassPanelSlide, schema: schemas.glassPanelSchema, decoration: false,
    useCase: {
      primary: 'リッチな背景画像の上にモダンなテキストを重ねるとき',
      scenarios: ['ビジュアル重視のメッセージ', 'ブランドイメージ+テキスト'],
      bestFor: ['visual-message', 'modern-style', 'brand'],
      notFor: ['data-heavy', 'plain-text'],
    },
  },
  22: {
    id: 'gradient-panel', name: 'グラデーションパネル', category: 'panel',
    component: GradientPanelSlide, schema: schemas.gradientPanelSchema, decoration: true,
    useCase: {
      primary: 'シンプルな内容を上品に見せたいとき',
      scenarios: ['ミッションステートメント', 'ビジョン', '抽象的なメッセージ'],
      bestFor: ['statement', 'vision', 'elegant'],
      notFor: ['data', 'detailed-content'],
    },
  },
  23: {
    id: 'card', name: 'カード型レイアウト', category: 'panel',
    component: CardSlide, schema: schemas.cardSchema, decoration: true,
    useCase: {
      primary: '画像付きのカードで1つのアイテムを紹介するとき',
      scenarios: ['プロダクトカード', '人物紹介', 'イベント告知'],
      bestFor: ['product', 'person', 'single-item', 'card'],
      notFor: ['multi-item', 'data-heavy'],
    },
  },

  // ============================
  // E. 背景・画像系
  // ============================
  24: {
    id: 'fullscreen-bg', name: '背景画像全画面', category: 'background-image',
    component: FullScreenBgSlide, schema: schemas.fullscreenBgSchema, decoration: false,
    useCase: {
      primary: 'ドラマチックな画像そのものがメッセージのとき',
      scenarios: ['インパクトスライド', 'ムード作り', 'ビジュアルステートメント'],
      bestFor: ['impact', 'mood', 'visual-statement', 'dramatic'],
      notFor: ['text-heavy', 'data', 'detailed'],
    },
  },
  25: {
    id: 'right-aligned-bg', name: '背景画像の右配置', category: 'background-image',
    component: RightAlignedBgSlide, schema: schemas.rightAlignedBgSchema, decoration: false,
    useCase: {
      primary: 'テキストと大きな画像を半々で見せるとき',
      scenarios: ['コンセプト説明+写真', 'ストーリーテリング+ビジュアル'],
      bestFor: ['narrative-visual', 'story', 'half-and-half'],
      notFor: ['data-only', 'multi-image'],
    },
  },
  26: {
    id: 'day-month', name: '日月スライド', category: 'background-image',
    component: DayMonthSlide, schema: schemas.dayMonthSchema, decoration: true,
    useCase: {
      primary: '特定の日付を大きく印象的に見せるとき',
      scenarios: ['イベント日告知', 'ローンチ日', '記念日', 'デッドライン'],
      bestFor: ['date-announcement', 'event', 'launch', 'deadline'],
      notFor: ['general-content', 'data'],
    },
  },
  27: {
    id: 'split-background', name: '複数画像・分割背景', category: 'background-image',
    component: SplitBackgroundSlide, schema: schemas.splitBackgroundSchema, decoration: false,
    useCase: {
      primary: '複数の画像を並べてビジュアルインパクトを出すとき',
      scenarios: ['複数事例の写真', 'ポートフォリオ', 'マルチビジュアル'],
      bestFor: ['multi-visual', 'portfolio', 'gallery'],
      notFor: ['text-heavy', 'single-focus'],
    },
  },

  // ============================
  // F. 特殊系
  // ============================
  28: {
    id: 'statistics', name: '統計数値スライド', category: 'special',
    component: StatisticsSlide, schema: schemas.statisticsSchema, decoration: true,
    useCase: {
      primary: '1〜4個のキー数値がスライドの主役のとき',
      scenarios: ['KPI表示', '成果報告', 'ハイライト数値', 'ダッシュボード風'],
      bestFor: ['kpi', 'metrics', 'numbers', 'results'],
      notFor: ['narrative', 'process', 'detailed-analysis'],
    },
  },
  29: {
    id: 'center-message', name: '中央配置メッセージ', category: 'special',
    component: CenterMessageSlide, schema: schemas.centerMessageSchema, decoration: true,
    useCase: {
      primary: 'たった一言の強烈なメッセージを届けるとき',
      scenarios: ['キーメッセージ', 'スローガン', '問題提起', 'インパクト'],
      bestFor: ['single-message', 'slogan', 'impact', 'pause'],
      notFor: ['detailed', 'multi-point', 'data'],
    },
  },
  30: {
    id: 'qanda', name: 'Q&Aスライド', category: 'special',
    component: QandASlide, schema: schemas.qandaSchema, decoration: true,
    useCase: {
      primary: '質疑応答の時間を案内するとき',
      scenarios: ['質問タイム', 'ディスカッション', '対話の促進'],
      bestFor: ['qa', 'questions', 'discussion', 'interactive'],
      notFor: ['content', 'data', 'narrative'],
    },
  },

  // ============================
  // G. 応用パターン系
  // ============================
  31: {
    id: 'qr-code', name: 'QRコード付き紹介', category: 'applied',
    component: QrCodeSlide, schema: schemas.qrCodeSchema, decoration: true,
    useCase: {
      primary: '聴衆にURLやリソースへのアクセスを促すとき',
      scenarios: ['資料ダウンロード', 'アンケート', 'Webサイト誘導', 'アプリDL'],
      bestFor: ['link-sharing', 'download', 'survey', 'call-to-action'],
      notFor: ['narrative', 'data-heavy'],
    },
  },
  32: {
    id: 'question-prompt', name: '問いかけスライド', category: 'applied',
    component: QuestionPromptSlide, schema: schemas.questionPromptSchema, decoration: true,
    useCase: {
      primary: '聴衆に問いを投げかけて考えさせるとき',
      scenarios: ['思考の促進', 'ディスカッションのきっかけ', '問題提起'],
      bestFor: ['engagement', 'thought-provoking', 'discussion-starter'],
      notFor: ['data', 'summary', 'instruction'],
    },
  },
  33: {
    id: 'decorative', name: '装飾応用スライド', category: 'applied',
    component: DecorativeSlide, schema: schemas.decorativeSchema, decoration: true,
    useCase: {
      primary: 'シンプルな内容を装飾的に引き立てるとき',
      scenarios: ['引用スライド', '名言', 'ステートメント', '印象的なテキスト'],
      bestFor: ['quote', 'statement', 'decorative-text'],
      notFor: ['data', 'process', 'technical'],
    },
  },
  34: {
    id: 'inline-images', name: 'インライン画像スライド', category: 'applied',
    component: InlineImagesSlide, schema: schemas.inlineImagesSchema, decoration: true,
    useCase: {
      primary: 'テキスト説明の下に複数の画像を並べるとき',
      scenarios: ['スクリーンショット一覧', '事例写真', 'ステップの結果画像'],
      bestFor: ['multi-image', 'screenshots', 'examples', 'evidence'],
      notFor: ['single-image', 'text-only'],
    },
  },
  35: {
    id: 'statistics-ratio', name: '統計比率スライド', category: 'applied',
    component: StatisticsRatioSlide, schema: schemas.statisticsRatioSchema, decoration: true,
    useCase: {
      primary: '割合やパーセンテージをバー表示で視覚化するとき',
      scenarios: ['市場シェア', '達成率', 'アンケート結果', '構成比'],
      bestFor: ['percentage', 'ratio', 'share', 'completion'],
      notFor: ['absolute-numbers', 'timeline'],
    },
  },
  36: {
    id: 'text-stats-panel', name: 'テキスト＋統計パネル混在', category: 'applied',
    component: TextStatsPanelSlide, schema: schemas.textStatsPanelSchema, decoration: true,
    useCase: {
      primary: '文章の説明と数値を左右に並べて見せるとき',
      scenarios: ['説明+裏付けデータ', 'ストーリー+数字', 'コンテキスト+KPI'],
      bestFor: ['narrative-with-data', 'context-and-metrics'],
      notFor: ['data-only', 'text-only'],
    },
  },
  37: {
    id: 'glass-summary', name: 'まとめスライド（ガラス風）', category: 'applied',
    component: GlassSummarySlide, schema: schemas.glassSummarySchema, decoration: false,
    useCase: {
      primary: 'ビジュアルリッチにまとめポイントを提示するとき',
      scenarios: ['セクション総括', 'ビジュアルまとめ', 'エグゼクティブサマリー'],
      bestFor: ['summary', 'recap', 'executive-summary', 'visual'],
      notFor: ['data-heavy', 'plain-text'],
    },
  },
  38: {
    id: 'list-stats-panel', name: 'シンプルリスト＋統計パネル', category: 'applied',
    component: ListStatsPanelSlide, schema: schemas.listStatsPanelSchema, decoration: true,
    useCase: {
      primary: '箇条書きの横に数値を添えて説得力を増すとき',
      scenarios: ['成果一覧+数字', 'アクションアイテム+進捗', 'ポイント+裏付け'],
      bestFor: ['list-with-metrics', 'evidence', 'achievements'],
      notFor: ['single-topic', 'visual-heavy'],
    },
  },
  39: {
    id: 'comparison-stats', name: '対比＋統計スライド', category: 'applied',
    component: ComparisonStatsSlide, schema: schemas.comparisonStatsSchema, decoration: true,
    useCase: {
      primary: '複数カテゴリをそれぞれの代表数値とポイントで比較するとき',
      scenarios: ['部門比較', 'プラン比較+数値', '競合分析', 'セグメント別'],
      bestFor: ['multi-category-comparison', 'competitive-analysis', 'segment'],
      notFor: ['single-topic', 'timeline'],
    },
  },

  // ============================
  // H. 動画系
  // ============================
  40: {
    id: 'fullscreen-video', name: '全画面動画スライド', category: 'video',
    component: FullScreenVideoSlide, schema: schemas.fullscreenVideoSchema, decoration: false,
    useCase: {
      primary: 'デモ動画やプロモーション映像をスライド全面で見せるとき',
      scenarios: ['プロダクトデモ', 'プロモーション映像', 'ティザー動画'],
      bestFor: ['demo', 'promotion', 'video-first'],
      notFor: ['text-heavy', 'data'],
    },
  },
  41: {
    id: 'video-text', name: '動画＋テキスト', category: 'video',
    component: VideoTextSlide, schema: schemas.videoTextSchema, decoration: true,
    useCase: {
      primary: '動画で見せながら横にポイントを文字で補足するとき',
      scenarios: ['デモ+説明', '操作動画+手順テキスト'],
      bestFor: ['demo-with-explanation', 'tutorial'],
      notFor: ['text-only', 'data'],
    },
  },
  42: {
    id: 'text-video', name: 'テキスト＋動画', category: 'video',
    component: TextVideoSlide, schema: schemas.textVideoSchema, decoration: true,
    useCase: {
      primary: '説明文が主役で、動画は補足・エビデンスとして添えるとき',
      scenarios: ['説明+証拠動画', 'コンセプト+実例動画'],
      bestFor: ['explanation-with-evidence', 'concept-demo'],
      notFor: ['video-first', 'data'],
    },
  },
  43: {
    id: 'video-caption', name: '動画＋キャプション', category: 'video',
    component: VideoCaptionSlide, schema: schemas.videoCaptionSchema, decoration: true,
    useCase: {
      primary: '短い動画に一言キャッチコピーや解説を添えるとき',
      scenarios: ['ティザー+一言', 'デモ+キャプション'],
      bestFor: ['short-video', 'teaser', 'caption'],
      notFor: ['long-explanation', 'data'],
    },
  },
  44: {
    id: 'two-video-comparison', name: '2動画比較', category: 'video',
    component: TwoVideoComparisonSlide, schema: schemas.twoVideoComparisonSchema, decoration: true,
    useCase: {
      primary: 'Before/Afterや2つの手法を動画で並べて比較するとき',
      scenarios: ['改善前後の動画比較', '2手法の動画比較', 'A/Bテスト結果'],
      bestFor: ['video-comparison', 'before-after', 'ab-test'],
      notFor: ['single-video', 'text-heavy'],
    },
  },
};

// 番号からコンポーネントを取得するヘルパー
export function getLayout(layoutNumber: number): LayoutEntry | undefined {
  return layoutRegistry[layoutNumber];
}

// カテゴリで絞り込み
export function getLayoutsByCategory(category: TemplateCategory): Array<[number, LayoutEntry]> {
  return Object.entries(layoutRegistry)
    .filter(([, entry]) => entry.category === category)
    .map(([num, entry]) => [Number(num), entry]);
}

// ユースケースのbestForタグで検索
export function findLayoutsByTag(tag: string): Array<[number, LayoutEntry]> {
  return Object.entries(layoutRegistry)
    .filter(([, entry]) => entry.useCase.bestFor.includes(tag))
    .map(([num, entry]) => [Number(num), entry]);
}
