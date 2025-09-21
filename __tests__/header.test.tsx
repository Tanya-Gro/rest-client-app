import { Header } from '@components';
import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

vi.mock('@i18n', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/',
  Link: ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));
describe('Header render test', () => {
  it('render header', async () => {
    render(<Header status="public" />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'REST API Client'
    );
  });
});
