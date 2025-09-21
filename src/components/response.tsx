import { useTranslations } from 'next-intl';
import { Body } from '@components';
import { getStatusColor } from '@helpers';
import { ResponseData } from '@/types/types';

type Props = {
  responseData: ResponseData | null;
};

export const Response = ({ responseData }: Props) => {
  const t = useTranslations('client');

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-2xl font-semibold tracking-tight">
        {t('headingResponse')}
      </h2>

      {responseData ? (
        <span
          className={`text-lg font-semibold ${getStatusColor(responseData.status)}`}
        >
          {responseData.status} {responseData.statusText}
        </span>
      ) : (
        <span className="text-gray-500">{t('noResponse')}</span>
      )}

      <Body body={responseData?.body} />
    </section>
  );
};
