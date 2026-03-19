// tokens.ts — デザインの源泉。ここだけ触れば全部変わる。

import { palette, layoutTheme, chartTheme } from '../colors';

const tokens = {
  palette,
  layout: layoutTheme,
  chart: chartTheme,

  font: {
    // 英文フォントと日本語フォントを分離して定義
    // 合成は heading / body で行う
    en: {
      heading: 'Playfair Display',
      body:    'Inter',
    },
    ja: {
      heading: 'Noto Serif JP',
      body:    'Noto Sans JP',
    },
    // 合成済み（コンポーネントはこっちを使う）
    heading: "'Playfair Display', 'Noto Serif JP', serif",
    body:    "'Inter', 'Noto Sans JP', sans-serif",
    mono:    "'JetBrains Mono', monospace",
    weight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 900,
    },
  },

  // 1920x1080 ベース
  size: {
    h1: 72,
    h2: 56,
    h3: 40,
    h4: 32,
    body: 24,
    caption: 18,
    label: 14,
    number: 96,  // 統計の大きな数字
  },

  spacing: {
    xs:  8,
    sm:  16,
    md:  24,
    lg:  32,
    xl:  48,
    xxl: 64,
    slidePadding: 64,
  },

  radius: {
    none: 0,
    sm:   4,
    md:   8,
    lg:   16,
    xl:   24,
    full: 9999,
  },

  shadow: {
    none: 'none',
    sm:   '0 1px 3px rgba(0,0,0,0.08)',
    md:   '0 4px 12px rgba(0,0,0,0.10)',
    lg:   '0 8px 24px rgba(0,0,0,0.12)',
  },

  glass: {
    background: 'rgba(255,255,255,0.72)',
    blur: 16,
    border: 'rgba(255,255,255,0.3)',
  },

  // スライドサイズ
  slide: {
    width: 1920,
    height: 1080,
  },
} as const;

export { tokens };
export type Tokens = typeof tokens;
