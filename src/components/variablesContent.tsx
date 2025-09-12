'use client';

import type { Variables } from '@types';
import { ButtonWithTooltip, Form, VariableRow } from '@components';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { SquarePlus } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { VariablesSchema } from '@entities';

type Props = {
  userEmail: string;
};

export function VariablesContent({ userEmail }: Props) {
  const t = useTranslations('variables');
  const [isError, setIsError] = useState<string | null>(null);

  const form = useForm<Variables>({
    resolver: zodResolver(VariablesSchema),
    defaultValues: { variables: [{ key: '', value: '' }] },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'variables',
  });

  useEffect(() => {
    const saved = localStorage.getItem(userEmail);
    if (saved) {
      try {
        form.reset(JSON.parse(saved));
      } catch {
        setIsError(t('errorRestore'));
        localStorage.removeItem(userEmail);
      }
    }
  }, [form, userEmail, t]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (!values.variables) {
        return;
      }
      const filtered = {
        variables: values.variables
          .map((v) => ({
            key: v?.key?.trim(),
            value: v?.value?.trim(),
          }))
          .filter((v) => v.key !== '')
          .filter(
            (v, index, self) => index === self.findIndex((x) => x.key === v.key)
          ),
      };

      if (filtered.variables.length > 0) {
        try {
          localStorage.setItem(userEmail, JSON.stringify(filtered));
        } catch {
          setIsError(t('errorSaving'));
        }
      } else {
        localStorage.removeItem(userEmail);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, userEmail, t]);

  return (
    <div className="flex flex-col justify-center w-full">
      <h2 className="text-2xl font-semibold tracking-tight first:mt-0 pb-8">
        {t('title')}
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {})}
          className="flex flex-col gap-1 grow-1"
        >
          {ButtonWithTooltip(
            () => append({ key: '', value: '' }),
            <SquarePlus size={20} />,
            t('append')
          )}

          {fields.map((field, i) => (
            <VariableRow key={field.id} index={i} form={form} remove={remove} />
          ))}
        </form>
      </Form>

      {isError && (
        <div className="absolute bottom-10 right-15 p-3 bg-destructive/15 border border-destructive/50 rounded-md w-auto">
          <p className="text-sm text-destructive">{isError}</p>
        </div>
      )}
    </div>
  );
}
