import { Flex, Grid, Text, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';
import type { SlideProps } from '../../../types/slide';

export interface ThreeColumnImageTextContent {
  title: string;
  columns: Array<{
    image: { description?: string };
    title: string;
    body?: string;
  }>;
}

export function ThreeColumnImageTextSlide({ content }: SlideProps<ThreeColumnImageTextContent>) {
  return (
    <Flex direction="col" style={{ height: '100%', padding: tokens.spacing.slidePadding }}>
      <Text variant="h2">{content.title}</Text>
      <Spacer size="xl" />
      <Grid columns={3} gap="lg" style={{ flex: 1 }}>
        {content.columns.map((col, i) => (
          <Flex key={i} direction="col" gap="md">
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
              {col.image.description || 'Image'}
            </div>
            <Text variant="h4">{col.title}</Text>
            {col.body && <Text variant="body">{col.body}</Text>}
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
}
