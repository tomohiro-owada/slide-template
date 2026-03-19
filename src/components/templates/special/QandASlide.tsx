import type { SlideProps } from '../../../types/slide';
import { Text, Flex, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';

export interface QandAContent {
  title?: string;
  subtitle?: string;
}

export function QandASlide({ content }: SlideProps<QandAContent>) {
  const { title = 'Q&A', subtitle } = content;

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
        variant="number"
        align="center"
        color={tokens.layout.brand.primary}
        style={{ fontSize: 160, letterSpacing: '0.05em' }}
      >
        {title}
      </Text>
      {subtitle && (
        <>
          <Spacer size="lg" />
          <Text variant="h4" align="center" color={tokens.layout.text.muted} weight="normal">
            {subtitle}
          </Text>
        </>
      )}
    </Flex>
  );
}
