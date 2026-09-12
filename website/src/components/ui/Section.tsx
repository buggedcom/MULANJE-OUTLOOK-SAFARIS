import type { ReactNode } from 'react';
import { Container, type ContainerProps } from './Container';

export interface SectionProps extends Omit<ContainerProps, 'as'> {
  /** Full-bleed background token, e.g. `var(--color-surface)`. */
  background?: string;
  children: ReactNode;
}

/** A full-bleed tinted band wrapping a centered Container. */
export function Section({ background, children, ...container }: SectionProps) {
  return (
    <section style={background ? { background } : undefined}>
      <Container as="div" {...container}>
        {children}
      </Container>
    </section>
  );
}
