import { Flex, Text, Spacer } from '../../primitives';
import type { SlideProps } from '../../../types/slide';

export interface SectionStartContent {
  sectionNumber?: string;
  title: string;
  subtitle?: string;
}

export function SectionStartSlide({ content }: SlideProps<SectionStartContent>) {
  return (
    <Flex direction="col" align="center" justify="center" style={{ height: '100%' }}>
      {content.sectionNumber && (
        <>
          <Text variant="number" align="center">{content.sectionNumber}</Text>
          <Spacer size="lg" />
        </>
      )}
      <Text variant="h1" align="center">{content.title}</Text>
      {content.subtitle && (
        <>
          <Spacer size="md" />
          <Text variant="body" align="center">{content.subtitle}</Text>
        </>
      )}
    </Flex>
  );
}
