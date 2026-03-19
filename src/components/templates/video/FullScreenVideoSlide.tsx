import { Flex, Text } from '../../primitives';
import { tokens } from '../../../config/tokens';
import type { SlideProps } from '../../../types/slide';

export interface FullScreenVideoContent {
  title?: string;
  video: { description?: string };
  overlay?: string;
}

export function FullScreenVideoSlide({ content }: SlideProps<FullScreenVideoContent>) {
  return (
    <Flex direction="col" style={{ height: '100%', position: 'relative' }}>
      {/* Video fills entire slide */}
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

      {/* Optional overlay at bottom */}
      {(content.title || content.overlay) && (
        <Flex
          direction="col"
          gap="sm"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: tokens.spacing.xl,
            background: 'rgba(0, 0, 0, 0.6)',
            borderRadius: `0 0 ${tokens.radius.md}px ${tokens.radius.md}px`,
          }}
        >
          {content.title && (
            <Text variant="h3" color="#FFFFFF">{content.title}</Text>
          )}
          {content.overlay && (
            <Text variant="body" color="rgba(255, 255, 255, 0.85)">{content.overlay}</Text>
          )}
        </Flex>
      )}
    </Flex>
  );
}
