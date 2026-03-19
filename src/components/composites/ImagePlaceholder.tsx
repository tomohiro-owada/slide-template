import { tokens } from '../../config/tokens';

export interface ImagePlaceholderData {
  description?: string;
  style?: 'photo' | 'illustration' | 'icon' | 'abstract' | '3d-render';
  mood?: string;
  imageUrl?: string;
  alt?: string;
}

interface ImagePlaceholderProps {
  data: ImagePlaceholderData;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
}

export function ImagePlaceholder({ data, width = '100%', height = '100%', borderRadius }: ImagePlaceholderProps) {
  if (data.imageUrl) {
    return (
      <img
        src={data.imageUrl}
        alt={data.alt ?? data.description ?? 'Image'}
        style={{
          width,
          height,
          objectFit: 'cover',
          borderRadius: borderRadius ?? tokens.radius.md,
          display: 'block',
        }}
      />
    );
  }

  return (
    <div style={{
      width,
      height,
      minHeight: 150,
      backgroundColor: tokens.layout.panel.border,
      borderRadius: borderRadius ?? tokens.radius.md,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: tokens.layout.text.muted,
      fontSize: 16,
      gap: 8,
      border: `2px dashed ${tokens.layout.text.muted}`,
    }}>
      <span style={{ fontSize: 32 }}>🖼</span>
      <span style={{ maxWidth: '80%', textAlign: 'center', lineHeight: 1.4 }}>
        {data.description ?? 'Image'}
      </span>
      {data.style && (
        <span style={{ fontSize: 12, opacity: 0.6 }}>{data.style}</span>
      )}
    </div>
  );
}
