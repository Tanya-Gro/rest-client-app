import type { Variables } from '@types';

import {
  ButtonWithTooltip,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from '@components';
import { Copy, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';

type Props = {
  index: number;
  form: UseFormReturn<Variables>;
  remove: (index: number) => void;
};

export function VariableRow({ index, form, remove }: Props) {
  const t = useTranslations('variables');

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
          <FormItem className="gap-y-0">
            <FormControl>
              <Input placeholder={`{{${t('key')}}}`} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {ButtonWithTooltip(copyHandler, <Copy size={20} />, t('copyTooltip'))}

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
        <X size={20} />,
        t('removeTooltip')
      )}
    </div>
  );
}
