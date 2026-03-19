// layout-theme.ts — レイアウト用の色マッピング
// palette から引いて「役割」を割り当てる

import { palette } from './palette';

const layoutTheme = {
  slide: {
    background:     palette.warm[100],     // ベージュ背景
    backgroundAlt:  palette.warm[50],
    backgroundDark: palette.navy[900],
  },
  text: {
    heading:  palette.black,               // 画像と同じく真っ黒の見出し
    body:     palette.navy[700],
    muted:    palette.gray[400],
    inverse:  palette.white,
    accent:   palette.navy[900],
  },
  panel: {
    background:     palette.white,
    border:         palette.gray[200],
    emphasisBorder: palette.navy[900],
  },
  decoration: {
    line:  palette.navy[800],              // 水平線の色
    curve: palette.navy[800],              // 波線の色
  },
  brand: {
    primary:   palette.navy[900],
    secondary: palette.navy[600],
  },
  glass: {
    background: 'rgba(255,255,255,0.72)',
    border:     'rgba(255,255,255,0.3)',
  },
} as const;

export { layoutTheme };
export type LayoutTheme = typeof layoutTheme;
