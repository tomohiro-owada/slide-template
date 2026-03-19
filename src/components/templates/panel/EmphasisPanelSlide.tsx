import type { SlideProps } from '../../../types/slide';
import { tokens } from '../../../config/tokens';
import { Text, Flex, Spacer } from '../../primitives';

export interface EmphasisPanelContent {
  title: string;
  body: string;
  highlight?: string;
}

export function EmphasisPanelSlide({ content }: SlideProps<EmphasisPanelContent>) {
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
        gap="md"
        style={{
          maxWidth: 900,
          width: '100%',
          backgroundColor: tokens.layout.panel.background,
          borderRadius: tokens.radius.lg,
          border: `1px solid ${tokens.layout.panel.border}`,
          borderLeft: `4px solid ${tokens.layout.brand.primary}`,
          boxShadow: tokens.shadow.md,
          padding: tokens.spacing.xl,
        }}
      >
        <Text variant="h2">{content.title}</Text>

        {content.highlight && (
          <>
            <Text variant="body" weight="bold">{content.highlight}</Text>
            <Spacer size="xs" />
          </>
        )}

        <Text variant="body">{content.body}</Text>
      </Flex>
    </Flex>
  );
}
