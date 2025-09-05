import {
  Button,
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
} from '@/components/ui';
import { Headers } from './Headers';
import { Body } from './Body';
import { GeneratedCode } from './GeneratedCode';
import { useTranslations } from 'next-intl';

const methods = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'];

export const Request = () => {
  const t = useTranslations('restful-client');

  return (
    <div className="flex flex-col gap-2 justify-between">
      <h2 className="text-2xl font-semibold tracking-tight">
        {t('headingRequest')}
      </h2>
      <section className="flex justify-between gap-3">
        <Select defaultValue="get">
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
        <Input placeholder={t('urlPlaceholder')} />
        <Button type="submit">{t('btn')}</Button>
      </section>

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
    </div>
  );
};
