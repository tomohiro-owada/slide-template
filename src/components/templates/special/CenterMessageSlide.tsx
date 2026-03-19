import type { SlideProps } from '../../../types/slide';
import { Text, Flex, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';

export interface CenterMessageContent {
  message: string;
  subtext?: string;
}

export function CenterMessageSlide({ content }: SlideProps<CenterMessageContent>) {
  const { message, subtext } = content;

  return (
    <Flex
      direction="col"
      align="center"
      justify="center"
      style={{
        width: '100%',
        height: '100%',
        minHeight: tokens.slide.height,
        padding: tokens.spacing.slidePadding,
        backgroundColor: tokens.layout.slide.background,
      }}
    >
      <Text
        variant="h1"
        align="center"
        style={{ maxWidth: '80%' }}
      >
        {message}
      </Text>
      {subtext && (
        <>
          <Spacer size="lg" />
          <Text variant="body" align="center" color={tokens.layout.text.muted} style={{ maxWidth: '60%' }}>
            {subtext}
          </Text>
        </>
      )}
    </Flex>
  );
}
