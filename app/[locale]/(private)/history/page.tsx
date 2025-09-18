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
import { Link } from '@i18n';
import { getMethodColor, getStatusColor } from '@helpers';
import { HistoryPostType } from '@/types';
import { getHistoryPosts } from '../../../actions/history';

import enMessages from '@/messages/en.json';
import { getTranslations } from 'next-intl/server';

const HEADERS: (keyof typeof enMessages.history)[] = [
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
  const historyDB: HistoryPostType[] = await getHistoryPosts();
  if (!historyDB.length) {
    return (
      <div className="flex flex-col justify-center mx-auto">
        <p className="text-xl font-semibold tracking-tight pb-10">
          {(await t)('titleNotFound')}:
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
            {HEADERS.map((key, index) => (
              <TableHead className="w-[100px]" key={index}>
                {t(key)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyDB.map(
            ({
              id,
              method,
              fullUrl,
              endpoint,
              requestDuration,
              responseCode,
              requestSize,
              responseSize,
              date,
              errorDetails,
            }) => (
              <TableRow className="hover:bg-gray-100" key={id}>
                <TableCell>
                  <Badge
                    className={`bg-transparent text-sm ${getMethodColor(method)}`}
                  >
                    {method}
                  </Badge>
                </TableCell>
                <TableCell>{endpoint}</TableCell>
                <TableCell>
                  <Link href={fullUrl}>{fullUrl}</Link>
                </TableCell>
                <TableCell className={getStatusColor(responseCode)}>
                  {responseCode}
                </TableCell>
                <TableCell>{requestDuration}</TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>{sizeGenerator(requestSize)}</TableCell>
                <TableCell>{sizeGenerator(responseSize)}</TableCell>
                <TableCell>{errorDetails ?? '-'}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
function sizeGenerator(size: number): string {
  return size > 1000
    ? (size / 1000).toFixed(2) + ' kB'
    : size.toFixed(2) + ' B';
}
