import type { CSSProperties, ReactNode } from 'react';

export interface FieldProps {
  label: string;
  htmlFor?: string;
  children: ReactNode;
  style?: CSSProperties;
}

/** Design-system form field: a label above its control. */
export function Field({ label, htmlFor, children, style }: FieldProps) {
  return (
    <div className="field" style={style}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}
