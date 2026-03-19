import { Flex, Text, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';
import type { SlideProps } from '../../../types/slide';

export interface SectionEndContent {
  title: string;
  keyPoints: Array<{ text: string }>;
}

export function SectionEndSlide({ content }: SlideProps<SectionEndContent>) {
  return (
    <Flex direction="col" align="center" justify="center" style={{ height: '100%' }}>
      <Text variant="h2" align="center">{content.title}</Text>
      <Spacer size="xxl" />
      <Flex direction="col" gap="lg" style={{ width: '100%', maxWidth: 1200 }}>
        {content.keyPoints.map((point, index) => (
          <Flex
            key={index}
            direction="row"
            gap="lg"
            align="center"
            style={{
              padding: `${tokens.spacing.md}px ${tokens.spacing.lg}px`,
              borderLeft: `4px solid ${tokens.layout.brand.primary}`,
              backgroundColor: tokens.layout.panel.background,
              borderRadius: tokens.radius.md,
            }}
          >
            <Text
              variant="h3"
              color={tokens.layout.text.muted}
              style={{ minWidth: 48 }}
            >
              {String(index + 1).padStart(2, '0')}
            </Text>
            <Text variant="h4" weight="medium">{point.text}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
