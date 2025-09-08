'use client';

import { useFormContext } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from './ui';
import { useTranslations } from 'next-intl';
import { Client } from '@entities';
import z from 'zod';

type Props = {
  isReadonly?: boolean;
};

export const Body = ({ isReadonly }: Props) => {
  const t = useTranslations('client');

  type Client = z.infer<ReturnType<typeof Client>>;

  const form = useFormContext<Client>();

  if (!form && isReadonly) {
    return (
      <Textarea placeholder="JSON Viewer" readOnly className="font-mono" />
    );
  }

  if (!form) return null;

  const bodyType = form.watch('bodyType');

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {!isReadonly ? (
          <FormField
            name="bodyType"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('mode')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="text">{t('modeText')}</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        ) : null}
        {bodyType === 'json' ? <Button>{t('prettify')}</Button> : null}
      </div>
      <FormField
        name="body"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                placeholder={
                  bodyType === 'json' ? '{ "example": "value" }' : 'Enter text'
                }
                className="font-mono"
                {...field}
                value={field.value || ''}
              />
            </FormControl>
            <div className="min-h-5">
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};
