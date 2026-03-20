import type { SlideProps } from '../../../types/slide';
import { tokens } from '../../../config/tokens';
import { Text, Flex, Spacer } from '../../primitives';

export interface CardContent {
  title: string;
  image: { description?: string; imageUrl?: string };
  body: string;
  tags?: Array<{ text: string }>;
}

export function CardSlide({ content }: SlideProps<CardContent>) {
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
          maxWidth: 720,
          width: '100%',
          backgroundColor: tokens.layout.panel.background,
          borderRadius: tokens.radius.lg,
          boxShadow: tokens.shadow.lg,
          overflow: 'hidden',
        }}
      >
        {/* Card image */}
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
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94A3B8',
            }}
          >
            {content.image.description ?? 'Image'}
          </div>
        )}

        {/* Card content */}
        <Flex
          direction="col"
          gap="md"
          style={{ padding: tokens.spacing.xl }}
        >
          <Text variant="h3">{content.title}</Text>
          <Text variant="body">{content.body}</Text>

          {content.tags && content.tags.length > 0 && (
            <>
              <Spacer size="sm" />
              <Flex direction="row" gap="xs" wrap>
                {content.tags.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      display: 'inline-block',
                      padding: `${tokens.spacing.xs / 2}px ${tokens.spacing.sm}px`,
                      fontSize: tokens.size.label,
                      fontFamily: tokens.font.body,
                      fontWeight: tokens.font.weight.medium,
                      color: tokens.layout.brand.primary,
                      backgroundColor: tokens.layout.slide.backgroundAlt,
                      borderRadius: tokens.radius.full,
                      border: `1px solid ${tokens.layout.panel.border}`,
                    }}
                  >
                    {tag.text}
                  </span>
                ))}
              </Flex>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
