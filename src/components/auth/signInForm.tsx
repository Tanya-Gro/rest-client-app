'use client';

import { Input, Button, Label } from '@/components/ui';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { getAuthSchema } from '@/entities/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from '@/i18n/navigation';

export function SignInForm() {
  const text = useTranslations();
  const schema = getAuthSchema(text);
  type FormData = z.infer<typeof schema>;
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setServerError(null);
    try {
      const signInRes = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (signInRes?.ok) {
        router.push('/');
      } else {
        setServerError(text(`login.invalid`));
      }
    } catch {
      setServerError(text(`registration.some-error`));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        {serverError && (
          <div className="p-3 bg-destructive/15 border border-destructive/50 rounded-md">
            <p className="text-sm text-destructive">{serverError}</p>
          </div>
        )}

        <div className="grid gap-3 mb-5 relative">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="text"
            placeholder="m@example.com"
            {...register('email')}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-sm text-red-500 absolute -bottom-10 left-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="grid gap-3 mb-5 relative">
          <div className="flex items-center">
            <Label htmlFor="password">{text(`login.password`)}</Label>
          </div>
          <Input
            id="password"
            type="password"
            {...register('password')}
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-sm text-red-500 absolute -bottom-10 left-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? text(`login.loading`) : text(`login.button`)}
          </Button>
        </div>
      </div>
    </form>
  );
}
