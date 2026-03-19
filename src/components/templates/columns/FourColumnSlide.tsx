import { Flex, Grid, Text, Spacer, Icon } from '../../primitives';
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
    <Flex direction="col" align="center" justify="center" style={{ height: '100%' }}>
      <Text variant="h2" align="center">{content.title}</Text>
      <Spacer size="xxl" />
      <Grid columns={4} gap="lg" style={{ width: '100%' }}>
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
              <div style={{
                width: 64,
                height: 64,
                borderRadius: tokens.radius.full,
                backgroundColor: tokens.layout.slide.backgroundAlt,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon name={col.icon} size={32} color={tokens.layout.brand.primary} />
              </div>
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
