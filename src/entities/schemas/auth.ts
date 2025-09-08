import { z } from 'zod';

export function getAuthSchema(text: TranslationFunction) {
  return z.object({
    email: z.email({ message: text('auth-schema.email') }),
    password: z
      .string()
      .min(8, text('auth-schema.length'))
      .regex(/[A-ZА-Я]/u, text('auth-schema.uppercase'))
      .regex(/[a-zа-я]/u, text('auth-schema.lowercase'))
      .regex(/\d/u, text('auth-schema.number'))
      .regex(/[!@#$%^&*]/u, text('auth-schema.special-symbol')),
  });
}
type TranslationFunction = {
  (key: string): string;
};
