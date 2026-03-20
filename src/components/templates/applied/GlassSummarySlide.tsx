import type { SlideProps } from '../../../types/slide';
import { Text, Flex, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';

export interface GlassSummaryContent {
  title: string;
  keyPoints: Array<{ text: string }>;
  backgroundImage: { description?: string; imageUrl?: string };
}

export function GlassSummarySlide({ content }: SlideProps<GlassSummaryContent>) {
  const { title, keyPoints, backgroundImage } = content;

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

      {/* Slight overlay for contrast */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        }}
      />

      {/* Glass panel */}
      <Flex
        direction="col"
        justify="center"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
                    padding: tokens.spacing.slidePadding,
        }}
      >
        <div
          style={{
            backgroundColor: tokens.glass.background,
            backdropFilter: `blur(${tokens.glass.blur}px)`,
            WebkitBackdropFilter: `blur(${tokens.glass.blur}px)`,
            border: `1px solid ${tokens.glass.border}`,
            borderRadius: tokens.radius.xl,
            padding: tokens.spacing.xxl,
            maxWidth: 800,
          }}
        >
          <Text variant="h2">{title}</Text>
          <Spacer size="lg" />

          <Flex direction="col" gap="md">
            {keyPoints.map((point, i) => (
              <Flex key={i} direction="row" gap="sm" align="flex-start">
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: tokens.radius.full,
                    backgroundColor: tokens.layout.brand.primary,
                    marginTop: 10,
                    flexShrink: 0,
                  }}
                />
                <Text variant="body">{point.text}</Text>
              </Flex>
            ))}
          </Flex>
        </div>
      </Flex>
    </div>
  );
}
