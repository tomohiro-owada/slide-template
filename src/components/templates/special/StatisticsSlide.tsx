import type { SlideProps } from '../../../types/slide';
import { Text, Flex, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';

export interface StatisticsContent {
  title: string;
  stats: Array<{ value: string; label: string; trend?: string }>;
  footnote?: string;
}

export function StatisticsSlide({ content }: SlideProps<StatisticsContent>) {
  const { title, stats, footnote } = content;

  return (
    <Flex
      direction="col"
      justify="center"
      style={{
        width: '100%',
        height: '100%',
        padding: tokens.spacing.slidePadding,
        backgroundColor: tokens.layout.slide.background,
      }}
    >
      <Text variant="h2" align="center">{title}</Text>
      <Spacer size="xxl" />

      <Flex direction="row" justify="center" gap="xxl" wrap>
        {stats.map((stat, i) => (
          <Flex
            key={i}
            direction="col"
            align="center"
            gap="sm"
            style={{ minWidth: 200 }}
          >
            <Flex direction="row" align="flex-end" gap="xs">
              <Text variant="number" color={tokens.layout.brand.primary}>
                {stat.value}
              </Text>
              {stat.trend && (
                <Text
                  variant="h3"
                  color={stat.trend === 'up' ? '#16A34A' : stat.trend === 'down' ? '#DC2626' : tokens.layout.text.muted}
                >
                  {stat.trend === 'up' ? '\u25B2' : stat.trend === 'down' ? '\u25BC' : stat.trend}
                </Text>
              )}
            </Flex>
            <Text variant="label" align="center">{stat.label}</Text>
          </Flex>
        ))}
      </Flex>

      {footnote && (
        <>
          <Spacer size="xl" />
          <Text variant="caption" align="center">{footnote}</Text>
        </>
      )}
    </Flex>
  );
}
