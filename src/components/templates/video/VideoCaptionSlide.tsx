import { Flex, Text, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';
import type { SlideProps } from '../../../types/slide';

export interface VideoCaptionContent {
  video: { description?: string };
  caption: string;
}

export function VideoCaptionSlide({ content }: SlideProps<VideoCaptionContent>) {
  return (
    <Flex direction="col" style={{ height: '100%', padding: tokens.spacing.slidePadding }}>
      {/* Video takes most of the slide */}
      <Flex flex={1} style={{ minHeight: 0 }}>
        <div style={{
          width: '100%',
          height: '100%',
          minHeight: 250,
          backgroundColor: '#1E293B',
          borderRadius: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#94A3B8',
          fontSize: 18,
          gap: 8,
        }}>
          <span style={{ fontSize: 48 }}>▶</span>
          <span>{content.video.description || 'Video'}</span>
        </div>
      </Flex>

      <Spacer size="lg" />

      {/* Caption below */}
      <Text variant="caption" align="center">{content.caption}</Text>
    </Flex>
  );
}
