import { CSSProperties, ReactNode } from 'react';
import { tokens } from '../../config/tokens';
import { SlideDecoration } from '../decorations';
import type { DecorationConfig } from '../../types/slide';
import type { ResolvedBranding } from '../../lib/deck-loader';

interface SlideFrameProps {
  children: ReactNode;
  slideIndex: number;
  decoration?: DecorationConfig;
  backgroundColor?: string;
  fonts?: { heading: string; body: string };
  branding?: ResolvedBranding;
  style?: CSSProperties;
}

export function SlideFrame({
  children,
  slideIndex,
  decoration,
  backgroundColor,
  fonts,
  branding,
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

      {/* デコレーションレイヤー */}
      {decoration && (
        <SlideDecoration config={decoration} />
      )}

      {/* ブランディング（ロゴ＋社外秘を同じ位置にまとめて並べる） */}
      {(branding?.logo || branding?.confidential) && (
        <div style={{
          position: 'absolute',
          zIndex: 20,
          ...brandingPositionStyle(branding.logoPosition),
          display: 'flex',
          alignItems: 'center',
          gap: tokens.spacing.sm,
        }}>
          {branding.confidential && (
            <div style={{
              padding: `${tokens.spacing.xs}px ${tokens.spacing.md}px`,
              backgroundColor: 'rgba(220, 38, 38, 0.9)',
              color: '#fff',
              fontSize: 12,
              fontWeight: 600,
              borderRadius: tokens.radius.sm,
              letterSpacing: '0.05em',
              fontFamily: tokens.font.body,
            }}>
              {branding.confidentialText}
            </div>
          )}
          {branding.logo && (
            <img
              src={branding.logo}
              alt="Logo"
              style={{ height: 40, width: 'auto', opacity: 0.8 }}
            />
          )}
        </div>
      )}
    </div>
  );
}

function brandingPositionStyle(position: string): CSSProperties {
  const pad = tokens.spacing.md;
  switch (position) {
    case 'top-left':     return { top: pad, left: pad };
    case 'top-right':    return { top: pad, right: pad };
    case 'bottom-left':  return { bottom: pad, left: pad };
    case 'bottom-right': return { bottom: pad, right: pad };
    default:             return { top: pad, right: pad };
  }
}
