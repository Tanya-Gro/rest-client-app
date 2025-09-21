'use client';

import { useTranslations } from 'next-intl';
import { Button, FormControl, FormField, FormItem, Input } from './ui';
import { useFieldArray } from 'react-hook-form';

export const Headers = () => {
  const t = useTranslations('client');

  const { fields, append, remove } = useFieldArray({
    name: 'headers',
  });

  return (
    <div className="flex flex-col gap-3 w-full">
      <div>
        <Button
          className="cursor-pointer"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            append({ header: '', value: '' });
          }}
        >
          Add
        </Button>
      </div>

      {fields.map((field, i) => {
        return (
          <div key={field.id} className="flex gap-2 w-full">
            <FormField
              name={`headers.${i}.header`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder={t('headersHeader')}
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[а-яА-ЯёЁ]/g, '');
                        field.onChange(value);
                      }}
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
                      onChange={(e) => {
                        const value = e.target.value.replace(/[а-яА-ЯёЁ]/g, '');
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button onClick={() => remove(i)} className="cursor-pointer">
              Remove
            </Button>
          </div>
        );
      })}
    </div>
  );
};
