import { useTranslations } from 'next-intl';
import { Body } from './body';
import { getStatusColor } from '@helpers';

type Props = {
  status?: number;
  statusText?: string;
};

export const Response = ({ status = 200, statusText = 'OK' }: Props) => {
  const t = useTranslations('client');

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-2xl font-semibold tracking-tight">
        {t('headingResponse')}
      </h2>
      <span className={`text-lg font-semibold ${getStatusColor(status)}`}>
        {status} {statusText}
      </span>
      <Body />
    </section>
  );
};
