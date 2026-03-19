import type { SlideProps } from '../../../types/slide';
import { Text, Flex } from '../../primitives';
import { tokens } from '../../../config/tokens';

export interface SplitBackgroundContent {
  title: string;
  body?: string;
  images: Array<{ image: { description?: string } }>;
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

export function SplitBackgroundSlide({ content }: SlideProps<SplitBackgroundContent>) {
  const { title, body, images } = content;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Split images in columns */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
        }}
      >
        {images.map((img, i) => (
          <div key={i} style={{ flex: 1, position: 'relative' }}>
            <ImagePlaceholder description={img.image.description} />
          </div>
        ))}
      </div>

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Overlay text at top */}
      <Flex
        direction="col"
        gap="md"
        style={{
          position: 'relative',
          padding: tokens.spacing.slidePadding,
        }}
      >
        <Text variant="h1" color={tokens.layout.text.inverse}>
          {title}
        </Text>
        {body && (
          <Text variant="body" color={tokens.layout.text.inverse} style={{ opacity: 0.85 }}>
            {body}
          </Text>
        )}
      </Flex>
    </div>
  );
}
