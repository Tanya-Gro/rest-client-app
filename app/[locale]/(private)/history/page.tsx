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
import { createTranslator } from 'use-intl';
import enMessages from '@/messages/en.json';
import ruMessages from '@/messages/ru.json';

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

export default async function History({ params }: HistoryProps) {
  const locale = params.locale;
  const messages = messagesMap[locale as Locale] || enMessages;
  const t = createTranslator({ locale, messages });
  const historyDB: HistoryPostType[] = await getHistoryPosts();
  if (!historyDB.length) {
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
                <TableCell>
                  {requestSize > 1000
                    ? (requestSize / 1000).toFixed(2) + ' kB'
                    : requestSize.toFixed(2) + ' B'}
                </TableCell>
                <TableCell>
                  {responseSize > 1000
                    ? (responseSize / 1000).toFixed(2) + ' kB'
                    : responseSize.toFixed(2) + ' B'}
                </TableCell>
                <TableCell>{errorDetails ?? '-'}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
type HistoryProps = {
  params: { locale: string };
};
type Locale = 'en' | 'ru';
const messagesMap: Record<Locale, typeof enMessages.history> = {
  en: enMessages.history,
  ru: ruMessages.history,
};
