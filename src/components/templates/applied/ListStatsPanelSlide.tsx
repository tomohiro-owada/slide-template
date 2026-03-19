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
    <Flex direction="col" justify="center" style={{ width: '100%', height: '100%' }}>
      <Text variant="h2">{title}</Text>
      <Spacer size="xxl" />

      <Flex direction="row" gap="xxl" align="flex-start">
        {/* 左: リスト */}
        <Flex direction="col" gap="lg" flex={1}>
          {items.map((item, i) => (
            <Flex
              key={i}
              direction="row"
              gap="md"
              align="center"
              style={{
                padding: `${tokens.spacing.md}px ${tokens.spacing.lg}px`,
                borderLeft: `4px solid ${tokens.layout.brand.primary}`,
                backgroundColor: tokens.layout.panel.background,
                borderRadius: tokens.radius.md,
              }}
            >
              <Text variant="h4" color={tokens.layout.text.muted} style={{ minWidth: 32 }}>
                {String(i + 1).padStart(2, '0')}
              </Text>
              <Text variant="h4" weight="medium">{item.text}</Text>
            </Flex>
          ))}
        </Flex>

        {/* 右: 統計カード */}
        <Flex direction="col" gap="lg" style={{ minWidth: 360 }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                backgroundColor: tokens.layout.panel.background,
                borderRadius: tokens.radius.lg,
                padding: `${tokens.spacing.xl}px ${tokens.spacing.lg}px`,
                boxShadow: tokens.shadow.md,
                textAlign: 'center',
              }}
            >
              <Text variant="number" color={tokens.layout.brand.primary} style={{ fontSize: 72 }}>
                {stat.value}
              </Text>
              <Spacer size="sm" />
              <Text variant="h4" color={tokens.layout.text.muted}>{stat.label}</Text>
            </div>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
