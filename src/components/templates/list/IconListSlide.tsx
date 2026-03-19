import { Flex, Grid, Text, Spacer, Icon } from '../../primitives';
import { tokens } from '../../../config/tokens';
import type { SlideProps } from '../../../types/slide';

export interface IconListContent {
  title: string;
  items: Array<{ icon: string; title: string; body?: string }>;
}

export function IconListSlide({ content }: SlideProps<IconListContent>) {
  const iconSize = 48;
  const columns = content.items.length > 4 ? 2 : content.items.length > 2 ? 2 : 1;

  return (
    <Flex direction="col" align="center" justify="center" style={{ height: '100%' }}>
      <Text variant="h2" align="center">{content.title}</Text>
      <Spacer size="xxl" />
      <Grid columns={columns} gap="xl" rowGap="lg" style={{ width: '100%', maxWidth: 1400 }}>
        {content.items.map((item, i) => (
          <Flex key={i} direction="row" gap="lg" align="center"
            style={{
              padding: `${tokens.spacing.md}px ${tokens.spacing.lg}px`,
              backgroundColor: tokens.layout.panel.background,
              borderRadius: tokens.radius.md,
            }}
          >
            <div style={{
              width: iconSize,
              height: iconSize,
              borderRadius: tokens.radius.full,
              backgroundColor: tokens.layout.slide.backgroundAlt,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Icon name={item.icon} size={24} color={tokens.layout.brand.primary} />
            </div>
            <Flex direction="col">
              <Text variant="h4">{item.title}</Text>
              {item.body && (
                <>
                  <Spacer size="xs" />
                  <Text variant="body">{item.body}</Text>
                </>
              )}
            </Flex>
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
}
