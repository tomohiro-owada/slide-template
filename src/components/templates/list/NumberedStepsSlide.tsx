import { Flex, Text, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';
import type { SlideProps } from '../../../types/slide';

export interface NumberedStepsContent {
  title: string;
  steps: Array<{ number: string; title: string; body?: string }>;
}

export function NumberedStepsSlide({ content }: SlideProps<NumberedStepsContent>) {
  const circleSize = 64;

  return (
    <Flex direction="col" style={{ height: '100%', padding: tokens.spacing.slidePadding }}>
      <Text variant="h2">{content.title}</Text>
      <Spacer size="xxl" />
      <Flex direction="col" justify="center" style={{ flex: 1 }}>
        {/* Connecting line + circles row */}
        <div style={{ position: 'relative' }}>
          {/* Horizontal connecting line */}
          <div style={{
            position: 'absolute',
            top: circleSize / 2,
            left: `calc(${100 / (content.steps.length * 2)}% )`,
            right: `calc(${100 / (content.steps.length * 2)}% )`,
            height: 2,
            backgroundColor: tokens.layout.panel.border,
          }} />
          <Flex direction="row" justify="space-around" align="flex-start">
            {content.steps.map((step, i) => (
              <Flex key={i} direction="col" align="center" style={{ flex: 1 }}>
                {/* Numbered circle */}
                <div style={{
                  width: circleSize,
                  height: circleSize,
                  borderRadius: tokens.radius.full,
                  backgroundColor: tokens.layout.brand.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  <Text variant="h4" color={tokens.layout.text.inverse} align="center">
                    {step.number}
                  </Text>
                </div>
                <Spacer size="md" />
                <Text variant="h4" align="center" color={tokens.layout.text.heading}>
                  {step.title}
                </Text>
                {step.body && (
                  <>
                    <Spacer size="sm" />
                    <Text
                      variant="body"
                      align="center"
                      color={tokens.layout.text.body}
                      style={{ maxWidth: 280 }}
                    >
                      {step.body}
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
