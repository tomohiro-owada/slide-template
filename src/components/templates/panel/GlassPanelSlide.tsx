import type { SlideProps } from '../../../types/slide';
import { tokens } from '../../../config/tokens';
import { Text, Flex, Spacer } from '../../primitives';

export interface GlassPanelContent {
  title: string;
  body: string;
  backgroundImage: { description?: string; imageUrl?: string };
}

export function GlassPanelSlide({ content }: SlideProps<GlassPanelContent>) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Background image placeholder */}
      {content.backgroundImage.imageUrl ? (
        <img
          src={content.backgroundImage.imageUrl}
          alt={content.backgroundImage.description ?? ''}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: tokens.radius.md,
          }}
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94A3B8',
          }}
        >
          {content.backgroundImage.description ?? 'Image'}
        </div>
      )}

      {/* Glass panel overlay */}
      <Flex
        direction="col"
        align="center"
        justify="center"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          padding: tokens.spacing.slidePadding,
          boxSizing: 'border-box',
        }}
      >
        <Flex
          direction="col"
          gap="md"
          style={{
            maxWidth: 800,
            width: '100%',
            padding: tokens.spacing.xl,
            backgroundColor: tokens.glass.background,
            backdropFilter: `blur(${tokens.glass.blur}px)`,
            WebkitBackdropFilter: `blur(${tokens.glass.blur}px)`,
            border: `1px solid ${tokens.glass.border}`,
            borderRadius: tokens.radius.lg,
            boxShadow: tokens.shadow.lg,
          }}
        >
          <Text variant="h2">{content.title}</Text>
          <Spacer size="sm" />
          <Text variant="body">{content.body}</Text>
        </Flex>
      </Flex>
    </div>
  );
}
