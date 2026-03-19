// deck-loader.ts — deck.json を読み込んでレイアウト番号→コンポーネントに解決

import { layoutRegistry, getLayout } from '../config/layout-registry';
import { decorationPresets } from '../components/decorations';
import type { DecorationConfig } from '../types/slide';

// deck.json の型
export interface DeckJson {
  meta: {
    title: string;
    author?: string;
    date?: string;
  };
  colors?: {
    palette?: string;
    layout?: string;
    chart?: string;
  };
  fonts?: {
    en?: { heading?: string; body?: string };
    ja?: { heading?: string; body?: string };
  };
  branding?: {
    logo?: string;              // ロゴ画像パス（falseで非表示）
    logoPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    confidential?: boolean;     // true = 「社外秘」表示
    confidentialText?: string;  // カスタムテキスト（省略時: "CONFIDENTIAL / 社外秘"）
  };
  defaults: {
    decoration: string;
    exposure: number;
  };
  slides: DeckSlide[];
}

// decoration は プリセット名(string) or 四隅を直接指定(object)
export type SlideDecoration =
  | string                                           // プリセット名: "curves-diagonal"
  | { corners: Array<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'> }; // 四隅を直接指定

export interface DeckSlide {
  layout: number;
  content: Record<string, unknown>;
  decoration?: SlideDecoration;  // スライド個別の飾り指定
  exposure?: number;
  chart?: {
    intent: string;
    highlightIndex?: number;
  };
  notes?: string;
}

// 解決済みスライド
export interface ResolvedSlide {
  layoutNumber: number;
  layoutId: string;
  layoutName: string;
  component: React.ComponentType<any>;
  content: Record<string, unknown>;
  decoration: DecorationConfig | undefined;
  notes?: string;
}

export interface ResolvedFonts {
  heading: string;  // "'Playfair Display', 'Noto Serif JP', serif"
  body: string;
}

export interface ResolvedBranding {
  logo?: string;
  logoPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  confidential: boolean;
  confidentialText: string;
}

export interface ResolvedDeck {
  meta: DeckJson['meta'];
  fonts: ResolvedFonts;
  branding: ResolvedBranding;
  slides: ResolvedSlide[];
  defaultDecoration: DecorationConfig | undefined;
}

// deck.json を fetch して解決
export async function loadDeck(url: string): Promise<ResolvedDeck> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load deck: ${res.statusText}`);
  const json: DeckJson = await res.json();
  return resolveDeck(json);
}

// フォント合成
function resolveFonts(deck: DeckJson): ResolvedFonts {
  const enH = deck.fonts?.en?.heading ?? 'Playfair Display';
  const enB = deck.fonts?.en?.body ?? 'Inter';
  const jaH = deck.fonts?.ja?.heading ?? 'Noto Serif JP';
  const jaB = deck.fonts?.ja?.body ?? 'Noto Sans JP';
  return {
    heading: `'${enH}', '${jaH}', serif`,
    body: `'${enB}', '${jaB}', sans-serif`,
  };
}

// DeckJson → ResolvedDeck
export function resolveDeck(deck: DeckJson): ResolvedDeck {
  const fonts = resolveFonts(deck);
  const branding: ResolvedBranding = {
    logo: deck.branding?.logo,
    logoPosition: deck.branding?.logoPosition ?? 'top-right',
    confidential: deck.branding?.confidential ?? false,
    confidentialText: deck.branding?.confidentialText ?? 'CONFIDENTIAL / 社外秘',
  };
  const defaultPreset = decorationPresets[deck.defaults.decoration];
  const defaultDecoration: DecorationConfig | undefined = defaultPreset
    ? { ...defaultPreset, exposure: deck.defaults.exposure }
    : undefined;

  const slides: ResolvedSlide[] = deck.slides.map((slide) => {
    const layout = getLayout(slide.layout);
    if (!layout) {
      console.warn(`Layout #${slide.layout} not found, skipping`);
      return null;
    }

    // デコレーション: レイアウトが decoration:false なら undefined
    let decoration: DecorationConfig | undefined = undefined;
    if (layout.decoration) {
      const exp = slide.exposure ?? deck.defaults.exposure;

      if (slide.decoration) {
        if (typeof slide.decoration === 'string') {
          // プリセット名指定
          const preset = decorationPresets[slide.decoration];
          decoration = preset ? { ...preset, exposure: exp } : defaultDecoration;
        } else if ('corners' in slide.decoration) {
          // 四隅を直接指定: { corners: ["top-left", "bottom-right"] }
          const slots: DecorationConfig['slots'] = {};
          for (const corner of slide.decoration.corners) {
            slots[corner] = { enabled: true, element: 'curve' };
          }
          decoration = {
            slots,
            topLine: { enabled: false, variant: 'single' },
            bottomLine: { enabled: false, variant: 'single' },
            exposure: exp,
          };
        }
      } else {
        decoration = defaultDecoration ? { ...defaultDecoration, exposure: exp } : undefined;
      }

      // slotOverride 適用
      if (decoration && layout.slotOverride) {
        const slots = { ...decoration.slots };
        for (const [pos, val] of Object.entries(layout.slotOverride)) {
          if (val === false) {
            delete slots[pos as keyof typeof slots];
          } else if (val) {
            (slots as any)[pos] = val;
          }
        }
        decoration = { ...decoration, slots };
      }
    }

    return {
      layoutNumber: slide.layout,
      layoutId: layout.id,
      layoutName: layout.name,
      component: layout.component,
      content: slide.content,
      decoration,
      notes: slide.notes,
    };
  }).filter((s): s is ResolvedSlide => s !== null);

  return { meta: deck.meta, fonts, branding, slides, defaultDecoration };
}
