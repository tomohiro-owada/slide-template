// schemas.ts — 全44レイアウトのコンテンツスキーマ定義
// 各フィールドに型・制約・役割を定義し、AIが確実に値をはめられるようにする

export interface FieldConstraint {
  type: 'text' | 'richtext' | 'number' | 'image' | 'video' | 'chart' | 'list' | 'icon';
  required: boolean;
  label: string;
  minLength?: number;
  maxLength?: number;
  lines?: number;
  format?: string;
  minItems?: number;
  maxItems?: number;
  itemSchema?: Record<string, FieldConstraint>;
  role?: 'headline' | 'subheadline' | 'body' | 'caption' | 'stat-value' | 'stat-label' | 'step-title' | 'step-body';
  hint?: string;
  placeholder?: string;
  enum?: string[];
}

export type SchemaDefinition = Record<string, FieldConstraint>;

// ============================
// A. タイトル・セクション系 (1-5)
// ============================

export const titleSchema: SchemaDefinition = {
  title:     { type: 'text', required: true,  label: 'タイトル',     role: 'headline',    maxLength: 40, lines: 2, hint: '2行以内。例: "Q3 Revenue Report"' },
  subtitle:  { type: 'text', required: false, label: 'サブタイトル',  role: 'caption',     maxLength: 60, lines: 1 },
  presenter: { type: 'text', required: false, label: '発表者名',     role: 'caption',     maxLength: 30 },
  date:      { type: 'text', required: false, label: '日付',         role: 'caption',     maxLength: 20 },
};

export const sectionStartSchema: SchemaDefinition = {
  sectionNumber: { type: 'text', required: false, label: 'セクション番号', role: 'stat-value', maxLength: 3, hint: '"01" のようにゼロ埋め' },
  title:         { type: 'text', required: true,  label: 'セクションタイトル', role: 'headline', maxLength: 40, lines: 2 },
  subtitle:      { type: 'text', required: false, label: '補足テキスト', role: 'body', maxLength: 80, lines: 2 },
};

export const sectionEndSchema: SchemaDefinition = {
  title:     { type: 'text', required: true,  label: 'まとめタイトル', role: 'subheadline', maxLength: 30 },
  keyPoints: { type: 'list', required: true,  label: 'まとめポイント', minItems: 2, maxItems: 5,
    itemSchema: {
      text: { type: 'text', required: true, label: 'ポイント', role: 'body', maxLength: 60 },
    },
  },
};

export const tocSchema: SchemaDefinition = {
  title: { type: 'text', required: false, label: '見出し', role: 'subheadline', maxLength: 30, placeholder: 'Table of contents' },
  items: { type: 'list', required: true, label: '目次項目', minItems: 3, maxItems: 8,
    itemSchema: {
      number:      { type: 'text', required: true,  label: '番号',   role: 'stat-value', maxLength: 2, hint: '"01"' },
      label:       { type: 'text', required: true,  label: '項目名', role: 'step-title', maxLength: 20 },
      description: { type: 'text', required: false, label: '説明',   role: 'caption',    maxLength: 40 },
    },
  },
};

export const closingSchema: SchemaDefinition = {
  title:       { type: 'text', required: true,  label: '締めの言葉',  role: 'headline',    maxLength: 30, hint: '"Thank you" "ご清聴ありがとうございました"' },
  subtitle:    { type: 'text', required: false, label: '補足',        role: 'body',        maxLength: 60 },
  contactName: { type: 'text', required: false, label: '連絡先名前',  role: 'caption',     maxLength: 30 },
  contactEmail:{ type: 'text', required: false, label: 'メール',      role: 'caption',     maxLength: 50 },
  contactUrl:  { type: 'text', required: false, label: 'URL',         role: 'caption',     maxLength: 60 },
};

// ============================
// B. カラムレイアウト系 (6-14)
// ============================

