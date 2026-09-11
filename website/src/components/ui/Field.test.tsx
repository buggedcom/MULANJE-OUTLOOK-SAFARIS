import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Field } from './Field';

describe('GIVEN a Field wrapping an input with a matching htmlFor', () => {
  describe('WHEN it renders', () => {
    it('THEN the label is associated with the control', () => {
      render(
        <Field label="Full name" htmlFor="name">
          <input id="name" className="input" />
        </Field>,
      );
      expect(screen.getByLabelText('Full name')).toBeInTheDocument();
    });

    it('THEN applies the field class to the wrapper', () => {
      const { container } = render(
        <Field label="Email" htmlFor="email">
          <input id="email" />
        </Field>,
      );
      expect(container.querySelector('.field')).toBeInTheDocument();
    });
  });
});
