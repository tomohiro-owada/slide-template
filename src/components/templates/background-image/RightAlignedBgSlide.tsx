import type { SlideProps } from '../../../types/slide';
import { Text, Flex, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';

export interface RightAlignedBgContent {
  title: string;
  body: string;
  backgroundImage: { description?: string; imageUrl?: string };
}

export function RightAlignedBgSlide({ content }: SlideProps<RightAlignedBgContent>) {
  const { title, body, backgroundImage } = content;

  return (
    <Flex
      direction="row"
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: tokens.layout.slide.background,
      }}
    >
      {/* Left: text content */}
      <Flex
        direction="col"
        justify="center"
        flex={1}
        style={{ padding: tokens.spacing.slidePadding }}
      >
        <Text variant="h1">{title}</Text>
        <Spacer size="lg" />
        <Text variant="body">{body}</Text>
      </Flex>

      {/* Right: background image */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
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
    </Flex>
  );
}
