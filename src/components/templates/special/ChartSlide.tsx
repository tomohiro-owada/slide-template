import { Flex, Text, Spacer } from '../../primitives';
import { ChartBlock, type ChartBlockData } from '../../composites/ChartBlock';
import type { SlideProps } from '../../../types/slide';

// チャートがメインのスライド
export interface ChartSlideContent {
  title: string;
  chart: ChartBlockData;
  caption?: string;
}

export function ChartSlide({ content }: SlideProps<ChartSlideContent>) {
  return (
    <Flex direction="col" align="center" justify="center" style={{ height: '100%' }}>
      <Text variant="h2" align="center">{content.title}</Text>
      <Spacer size="xl" />
      <div style={{ width: '100%', maxWidth: 1400, flex: 1, minHeight: 0 }}>
        <ChartBlock chart={content.chart} height="100%" />
      </div>
      {content.caption && (
        <>
          <Spacer size="md" />
          <Text variant="caption" align="center">{content.caption}</Text>
        </>
      )}
    </Flex>
  );
}
