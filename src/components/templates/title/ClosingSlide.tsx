import { Flex, Text, Spacer } from '../../primitives';
import type { SlideProps } from '../../../types/slide';

export interface ClosingContent {
  title: string;
  subtitle?: string;
  contactName?: string;
  contactEmail?: string;
  contactUrl?: string;
}

export function ClosingSlide({ content }: SlideProps<ClosingContent>) {
  return (
    <Flex direction="col" align="center" justify="center" style={{ height: '100%' }}>
      <Text variant="h1" align="center">{content.title}</Text>
      {content.subtitle && (
        <>
          <Spacer size="lg" />
          <Text variant="body" align="center">{content.subtitle}</Text>
        </>
      )}
      {(content.contactName || content.contactEmail || content.contactUrl) && (
        <>
          <Spacer size="xxl" />
          <Flex direction="col" align="center" gap="sm">
            {content.contactName && <Text variant="caption" align="center">{content.contactName}</Text>}
            {content.contactEmail && <Text variant="caption" align="center">{content.contactEmail}</Text>}
            {content.contactUrl && <Text variant="caption" align="center">{content.contactUrl}</Text>}
          </Flex>
        </>
      )}
    </Flex>
  );
}
