// image-md-generator.ts — deck.json からプレースホルダーを抽出し、画像1枚につきMD1個を生成

import type { DeckJson } from './deck-loader';
import { getLayout } from '../config/layout-registry';

export interface MediaRequest {
  filename: string;
  slideIndex: number;
  layoutNumber: number;
  fieldKey: string;
  type: 'image' | 'video';
  markdown: string;
}

// deck.json の全スライドからプレースホルダーを抽出
export function generateMediaRequests(deck: DeckJson): MediaRequest[] {
  const requests: MediaRequest[] = [];

  deck.slides.forEach((slide, slideIndex) => {
    const layout = getLayout(slide.layout);
    if (!layout) return;

    // content の中から image/video 型のフィールドを再帰的に探す
    extractMedia(slide.content, slideIndex, slide.layout, layout.name, deck.meta.title, '', requests);
  });

  return requests;
}

function extractMedia(
  obj: Record<string, unknown>,
  slideIndex: number,
  layoutNumber: number,
  layoutName: string,
  deckTitle: string,
  path: string,
  out: MediaRequest[],
) {
  for (const [key, value] of Object.entries(obj)) {
    const fieldPath = path ? `${path}.${key}` : key;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const v = value as Record<string, unknown>;

      // image フィールドの判定: description を持つオブジェクト
      if ('description' in v && typeof v.description === 'string') {
        const isVideo = key === 'video' || key === 'leftVideo' || key === 'rightVideo'
          || (v.style && ['screen-recording', 'live-action', 'animation', 'motion-graphics'].includes(v.style as string));

        const type = isVideo ? 'video' : 'image';
        const idx = String(slideIndex + 1).padStart(2, '0');
        const safeName = key.replace(/[^a-zA-Z0-9-]/g, '-');
        const filename = `${idx}-${safeName}.md`;

        const markdown = type === 'image'
          ? generateImageMd(v, slideIndex, layoutNumber, layoutName, deckTitle, fieldPath)
          : generateVideoMd(v, slideIndex, layoutNumber, layoutName, deckTitle, fieldPath);

        out.push({ filename, slideIndex, layoutNumber, fieldKey: fieldPath, type, markdown });
      } else {
        // 再帰
        extractMedia(v as Record<string, unknown>, slideIndex, layoutNumber, layoutName, deckTitle, fieldPath, out);
      }
    }

    // 配列の中も探す
    if (Array.isArray(value)) {
      value.forEach((item, i) => {
        if (item && typeof item === 'object') {
          extractMedia(item as Record<string, unknown>, slideIndex, layoutNumber, layoutName, deckTitle, `${fieldPath}[${i}]`, out);
        }
      });
    }
  }
}

function generateImageMd(
  data: Record<string, unknown>,
  slideIndex: number,
  layoutNumber: number,
  layoutName: string,
  deckTitle: string,
  fieldPath: string,
): string {
  return `# Image Generation Request

## Slide Context
- **Deck**: ${deckTitle}
- **Slide**: ${slideIndex + 1}
- **Layout**: #${layoutNumber} ${layoutName}
- **Field**: ${fieldPath}

## Image Specification
- **Description**: ${data.description ?? 'No description'}
- **Style**: ${data.style ?? 'photo'}
- **Mood**: ${data.mood ?? 'professional'}
- **Aspect Ratio**: 16:9

## Generation Prompt
> ${data.description}

## Negative Prompt
> blurry, low quality, watermark, text overlay, cartoonish
`;
}

function generateVideoMd(
  data: Record<string, unknown>,
  slideIndex: number,
  layoutNumber: number,
  layoutName: string,
  deckTitle: string,
  fieldPath: string,
): string {
  return `# Video Generation Request

## Slide Context
- **Deck**: ${deckTitle}
- **Slide**: ${slideIndex + 1}
- **Layout**: #${layoutNumber} ${layoutName}
- **Field**: ${fieldPath}

## Video Specification
- **Description**: ${data.description ?? 'No description'}
- **Style**: ${data.style ?? 'live-action'}
- **Duration**: ${data.duration ?? '10s'}
- **Loop**: ${data.loop ?? false}
- **Aspect Ratio**: 16:9

## Generation Prompt
> ${data.description}
`;
}

// MD ファイルをまとめて出力用のzipやテキストにする
export function formatRequestsAsText(requests: MediaRequest[]): string {
  return requests.map((r) =>
    `--- ${r.filename} ---\n${r.markdown}`
  ).join('\n\n');
}
