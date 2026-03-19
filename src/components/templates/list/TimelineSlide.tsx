import { Flex, Text, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';
import type { SlideProps } from '../../../types/slide';

export interface TimelineContent {
  title: string;
  events: Array<{ date: string; title: string; description?: string }>;
}

export function TimelineSlide({ content }: SlideProps<TimelineContent>) {
  const dotSize = 16;

  return (
    <Flex direction="col" style={{ height: '100%', padding: tokens.spacing.slidePadding }}>
      <Text variant="h2">{content.title}</Text>
      <Spacer size="xxl" />
      <Flex direction="col" justify="center" style={{ flex: 1 }}>
        <div style={{ position: 'relative' }}>
          {/* Horizontal timeline line */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: `calc(${100 / (content.events.length * 2)}%)`,
            right: `calc(${100 / (content.events.length * 2)}%)`,
            height: 2,
            backgroundColor: tokens.layout.panel.border,
            transform: 'translateY(-50%)',
          }} />
          <Flex direction="row" justify="space-around" align="center">
            {content.events.map((event, i) => (
              <Flex key={i} direction="col" align="center" style={{ flex: 1 }}>
                {/* Date above */}
                <Text variant="label" color={tokens.layout.text.muted} align="center">
                  {event.date}
                </Text>
                <Spacer size="md" />
                {/* Dot */}
                <div style={{
                  width: dotSize,
                  height: dotSize,
                  borderRadius: tokens.radius.full,
                  backgroundColor: tokens.layout.brand.primary,
                  border: `3px solid ${tokens.layout.panel.background}`,
                  boxShadow: `0 0 0 2px ${tokens.layout.brand.primary}`,
                  position: 'relative',
                  zIndex: 1,
                  flexShrink: 0,
                }} />
                <Spacer size="md" />
                {/* Title and description below */}
                <Text variant="h4" align="center" color={tokens.layout.text.heading}>
                  {event.title}
                </Text>
                {event.description && (
                  <>
                    <Spacer size="xs" />
                    <Text
                      variant="caption"
                      align="center"
                      color={tokens.layout.text.body}
                      style={{ maxWidth: 240 }}
                    >
                      {event.description}
                    </Text>
                  </>
                )}
              </Flex>
            ))}
          </Flex>
        </div>
      </Flex>
    </Flex>
  );
}
