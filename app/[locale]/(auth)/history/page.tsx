import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components';
import { Link, redirect } from '@i18n';
import { getMethodColor, getStatusColor } from '@helpers';
import { Method } from '@/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../api/auth/[...nextauth]/route';
import { getLocale, getTranslations } from 'next-intl/server';

type MockResponseHistory = {
  idHistory: string;
  method: Method;
  full_url: string;
  url: string;
  latency: string;
  status: number;
  timestamp: string;
  requestSize: string;
  responseSize: string;
  error: null | string;
};

const mockResponseHistory: MockResponseHistory[] = [
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

const HEADERS = [
  'method',
  'url',
  'link',
  'status',
  'latency',
  'timestamp',
  'requestSize',
  'responseSize',
  'error',
];

export default async function History() {
  const t = await getTranslations('history');
  const locale = await getLocale();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect({
      href: '/signin',
      locale,
    });
  }

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
      <Table>
        <TableHeader>
          <TableRow>
            {HEADERS.map(async (key, index) => (
              <TableHead className="w-[100px]" key={index}>
                {t(key)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
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
              <TableRow className="hover:bg-gray-100" key={idHistory}>
                <TableCell>
                  <Badge
                    className={`bg-transparent text-sm ${getMethodColor(method)}`}
                  >
                    {method}
                  </Badge>
                </TableCell>
                <TableCell>{url}</TableCell>
                <TableCell>
                  <Link href={full_url}>{full_url}</Link>
                </TableCell>
                <TableCell className={getStatusColor(status)}>
                  {status}
                </TableCell>
                <TableCell>{latency}</TableCell>
                <TableCell>{timestamp}</TableCell>
                <TableCell>{requestSize}</TableCell>
                <TableCell>{responseSize}</TableCell>
                <TableCell>{error ?? '-'}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
