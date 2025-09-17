import '@testing-library/jest-dom';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  notFound: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock('next-intl/navigation', () => ({
  createNavigation: () => ({
    useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
  }),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
  createTranslator: () => (key: string) => key,
  useMessages: () => ({}),
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) =>
    children,
}));
