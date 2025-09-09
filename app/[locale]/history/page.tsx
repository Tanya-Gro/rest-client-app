import { Badge, Button } from '@components';
import { useTranslations } from 'next-intl';
import { Link } from '@i18n';

import { getStatusColor } from '@helpers';

const commonBadgeClasses = 'bg-transparent text-sm';
const badgeVariants: Record<string, string> = {
  GET: `${commonBadgeClasses} text-lime-600`,
  POST: `${commonBadgeClasses} text-amber-600`,
  PUT: `${commonBadgeClasses} text-sky-600`,
  PATCH: `${commonBadgeClasses} text-indigo-600`,
  DELETE: `${commonBadgeClasses} text-red-600`,
  HEAD: `${commonBadgeClasses} text-emerald-600`,
  OPTIONS: `${commonBadgeClasses} text-fuchsia-600`,
};

const mockResponseHistory = [
  {
    idHistory: '1',
    method: 'GET',
    full_url: 'http://localhost:3000/GET/...',
    url: 'https://api.example.com/users',
    latency: '120ms',
    status: 200,
    timestamp: '2025-09-09 10:15:32',
    requestSize: '512B',
    responseSize: '2.3KB',
    error: null,
  },
  {
    idHistory: '2',
    method: 'POST',
    full_url: 'http://localhost:3000/POST/...',
    url: 'https://api.example.com/users',
    latency: '340ms',
    status: 201,
    timestamp: '2025-09-09 10:20:05',
    requestSize: '1.2KB',
    responseSize: '450B',
    error: null,
  },
  {
    idHistory: '3',
    method: 'PUT',
    full_url: 'http://localhost:3000/PUT/...',
    url: 'https://api.example.com/users/42',
    latency: '280ms',
    status: 200,
    timestamp: '2025-09-09 10:35:48',
    requestSize: '1KB',
    responseSize: '1.1KB',
    error: null,
  },
  {
    idHistory: '4',
    method: 'DELETE',
    full_url: 'http://localhost:3000/DELETE/...',
    url: 'https://api.example.com/users/99',
    latency: '150ms',
    status: 404,
    timestamp: '2025-09-09 11:00:12',
    requestSize: '220B',
    responseSize: '300B',
    error: 'Not Found',
  },
  {
    idHistory: '5',
    method: 'PATCH',
    full_url: 'http://localhost:3000/PATCH/...',
    url: 'https://api.example.com/reports',
    latency: '700ms',
    status: 500,
    timestamp: '2025-09-09 11:05:41',
    requestSize: '400B',
    responseSize: '0B',
    error: 'Internal Server Error',
  },
  {
    idHistory: '6',
    method: 'HEAD',
    full_url: 'http://localhost:3000/HEAD/...',
    url: 'https://api.example.com/reports',
    latency: '700ms',
    status: 500,
    timestamp: '2025-09-09 11:05:41',
    requestSize: '400B',
    responseSize: '0B',
    error: 'Internal Server Error',
  },
  {
    idHistory: '7',
    method: 'OPTIONS',
    full_url: 'http://localhost:3000/OPTIONS/...',
    url: 'https://api.example.com/reports',
    latency: '700ms',
    status: 500,
    timestamp: '2025-09-09 11:05:41',
    requestSize: '400B',
    responseSize: '0B',
    error: 'Internal Server Error',
  },
];

export default function History() {
  const t = useTranslations('history');

  if (!mockResponseHistory.length) {
    return (
      <div className="flex flex-col justify-center mx-auto">
        <p className="text-xl font-semibold tracking-tight pb-10">
          {t('titleNotFound')}:
        </p>
        <Button className="mx-auto">
          <Link href="/rest-client">{t('buttonREST')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center w-full">
      <h2 className="text-2xl font-semibold tracking-tight first:mt-0 pb-8">
        {t('title')}
      </h2>
      <div className="grid gap-y-0.5">
        <div className="grid grid-cols-[90px_1fr_90px_90px_0.6fr_100px_105px_1fr] border-t border-b pb-0.5 font-semibold justify-items-center items-center text-center select-none">
          <p>{t('method')}</p>
          <p>{t('url')}</p>
          <p>{t('status')}</p>
          <p>{t('latency')}</p>
          <p>{t('timestamp')}</p>
          <p>{t('requestSize')}</p>
          <p>{t('responseSize')}</p>
          <p>{t('error')}</p>
        </div>
        {mockResponseHistory.map(
          ({
            idHistory,
            method,
            full_url,
            url,
            status,
            latency,
            timestamp,
            requestSize,
            responseSize,
            error,
          }) => (
            <Link
              href={full_url}
              className="hover:bg-gray-100 grid grid-cols-[90px_1fr_90px_90px_0.6fr_100px_105px_1fr] border-b pb-0.5 justify-items-center"
              key={idHistory}
            >
              <Badge className={badgeVariants[method]}>{method}</Badge>
              <p className="w-full">{url}</p>
              <p className={getStatusColor(status)}>{status}</p>
              <p>{latency}</p>
              <p className="text-sm h-auto my-auto">{timestamp}</p>
              <p>{requestSize}</p>
              <p>{responseSize}</p>
              <p>{error ?? '-'}</p>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
