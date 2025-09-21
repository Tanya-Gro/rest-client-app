import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Welcome from '../app/[locale]/(public)/welcome/page';
import { ReactNode } from 'react';

vi.mock('@components', () => ({
  Button: ({ children }: { children: ReactNode }) => (
    <button>{children}</button>
  ),
}));

vi.mock('@i18n', () => ({
  Link: ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('next-intl/server', () => ({
  getTranslations: async () => (key: string) => key,
}));

describe('Welcome page', () => {
  it('renders welcome text and buttons', async () => {
    const Component = await Welcome();
    render(Component);

    expect(screen.getByText('main.textNotAuthorized')).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/signin');
    expect(links[1]).toHaveAttribute('href', '/signup');
  });
});
