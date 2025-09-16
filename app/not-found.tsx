import { Button } from '@components';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <div className="flex flex-col items-center justify-center flex-grow min-h-screen">
      <h1 className="text-9xl font-extrabold tracking-tight text-center">
        404
      </h1>
      <p className="font-bold tracking-tight text-2xl text-center">
        {t('page')}
      </p>
      <Button className="mt-3" asChild>
        <Link href="/">{t('button')}</Link>
      </Button>
    </div>
  );
}
