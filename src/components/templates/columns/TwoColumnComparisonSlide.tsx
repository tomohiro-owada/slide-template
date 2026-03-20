import { Flex, Text, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';
import type { SlideProps } from '../../../types/slide';

export interface TwoColumnComparisonContent {
  title: string;
  leftLabel: string;
  leftPoints: Array<{ text: string }>;
  rightLabel: string;
  rightPoints: Array<{ text: string }>;
}

function ComparisonColumn({ label, points, borderColor }: {
  label: string;
  points: Array<{ text: string }>;
  borderColor: string;
}) {
  return (
    <Flex direction="col" flex={1} style={{
      padding: `${tokens.spacing.xl}px ${tokens.spacing.lg}px`,
      backgroundColor: tokens.layout.panel.background,
      borderRadius: tokens.radius.lg,
      borderTop: `4px solid ${borderColor}`,
    }}>
      <Text variant="h3" color={tokens.layout.brand.primary}>{label}</Text>
      <Spacer size="lg" />
      <Flex direction="col" gap="md">
        {points.map((point, i) => (
          <Flex key={i} direction="row" gap="md" align="center">
            <Text variant="h4" color={tokens.layout.text.muted} style={{ flexShrink: 0 }}>•</Text>
            <Text variant="h4" weight="normal">{point.text}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}

export function TwoColumnComparisonSlide({ content }: SlideProps<TwoColumnComparisonContent>) {
  return (
    <Flex direction="col" justify="center" style={{ height: '100%' }}>
      <Text variant="h2">{content.title}</Text>
      <Spacer size="xl" />
      <Flex direction="row" gap="xl" style={{ flex: 1 }}>
        <ComparisonColumn label={content.leftLabel} points={content.leftPoints} borderColor={tokens.layout.panel.emphasisBorder} />
        <ComparisonColumn label={content.rightLabel} points={content.rightPoints} borderColor={tokens.layout.brand.secondary} />
      </Flex>
    </Flex>
  );
}
