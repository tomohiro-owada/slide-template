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
  defaults: {
    decoration: string;  // プリセット名
    exposure: number;
  };
  slides: DeckSlide[];
}

export interface DeckSlide {
  layout: number;
  content: Record<string, unknown>;
  decoration?: string;   // スライド個別のプリセット上書き
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

export interface ResolvedDeck {
  meta: DeckJson['meta'];
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

// DeckJson → ResolvedDeck
export function resolveDeck(deck: DeckJson): ResolvedDeck {
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
      if (slide.decoration) {
        // スライド個別上書き
        const preset = decorationPresets[slide.decoration];
        decoration = preset
          ? { ...preset, exposure: slide.exposure ?? deck.defaults.exposure }
          : defaultDecoration;
      } else {
        decoration = defaultDecoration;
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

  return { meta: deck.meta, slides, defaultDecoration };
}
