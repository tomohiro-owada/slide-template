import { tokens } from '../../config/tokens';

type SpacingKey = keyof typeof tokens.spacing;

interface SpacerProps {
  size: SpacingKey;
}

export function Spacer({ size }: SpacerProps) {
  return <div style={{ height: tokens.spacing[size], flexShrink: 0 }} />;
}
