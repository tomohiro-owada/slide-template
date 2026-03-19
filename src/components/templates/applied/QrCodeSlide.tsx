import { QRCodeSVG } from 'qrcode.react';
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
    <Flex direction="col" align="center" justify="center" style={{ width: '100%', height: '100%' }}>
      <Text variant="h2" align="center">{title}</Text>
      <Spacer size="xl" />

      <Flex direction="row" align="center" gap="xxl">
        <div style={{
          padding: tokens.spacing.lg,
          backgroundColor: tokens.layout.panel.background,
          borderRadius: tokens.radius.lg,
          boxShadow: tokens.shadow.md,
        }}>
          <QRCodeSVG value={url} size={280} level="M" />
          <Spacer size="sm" />
          <Text variant="caption" align="center" color={tokens.layout.text.muted}>{url}</Text>
        </div>

        {description && (
          <Flex direction="col" style={{ maxWidth: 500 }}>
            <Text variant="h4" weight="medium">{description}</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
