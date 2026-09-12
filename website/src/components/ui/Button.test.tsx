import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('GIVEN a Button with default props', () => {
  describe('WHEN it renders', () => {
    it('THEN applies the primary DS classes', () => {
      render(<Button>Go</Button>);
      expect(screen.getByRole('button', { name: 'Go' })).toHaveClass('btn', 'btn-primary');
    });

    it('THEN defaults the type to "button"', () => {
      render(<Button>Go</Button>);
      expect(screen.getByRole('button', { name: 'Go' })).toHaveAttribute('type', 'button');
    });
  });
});

describe('GIVEN a secondary, block Button', () => {
  describe('WHEN it renders', () => {
    it('THEN applies the secondary and block classes', () => {
      render(
        <Button variant="secondary" block>
          Go
        </Button>,
      );
      expect(screen.getByRole('button', { name: 'Go' })).toHaveClass('btn', 'btn-secondary', 'btn-block');
    });
  });
});

describe('GIVEN a Button with an onClick handler', () => {
  describe('WHEN it is clicked', () => {
    it('THEN invokes the handler', async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(<Button onClick={onClick}>Go</Button>);
      await user.click(screen.getByRole('button', { name: 'Go' }));
      expect(onClick).toHaveBeenCalledOnce();
    });
  });
});
