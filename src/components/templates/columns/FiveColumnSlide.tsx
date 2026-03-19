import { Flex, Grid, Text, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';
import type { SlideProps } from '../../../types/slide';

export interface FiveColumnContent {
  title: string;
  columns: Array<{
    title: string;
    body?: string;
    level?: number;
  }>;
}

export function FiveColumnSlide({ content }: SlideProps<FiveColumnContent>) {
  return (
    <Flex direction="col" style={{ height: '100%', padding: tokens.spacing.slidePadding }}>
      <Text variant="h2">{content.title}</Text>
      <Spacer size="xl" />
      <Grid columns={5} gap="md" style={{ flex: 1 }}>
        {content.columns.map((col, i) => {
          const level = Math.min(Math.max(col.level ?? 0, 0), 5);
          const barHeight = level > 0 ? `${(level / 5) * 100}%` : '0%';

          return (
            <Flex
              key={i}
              direction="col"
              align="center"
              gap="sm"
              style={{
                padding: tokens.spacing.md,
                backgroundColor: tokens.layout.panel.background,
                borderRadius: tokens.radius.lg,
                border: `1px solid ${tokens.layout.panel.border}`,
              }}
            >
              {/* Level bar indicator */}
              <Flex
                align="flex-end"
                justify="center"
                style={{
                  width: '100%',
                  height: 120,
                  backgroundColor: tokens.layout.slide.backgroundAlt,
                  borderRadius: tokens.radius.sm,
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  width: '60%',
                  height: barHeight,
                  backgroundColor: tokens.layout.brand.primary,
                  borderRadius: `${tokens.radius.sm}px ${tokens.radius.sm}px 0 0`,
                  transition: 'height 0.3s ease',
                }} />
              </Flex>
              <Spacer size="xs" />
              <Text variant="h4" align="center">{col.title}</Text>
              {col.body && (
                <Text variant="caption" align="center">{col.body}</Text>
              )}
            </Flex>
          );
        })}
      </Grid>
    </Flex>
  );
}
