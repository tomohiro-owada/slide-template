import { Grid, Flex, Text, Spacer } from '../../primitives';
import type { SlideProps } from '../../../types/slide';

export interface TableOfContentsContent {
  title?: string;
  items: Array<{
    number: string;   // "01", "02"...
    label: string;    // "Introduction"
    description?: string;  // "Describe the topic..."
  }>;
}

export function TableOfContentsSlide({ content }: SlideProps<TableOfContentsContent>) {
  const title = content.title ?? 'Table of contents';
  // 列数はアイテム数に応じて自動判定（3列が基本）
  // 3個以下→その数だけ横並び、4個→2列、5〜6個→3列、7〜8個→4列
  const len = content.items.length;
  const columns = len <= 3 ? len : len <= 4 ? 2 : len <= 6 ? 3 : 4;

  return (
    <Flex direction="col" align="center" justify="center" style={{ height: '100%' }}>
      <Text variant="h2" align="center">{title}</Text>
      <Spacer size="xxl" />
      <Grid columns={columns} gap="xl" rowGap="xxl" style={{ width: '100%', maxWidth: 1600 }}>
        {content.items.map((item) => (
          <Flex key={item.number} direction="col" align="center">
            <Text variant="number">{item.number}</Text>
            <Spacer size="sm" />
            <Text variant="h4" align="center" weight="bold" italic>{item.label}</Text>
            {item.description && (
              <>
                <Spacer size="xs" />
                <Text variant="caption" align="center">{item.description}</Text>
              </>
            )}
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
}
