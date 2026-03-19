import type { DecorationConfig } from '../../types/slide';

// 画像のスライドから読み取ったプリセット
export const decorationPresets: Record<string, DecorationConfig> = {
  // タイトルスライド: 左上＋右下にカーブ大、上下ダブルライン
  title: {
    slots: {
      'top-left':     { enabled: true, element: 'curve', size: 'lg' },
      'bottom-right': { enabled: true, element: 'curve', size: 'lg' },
    },
    topLine:    { enabled: true, variant: 'double' },
    bottomLine: { enabled: true, variant: 'double' },
    exposure: 1.0,
  },

  // コンテンツA: 右上カーブ小、上ダブルライン
  'content-a': {
    slots: {
      'top-right': { enabled: true, element: 'curve', size: 'sm' },
    },
    topLine:    { enabled: true, variant: 'double' },
    bottomLine: { enabled: false, variant: 'single' },
    exposure: 1.0,
  },

  // コンテンツB: 下左右にカーブ小、上下ライン
  'content-b': {
    slots: {
      'bottom-left':  { enabled: true, element: 'curve', size: 'sm' },
      'bottom-right': { enabled: true, element: 'curve', size: 'sm' },
    },
    topLine:    { enabled: true, variant: 'double' },
    bottomLine: { enabled: true, variant: 'single' },
    exposure: 1.0,
  },

  // フレーム: 上下ダブルラインのみ（カーブなし）
  frame: {
    slots: {},
    topLine:    { enabled: true, variant: 'double' },
    bottomLine: { enabled: true, variant: 'double' },
    exposure: 1.0,
  },

  // ミニマル: 上ラインだけ
  minimal: {
    slots: {},
    topLine:    { enabled: true, variant: 'single' },
    bottomLine: { enabled: false, variant: 'single' },
    exposure: 1.0,
  },

  // アクセント左: 左上カーブ中＋上下ライン
  'accent-left': {
    slots: {
      'top-left': { enabled: true, element: 'curve', size: 'md' },
    },
    topLine:    { enabled: true, variant: 'double' },
    bottomLine: { enabled: true, variant: 'single' },
    exposure: 1.0,
  },

  // アクセント右: 右下カーブ中＋上下ライン
  'accent-right': {
    slots: {
      'bottom-right': { enabled: true, element: 'curve', size: 'md' },
    },
    topLine:    { enabled: true, variant: 'double' },
    bottomLine: { enabled: true, variant: 'single' },
    exposure: 1.0,
  },

  // 飾りなし
  none: {
    slots: {},
    topLine:    { enabled: false, variant: 'single' },
    bottomLine: { enabled: false, variant: 'single' },
    exposure: 0,
  },
};
