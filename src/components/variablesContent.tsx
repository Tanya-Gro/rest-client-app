'use client';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Copy, X } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const VariablesSchema = z.object({
  variables: z.array(
    z.object({
      key: z.string().min(1, 'Key is required'),
      value: z.string().min(1, 'Value is required'),
    })
  ),
});

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
        setIsError('Invalid saved variables');
        localStorage.removeItem(userEmail);
      }
    }
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (values?.variables && values.variables.length > 0) {
        try {
          const filtered = {
            variables: values.variables?.filter(
              (v) => v && v.key && v.key.trim() !== ''
            ),
          };

          if (filtered.variables.length > 0) {
            localStorage.setItem(userEmail, JSON.stringify(filtered));
          } else {
            localStorage.removeItem(userEmail);
          }
        } catch (err) {
          setIsError('Error saving variables');
        }
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
          className="flex flex-col gap-1"
        >
          <Button
            type="button"
            className="cursor-pointer w-[185px]"
            onClick={(e) => {
              e.preventDefault();
              append({ key: '', value: '' });
            }}
          >
            {t('append')}
          </Button>

          {fields.map((field, i) => (
            <div key={field.id} className="flex gap-2 w-full">
              <FormField
                control={form.control}
                name={`variables.${i}.key`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder={`{{${t('key')}}}`} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Copy
                    type="button"
                    size={36}
                    className="cursor-pointer hover:bg-gray-200 p-2 mr-2 transition-colors duration-200 hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.6)_inset]"
                    onClick={() => {
                      if (field.key) {
                        navigator.clipboard.writeText(`{{${field.key}}}`);
                      }
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>{t('copyTooltip')}</TooltipContent>
              </Tooltip>

              <FormField
                control={form.control}
                name={`variables.${i}.value`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder={t('value')} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Tooltip>
                <TooltipTrigger asChild>
                  <X
                    size={36}
                    type="button"
                    className="cursor-pointer hover:bg-gray-200 transition-colors duration-200 hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.6)_inset] p-1.5"
                    onClick={() => remove(i)}
                  />
                </TooltipTrigger>
                <TooltipContent>{t('removeTooltip')}</TooltipContent>
              </Tooltip>
            </div>
          ))}
        </form>
      </Form>
      {isError && showErrorMessage(isError)}
    </div>
  );
}

const showErrorMessage = (isError: string) => {
  return (
    <div className=" absolute bottom-10 right-15 p-3 bg-destructive/15 border border-destructive/50 rounded-md w-auto">
      <p className="text-sm text-destructive">{isError}</p>
    </div>
  );
};
