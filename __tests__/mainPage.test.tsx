import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Main from '../app/[locale]/(private)/main/page';
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

describe('Main page', () => {
  it('renders welcome text and buttons', async () => {
    const Component = await Main();
    render(Component);
    const expectedHrefs = ['/rest-client', '/history', '/variables'];
    const links = screen.getAllByRole('link');
    links.forEach((link, index) => {
      expect(link).toHaveAttribute('href', expectedHrefs[index]);
    });
  });
});
