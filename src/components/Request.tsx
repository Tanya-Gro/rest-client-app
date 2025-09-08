'use client';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@components';
import { Headers } from './Headers';
import { Body } from './Body';
import { GeneratedCode } from './GeneratedCode';
import { useTranslations } from 'next-intl';
import { Client } from '@entities';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const methods = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'];

export const Request = () => {
  const t = useTranslations('restful-client');

  const form = useForm<Client>({
    resolver: zodResolver(Client),
    mode: 'onChange',
    defaultValues: {
      method: 'get',
      url: '',
      bodyType: 'json',
      body: '',
      headers: [],
    },
  });

  return (
    <div className="flex flex-col gap-2 justify-between">
      <h2 className="text-2xl font-semibold tracking-tight">
        {t('headingRequest')}
      </h2>
      <Form {...form}>
        <form>
          <section className="flex justify-between gap-3">
            <FormField
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder={t('methodPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {methods.map((method) => (
                            <SelectItem key={method} value={method}>
                              {method.toUpperCase()}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t('urlPlaceholder')} {...field} />
                  </FormControl>
                  <div className="min-h-5">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit">{t('btn')}</Button>
          </section>
        </form>

        <section className="flex flex-col max-h-[50vh] overflow-auto">
          <Tabs className="flex flex-col h-full">
            <TabsList>
              <TabsTrigger value="header">{t('tabHeaders')}</TabsTrigger>
              <TabsTrigger value="body">{t('tabBody')}</TabsTrigger>
              <TabsTrigger value="generated-code">{t('tabCode')}</TabsTrigger>
            </TabsList>
            <TabsContent
              value="header"
              forceMount
              className=" overflow-auto data-[state=inactive]:hidden"
            >
              <Headers />
            </TabsContent>
            <TabsContent
              value="body"
              forceMount
              className="overflow-auto data-[state=inactive]:hidden"
            >
              <Body />
            </TabsContent>
            <TabsContent
              value="generated-code"
              forceMount
              className="flex-1 overflow-auto data-[state=inactive]:hidden"
            >
              <GeneratedCode />
            </TabsContent>
          </Tabs>
        </section>
      </Form>
    </div>
  );
};
