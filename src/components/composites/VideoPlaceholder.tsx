import { tokens } from '../../config/tokens';

export interface VideoPlaceholderData {
  description?: string;
  style?: 'screen-recording' | 'live-action' | 'animation' | 'motion-graphics';
  duration?: string;
  videoUrl?: string;
  posterUrl?: string;
  loop?: boolean;
  autoplay?: boolean;
  muted?: boolean;
}

interface VideoPlaceholderProps {
  data: VideoPlaceholderData;
  width?: number | string;
  height?: number | string;
}

export function VideoPlaceholder({ data, width = '100%', height = '100%' }: VideoPlaceholderProps) {
  if (data.videoUrl) {
    return (
      <video
        src={data.videoUrl}
        poster={data.posterUrl}
        controls
        loop={data.loop}
        autoPlay={data.autoplay}
        muted={data.muted ?? true}
        style={{
          width,
          height,
          objectFit: 'cover',
          borderRadius: tokens.radius.md,
          display: 'block',
          backgroundColor: '#000',
        }}
      />
    );
  }

  return (
    <div style={{
      width,
      height,
      minHeight: 200,
      backgroundColor: tokens.layout.slide.backgroundDark,
      borderRadius: tokens.radius.md,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: tokens.layout.text.muted,
      fontSize: 16,
      gap: 8,
      border: `2px dashed ${tokens.layout.text.muted}`,
    }}>
      <span style={{ fontSize: 48 }}>▶</span>
      <span style={{ maxWidth: '80%', textAlign: 'center', lineHeight: 1.4, color: '#94A3B8' }}>
        {data.description ?? 'Video'}
      </span>
      {data.duration && (
        <span style={{ fontSize: 12, opacity: 0.6, color: '#94A3B8' }}>{data.duration}</span>
      )}
    </div>
  );
}
