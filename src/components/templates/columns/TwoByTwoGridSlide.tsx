import { Flex, Grid, Text, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';
import type { SlideProps } from '../../../types/slide';

export interface TwoByTwoGridContent {
  title?: string;
  items: Array<{
    image: { description?: string; imageUrl?: string };
    title: string;
    body?: string;
  }>;
}

export function TwoByTwoGridSlide({ content }: SlideProps<TwoByTwoGridContent>) {
  return (
    <Flex direction="col" style={{ height: '100%', padding: tokens.spacing.slidePadding }}>
      {content.title && (
        <>
          <Text variant="h2">{content.title}</Text>
          <Spacer size="lg" />
        </>
      )}
      <Grid columns={2} rows={2} gap="lg" style={{ flex: 1 }}>
        {content.items.slice(0, 4).map((item, i) => (
          <Flex key={i} direction="col" gap="sm" style={{ minHeight: 0 }}>
            {item.image.imageUrl ? (
              <img
                src={item.image.imageUrl}
                alt={item.image.description ?? ''}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: tokens.radius.md,
                  minHeight: 200,
                  flex: 1,
                }}
              />
            ) : (
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
