import { CSSProperties, ReactNode } from 'react';
import { tokens } from '../../config/tokens';

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label' | 'number';

interface TextProps {
  variant: TextVariant;
  children: ReactNode;
  color?: string;
  align?: CSSProperties['textAlign'];
  italic?: boolean;
  weight?: keyof typeof tokens.font.weight;
  style?: CSSProperties;
}

const variantStyles: Record<TextVariant, CSSProperties> = {
  h1: {
    fontFamily: tokens.font.heading,
    fontSize: tokens.size.h1,
    fontWeight: tokens.font.weight.black,
    color: tokens.layout.text.heading,
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontFamily: tokens.font.heading,
    fontSize: tokens.size.h2,
    fontWeight: tokens.font.weight.bold,
    color: tokens.layout.text.heading,
    lineHeight: 1.2,
  },
  h3: {
    fontFamily: tokens.font.heading,
    fontSize: tokens.size.h3,
    fontWeight: tokens.font.weight.bold,
    color: tokens.layout.text.heading,
    lineHeight: 1.3,
  },
  h4: {
    fontFamily: tokens.font.heading,
    fontSize: tokens.size.h4,
    fontWeight: tokens.font.weight.semibold,
    color: tokens.layout.text.heading,
    lineHeight: 1.3,
  },
  body: {
    fontFamily: tokens.font.body,
    fontSize: tokens.size.body,
    fontWeight: tokens.font.weight.normal,
    color: tokens.layout.text.body,
    lineHeight: 1.6,
  },
  caption: {
    fontFamily: tokens.font.body,
    fontSize: tokens.size.caption,
    fontWeight: tokens.font.weight.normal,
    color: tokens.layout.text.muted,
    lineHeight: 1.5,
  },
  label: {
    fontFamily: tokens.font.body,
    fontSize: tokens.size.label,
    fontWeight: tokens.font.weight.medium,
    color: tokens.layout.text.muted,
    lineHeight: 1.4,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  number: {
    fontFamily: tokens.font.heading,
    fontSize: tokens.size.number,
    fontWeight: tokens.font.weight.black,
    color: tokens.layout.text.heading,
    lineHeight: 1.0,
  },
};

export function Text({ variant, children, color, align, italic, weight, style }: TextProps) {
  const base = variantStyles[variant];
  const Tag = variant === 'body' || variant === 'caption' || variant === 'label' ? 'p' : variant === 'number' ? 'span' : variant;

  return (
    <Tag
      style={{
        ...base,
        ...(color && { color }),
        ...(align && { textAlign: align }),
        ...(italic && { fontStyle: 'italic' }),
        ...(weight && { fontWeight: tokens.font.weight[weight] }),
        margin: 0,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
