import { Flex, Text, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';
import type { SlideProps } from '../../../types/slide';

export interface TimelineContent {
  title: string;
  events: Array<{ date: string; title: string; description?: string }>;
}

export function TimelineSlide({ content }: SlideProps<TimelineContent>) {
  const dotSize = 24;

  return (
    <Flex direction="col" align="center" justify="center" style={{ height: '100%' }}>
      <Text variant="h2" align="center">{content.title}</Text>
      <Spacer size="xxl" />
      <div style={{ position: 'relative', width: '100%', maxWidth: 1600 }}>
        {/* 横線 */}
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
              {/* 日付 */}
              <Text variant="h4" color={tokens.layout.text.muted} align="center">
                {event.date}
              </Text>
              <Spacer size="md" />
              {/* ドット */}
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
              {/* タイトル */}
              <Text variant="h3" align="center">
                {event.title}
              </Text>
              {event.description && (
                <>
                  <Spacer size="sm" />
                  <Text variant="body" align="center" color={tokens.layout.text.body}>
                    {event.description}
                  </Text>
                </>
              )}
            </Flex>
          ))}
        </Flex>
      </div>
    </Flex>
  );
}
