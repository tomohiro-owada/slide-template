import type { SlideProps } from '../../../types/slide';
import { Text, Flex, Grid, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';

export interface InlineImagesContent {
  title: string;
  body: string;
  images: Array<{ image: { description?: string; imageUrl?: string }; caption?: string }>;
}

export function InlineImagesSlide({ content }: SlideProps<InlineImagesContent>) {
  const { title, body, images } = content;

  return (
    <Flex
      direction="col"
      style={{
        width: '100%',
        height: '100%',
        padding: tokens.spacing.slidePadding,
        backgroundColor: tokens.layout.slide.background,
      }}
    >
      <Text variant="h2">{title}</Text>
      <Spacer size="md" />
      <Text variant="body">{body}</Text>
      <Spacer size="xl" />

      <Grid columns={images.length} gap="lg" style={{ flex: 1 }}>
        {images.map((img, i) => (
          <Flex key={i} direction="col" gap="sm" style={{ minHeight: 0 }}>
            <div style={{ flex: 1, minHeight: 0 }}>
              {img.image.imageUrl ? (
                <img
                  src={img.image.imageUrl}
                  alt={img.image.description ?? ''}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: tokens.radius.md,
                    minHeight: 200,
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
                  {img.image.description || 'Image'}
                </div>
              )}
            </div>
            {img.caption && (
              <Text variant="caption" align="center">{img.caption}</Text>
            )}
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
}
