import { CSSProperties, ReactNode } from 'react';
import { tokens } from '../../config/tokens';
import { SlideDecoration } from '../decorations';
import type { DecorationConfig } from '../../types/slide';

interface SlideFrameProps {
  children: ReactNode;
  slideIndex: number;
  decoration?: DecorationConfig;
  backgroundColor?: string;
  fonts?: { heading: string; body: string };  // deck.json のフォント上書き
  style?: CSSProperties;
}

export function SlideFrame({
  children,
  slideIndex,
  decoration,
  backgroundColor,
  fonts,
  style,
}: SlideFrameProps) {
  const bgColor = backgroundColor ?? tokens.layout.slide.background;

  return (
    <div
      data-slide-index={slideIndex}
      style={{
        position: 'relative',
        width: tokens.slide.width,
        height: tokens.slide.height,
        backgroundColor: bgColor,
        overflow: 'hidden',
        fontFamily: fonts?.body ?? tokens.font.body,
        '--font-heading': fonts?.heading ?? tokens.font.heading,
        '--font-body': fonts?.body ?? tokens.font.body,
        ...style,
      }}
    >
      {/* コンテンツレイヤー */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          padding: tokens.spacing.slidePadding,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </div>

      {/* デコレーションレイヤー（最前面） */}
      {decoration && (
        <SlideDecoration config={decoration} />
      )}
    </div>
  );
}
