'use client';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Copy, X, CirclePlus } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { VariablesSchema } from '@entities';

type Variables = z.infer<typeof VariablesSchema>;

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
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (!values.variables) {return}
      const filtered = {
        variables: values.variables
          .map((v) => ({
            key: v?.key?.trim(),
            value: v?.value?.trim(),
          }))
          .filter((v) => v.key !== '')
          .filter((v, index, self) =>index === self.findIndex((x) => x.key === v.key)),
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
  }, [form]);

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
            <CirclePlus size={20} />,
            t('append')
          )}

          {fields.map((field, i) => (
            <VariableRow
              key={field.id}
              index={i}
              form={form}
              remove={remove}
              t={t}
            />
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

function VariableRow({ index, form, remove, t }: any) {
  const keyPath = `variables.${index}.key` as const;
  const valuePath = `variables.${index}.value` as const;

  const copyHandler = () => {
    const keyValue = form.getValues(keyPath)?.trim();
    if (keyValue) {
      navigator.clipboard.writeText(`{{${keyValue}}}`);
    }
  };

  return (
    <div className="flex gap-2 w-full items-start">
      <FormField
        control={form.control}
        name={keyPath}
        render={({ field }) => (
          <FormItem className='gap-y-0'>
            <FormControl>
              <Input placeholder={`{{${t('key')}}}`} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {ButtonWithTooltip(
        copyHandler,
        <Copy size={20} />,
        t('copyTooltip')
      )}

      <FormField
        control={form.control}
        name={valuePath}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormControl>
              <Input placeholder={t('value')} {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      {ButtonWithTooltip(
        () => remove(index),
        <X size={20}/>,
        t('removeTooltip')
      )}
    </div>
  );
}

const ButtonWithTooltip = (
  handleClick: ()=> void,
  children: React.ReactNode,
  tooltip: string
): React.ReactNode => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleClick}
          className="cursor-pointer p-1.5 rounded mr-auto"
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  )
}
