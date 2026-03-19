import type { SlideProps } from '../../../types/slide';
import { Text, Flex, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';

export interface DayMonthContent {
  day: string;
  month: string;
  title: string;
  body?: string;
}

export function DayMonthSlide({ content }: SlideProps<DayMonthContent>) {
  const { day, month, title, body } = content;

  return (
    <Flex
      direction="row"
      align="center"
      gap="xxl"
      style={{
        width: '100%',
        height: '100%',
        minHeight: tokens.slide.height,
        padding: tokens.spacing.slidePadding,
        backgroundColor: tokens.layout.slide.background,
      }}
    >
      {/* Left: large day + month */}
      <Flex direction="col" align="center" style={{ flexShrink: 0 }}>
        <Text
          variant="number"
          style={{
            fontSize: 200,
            lineHeight: 1,
            color: tokens.layout.brand.primary,
          }}
        >
          {day}
        </Text>
        <Text
          variant="h3"
          color={tokens.layout.text.muted}
          style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}
        >
          {month}
        </Text>
      </Flex>

      {/* Vertical divider */}
      <div
        style={{
          width: 2,
          alignSelf: 'stretch',
          backgroundColor: tokens.layout.panel.border,
          margin: `${tokens.spacing.xl}px 0`,
        }}
      />

      {/* Right: title + body */}
      <Flex direction="col" justify="center" flex={1}>
        <Text variant="h2">{title}</Text>
        {body && (
          <>
            <Spacer size="md" />
            <Text variant="body">{body}</Text>
          </>
        )}
      </Flex>
    </Flex>
  );
}
