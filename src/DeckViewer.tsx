import { useState, useEffect } from 'react';
import { SlideFrame } from './components/core/SlideFrame';
import { tokens } from './config/tokens';
import { loadDeck, type ResolvedDeck, type ResolvedSlide } from './lib/deck-loader';
import { exportToPDF, exportToImages, downloadBlob } from './lib/export-pdf';

interface DeckViewerProps {
  deckUrl: string;
}

const btnStyle: React.CSSProperties = {
  padding: '6px 12px',
  background: '#444',
  color: '#fff',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
  fontSize: 12,
};

export function DeckViewer({ deckUrl }: DeckViewerProps) {
  const [deck, setDeck] = useState<ResolvedDeck | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    // Vite dev server では public/ 内のファイルはルート直下でアクセス可能
    const url = deckUrl.startsWith('http') ? deckUrl : `/${deckUrl}`;
    loadDeck(url)
      .then(setDeck)
      .catch((e) => setError(e.message));
  }, [deckUrl]);

  if (error) return <div style={{ color: 'red', padding: 40 }}>Error: {error}</div>;
  if (!deck) return <div style={{ color: '#ccc', padding: 40 }}>Loading...</div>;

  const slide: ResolvedSlide = deck.slides[activeSlide];
  const Component = slide?.component;

  const scale = Math.min(
    (window.innerWidth - 320) / tokens.slide.width,
    (window.innerHeight - 100) / tokens.slide.height,
  );

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#1a1a1a', fontFamily: tokens.font.body }}>
      {/* サイドバー */}
      <div style={{
        width: 280,
        backgroundColor: '#222',
        color: '#ccc',
        overflowY: 'auto',
        padding: 12,
        fontSize: 13,
        flexShrink: 0,
      }}>
        <h3 style={{ color: '#fff', margin: '0 0 4px', fontSize: 15 }}>{deck.meta.title}</h3>
        {deck.meta.author && <div style={{ fontSize: 12, marginBottom: 4 }}>{deck.meta.author}</div>}
        {deck.meta.date && <div style={{ fontSize: 12, marginBottom: 12, color: '#888' }}>{deck.meta.date}</div>}

        <div style={{ borderTop: '1px solid #333', paddingTop: 12 }}>
          {deck.slides.map((s, i) => (
            <div
              key={i}
              onClick={() => setActiveSlide(i)}
              style={{
                padding: '8px 10px',
                marginBottom: 2,
                borderRadius: 4,
                cursor: 'pointer',
                backgroundColor: activeSlide === i ? '#3b82f6' : 'transparent',
                color: activeSlide === i ? '#fff' : '#ccc',
                transition: 'background-color 0.15s',
              }}
            >
              <span style={{ opacity: 0.5, marginRight: 8 }}>#{s.layoutNumber}</span>
              {s.layoutName}
            </div>
          ))}
        </div>

        {/* エクスポート */}
        <div style={{ marginTop: 20, padding: '12px 0', borderTop: '1px solid #333', display: 'flex', gap: 8 }}>
          <button
            onClick={async () => {
              const blob = await exportToPDF();
              downloadBlob(blob, `${deck.meta.title}.pdf`);
            }}
            style={btnStyle}
          >
            PDF Export
          </button>
          <button
            onClick={async () => {
              const blobs = await exportToImages();
              blobs.forEach((blob, i) => {
                downloadBlob(blob, `slide-${String(i + 1).padStart(2, '0')}.png`);
              });
            }}
            style={btnStyle}
          >
            PNG Export
          </button>
        </div>

        <div style={{ marginTop: 12, padding: '12px 0', borderTop: '1px solid #333', fontSize: 12 }}>
          <div>Slide {activeSlide + 1} / {deck.slides.length}</div>
          {slide?.notes && (
            <div style={{ marginTop: 8, color: '#aaa', lineHeight: 1.5 }}>
              <div style={{ color: '#fff', fontWeight: 600, marginBottom: 4 }}>Notes</div>
              {slide.notes}
            </div>
          )}
        </div>
      </div>

      {/* メインプレビュー */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {Component && (
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
            <SlideFrame
              slideIndex={activeSlide}
              decoration={slide.decoration}
            >
              <Component content={slide.content} slideIndex={activeSlide} />
            </SlideFrame>
          </div>
        )}
      </div>
    </div>
  );
}
