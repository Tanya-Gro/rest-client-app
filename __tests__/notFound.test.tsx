import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from '../app/not-found';
vi.mock('next-intl/server', () => ({
  getTranslations: async () => (key: string) => key,
}));

describe('NotFound page', () => {
  it('renders the 404 heading', async () => {
    render(await NotFound());
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404');
  });
});
