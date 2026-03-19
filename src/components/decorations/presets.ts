import type { DecorationConfig } from '../../types/slide';

export const decorationPresets: Record<string, DecorationConfig> = {
  // === カーブ系（ラインなし）===

  // 四隅全部
  'curves-all': {
    slots: {
      'top-left':     { enabled: true, element: 'curve' },
      'top-right':    { enabled: true, element: 'curve' },
      'bottom-left':  { enabled: true, element: 'curve' },
      'bottom-right': { enabled: true, element: 'curve' },
    },
    topLine:    { enabled: false, variant: 'single' },
    bottomLine: { enabled: false, variant: 'single' },
    exposure: 1.0,
  },

  // 左上＋右下（対角）
  'curves-diagonal': {
    slots: {
      'top-left':     { enabled: true, element: 'curve' },
      'bottom-right': { enabled: true, element: 'curve' },
    },
    topLine:    { enabled: false, variant: 'single' },
    bottomLine: { enabled: false, variant: 'single' },
    exposure: 1.0,
  },

  // 右上のみ
  'curves-top-right': {
    slots: {
      'top-right': { enabled: true, element: 'curve' },
    },
    topLine:    { enabled: false, variant: 'single' },
    bottomLine: { enabled: false, variant: 'single' },
    exposure: 1.0,
  },

  // === ライン系（カーブなし）===

  // 上下ダブルライン
  'lines-double': {
    slots: {},
    topLine:    { enabled: true, variant: 'double' },
    bottomLine: { enabled: true, variant: 'double' },
    exposure: 1.0,
  },

  // 上ダブル＋下シングル
  'lines-mixed': {
    slots: {},
    topLine:    { enabled: true, variant: 'double' },
    bottomLine: { enabled: true, variant: 'single' },
    exposure: 1.0,
  },

  // 上ラインのみ
  'lines-top': {
    slots: {},
    topLine:    { enabled: true, variant: 'single' },
    bottomLine: { enabled: false, variant: 'single' },
    exposure: 1.0,
  },

  // === なし ===
  'none': {
    slots: {},
    topLine:    { enabled: false, variant: 'single' },
    bottomLine: { enabled: false, variant: 'single' },
    exposure: 0,
  },
};
