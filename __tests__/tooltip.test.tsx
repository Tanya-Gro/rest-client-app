import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@components';

describe('Tooltip', () => {
  it('should show content when hovering over the trigger', async () => {
    const user = userEvent.setup();
    const MOCK_DATA = { button: 'Hover', tooltip: 'An tooltip' };

    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{MOCK_DATA.button}</TooltipTrigger>
          <TooltipContent data-testid="tooltip-content">
            {MOCK_DATA.tooltip}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    expect(screen.queryByTestId('tooltip-content')).not.toBeInTheDocument();
    const triggerButton = screen.getByRole('button', {
      name: MOCK_DATA.button,
    });
    await user.hover(triggerButton);
    expect(screen.queryByTestId('tooltip-content')).not.toBeInTheDocument();
  });
});
