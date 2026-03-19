import type { SlideProps } from '../../../types/slide';
import { Text, Flex, Spacer } from '../../primitives';
import { tokens } from '../../../config/tokens';

export interface QrCodeContent {
  title: string;
  url: string;
  description?: string;
}

export function QrCodeSlide({ content }: SlideProps<QrCodeContent>) {
  const { title, url, description } = content;

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
      <Text variant="h2" align="center">{title}</Text>
      <Spacer size="xl" />

      <Flex direction="row" align="center" gap="xxl">
        {/* QR code placeholder */}
        <div
          style={{
            width: 320,
            height: 320,
            backgroundColor: tokens.layout.panel.background,
            border: `2px solid ${tokens.layout.panel.border}`,
            borderRadius: tokens.radius.lg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: tokens.spacing.sm,
          }}
        >
          <div
            style={{
              width: 200,
              height: 200,
              backgroundColor: '#E2E8F0',
              borderRadius: tokens.radius.md,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94A3B8',
              fontSize: 18,
            }}
          >
            QR Code
          </div>
          <Text variant="caption" align="center">{url}</Text>
        </div>

        {description && (
          <Flex direction="col" style={{ maxWidth: 500 }}>
            <Text variant="body">{description}</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
