import type { SlideProps } from '../../../types/slide';
import { Text, Flex, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';

export interface ListStatsPanelContent {
  title: string;
  items: Array<{ text: string }>;
  stats: Array<{ value: string; label: string }>;
}

export function ListStatsPanelSlide({ content }: SlideProps<ListStatsPanelContent>) {
  const { title, items, stats } = content;

  return (
    <Flex
      direction="col"
      style={{
        width: '100%',
        height: '100%',
        minHeight: tokens.slide.height,
        padding: tokens.spacing.slidePadding,
        backgroundColor: tokens.layout.slide.background,
      }}
    >
      <Text variant="h2">{title}</Text>
      <Spacer size="xl" />

      <Flex direction="row" gap="xxl" style={{ flex: 1 }}>
        {/* Left: bullet list */}
        <Flex direction="col" gap="md" flex={1} justify="flex-start">
          {items.map((item, i) => (
            <Flex key={i} direction="row" gap="sm" align="flex-start">
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: tokens.radius.full,
                  backgroundColor: tokens.layout.brand.primary,
                  marginTop: 10,
                  flexShrink: 0,
                }}
              />
              <Text variant="body">{item.text}</Text>
            </Flex>
          ))}
        </Flex>

        {/* Right: stat cards */}
        <Flex direction="col" gap="lg" style={{ minWidth: 280 }}>
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
    </Flex>
  );
}
