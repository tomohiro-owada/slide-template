import type { SlideProps } from '../../../types/slide';
import { tokens } from '../../../config/tokens';
import { Text, Flex, Spacer } from '../../primitives';

export interface BasicPanelContent {
  title: string;
  image: { description?: string; imageUrl?: string };
  body: string;
  footer?: string;
}

export function BasicPanelSlide({ content }: SlideProps<BasicPanelContent>) {
  return (
    <Flex
      direction="col"
      align="center"
      justify="center"
      style={{
        width: '100%',
        height: '100%',
        padding: tokens.spacing.slidePadding,
        backgroundColor: tokens.layout.slide.background,
        boxSizing: 'border-box',
      }}
    >
      <Flex
        direction="col"
        style={{
          maxWidth: 900,
          width: '100%',
          backgroundColor: tokens.layout.panel.background,
          borderRadius: tokens.radius.lg,
          border: `1px solid ${tokens.layout.panel.border}`,
          boxShadow: tokens.shadow.md,
          overflow: 'hidden',
        }}
      >
        {/* Image header */}
        {content.image.imageUrl ? (
          <img
            src={content.image.imageUrl}
            alt={content.image.description ?? ''}
            style={{
              width: '100%',
              height: 200,
              objectFit: 'cover',
              borderRadius: tokens.radius.md,
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: 200,
              backgroundColor: '#E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94A3B8',
            }}
          >
            {content.image.description ?? 'Image'}
          </div>
        )}

        {/* Content area */}
        <Flex
          direction="col"
          gap="md"
          style={{ padding: tokens.spacing.xl }}
        >
          <Text variant="h2">{content.title}</Text>
          <Text variant="body">{content.body}</Text>

          {content.footer && (
            <>
              <Spacer size="sm" />
              <Text variant="caption">{content.footer}</Text>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
