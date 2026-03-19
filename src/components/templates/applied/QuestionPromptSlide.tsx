import type { SlideProps } from '../../../types/slide';
import { Text, Flex, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';

export interface QuestionPromptContent {
  question: string;
  subtext?: string;
}

export function QuestionPromptSlide({ content }: SlideProps<QuestionPromptContent>) {
  const { question, subtext } = content;

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
        backgroundColor: tokens.layout.slide.backgroundAlt,
      }}
    >
      {/* Subtle background question mark */}
      <div
        style={{
          position: 'absolute',
          fontSize: 600,
          fontWeight: 900,
          color: tokens.layout.panel.border,
          opacity: 0.15,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        ?
      </div>

      <Text
        variant="h1"
        align="center"
        style={{ maxWidth: '75%', position: 'relative' }}
      >
        {question}
      </Text>
      {subtext && (
        <>
          <Spacer size="lg" />
          <Text
            variant="body"
            align="center"
            color={tokens.layout.text.muted}
            style={{ maxWidth: '60%', position: 'relative' }}
          >
            {subtext}
          </Text>
        </>
      )}
    </Flex>
  );
}
