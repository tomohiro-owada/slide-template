import type { ChartColorIntent } from '../colors';

// ---- デコレーション ----

export type SlotPosition =
  | 'top-left' | 'top-center' | 'top-right'
  | 'left' | 'right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

export type SlotElement = 'curve' | 'dot-pattern' | 'geometric';

export interface SlotConfig {
  enabled: boolean;
  element: SlotElement;
  size?: 'sm' | 'md' | 'lg';
  rotate?: number;
  flip?: 'x' | 'y' | 'both';
  opacity?: number;
}

export type LineVariant = 'single' | 'double' | 'dashed' | 'dotted';

export interface LineConfig {
  enabled: boolean;
  variant: LineVariant;
  thickness?: number;
}

export interface DecorationConfig {
  slots: Partial<Record<SlotPosition, SlotConfig>>;
  topLine?: LineConfig;
  bottomLine?: LineConfig;
  color?: string;
  exposure: number; // 0.0〜1.0
}

// ---- 背景エフェクト ----

export type BackgroundEffect = 'particles' | 'wave' | 'gradient' | 'none';

export interface BackgroundConfig {
  effect: BackgroundEffect;
  options?: Record<string, unknown>;
}

// ---- スライド ----

export type TemplateCategory =
  | 'title' | 'columns' | 'list' | 'panel'
  | 'background-image' | 'special' | 'applied' | 'video';

export interface SlideData {
  template: string;
  content: Record<string, unknown>;
  decoration?: Partial<DecorationConfig>;
  background?: Partial<BackgroundConfig>;
  chart?: {
    intent: ChartColorIntent;
    highlightIndex?: number;
  };
  notes?: string;
}

export interface DeckDefaults {
  decoration: DecorationConfig;
  background: BackgroundConfig;
}

export interface DeckBrand {
  company: string;
  logo?: string;
  palette?: string;
  layoutTheme?: string;
  chartTheme?: string;
}

export interface DeckMeta {
  title: string;
  author?: string;
  date?: string;
}

export interface DeckData {
  meta: DeckMeta;
  brand: DeckBrand;
  defaults: DeckDefaults;
  slides: SlideData[];
}

// ---- テンプレート定義 ----

export interface SlideProps<T = Record<string, unknown>> {
  content: T;
  slideIndex: number;
}

export interface TemplateUseCase {
  primary: string;
  scenarios: string[];
  bestFor: string[];
  notFor: string[];
}

export interface TemplateDefinition {
  id: string;
  name: string;
  category: TemplateCategory;
  component: React.ComponentType<SlideProps<any>>;
  useCase: TemplateUseCase;
}
