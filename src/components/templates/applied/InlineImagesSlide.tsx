import type { SlideProps } from '../../../types/slide';
import { Text, Flex, Grid, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';

export interface InlineImagesContent {
  title: string;
  body: string;
  images: Array<{ image: { description?: string }; caption?: string }>;
}

function ImagePlaceholder({ description }: { description?: string }) {
  return (
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
      {description || 'Image'}
    </div>
  );
}

export function InlineImagesSlide({ content }: SlideProps<InlineImagesContent>) {
  const { title, body, images } = content;

  return (
    <Flex
      direction="col"
      style={{
        width: '100%',
        height: '100%',
        minHeight: tokens.slide.height,
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
              <ImagePlaceholder description={img.image.description} />
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
