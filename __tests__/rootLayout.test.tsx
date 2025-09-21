import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Welcome from '../app/[locale]/(public)/welcome/page';

vi.mock('@components', () => ({
    Button: ({ children, asChild }: any) => <button>{children}</button>,
}));

vi.mock('@i18n', () => ({
    Link: ({ href, children }: any) => <a href={href}>{children}</a>,
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
