import { Flex, Grid, Text, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';
import type { SlideProps } from '../../../types/slide';

export interface TwoByThreeGridContent {
  title?: string;
  items: Array<{
    image?: { description?: string };
    title: string;
    body?: string;
  }>;
}

export function TwoByThreeGridSlide({ content }: SlideProps<TwoByThreeGridContent>) {
  return (
    <Flex direction="col" style={{ height: '100%', padding: tokens.spacing.slidePadding }}>
      {content.title && (
        <>
          <Text variant="h2">{content.title}</Text>
          <Spacer size="lg" />
        </>
      )}
      <Grid columns={3} rows={2} gap="lg" style={{ flex: 1 }}>
        {content.items.slice(0, 6).map((item, i) => (
          <Flex key={i} direction="col" gap="sm" style={{ minHeight: 0 }}>
            {item.image && (
              <div style={{
                width: '100%',
                height: '100%',
                minHeight: 200,
                backgroundColor: tokens.layout.panel.border,
                borderRadius: tokens.radius.md,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: tokens.layout.text.muted,
                fontSize: tokens.size.caption,
                flex: 1,
              }}>
                {item.image.description || 'Image'}
              </div>
            )}
            <Text variant="h4">{item.title}</Text>
            {item.body && <Text variant="body">{item.body}</Text>}
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
}
