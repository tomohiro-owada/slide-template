import type { SlideProps } from '../../../types/slide';
import { Text, Flex } from '../../primitives';
import { tokens } from '../../../config/tokens';

export interface FullScreenBgContent {
  title: string;
  subtitle?: string;
  backgroundImage: { description?: string; imageUrl?: string };
}

export function FullScreenBgSlide({ content }: SlideProps<FullScreenBgContent>) {
  const { title, subtitle, backgroundImage } = content;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {backgroundImage.imageUrl ? (
          <img
            src={backgroundImage.imageUrl}
            alt={backgroundImage.description ?? ''}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: tokens.radius.md,
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              minHeight: 200,
              backgroundColor: '#E2E8F0',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94A3B8',
              fontSize: 18,
            }}
          >
            {backgroundImage.description || 'Image'}
          </div>
        )}
      </div>

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
        }}
      />

      {/* Content */}
      <Flex
        direction="col"
        align="center"
        justify="center"
        gap="md"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          padding: tokens.spacing.slidePadding,
        }}
      >
        <Text variant="h1" color={tokens.layout.text.inverse} align="center">
          {title}
        </Text>
        {subtitle && (
          <Text variant="h3" color={tokens.layout.text.inverse} align="center" weight="normal" style={{ opacity: 0.85 }}>
            {subtitle}
          </Text>
        )}
      </Flex>
    </div>
  );
}
