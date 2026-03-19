import type { SlideProps } from '../../../types/slide';
import { Text, Flex, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';

export interface StatisticsRatioContent {
  title: string;
  ratios: Array<{ value: string; label: string; total?: number }>;
}

function RatioBar({ value, label, total = 100 }: { value: string; label: string; total?: number }) {
  const numericValue = parseFloat(value) || 0;
  const percentage = Math.min((numericValue / total) * 100, 100);

  return (
    <Flex direction="col" gap="sm" style={{ width: '100%' }}>
      <Flex direction="row" justify="space-between" align="center">
        <Text variant="body" weight="semibold">{label}</Text>
        <Text variant="h4" color={tokens.layout.brand.primary}>{value}</Text>
      </Flex>
      {/* Progress bar track */}
      <div
        style={{
          width: '100%',
          height: 12,
          backgroundColor: tokens.layout.panel.border,
          borderRadius: tokens.radius.full,
          overflow: 'hidden',
        }}
      >
        {/* Progress bar fill */}
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: tokens.layout.brand.primary,
            borderRadius: tokens.radius.full,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </Flex>
  );
}

export function StatisticsRatioSlide({ content }: SlideProps<StatisticsRatioContent>) {
  const { title, ratios } = content;

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
      <Text variant="h2">{title}</Text>
      <Spacer size="xl" />

      <Flex direction="col" gap="lg" style={{ maxWidth: '80%' }}>
        {ratios.map((ratio, i) => (
          <RatioBar key={i} value={ratio.value} label={ratio.label} total={ratio.total} />
        ))}
      </Flex>
    </Flex>
  );
}
