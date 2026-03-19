import { Flex, Text, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';
import type { SlideProps } from '../../../types/slide';

export interface IconListContent {
  title: string;
  items: Array<{ icon: string; title: string; body?: string }>;
}

export function IconListSlide({ content }: SlideProps<IconListContent>) {
  const iconSize = 48;

  return (
    <Flex direction="col" style={{ height: '100%', padding: tokens.spacing.slidePadding }}>
      <Text variant="h2">{content.title}</Text>
      <Spacer size="xl" />
      <Flex direction="col" gap="lg" style={{ flex: 1 }}>
        {content.items.map((item, i) => (
          <Flex key={i} direction="row" gap="lg" align="flex-start">
            {/* Icon circle with first letter */}
            <div style={{
              width: iconSize,
              height: iconSize,
              borderRadius: tokens.radius.full,
              backgroundColor: tokens.layout.brand.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Text
                variant="h4"
                color={tokens.layout.text.inverse}
                align="center"
              >
                {item.icon.charAt(0).toUpperCase()}
              </Text>
            </div>
            {/* Title and body */}
            <Flex direction="col">
              <Text variant="h4" color={tokens.layout.text.heading}>{item.title}</Text>
              {item.body && (
                <>
                  <Spacer size="xs" />
                  <Text variant="body" color={tokens.layout.text.body}>{item.body}</Text>
                </>
              )}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
