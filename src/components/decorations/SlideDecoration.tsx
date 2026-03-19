import type { DecorationConfig, SlotPosition } from '../../types/slide';
import { CurveLine } from './CurveLine';
import { HorizontalRule } from './HorizontalRule';

interface SlideDecorationProps {
  config: DecorationConfig;
}

// exposure に基づいて各要素のオフセットを計算
// 全部「自分の方向に逃げる」統一ルール
function getSlotOffset(position: SlotPosition, exposure: number) {
  const hideDistance = 120;
  const d = hideDistance * (1 - exposure);

  const map: Record<SlotPosition, { x: number; y: number }> = {
    'top-left':      { x: -d, y: -d },
    'top-center':    { x: 0,  y: -d },
    'top-right':     { x:  d, y: -d },
    'left':          { x: -d, y: 0  },
    'right':         { x:  d, y: 0  },
    'bottom-left':   { x: -d, y:  d },
    'bottom-center': { x: 0,  y:  d },
    'bottom-right':  { x:  d, y:  d },
  };
  return map[position];
}

function getLineOffset(position: 'top' | 'bottom', exposure: number) {
  // ラインはスライド端から48px(xl)の位置にあるので移動距離を小さく
  const hideDistance = 60;
  const d = hideDistance * (1 - exposure);
  return position === 'top' ? { x: 0, y: -d } : { x: 0, y: d };
}

export function SlideDecoration({ config }: SlideDecorationProps) {
  const { exposure } = config;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      {/* 上下ライン */}
      {config.topLine && (
        <HorizontalRule
          position="top"
          config={config.topLine}
          color={config.color}
          offset={getLineOffset('top', exposure)}
        />
      )}
      {config.bottomLine && (
        <HorizontalRule
          position="bottom"
          config={config.bottomLine}
          color={config.color}
          offset={getLineOffset('bottom', exposure)}
        />
      )}

      {/* 9スロット */}
      {Object.entries(config.slots).map(([pos, slot]) => {
        if (!slot?.enabled) return null;
        const position = pos as SlotPosition;
        const offset = getSlotOffset(position, exposure);

        if (slot.element === 'curve') {
          return (
            <CurveLine
              key={pos}
              position={position}
              size={slot.size}
              flip={slot.flip}
              opacity={slot.opacity}
              offset={offset}
              color={config.color}
            />
          );
        }

        // dot-pattern, geometric は後で追加
        return null;
      })}
    </div>
  );
}
