import { CSSProperties, ReactNode } from 'react';
import { tokens } from '../../config/tokens';

type SpacingKey = keyof typeof tokens.spacing;

interface FlexProps {
  direction?: 'row' | 'col';
  gap?: SpacingKey;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: boolean;
  flex?: number;
  children: ReactNode;
  style?: CSSProperties;
}

export function Flex({ direction = 'row', gap, align, justify, wrap, flex, children, style }: FlexProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: direction === 'col' ? 'column' : 'row',
        ...(gap && { gap: tokens.spacing[gap] }),
        ...(align && { alignItems: align }),
        ...(justify && { justifyContent: justify }),
        ...(wrap && { flexWrap: 'wrap' }),
        ...(flex !== undefined && { flex }),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
