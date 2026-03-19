// export-pdf.ts — スライドをPDF/画像にエクスポート

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export interface ExportOptions {
  format: 'pdf' | 'png';
  scale?: number;       // 1, 2, 3（デフォルト: 2）
  quality?: number;     // 0-1（JPEG品質、PDFのみ）
}

// 全スライドを取得
function getSlideElements(): HTMLElement[] {
  return Array.from(document.querySelectorAll('[data-slide-index]'));
}

// 1枚のスライドをキャンバスに変換
async function slideToCanvas(el: HTMLElement, scale: number): Promise<HTMLCanvasElement> {
  return html2canvas(el, {
    scale,
    useCORS: true,
    backgroundColor: null,
    logging: false,
  });
}

// PDF出力
export async function exportToPDF(options?: Partial<ExportOptions>): Promise<Blob> {
  const scale = options?.scale ?? 2;
  const slides = getSlideElements();

  if (slides.length === 0) throw new Error('No slides found');

  // 16:9 landscape (mm)
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [339.67, 190.5], // 16:9 at 96dpi
  });

  for (let i = 0; i < slides.length; i++) {
    if (i > 0) pdf.addPage();

    const canvas = await slideToCanvas(slides[i], scale);
    const imgData = canvas.toDataURL('image/jpeg', options?.quality ?? 0.92);
    pdf.addImage(imgData, 'JPEG', 0, 0, 339.67, 190.5);
  }

  return pdf.output('blob');
}

// PNG出力（1枚ずつ）
export async function exportToImages(options?: Partial<ExportOptions>): Promise<Blob[]> {
  const scale = options?.scale ?? 2;
  const slides = getSlideElements();
  const blobs: Blob[] = [];

  for (const slide of slides) {
    const canvas = await slideToCanvas(slide, scale);
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error('Failed to convert canvas to blob'))),
        'image/png',
      );
    });
    blobs.push(blob);
  }

  return blobs;
}

// ダウンロードヘルパー
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
