import { Flex, Grid, Text, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';
import type { SlideProps } from '../../../types/slide';

export interface FourColumnContent {
  title: string;
  columns: Array<{
    icon?: string;
    title: string;
    body?: string;
  }>;
}

export function FourColumnSlide({ content }: SlideProps<FourColumnContent>) {
  return (
    <Flex direction="col" style={{ height: '100%', padding: tokens.spacing.slidePadding }}>
      <Text variant="h2">{content.title}</Text>
      <Spacer size="xl" />
      <Grid columns={4} gap="lg" style={{ flex: 1 }}>
        {content.columns.map((col, i) => (
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
            {col.icon && (
              <Text variant="h2" align="center" style={{ fontSize: 48 }}>
                {col.icon}
              </Text>
            )}
            <Text variant="h4" align="center">{col.title}</Text>
            {col.body && (
              <Text variant="body" align="center">{col.body}</Text>
            )}
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
}
