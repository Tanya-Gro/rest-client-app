import { render, screen, waitFor } from '@testing-library/react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@components';
import userEvent from '@testing-library/user-event';

describe('HoverCard', () => {
  it('should show content when hovering over', async () => {
    const user = userEvent.setup();
    const MOCK_DATA = { trigger: 'Button', content: 'An content' };

    render(
      <HoverCard>
        <HoverCardTrigger asChild>
          <button>{MOCK_DATA.trigger}</button>
        </HoverCardTrigger>
        <HoverCardContent data-testid="hover-card-content">
          {MOCK_DATA.content}
        </HoverCardContent>
      </HoverCard>
    );

    expect(screen.queryByTestId('hover-card-content')).not.toBeInTheDocument();

    const triggerButton = screen.getByRole('button', {
      name: MOCK_DATA.trigger,
    });

    await user.pointer({ target: triggerButton });

    await waitFor(
      () => {
        const content = screen.getByTestId('hover-card-content');
        expect(content).toBeInTheDocument();
        expect(content).toHaveTextContent(MOCK_DATA.content);
        expect(content).toHaveAttribute('data-state', 'open');
      },
      { timeout: 2000, interval: 100 }
    );
  });
});
