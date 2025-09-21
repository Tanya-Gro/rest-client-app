import { type Mock } from 'vitest';
import * as auth from 'next-auth';
import prisma from '@/lib/prisma/prisma';
import { createHistoryPost, getHistoryPosts } from '../app/actions/history';
import { HistoryPostType } from '@types';

const postObject: HistoryPostType = {
  date: '',
  endpoint: '',
  fullUrl: '',
  method: 'GET',
  requestDuration: 0,
  requestSize: 0,
  responseCode: 0,
  responseSize: 0,
  responseStatus: '',
};

beforeEach(() => {
  vi.restoreAllMocks();
});

vi.mock('next-auth', async (importOriginal) => {
  const actual = await importOriginal<typeof auth>();
  return { ...actual, getServerSession: vi.fn() as Mock };
});

const mockSession = (email?: string) => (email ? { user: { email } } : null);

const mockUser = (id?: string) =>
  id ? { id, email: 'test@example.com' } : null;

describe('createHistoryPost', () => {
  it('returns 403 if not authenticated', async () => {
    (auth.getServerSession as Mock).mockResolvedValue(mockSession());
    const result = await createHistoryPost(postObject);
    expect(result).toHaveProperty('status', 403);
  });

  it('returns 404 if user not found', async () => {
    (auth.getServerSession as Mock).mockResolvedValue(
      mockSession('test@example.com')
    );
    (prisma.user.findUnique as Mock).mockResolvedValue(mockUser());
    const result = await createHistoryPost(postObject);
    expect(result).toHaveProperty('status', 404);
  });

  it('creates a history post if user exists', async () => {
    (auth.getServerSession as Mock).mockResolvedValue(
      mockSession('test@example.com')
    );
    (prisma.user.findUnique as Mock).mockResolvedValue(mockUser('user-1'));
    (prisma.history.create as Mock).mockResolvedValue({
      ...postObject,
      id: 'post-1',
      userId: 'user-1',
    });

    const result = await createHistoryPost(postObject);

    expect(prisma.history.create).toHaveBeenCalledWith({
      data: { ...postObject, userId: 'user-1' },
    });
    expect(result).toHaveProperty('id', 'post-1');
  });
});

describe('getHistoryPosts', () => {
  it('returns empty array if not authenticated', async () => {
    (auth.getServerSession as Mock).mockResolvedValue(mockSession());
    const result = await getHistoryPosts();
    expect(result).toEqual([]);
  });

  it('returns empty array if user not found', async () => {
    (auth.getServerSession as Mock).mockResolvedValue(
      mockSession('test@example.com')
    );
    (prisma.user.findUnique as Mock).mockResolvedValue(mockUser());
    const result = await getHistoryPosts();
    expect(result).toEqual([]);
  });

  it('returns history posts for user', async () => {
    (auth.getServerSession as Mock).mockResolvedValue(
      mockSession('test@example.com')
    );
    (prisma.user.findUnique as Mock).mockResolvedValue(mockUser('user-1'));
    (prisma.history.findMany as Mock).mockResolvedValue([
      { ...postObject, id: 'post-1', title: 'Test Post' },
    ]);

    const result = await getHistoryPosts();
    expect(result).toEqual([
      { ...postObject, id: 'post-1', title: 'Test Post' },
    ]);
  });
});
