import { tokens } from '../../config/tokens';

type CornerPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface CurveLineProps {
  position: string;  // SlotPosition から来る
  color?: string;
  offset?: { x: number; y: number };
  // size, flip, opacity は SlideDecoration から来るが今は無視
  size?: string;
  flip?: string;
  opacity?: number;
}

const W = 200;
const H = 200;

// 基本形のS字を座標反転で四隅対応
function pathD(position: CornerPosition): string {
  switch (position) {
    case 'top-left':
      return `M 0 ${H} C ${W * 0.3} ${H * 0.2}, ${W * 0.7} ${H * 0.8}, ${W} 0`;
    case 'top-right':
      return `M ${W} ${H} C ${W * 0.7} ${H * 0.2}, ${W * 0.3} ${H * 0.8}, 0 0`;
    case 'bottom-left':
      return `M 0 0 C ${W * 0.3} ${H * 0.8}, ${W * 0.7} ${H * 0.2}, ${W} ${H}`;
    case 'bottom-right':
      return `M ${W} 0 C ${W * 0.7} ${H * 0.8}, ${W * 0.3} ${H * 0.2}, 0 ${H}`;
  }
}

const corners: CornerPosition[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

export function CurveLine({ position, color, offset }: CurveLineProps) {
  // 四隅以外は描画しない
  if (!corners.includes(position as CornerPosition)) return null;

  const corner = position as CornerPosition;
  const strokeColor = color ?? tokens.layout.decoration.curve;
  const ox = offset?.x ?? 0;
  const oy = offset?.y ?? 0;

  const style: React.CSSProperties = {
    position: 'absolute',
    width: W,
    height: H,
    pointerEvents: 'none',
    transform: `translate(${ox}px, ${oy}px)`,
    transition: 'transform 0.4s ease-out',
  };

  if (corner === 'top-left')     { style.top = 0; style.left = 0; }
  if (corner === 'top-right')    { style.top = 0; style.right = 0; }
  if (corner === 'bottom-left')  { style.bottom = 0; style.left = 0; }
  if (corner === 'bottom-right') { style.bottom = 0; style.right = 0; }

  return (
    <div style={style}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
        <path
          d={pathD(corner)}
          stroke={strokeColor}
          strokeWidth={2.5}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
