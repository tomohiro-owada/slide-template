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

export function TwoColumnComparisonSlide({ content }: SlideProps<TwoColumnComparisonContent>) {
  return (
    <Flex direction="col" style={{ height: '100%', padding: tokens.spacing.slidePadding }}>
      <Text variant="h2">{content.title}</Text>
      <Spacer size="xl" />
      <Flex direction="row" gap="xl" style={{ flex: 1 }}>
        {/* Left column */}
        <Flex direction="col" flex={1} style={{
          padding: tokens.spacing.lg,
          backgroundColor: tokens.layout.panel.background,
          borderRadius: tokens.radius.lg,
          borderTop: `4px solid ${tokens.layout.panel.emphasisBorder}`,
        }}>
          <Text variant="h4" color={tokens.layout.brand.primary}>{content.leftLabel}</Text>
          <Spacer size="md" />
          <Flex direction="col" gap="sm">
            {content.leftPoints.map((point, i) => (
              <Flex key={i} direction="row" gap="sm" align="flex-start">
                <Text variant="body" color={tokens.layout.text.muted} style={{ flexShrink: 0 }}>•</Text>
                <Text variant="body">{point.text}</Text>
              </Flex>
            ))}
          </Flex>
        </Flex>

        {/* Right column */}
        <Flex direction="col" flex={1} style={{
          padding: tokens.spacing.lg,
          backgroundColor: tokens.layout.panel.background,
          borderRadius: tokens.radius.lg,
          borderTop: `4px solid ${tokens.layout.brand.secondary}`,
        }}>
          <Text variant="h4" color={tokens.layout.brand.primary}>{content.rightLabel}</Text>
          <Spacer size="md" />
          <Flex direction="col" gap="sm">
            {content.rightPoints.map((point, i) => (
              <Flex key={i} direction="row" gap="sm" align="flex-start">
                <Text variant="body" color={tokens.layout.text.muted} style={{ flexShrink: 0 }}>•</Text>
                <Text variant="body">{point.text}</Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
