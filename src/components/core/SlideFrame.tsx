import { CSSProperties, ReactNode } from 'react';
import { tokens } from '../../config/tokens';
import { SlideDecoration } from '../decorations';
import type { DecorationConfig } from '../../types/slide';

interface SlideFrameProps {
  children: ReactNode;
  slideIndex: number;
  decoration?: DecorationConfig;  // 全ページ共通のデコレーション設定
  backgroundColor?: string;
  style?: CSSProperties;
}

export function SlideFrame({
  children,
  slideIndex,
  decoration,
  backgroundColor,
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
        fontFamily: tokens.font.body,
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
