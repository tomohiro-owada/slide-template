import type { SlideProps } from '../../../types/slide';
import { Text, Flex, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';

export interface DecorativeContent {
  title: string;
  body: string;
}

export function DecorativeSlide({ content }: SlideProps<DecorativeContent>) {
  const { title, body } = content;

  return (
    <Flex
      direction="col"
      align="center"
      justify="center"
      style={{
        width: '100%',
        height: '100%',
        padding: tokens.spacing.slidePadding,
        backgroundColor: tokens.layout.slide.background,
        position: 'relative',
      }}
    >
      {/* Decorative large quote marks */}
      <div
        style={{
          position: 'absolute',
          top: tokens.spacing.xl,
          left: tokens.spacing.xl,
          fontSize: 200,
          lineHeight: 1,
          fontFamily: tokens.font.heading,
          color: tokens.layout.brand.primary,
          opacity: 0.08,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {'\u201C'}
      </div>

      {/* Decorative border */}
      <div
        style={{
          border: `2px solid ${tokens.layout.panel.emphasisBorder}`,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.xxl,
          maxWidth: '75%',
        }}
      >
        <Text variant="h2" align="center">{title}</Text>
        <Spacer size="lg" />
        <Text variant="body" align="center">{body}</Text>
      </div>

      {/* Bottom decorative line */}
      <div
        style={{
          position: 'absolute',
          bottom: tokens.spacing.xl,
          left: '25%',
          right: '25%',
          height: 2,
          backgroundColor: tokens.layout.decoration.line,
          opacity: 0.2,
        }}
      />
    </Flex>
  );
}
