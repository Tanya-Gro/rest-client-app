import '@testing-library/jest-dom';
import { Mock } from 'vitest';

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

vi.mock('next-auth/react', () => ({
  signIn: vi.fn(),
}));

vi.mock('@/lib/prisma/prisma', () => {
  const mockPrisma = {
    user: { findUnique: vi.fn() as Mock },
    history: { create: vi.fn() as Mock, findMany: vi.fn() as Mock },
  };

  return {
    default: mockPrisma,
    prismaForAdapter: mockPrisma,
  };
});
