'use client';

import type { Variables } from '@types';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { SquarePlus } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { VariablesSchema } from '@entities';
import dynamic from 'next/dynamic';
import { Form } from './ui';
import { VariableRowSkeleton, ButtonWithTooltipSkeleton } from './loaders';

const VariableRow = dynamic(
  () => import('@components').then((onFullfilled) => onFullfilled.VariableRow),
  {
    loading: () => <VariableRowSkeleton />,
  }
);

const ButtonWithTooltip = dynamic(
  () =>
    import('@components').then(
      (onFullfilled) => onFullfilled.ButtonWithTooltip
    ),
  {
    loading: () => <ButtonWithTooltipSkeleton />,
  }
);

type Props = {
  userEmail: string;
};

export function VariablesContent({ userEmail }: Props) {
  const t = useTranslations('variables');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<Variables>({
    resolver: zodResolver(VariablesSchema(t)),
    defaultValues: { variables: [{ key: '', value: '' }] },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'variables',
  });

  useEffect(() => {
    const savedVariables = localStorage.getItem(userEmail);
    if (savedVariables) {
      try {
        form.reset(JSON.parse(savedVariables));
      } catch {
        setErrorMessage(t('errorRestore'));
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
          .map((variable) => ({
            key: variable?.key?.trim(),
            value: variable?.value?.trim(),
          }))
          .filter((variable) => variable.key !== '')
          .filter((currentVariable, index, array) => {
            return (
              index ===
              array.findIndex(
                (entriesVariable) => entriesVariable.key === currentVariable.key
              )
            );
          }),
      };

      if (filtered.variables.length > 0) {
        try {
          localStorage.setItem(userEmail, JSON.stringify(filtered));
        } catch {
          setErrorMessage(t('errorSaving'));
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
          <ButtonWithTooltip
            handleClick={() => append({ key: '', value: '' })}
            tooltip={t('append')}
          >
            <SquarePlus size={20} />
          </ButtonWithTooltip>

          {fields.map((field, i) => (
            <VariableRow key={field.id} index={i} form={form} remove={remove} />
          ))}
        </form>
      </Form>

      {errorMessage && (
        <div className="absolute bottom-10 right-15 p-3 bg-destructive/15 border border-destructive/50 rounded-md w-auto">
          <p className="text-sm text-destructive">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
