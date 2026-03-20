import { Flex, Grid, Text, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';
import type { SlideProps } from '../../../types/slide';

export interface ThreeColumnImageTextContent {
  title: string;
  columns: Array<{
    image: { description?: string; imageUrl?: string };
    title: string;
    body?: string;
  }>;
}

export function ThreeColumnImageTextSlide({ content }: SlideProps<ThreeColumnImageTextContent>) {
  return (
    <Flex direction="col" align="center" justify="center" style={{ height: '100%' }}>
      <Text variant="h2">{content.title}</Text>
      <Spacer size="xl" />
      <Grid columns={3} gap="lg" style={{ width: '100%', flex: 1 }}>
        {content.columns.map((col, i) => (
          <Flex key={i} direction="col" gap="md">
            {col.image.imageUrl ? (
              <img
                src={col.image.imageUrl}
                alt={col.image.description ?? ''}
                style={{
                  width: '100%',
                  flex: 1,
                  objectFit: 'cover',
                  borderRadius: tokens.radius.md,
                  minHeight: 200,
                }}
              />
            ) : (
              <div style={{
                width: '100%',
                flex: 1,
                minHeight: 200,
                backgroundColor: tokens.layout.panel.border,
                borderRadius: tokens.radius.md,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: tokens.layout.text.muted,
                fontSize: tokens.size.caption,
              }}>
                {col.image.description || 'Image'}
              </div>
            )}
            <Text variant="h3" align="center">{col.title}</Text>
            {col.body && <Text variant="body" align="center">{col.body}</Text>}
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
}
