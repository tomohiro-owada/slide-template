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
    <Flex direction="col" align="center" justify="center" style={{ height: '100%' }}>
      <Text variant="h2" align="center">{content.title}</Text>
      <Spacer size="xxl" />
      <Grid columns={5} gap="lg" style={{ width: '100%' }}>
        {content.columns.map((col, i) => {
          const level = Math.min(Math.max(col.level ?? 0, 0), 5);
          const filled = level;
          const empty = 5 - level;

          return (
            <Flex
              key={i}
              direction="col"
              align="center"
              gap="md"
              style={{
                padding: tokens.spacing.lg,
                backgroundColor: tokens.layout.panel.background,
                borderRadius: tokens.radius.lg,
                border: `1px solid ${tokens.layout.panel.border}`,
              }}
            >
              {/* レベル数字 */}
              <Text variant="number" color={tokens.layout.brand.primary} style={{ fontSize: 48 }}>
                {level}
              </Text>

              {/* ドットインジケーター */}
              <Flex direction="row" gap="xs" justify="center">
                {Array.from({ length: filled }).map((_, j) => (
                  <div key={`f${j}`} style={{
                    width: 12,
                    height: 12,
                    borderRadius: tokens.radius.full,
                    backgroundColor: tokens.layout.brand.primary,
                  }} />
                ))}
                {Array.from({ length: empty }).map((_, j) => (
                  <div key={`e${j}`} style={{
                    width: 12,
                    height: 12,
                    borderRadius: tokens.radius.full,
                    backgroundColor: tokens.layout.panel.border,
                  }} />
                ))}
              </Flex>

              <Spacer size="sm" />
              <Text variant="h3" align="center">{col.title}</Text>
              {col.body && (
                <Text variant="body" align="center" color={tokens.layout.text.muted}>{col.body}</Text>
              )}
            </Flex>
          );
        })}
      </Grid>
    </Flex>
  );
}
