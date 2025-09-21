import { render, screen } from '@testing-library/react';
import { Skeleton } from '@components';

describe('Skeleton', () => {
  it('renders with default classes and attributes', () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();

    expect(skeleton).toHaveAttribute('data-slot');

    expect(skeleton).toHaveClass('bg-accent animate-pulse rounded-md');
  });
});
