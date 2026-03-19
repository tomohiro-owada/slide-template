import { Flex, Text, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';
import type { SlideProps } from '../../../types/slide';

export interface TwoVideoComparisonContent {
  title: string;
  leftVideo: { description?: string };
  rightVideo: { description?: string };
  leftLabel: string;
  rightLabel: string;
}

export function TwoVideoComparisonSlide({ content }: SlideProps<TwoVideoComparisonContent>) {
  return (
    <Flex direction="col" style={{ height: '100%', padding: tokens.spacing.slidePadding }}>
      <Text variant="h2">{content.title}</Text>
      <Spacer size="xl" />

      <Flex direction="row" gap="xl" align="stretch" style={{ flex: 1 }}>
        {/* Left video */}
        <Flex direction="col" flex={1} gap="sm">
          <Text variant="label" align="center" weight={600}>{content.leftLabel}</Text>
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
              <span>{content.leftVideo.description || 'Video'}</span>
            </div>
          </Flex>
        </Flex>

        {/* Right video */}
        <Flex direction="col" flex={1} gap="sm">
          <Text variant="label" align="center" weight={600}>{content.rightLabel}</Text>
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
              <span>{content.rightVideo.description || 'Video'}</span>
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
