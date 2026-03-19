import { tokens } from '../../config/tokens';

interface CurveLineProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  color?: string;
}

// S字パスは1個だけ。SVG座標で反転する。
// 基本形: 左下(0,200)から右上(200,0)へのS字
const W = 200;
const H = 200;

function pathD(position: string): string {
  const base = `M 0 ${H} C ${W * 0.3} ${H * 0.2}, ${W * 0.7} ${H * 0.8}, ${W} 0`;

  switch (position) {
    case 'top-left':
      return base;
    case 'top-right':
      // X反転: x → W - x
      return `M ${W} ${H} C ${W * 0.7} ${H * 0.2}, ${W * 0.3} ${H * 0.8}, 0 0`;
    case 'bottom-left':
      // Y反転: y → H - y
      return `M 0 0 C ${W * 0.3} ${H * 0.8}, ${W * 0.7} ${H * 0.2}, ${W} ${H}`;
    case 'bottom-right':
      // XY反転
      return `M ${W} 0 C ${W * 0.7} ${H * 0.8}, ${W * 0.3} ${H * 0.2}, 0 ${H}`;
    default:
      return base;
  }
}

export function CurveLine({ position, color }: CurveLineProps) {
  const strokeColor = color ?? tokens.layout.decoration.curve;

  // CSS positionで四隅に配置
  const style: React.CSSProperties = {
    position: 'absolute',
    width: W,
    height: H,
    pointerEvents: 'none',
  };

  if (position === 'top-left')     { style.top = 0; style.left = 0; }
  if (position === 'top-right')    { style.top = 0; style.right = 0; }
  if (position === 'bottom-left')  { style.bottom = 0; style.left = 0; }
  if (position === 'bottom-right') { style.bottom = 0; style.right = 0; }

  return (
    <div style={style}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
        <path
          d={pathD(position)}
          stroke={strokeColor}
          strokeWidth={2.5}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
