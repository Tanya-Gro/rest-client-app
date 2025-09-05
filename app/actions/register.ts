'use server';

import { prisma } from '@/lib/prisma/prisma';
import bcrypt from 'bcryptjs';

export async function registerUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email и пароль обязательны' };
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: 'Пользователь уже существует' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return { success: true, user: { id: user.id, email: user.email } };
  } catch (error) {
    console.error('Registration error:', error);
    return { error: 'Внутренняя ошибка сервера' };
  }
}
