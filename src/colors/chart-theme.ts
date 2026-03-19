// chart-theme.ts — チャート用の色セット（表現意図別）
// レイアウトとは完全独立

import { palette } from './palette';

const chartTheme = {
  // 全部均等に色分け（カテゴリ比較）
  categorical: {
    colors: [
      palette.blue[500],
      palette.emerald[500],
      palette.amber[500],
      palette.red[500],
      palette.violet[500],
      palette.pink[500],
    ],
  },

  // 1個だけ目立たせる（注目させたい値がある）
  highlight: {
    active: palette.navy[900],
    muted:  palette.gray[200],
  },

  // 順序・段階を示す（同系色のグラデ）
  sequential: {
    steps: [
      palette.blue[100],
      palette.blue[300],
      palette.blue[500],
      palette.blue[700],
      palette.blue[900],
    ],
  },

  // 良い↔悪い、正↔負（対比）
  diverging: {
    positive: palette.emerald[500],
    neutral:  palette.gray[300],
    negative: palette.red[500],
  },

  // 2者比較専用
  comparison: {
    a:      palette.navy[900],
    b:      palette.warm[400],
    aMuted: palette.navy[200],
    bMuted: palette.warm[200],
  },

  // 共通設定
  defaults: {
    gridColor:     palette.gray[100],
    labelColor:    palette.gray[500],
    zeroLineColor: palette.gray[200],
  },
} as const;

export { chartTheme };

export type ChartColorIntent =
  | 'categorical'
  | 'highlight'
  | 'sequential'
  | 'diverging'
  | 'comparison';

export type ChartTheme = typeof chartTheme;
