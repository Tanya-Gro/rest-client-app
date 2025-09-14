'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma/prisma';
import { HistoryPostType } from '@/types';

export async function createHistoryPost({
  responseCode,
  responseStatus,
  requestDuration,
  method,
  requestSize,
  responseSize,
  endpoint,
  fullUrl,
  date,
  errorDetails,
}: HistoryPostType) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email)
    return {
      status: 403,
      statusText: 'Not Authorized',
    };

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) throw new Error('User not found');

  return prisma.history.create({
    data: {
      responseCode,
      responseStatus,
      requestDuration,
      method,
      requestSize,
      responseSize,
      endpoint,
      fullUrl,
      date,
      errorDetails,
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
