import { tokens } from '../../config/tokens';
import type { LineConfig } from '../../types/slide';

interface HorizontalRuleProps {
  position: 'top' | 'bottom';
  config: LineConfig;
  color?: string;
  offset: { x: number; y: number }; // exposure から計算済み
}

export function HorizontalRule({ position, config, color, offset }: HorizontalRuleProps) {
  if (!config.enabled) return null;

  const strokeColor = color ?? tokens.layout.decoration.line;
  const thickness = config.thickness ?? 1.5;
  const gap = 8; // double 時の2本の間隔

  const posStyle = position === 'top'
    ? { top: tokens.spacing.xl }
    : { bottom: tokens.spacing.xl };

  return (
    <div
      style={{
        position: 'absolute',
        left: tokens.spacing.slidePadding,
        right: tokens.spacing.slidePadding,
        ...posStyle,
        pointerEvents: 'none',
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: 'transform 0.4s ease-out, opacity 0.3s ease',
      }}
    >
      <div
        style={{
          width: '100%',
          height: thickness,
          backgroundColor: strokeColor,
        }}
      />
      {config.variant === 'double' && (
        <div
          style={{
            width: '100%',
            height: thickness,
            backgroundColor: strokeColor,
            marginTop: gap,
          }}
        />
      )}
      {config.variant === 'dashed' && (
        <div
          style={{
            width: '100%',
            height: 0,
            borderTop: `${thickness}px dashed ${strokeColor}`,
          }}
        />
      )}
      {config.variant === 'dotted' && (
        <div
          style={{
            width: '100%',
            height: 0,
            borderTop: `${thickness}px dotted ${strokeColor}`,
          }}
        />
      )}
    </div>
  );
}
