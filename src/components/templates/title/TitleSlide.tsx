import { Flex, Text, Spacer } from '../../primitives';
import type { SlideProps } from '../../../types/slide';

export interface TitleSlideContent {
  title: string;
  subtitle?: string;
  presenter?: string;
  date?: string;
}

export function TitleSlide({ content }: SlideProps<TitleSlideContent>) {
  return (
    <Flex direction="col" align="center" justify="center" style={{ height: '100%' }}>
      <Text variant="h1" align="center">{content.title}</Text>
      {content.subtitle && (
        <>
          <Spacer size="lg" />
          <Text variant="body" align="center">{content.subtitle}</Text>
        </>
      )}
      {(content.presenter || content.date) && (
        <>
          <Spacer size="xl" />
          {content.presenter && <Text variant="caption" align="center">{content.presenter}</Text>}
          {content.date && <Text variant="caption" align="center">{content.date}</Text>}
        </>
      )}
    </Flex>
  );
}
