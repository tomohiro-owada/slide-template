import type { SlideProps } from '../../../types/slide';
import { Text, Flex, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';

export interface TextStatsPanelContent {
  title: string;
  body: string;
  stats: Array<{ value: string; label: string }>;
}

export function TextStatsPanelSlide({ content }: SlideProps<TextStatsPanelContent>) {
  const { title, body, stats } = content;

  return (
    <Flex
      direction="row"
      gap="xxl"
      align="center"
      style={{
        width: '100%',
        height: '100%',
        minHeight: tokens.slide.height,
        padding: tokens.spacing.slidePadding,
        backgroundColor: tokens.layout.slide.background,
      }}
    >
      {/* Left column: title + body */}
      <Flex direction="col" flex={1} justify="center">
        <Text variant="h2">{title}</Text>
        <Spacer size="lg" />
        <Text variant="body">{body}</Text>
      </Flex>

      {/* Right column: stat cards */}
      <Flex direction="col" gap="lg" style={{ minWidth: 300 }}>
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              backgroundColor: tokens.layout.panel.background,
              borderRadius: tokens.radius.lg,
              padding: tokens.spacing.lg,
              boxShadow: tokens.shadow.md,
              borderLeft: `4px solid ${tokens.layout.panel.emphasisBorder}`,
            }}
          >
            <Text variant="number" color={tokens.layout.brand.primary} style={{ fontSize: 48 }}>
              {stat.value}
            </Text>
            <Spacer size="xs" />
            <Text variant="label">{stat.label}</Text>
          </div>
        ))}
      </Flex>
    </Flex>
  );
}
