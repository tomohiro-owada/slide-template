import { Flex, Text, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';
import type { SlideProps } from '../../../types/slide';

export interface TwoColumnImageTextContent {
  title: string;
  body: string;
  image: { description?: string; imageUrl?: string };
}

export function TwoColumnImageTextSlide({ content }: SlideProps<TwoColumnImageTextContent>) {
  return (
    <Flex direction="col" style={{ height: '100%', padding: tokens.spacing.slidePadding }}>
      <Text variant="h2">{content.title}</Text>
      <Spacer size="xl" />
      <Flex direction="row" gap="xl" align="stretch" style={{ flex: 1 }}>
        {/* Image column */}
        <Flex flex={1} style={{ minHeight: 0 }}>
          {content.image.imageUrl ? (
            <img
              src={content.image.imageUrl}
              alt={content.image.description ?? ''}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: tokens.radius.md,
                minHeight: 200,
              }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              minHeight: 200,
              backgroundColor: tokens.layout.panel.border,
              borderRadius: tokens.radius.md,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: tokens.layout.text.muted,
              fontSize: tokens.size.caption,
            }}>
              {content.image.description || 'Image'}
            </div>
          )}
        </Flex>

        {/* Text column */}
        <Flex direction="col" flex={1} justify="center">
          <Text variant="body">{content.body}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
