import { CSSProperties, ReactNode } from 'react';
import { tokens } from '../../config/tokens';

type SpacingKey = keyof typeof tokens.spacing;

interface GridProps {
  columns: number;
  rows?: number;
  gap?: SpacingKey;
  rowGap?: SpacingKey;
  columnGap?: SpacingKey;
  children: ReactNode;
  style?: CSSProperties;
}

export function Grid({ columns, rows, gap, rowGap, columnGap, children, style }: GridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        ...(rows && { gridTemplateRows: `repeat(${rows}, 1fr)` }),
        ...(gap && { gap: tokens.spacing[gap] }),
        ...(rowGap && { rowGap: tokens.spacing[rowGap] }),
        ...(columnGap && { columnGap: tokens.spacing[columnGap] }),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