export const twoColComparisonSchema: SchemaDefinition = {
  title:       { type: 'text', required: true,  label: '比較タイトル', role: 'subheadline', maxLength: 30 },
  leftLabel:   { type: 'text', required: true,  label: '左ラベル',    role: 'step-title',  maxLength: 15, hint: '"Before" "Q2" "現状"' },
  leftPoints:  { type: 'list', required: true,  label: '左側ポイント', minItems: 1, maxItems: 5,
    itemSchema: { text: { type: 'text', required: true, label: 'ポイント', role: 'body', maxLength: 50 } },
  },
  rightLabel:  { type: 'text', required: true,  label: '右ラベル',    role: 'step-title',  maxLength: 15, hint: '"After" "Q3" "改善後"' },
  rightPoints: { type: 'list', required: true,  label: '右側ポイント', minItems: 1, maxItems: 5,
    itemSchema: { text: { type: 'text', required: true, label: 'ポイント', role: 'body', maxLength: 50 } },
  },
};

export const twoColTextImageSchema: SchemaDefinition = {
  title: { type: 'text',  required: true,  label: '見出し',   role: 'subheadline', maxLength: 30 },
  body:  { type: 'text',  required: true,  label: '本文',     role: 'body',        maxLength: 200, lines: 5 },
  image: { type: 'image', required: true,  label: '右側画像', hint: 'テキストを補強する画像' },
};

export const twoColImageTextSchema: SchemaDefinition = {
  title: { type: 'text',  required: true,  label: '見出し',   role: 'subheadline', maxLength: 30 },
  body:  { type: 'text',  required: true,  label: '本文',     role: 'body',        maxLength: 200, lines: 5 },
  image: { type: 'image', required: true,  label: '左側画像', hint: 'テキストを補強する画像' },
};

export const threeColImageTextSchema: SchemaDefinition = {
  title:   { type: 'text', required: true, label: '見出し', role: 'subheadline', maxLength: 30 },
  columns: { type: 'list', required: true, label: '3カラム', minItems: 3, maxItems: 3,
    itemSchema: {
      image: { type: 'image', required: true,  label: '画像' },
      title: { type: 'text',  required: true,  label: 'カラム見出し', role: 'step-title', maxLength: 15 },
      body:  { type: 'text',  required: false, label: 'カラム本文',   role: 'step-body',  maxLength: 60 },
    },
  },
};

export const threeColAccentSchema: SchemaDefinition = {
  title:       { type: 'text',   required: true, label: '見出し', role: 'subheadline', maxLength: 30 },
  columns:     { type: 'list',   required: true, label: '3カラム', minItems: 3, maxItems: 3,
    itemSchema: {
      title: { type: 'text', required: true,  label: 'カラム見出し', role: 'step-title', maxLength: 15 },
      body:  { type: 'text', required: true,  label: 'カラム本文',   role: 'step-body',  maxLength: 80 },
    },
  },
  accentIndex: { type: 'number', required: false, label: '強調するカラム（0始まり）', hint: '0〜2。省略時は0' },
};

export const fourColSchema: SchemaDefinition = {
  title:   { type: 'text', required: true, label: '見出し', role: 'subheadline', maxLength: 30 },
  columns: { type: 'list', required: true, label: '4カラム', minItems: 4, maxItems: 4,
    itemSchema: {
      icon:  { type: 'icon', required: false, label: 'アイコン名' },
      title: { type: 'text', required: true,  label: 'カラム見出し', role: 'step-title', maxLength: 12 },
      body:  { type: 'text', required: false, label: 'カラム本文',   role: 'step-body',  maxLength: 50 },
    },
  },
};

export const fiveColSchema: SchemaDefinition = {
  title:   { type: 'text', required: true, label: '見出し', role: 'subheadline', maxLength: 30 },
  columns: { type: 'list', required: true, label: '5カラム', minItems: 5, maxItems: 5,
    itemSchema: {
      title: { type: 'text',   required: true,  label: 'カラム見出し', role: 'step-title', maxLength: 10 },
      body:  { type: 'text',   required: false, label: 'カラム本文',   role: 'caption',    maxLength: 40 },
      level: { type: 'number', required: false, label: 'レベル（1-5）', hint: '応用度・達成度など' },
    },
  },
};

