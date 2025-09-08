import { Badge, Button } from '@components';
import { useTranslations } from 'next-intl';
import { Link } from '@i18n';

const badgeVariants: Record<string, string> = {
  GET: 'text-black bg-lime-100',
  POST: 'text-black bg-amber-100',
  PUT: 'text-black bg-sky-100',
  PATCH: 'text-black bg-indigo-100',
  DELETE: 'text-black bg-orange-100',
  HEAD: 'text-black bg-emerald-100',
  OPTIONS: 'text-black bg-fuchsia-100',
};

const mockResponseHistory: Record<string, string>[] = [
  {
    idHistory: '1',
    method: 'GET',
    url: 'http://localhost:3000/GET/...',
  },
  {
    idHistory: '2',
    method: 'POST',
    url: 'http://localhost:3000/POST/...',
  },
  {
    idHistory: '3',
    method: 'PUT',
    url: 'http://localhost:3000/PUT/...',
  },
  {
    idHistory: '4',
    method: 'PATCH',
    url: 'http://localhost:3000/PATCH/...',
  },
  {
    idHistory: '5',
    method: 'DELETE',
    url: 'http://localhost:3000/DELETE/...',
  },
  {
    idHistory: '6',
    method: 'HEAD',
    url: 'http://localhost:3000/HEAD/...',
  },
  {
    idHistory: '7',
    method: 'OPTIONS',
    url: 'http://localhost:3000/OPTIONS/...',
  },
];

export default function History() {
  const t = useTranslations('history');

  if (!mockResponseHistory.length) {
    return (
      <div className="flex flex-col justify-center">
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
    <div className="flex flex-col justify-center">
      <h2 className="text-3xl font-semibold tracking-tight first:mt-0 pb-10 text-center">
        {t('title')}
      </h2>
      <div className="grid gap-y-1">
        {mockResponseHistory.map(({ idHistory, method, url }) => (
          <div
            key={idHistory}
            className="grid grid-cols-[100px_1fr] border-b pb-0.5"
          >
            <Badge className={badgeVariants[method]}>{method}</Badge>
            <Link href={url} className="hover:underline">
              {url}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
