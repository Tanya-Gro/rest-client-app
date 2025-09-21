import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui';

describe('Badge component', () => {
  it('renders correctly without child', () => {
    render(<Badge>Test Badge</Badge>);

    const badge = screen.getByText('Test Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute('data-slot', 'badge');
    expect(badge.tagName).toBe('SPAN');
  });

  it('renders as child with child', () => {
    render(
      <Badge asChild>
        <button>Button Badge</button>
      </Badge>
    );

    const badgeButton = screen.getByText('Button Badge');
    expect(badgeButton).toBeInTheDocument();
    expect(badgeButton.tagName).toBe('BUTTON');
  });
});