export const twoByTwoGridSchema: SchemaDefinition = {
  title: { type: 'text', required: false, label: '見出し', role: 'subheadline', maxLength: 30 },
  items: { type: 'list', required: true, label: '4項目', minItems: 4, maxItems: 4,
    itemSchema: {
      image: { type: 'image', required: true,  label: '画像' },
      title: { type: 'text',  required: true,  label: '項目見出し', role: 'step-title', maxLength: 15 },
      body:  { type: 'text',  required: false, label: '項目本文',   role: 'caption',    maxLength: 40 },
    },
  },
};

export const twoByThreeGridSchema: SchemaDefinition = {
  title: { type: 'text', required: false, label: '見出し', role: 'subheadline', maxLength: 30 },
  items: { type: 'list', required: true, label: '6項目', minItems: 6, maxItems: 6,
    itemSchema: {
      image: { type: 'image', required: false, label: '画像' },
      title: { type: 'text',  required: true,  label: '項目見出し', role: 'step-title', maxLength: 15 },
      body:  { type: 'text',  required: false, label: '項目本文',   role: 'caption',    maxLength: 40 },
    },
  },
};

// ============================
// C. 箇条リスト系 (15-18)
// ============================

export const bulletThreeStepSchema: SchemaDefinition = {
  title: { type: 'text', required: true, label: '見出し', role: 'subheadline', maxLength: 30 },
  steps: { type: 'list', required: true, label: 'ステップ', minItems: 3, maxItems: 3,
    itemSchema: {
      title: { type: 'text', required: true,  label: 'ステップ見出し', role: 'step-title', maxLength: 20 },
      body:  { type: 'text', required: true,  label: 'ステップ説明',   role: 'step-body',  maxLength: 80 },
    },
  },
};

export const numberedStepsSchema: SchemaDefinition = {
  title: { type: 'text', required: true, label: '見出し', role: 'subheadline', maxLength: 30 },
  steps: { type: 'list', required: true, label: 'ステップ', minItems: 3, maxItems: 6,
    itemSchema: {
      number: { type: 'text', required: true,  label: '番号',         role: 'stat-value',  maxLength: 2 },
      title:  { type: 'text', required: true,  label: 'ステップ見出し', role: 'step-title', maxLength: 15 },
      body:   { type: 'text', required: false, label: 'ステップ説明',   role: 'step-body',  maxLength: 60 },
    },
  },
};

export const timelineSchema: SchemaDefinition = {
  title:  { type: 'text', required: true, label: '見出し', role: 'subheadline', maxLength: 30 },
  events: { type: 'list', required: true, label: 'イベント', minItems: 3, maxItems: 6,
    itemSchema: {
      date:        { type: 'text', required: true,  label: '日付/時期',   role: 'stat-label', maxLength: 10, hint: '"2024 Q1" "Phase 1"' },
      title:       { type: 'text', required: true,  label: 'イベント名',   role: 'step-title', maxLength: 20 },
      description: { type: 'text', required: false, label: 'イベント説明', role: 'step-body',  maxLength: 60 },
    },
  },
};

export const iconListSchema: SchemaDefinition = {
  title: { type: 'text', required: true, label: '見出し', role: 'subheadline', maxLength: 30 },
  items: { type: 'list', required: true, label: 'リスト項目', minItems: 3, maxItems: 6,
    itemSchema: {
      icon:  { type: 'icon', required: true,  label: 'アイコン名', hint: 'check, star, arrow, heart 等' },
      title: { type: 'text', required: true,  label: '項目見出し', role: 'step-title', maxLength: 20 },
      body:  { type: 'text', required: false, label: '項目説明',   role: 'step-body',  maxLength: 60 },
    },
  },
};

// ============================
// D. パネルデザイン系 (19-23)
// ============================

