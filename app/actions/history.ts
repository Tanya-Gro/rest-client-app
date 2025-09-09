'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma/prisma';

export async function createHistoryPost(endpoint: string, method: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) throw new Error('Not authorized');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) throw new Error('User not found');

  return prisma.history.create({
    data: {
      endpoint,
      method,
      userId: user.id,
    },
  });
}

export async function getHistoryPosts() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) return [];

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return [];

  return prisma.history.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });
}
