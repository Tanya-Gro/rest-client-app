import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark' }),
}));

interface ToasterProps {
  theme?: string;
  className?: string;
  style?: React.CSSProperties;
}

vi.mock('sonner', () => ({
  Toaster: ({ theme, className, style }: ToasterProps) => (
    <div
      data-testid="sonner-toaster"
      data-theme={theme}
      className={className}
      style={style}
    />
  ),
}));

import { Toaster } from '@/components';

describe('Toaster', () => {
  it('renders with theme from next-themes and custom styles', () => {
    render(<Toaster />);

    const el = screen.getByTestId('sonner-toaster');

    expect(el).toHaveAttribute('data-theme', 'dark');

    expect(el).toHaveClass('toaster', 'group');
  });
});