export const basicPanelSchema: SchemaDefinition = {
  title:  { type: 'text',  required: true,  label: 'パネルタイトル', role: 'subheadline', maxLength: 30 },
  image:  { type: 'image', required: true,  label: 'ヘッダー画像',  hint: 'パネル上部に表示される画像' },
  body:   { type: 'text',  required: true,  label: '本文',          role: 'body', maxLength: 200, lines: 5 },
  footer: { type: 'text',  required: false, label: 'フッターテキスト', role: 'caption', maxLength: 40 },
};

export const emphasisPanelSchema: SchemaDefinition = {
  title:     { type: 'text', required: true,  label: 'パネルタイトル', role: 'subheadline', maxLength: 30 },
  body:      { type: 'text', required: true,  label: '本文',          role: 'body', maxLength: 200, lines: 5 },
  highlight: { type: 'text', required: false, label: '強調テキスト',   role: 'step-title', maxLength: 50, hint: '左ボーダーの横に強調表示' },
};

export const glassPanelSchema: SchemaDefinition = {
  title:           { type: 'text',  required: true,  label: 'パネルタイトル', role: 'subheadline', maxLength: 30 },
  body:            { type: 'text',  required: true,  label: '本文',          role: 'body', maxLength: 200, lines: 5 },
  backgroundImage: { type: 'image', required: true,  label: '背景画像',      hint: 'ガラス効果の後ろに表示' },
};

export const gradientPanelSchema: SchemaDefinition = {
  title: { type: 'text', required: true,  label: 'パネルタイトル', role: 'subheadline', maxLength: 30 },
  body:  { type: 'text', required: true,  label: '本文',          role: 'body', maxLength: 200, lines: 5 },
};

export const cardSchema: SchemaDefinition = {
  title: { type: 'text',  required: true,  label: 'カードタイトル', role: 'subheadline', maxLength: 30 },
  image: { type: 'image', required: true,  label: 'カード画像',    hint: 'カード上部の画像' },
  body:  { type: 'text',  required: true,  label: '本文',          role: 'body', maxLength: 150 },
  tags:  { type: 'list',  required: false, label: 'タグ', maxItems: 4,
    itemSchema: { text: { type: 'text', required: true, label: 'タグ', role: 'caption', maxLength: 15 } },
  },
};

// ============================
// E. 背景・画像系 (24-27)
// ============================

export const fullscreenBgSchema: SchemaDefinition = {
  title:           { type: 'text',  required: true,  label: 'タイトル',  role: 'headline',    maxLength: 30 },
  subtitle:        { type: 'text',  required: false, label: 'サブ',      role: 'body',        maxLength: 60 },
  backgroundImage: { type: 'image', required: true,  label: '全画面背景画像' },
};

export const rightAlignedBgSchema: SchemaDefinition = {
  title:           { type: 'text',  required: true,  label: 'タイトル',  role: 'subheadline', maxLength: 30 },
  body:            { type: 'text',  required: true,  label: '本文',      role: 'body',        maxLength: 200, lines: 5 },
  backgroundImage: { type: 'image', required: true,  label: '右側背景画像' },
};

export const dayMonthSchema: SchemaDefinition = {
  day:   { type: 'text', required: true,  label: '日',     role: 'stat-value',  maxLength: 2, hint: '"20"' },
  month: { type: 'text', required: true,  label: '月',     role: 'stat-label',  maxLength: 10, hint: '"March" "3月"' },
  title: { type: 'text', required: true,  label: 'タイトル', role: 'subheadline', maxLength: 30 },
  body:  { type: 'text', required: false, label: '本文',    role: 'body', maxLength: 150 },
};

export const splitBackgroundSchema: SchemaDefinition = {
  title:  { type: 'text', required: true, label: 'タイトル', role: 'subheadline', maxLength: 30 },
  body:   { type: 'text', required: false, label: '本文',   role: 'body', maxLength: 100 },
  images: { type: 'list', required: true, label: '分割画像', minItems: 2, maxItems: 4,
    itemSchema: { image: { type: 'image', required: true, label: '画像' } },
  },
};

// ============================
// F. 特殊系 (28-30)
// ============================

