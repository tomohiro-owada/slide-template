import type { SlideProps } from '../../../types/slide';
import { tokens } from '../../../config/tokens';
import { Text, Flex, Spacer } from '../../primitives';

export interface GradientPanelContent {
  title: string;
  body: string;
}

export function GradientPanelSlide({ content }: SlideProps<GradientPanelContent>) {
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
        boxSizing: 'border-box',
      }}
    >
      <Flex
        direction="col"
        align="center"
        justify="center"
        gap="md"
        style={{
          maxWidth: 900,
          width: '100%',
          padding: tokens.spacing.xxl,
          background: `linear-gradient(135deg, ${tokens.layout.slide.background} 0%, ${tokens.layout.panel.background} 50%, ${tokens.layout.slide.backgroundAlt} 100%)`,
          borderRadius: tokens.radius.lg,
          border: `1px solid ${tokens.layout.panel.border}`,
          boxShadow: tokens.shadow.md,
        }}
      >
        <Text variant="h2" align="center">{content.title}</Text>
        <Spacer size="sm" />
        <Text variant="body" align="center">{content.body}</Text>
      </Flex>
    </Flex>
  );
}
