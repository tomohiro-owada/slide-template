import { tokens } from './config/tokens';
import { CurveLine } from './components/decorations/CurveLine';

export function CurveTest() {
  const scale = Math.min(
    (window.innerWidth - 40) / tokens.slide.width,
    (window.innerHeight - 40) / tokens.slide.height,
  );

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#2a2a2a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
        <div style={{
          position: 'relative',
          width: tokens.slide.width,
          height: tokens.slide.height,
          backgroundColor: tokens.layout.slide.background,
          overflow: 'hidden',
        }}>
          <CurveLine position="top-left" />
          <CurveLine position="top-right" />
          <CurveLine position="bottom-left" />
          <CurveLine position="bottom-right" />
        </div>
      </div>
    </div>
  );
}
