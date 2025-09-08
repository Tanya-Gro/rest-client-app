'use client';

import { useTranslations } from 'next-intl';
import { Button, FormControl, FormField, FormItem, Input } from './ui';
import { useFieldArray } from 'react-hook-form';

export const Headers = () => {
  const t = useTranslations('restful-client');

  const { fields, append, remove } = useFieldArray({
    name: 'headers',
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => append({ header: '', value: '' })}
        >
          +
        </Button>
      </div>

      {fields.map((field, i) => {
        return (
          <div key={field.id} className="flex gap-2">
            <FormField
              name={`headers.${i}.header`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={t('headersHeader')}
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name={`headers.${i}.value`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder={t('value')}
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <div className="min-h-[20px]"></div>
                </FormItem>
              )}
            />

            <Button onClick={() => remove(i)}>Remove</Button>
          </div>
        );
      })}
    </div>
  );
};
