'use server';

import bcrypt from 'bcryptjs';
import { AUTH_API_ERROR } from '@constants';
import prisma from '@/lib/prisma/prisma';

export async function registerUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: AUTH_API_ERROR.NO_DATA };
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: AUTH_API_ERROR.EXISTS };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return { success: true, user: { id: user.id, email: user.email } };
  } catch {
    return { error: AUTH_API_ERROR.SERVER_ERROR };
  }
}
