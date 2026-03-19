import type { SlideProps } from '../../../types/slide';
import { Text, Flex, Grid, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';

export interface ComparisonStatsContent {
  title: string;
  categories: Array<{
    label: string;
    stat: string;
    points: Array<{ text: string }>;
  }>;
}

export function ComparisonStatsSlide({ content }: SlideProps<ComparisonStatsContent>) {
  const { title, categories } = content;

  return (
    <Flex
      direction="col"
      align="center"
      justify="center"
      style={{ width: '100%', height: '100%' }}
    >
      <Text variant="h2" align="center">{title}</Text>
      <Spacer size="xl" />

      <Grid columns={categories.length} gap="lg" style={{ flex: 1 }}>
        {categories.map((cat, i) => (
          <div
            key={i}
            style={{
              backgroundColor: tokens.layout.panel.background,
              borderRadius: tokens.radius.lg,
              padding: tokens.spacing.lg,
              boxShadow: tokens.shadow.sm,
              borderTop: `4px solid ${tokens.layout.panel.emphasisBorder}`,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Text variant="label" align="center">{cat.label}</Text>
            <Spacer size="md" />
            <Text variant="number" align="center" color={tokens.layout.brand.primary} style={{ fontSize: 56 }}>
              {cat.stat}
            </Text>
            <Spacer size="lg" />

            <Flex direction="col" gap="sm">
              {cat.points.map((point, j) => (
                <Flex key={j} direction="row" gap="sm" align="flex-start">
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: tokens.radius.full,
                      backgroundColor: tokens.layout.brand.primary,
                      marginTop: 10,
                      flexShrink: 0,
                    }}
                  />
                  <Text variant="body">{point.text}</Text>
                </Flex>
              ))}
            </Flex>
          </div>
        ))}
      </Grid>
    </Flex>
  );
}
