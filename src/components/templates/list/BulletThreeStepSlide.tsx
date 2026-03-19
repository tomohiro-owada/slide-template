import { Flex, Text, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';
import type { SlideProps } from '../../../types/slide';

export interface BulletThreeStepContent {
  title: string;
  steps: Array<{ title: string; body: string }>;
}

export function BulletThreeStepSlide({ content }: SlideProps<BulletThreeStepContent>) {
  return (
    <Flex direction="col" style={{ height: '100%', padding: tokens.spacing.slidePadding }}>
      <Text variant="h2">{content.title}</Text>
      <Spacer size="xl" />
      <Flex direction="row" gap="xl" style={{ flex: 1 }}>
        {content.steps.slice(0, 3).map((step, i) => (
          <Flex
            key={i}
            direction="col"
            flex={1}
            style={{
              padding: tokens.spacing.lg,
              backgroundColor: tokens.layout.panel.background,
              borderRadius: tokens.radius.lg,
              borderTop: `4px solid ${tokens.layout.panel.emphasisBorder}`,
            }}
          >
            <Text
              variant="number"
              color={tokens.layout.brand.primary}
              style={{ opacity: 0.15 }}
            >
              {i + 1}
            </Text>
            <Spacer size="md" />
            <Text variant="h3" color={tokens.layout.text.heading}>{step.title}</Text>
            <Spacer size="sm" />
            <Text variant="body" color={tokens.layout.text.body}>{step.body}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