export const statisticsSchema: SchemaDefinition = {
  title: { type: 'text', required: true, label: 'タイトル', role: 'subheadline', maxLength: 30 },
  stats: { type: 'list', required: true, label: '統計数値', minItems: 1, maxItems: 4,
    itemSchema: {
      value: { type: 'text', required: true,  label: '数値',     role: 'stat-value', maxLength: 8, hint: '"23%" "$4.2M" "150+"' },
      label: { type: 'text', required: true,  label: '数値ラベル', role: 'stat-label', maxLength: 15 },
      trend: { type: 'text', required: false, label: 'トレンド',  enum: ['up', 'down', 'neutral'] },
    },
  },
  footnote: { type: 'text', required: false, label: '脚注', role: 'caption', maxLength: 80 },
};

export const centerMessageSchema: SchemaDefinition = {
  message: { type: 'text', required: true,  label: '一言メッセージ', role: 'headline', minLength: 2, maxLength: 30, lines: 1, hint: '短いほど強い。例: "Think Different"' },
  subtext: { type: 'text', required: false, label: '補足',          role: 'body',     maxLength: 100, lines: 2 },
};

export const qandaSchema: SchemaDefinition = {
  title:    { type: 'text', required: false, label: 'タイトル', role: 'headline', maxLength: 20, placeholder: 'Q&A' },
  subtitle: { type: 'text', required: false, label: 'サブ',     role: 'body',     maxLength: 60, placeholder: 'ご質問はありますか？' },
};

// ============================
// G. 応用パターン系 (31-39)
// ============================

export const qrCodeSchema: SchemaDefinition = {
  title:       { type: 'text', required: true,  label: 'タイトル', role: 'subheadline', maxLength: 30 },
  url:         { type: 'text', required: true,  label: 'QR用URL',  role: 'caption', maxLength: 200 },
  description: { type: 'text', required: false, label: '説明',     role: 'body', maxLength: 80 },
};

export const questionPromptSchema: SchemaDefinition = {
  question: { type: 'text', required: true,  label: '問いかけ', role: 'headline',    maxLength: 50, hint: '聴衆に投げかける問い' },
  subtext:  { type: 'text', required: false, label: '補足',     role: 'body',        maxLength: 100 },
};

export const decorativeSchema: SchemaDefinition = {
  title: { type: 'text', required: true,  label: 'タイトル', role: 'subheadline', maxLength: 30 },
  body:  { type: 'text', required: true,  label: '本文',     role: 'body', maxLength: 200 },
};

export const inlineImagesSchema: SchemaDefinition = {
  title:  { type: 'text', required: true, label: 'タイトル', role: 'subheadline', maxLength: 30 },
  body:   { type: 'text', required: true, label: '本文',     role: 'body', maxLength: 200 },
  images: { type: 'list', required: true, label: 'インライン画像', minItems: 1, maxItems: 4,
    itemSchema: {
      image:   { type: 'image', required: true,  label: '画像' },
      caption: { type: 'text',  required: false, label: 'キャプション', role: 'caption', maxLength: 30 },
    },
  },
};

export const statisticsRatioSchema: SchemaDefinition = {
  title:  { type: 'text', required: true, label: 'タイトル', role: 'subheadline', maxLength: 30 },
  ratios: { type: 'list', required: true, label: '比率データ', minItems: 2, maxItems: 4,
    itemSchema: {
      value: { type: 'text',   required: true, label: '値',     role: 'stat-value', maxLength: 6, hint: '"72%"' },
      label: { type: 'text',   required: true, label: 'ラベル', role: 'stat-label', maxLength: 15 },
      total: { type: 'number', required: false, label: '全体値' },
    },
  },
};

export const textStatsPanelSchema: SchemaDefinition = {
  title: { type: 'text', required: true, label: 'タイトル', role: 'subheadline', maxLength: 30 },
  body:  { type: 'text', required: true, label: '本文',     role: 'body', maxLength: 200 },
  stats: { type: 'list', required: true, label: '統計パネル', minItems: 1, maxItems: 3,
    itemSchema: {
      value: { type: 'text', required: true, label: '数値',     role: 'stat-value', maxLength: 8 },
      label: { type: 'text', required: true, label: '数値ラベル', role: 'stat-label', maxLength: 15 },
    },
  },
};

