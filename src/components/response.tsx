import { useTranslations } from 'next-intl';
import { Body } from './body';

type Props = {
  status?: number;
  statusText?: string;
};

const STATUS_COLORS = {
  1: 'text-status-1',
  2: 'text-status-2',
  3: 'text-status-3',
  4: 'text-status-4',
  5: 'text-status-5',
  fallback: 'text-status-fallback',
} as const;

export const Response = ({ status = 200, statusText = 'OK' }: Props) => {
  const t = useTranslations('client');

  const getStatusColor = (status: number) => {
    const group = Math.floor(status / 100) as keyof typeof STATUS_COLORS;
    return STATUS_COLORS[group] || STATUS_COLORS.fallback;
  };

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
