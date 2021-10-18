import React from 'react';

import { Container } from './style';

interface TooltipProps {
  title: string;
  className?: string;
  children?: JSX.Element;
}

export function Tooltip({ title, className, children }: TooltipProps) {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
}
