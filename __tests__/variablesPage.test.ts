import { Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as auth from 'next-auth';
import Variables from '../app/[locale]/(private)/variables/page';

vi.mock('next-auth', () => ({
  getServerSession: vi.fn() as unknown as (typeof auth)['getServerSession'],
}));
vi.mock('next-auth', async (importOriginal) => {
  const actual = await importOriginal<typeof auth>();
  return { ...actual, getServerSession: vi.fn() as Mock };
});
const mockSession = (
  email?: string
): { expires: string; user: { email: string } } | null =>
  email ? { user: { email }, expires: 'fake-date' } : null;

describe('Variables page', () => {
  it('renders VariablesContent if user is authenticated', async () => {
    const getServerSessionMock = auth.getServerSession as unknown as ReturnType<
      typeof vi.fn
    > &
      (typeof auth)['getServerSession'];
    getServerSessionMock.mockResolvedValue(mockSession('test@example.com'));

    const element = await Variables();
    render(element!);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'title'
    );
  });

  it('renders nothing if user is not authenticated', async () => {
    const getServerSessionMock = auth.getServerSession as unknown as ReturnType<
      typeof vi.fn
    > &
      (typeof auth)['getServerSession'];
    getServerSessionMock.mockResolvedValue(mockSession());

    const element = await Variables();

    expect(element).toBeUndefined();
  });
});
