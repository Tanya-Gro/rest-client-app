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
import { Headers } from './headers';
import { Body } from './body';
import { GeneratedCode } from './generatedCode';
import { useTranslations } from 'next-intl';
import { Client } from '@entities';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { handleRequest } from '../../app/actions/request';
import { ResponseData } from '@/types/types';
import { toast, Toaster } from 'sonner';

const methods = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'];

type Props = {
  onResponse: (data: ResponseData) => void;
};

export const Request = ({ onResponse }: Props) => {
  const t = useTranslations('client');

  const form = useForm<Client>({
    resolver: zodResolver(Client(t)),
    defaultValues: {
      method: 'get',
      url: '',
      bodyType: 'json',
      body: '',
      headers: [{ header: '', value: '' }],
    },
  });

  const handleSubmit = async (form: Client) => {
    const result = await handleRequest(form);

    if (result.status === 0) {
      toast.error(result.statusText);
    }

    onResponse(result);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <Toaster richColors closeButton />
      <h2 className="text-2xl font-semibold tracking-tight">
        {t('headingRequest')}
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-1"
        >
          <section className="flex w-full gap-2">
            <FormField
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[130px] cursor-pointer">
                        <SelectValue placeholder={t('methodPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {methods.map((method) => (
                            <SelectItem
                              key={method}
                              value={method}
                              className="cursor-pointer"
                            >
                              {method.toUpperCase()}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="url"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder={t('urlPlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <div className="min-h-5">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="cursor-pointer">
              {t('btn')}
            </Button>
          </section>

          <section>
            <Tabs>
              <TabsList>
                <TabsTrigger value="header" className="cursor-pointer">
                  {t('tabHeaders')}
                </TabsTrigger>
                <TabsTrigger value="body" className="cursor-pointer">
                  {t('tabBody')}
                </TabsTrigger>
                <TabsTrigger value="generated-code" className="cursor-pointer">
                  {t('tabCode')}
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="header"
                forceMount
                className=" flex-1 overflow-auto data-[state=inactive]:hidden"
              >
                <Headers />
              </TabsContent>

              <TabsContent
                value="body"
                forceMount
                className="flex-1 overflow-auto data-[state=inactive]:hidden"
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
        </form>
      </Form>
    </div>
  );
};
