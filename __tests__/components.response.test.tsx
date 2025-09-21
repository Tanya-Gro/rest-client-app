import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Response } from '@components';
import { ResponseData } from '@/types/types';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    switch (key) {
      case 'headingResponse':
        return 'Response';
      case 'noResponse':
        return 'No response yet';
      default:
        return key;
    }
  },
}));

vi.mock('@helpers', () => ({
  getStatusColor: vi.fn(),
}));

describe('Response', () => {
  it('should display the status and status text when a response is provided', () => {
    const mockResponse: ResponseData = {
      status: 200,
      statusText: 'OK',
      body: "{message: 'Success',}",
    };

    render(<Response responseData={mockResponse} />);

    expect(screen.getByText('Response')).toBeInTheDocument();

    const statusText = screen.getByText('200 OK');
    expect(statusText).toBeInTheDocument();
  });

  it('should display "No response" when a response is not provided', () => {
    const mockResponse = null;

    render(<Response responseData={mockResponse} />);

    expect(screen.getByText('Response')).toBeInTheDocument();

    const noResponseText = screen.getByText('No response yet');
    expect(noResponseText).toBeInTheDocument();
  });
});
