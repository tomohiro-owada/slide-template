import { Flex, Text, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';
import type { SlideProps } from '../../../types/slide';

export interface TextVideoContent {
  title: string;
  body: string;
  video: { description?: string };
}

export function TextVideoSlide({ content }: SlideProps<TextVideoContent>) {
  return (
    <Flex direction="row" gap="xl" align="stretch" style={{ height: '100%', padding: tokens.spacing.slidePadding }}>
      {/* Text column */}
      <Flex direction="col" flex={1} justify="center">
        <Text variant="h2">{content.title}</Text>
        <Spacer size="lg" />
        <Text variant="body">{content.body}</Text>
      </Flex>

      {/* Video column */}
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
    </Flex>
  );
}
