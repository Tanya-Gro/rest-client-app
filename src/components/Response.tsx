import { useTranslations } from 'next-intl';
import { Body } from './Body';

export const Response = () => {
  const t = useTranslations('restful-client');
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-2xl font-semibold tracking-tight">
        {t('headingResponse')}
      </h2>
      <span className="text-lg font-semibold">200 OK</span>
      <Body isReadonly />
    </section>
  );
};
