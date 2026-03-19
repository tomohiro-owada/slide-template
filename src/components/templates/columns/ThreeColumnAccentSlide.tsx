import { Flex, Grid, Text, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';
import type { SlideProps } from '../../../types/slide';

export interface ThreeColumnAccentContent {
  title: string;
  columns: Array<{
    title: string;
    body: string;
  }>;
  accentIndex?: number;
}

export function ThreeColumnAccentSlide({ content }: SlideProps<ThreeColumnAccentContent>) {
  const accentIndex = content.accentIndex ?? 1;

  return (
    <Flex direction="col" style={{ height: '100%', padding: tokens.spacing.slidePadding }}>
      <Text variant="h2">{content.title}</Text>
      <Spacer size="xl" />
      <Grid columns={3} gap="lg" style={{ flex: 1 }}>
        {content.columns.map((col, i) => {
          const isAccent = i === accentIndex;
          return (
            <Flex
              key={i}
              direction="col"
              gap="md"
              style={{
                padding: tokens.spacing.lg,
                borderRadius: tokens.radius.lg,
                backgroundColor: isAccent
                  ? tokens.layout.brand.primary
                  : tokens.layout.panel.background,
                border: isAccent
                  ? undefined
                  : `1px solid ${tokens.layout.panel.border}`,
              }}
            >
              <Text
                variant="h4"
                color={isAccent ? tokens.layout.text.inverse : undefined}
              >
                {col.title}
              </Text>
              <Text
                variant="body"
                color={isAccent ? tokens.layout.text.inverse : undefined}
                style={isAccent ? { opacity: 0.9 } : undefined}
              >
                {col.body}
              </Text>
            </Flex>
          );
        })}
      </Grid>
    </Flex>
  );
}
