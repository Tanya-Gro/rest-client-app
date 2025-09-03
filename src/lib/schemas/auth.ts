import { z } from 'zod';

export function getAuthSchema(text: TranslationFunction) {
  return z.object({
    email: z.email({ message: text('auth-schema.email') }),
    password: z
      .string()
      .min(8, text('auth-schema.length'))
      .refine((value) => /[A-ZА-Я]/u.test(value), {
        message: text('auth-schema.uppercase'),
      })
      .refine((value) => /[a-zа-я]/u.test(value), {
        message: text('auth-schema.lowercase'),
      })
      .refine((value) => /\d/u.test(value), {
        message: text('auth-schema.number'),
      })
      .refine((value) => /[!@#$%^&*]/u.test(value), {
        message: text('auth-schema.special-symbol'),
      }),
  });
}
interface TranslationFunction {
  (key: string): string;
}
