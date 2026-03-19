import { Flex, Text, Spacer } from '../../primitives';
import { ChartBlock, type ChartBlockData } from '../../composites/ChartBlock';
import type { SlideProps } from '../../../types/slide';

// チャート＋テキスト説明のスライド
export interface ChartTextSlideContent {
  title: string;
  chart: ChartBlockData;
  body: string;
  message?: string;  // 大きく強調したい一言
}

export function ChartTextSlide({ content }: SlideProps<ChartTextSlideContent>) {
  return (
    <Flex direction="col" justify="center" style={{ height: '100%' }}>
      <Text variant="h2">{content.title}</Text>
      <Spacer size="xl" />
      <Flex direction="row" gap="xxl" align="center" style={{ flex: 1, minHeight: 0 }}>
        {/* チャート */}
        <div style={{ flex: 1, minHeight: 0, height: '100%' }}>
          <ChartBlock chart={content.chart} height="100%" />
        </div>
        {/* テキスト */}
        <Flex direction="col" justify="center" flex={1}>
          {content.message && (
            <>
              <Text variant="h1" style={{ lineHeight: 1.2 }}>{content.message}</Text>
              <Spacer size="lg" />
            </>
          )}
          <Text variant="h3" weight="normal" style={{ lineHeight: 1.6 }}>{content.body}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