export const glassSummarySchema: SchemaDefinition = {
  title:           { type: 'text',  required: true,  label: 'まとめタイトル', role: 'subheadline', maxLength: 30 },
  keyPoints:       { type: 'list',  required: true,  label: 'まとめポイント', minItems: 2, maxItems: 5,
    itemSchema: { text: { type: 'text', required: true, label: 'ポイント', role: 'body', maxLength: 60 } },
  },
  backgroundImage: { type: 'image', required: true,  label: '背景画像' },
};

export const listStatsPanelSchema: SchemaDefinition = {
  title: { type: 'text', required: true, label: 'タイトル', role: 'subheadline', maxLength: 30 },
  items: { type: 'list', required: true, label: 'リスト項目', minItems: 2, maxItems: 5,
    itemSchema: { text: { type: 'text', required: true, label: '項目', role: 'body', maxLength: 50 } },
  },
  stats: { type: 'list', required: true, label: '統計パネル', minItems: 1, maxItems: 3,
    itemSchema: {
      value: { type: 'text', required: true, label: '数値',     role: 'stat-value', maxLength: 8 },
      label: { type: 'text', required: true, label: '数値ラベル', role: 'stat-label', maxLength: 15 },
    },
  },
};

export const comparisonStatsSchema: SchemaDefinition = {
  title:      { type: 'text', required: true, label: 'タイトル', role: 'subheadline', maxLength: 30 },
  categories: { type: 'list', required: true, label: 'カテゴリ', minItems: 2, maxItems: 3,
    itemSchema: {
      label:  { type: 'text', required: true, label: 'カテゴリ名', role: 'step-title', maxLength: 15 },
      stat:   { type: 'text', required: true, label: '代表数値',   role: 'stat-value', maxLength: 8 },
      points: { type: 'list', required: true, label: 'ポイント', minItems: 1, maxItems: 4,
        itemSchema: { text: { type: 'text', required: true, label: 'ポイント', role: 'step-body', maxLength: 40 } },
      },
    },
  },
};

// ============================
// H. 動画系 (40-44)
// ============================

export const fullscreenVideoSchema: SchemaDefinition = {
  title:   { type: 'text',  required: false, label: 'オーバーレイタイトル', role: 'headline', maxLength: 30 },
  video:   { type: 'video', required: true,  label: '動画' },
  overlay: { type: 'text',  required: false, label: 'オーバーレイテキスト', role: 'caption', maxLength: 60 },
};

export const videoTextSchema: SchemaDefinition = {
  title: { type: 'text',  required: true, label: '見出し', role: 'subheadline', maxLength: 30 },
  body:  { type: 'text',  required: true, label: '本文',   role: 'body', maxLength: 200, lines: 5 },
  video: { type: 'video', required: true, label: '左側動画' },
};

export const textVideoSchema: SchemaDefinition = {
  title: { type: 'text',  required: true, label: '見出し', role: 'subheadline', maxLength: 30 },
  body:  { type: 'text',  required: true, label: '本文',   role: 'body', maxLength: 200, lines: 5 },
  video: { type: 'video', required: true, label: '右側動画' },
};

export const videoCaptionSchema: SchemaDefinition = {
  video:   { type: 'video', required: true,  label: '動画' },
  caption: { type: 'text',  required: true,  label: 'キャプション', role: 'subheadline', maxLength: 50 },
};

export const twoVideoComparisonSchema: SchemaDefinition = {
  title:      { type: 'text',  required: true,  label: '比較タイトル', role: 'subheadline', maxLength: 30 },
  leftVideo:  { type: 'video', required: true,  label: '左側動画' },
  rightVideo: { type: 'video', required: true,  label: '右側動画' },
  leftLabel:  { type: 'text',  required: true,  label: '左ラベル',    role: 'step-title', maxLength: 15 },
  rightLabel: { type: 'text',  required: true,  label: '右ラベル',    role: 'step-title', maxLength: 15 },
};
