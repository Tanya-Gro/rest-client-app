import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('main');
  return <h1 className="max-w-[1200px] mx-auto">{t('text')}</h1>;
}
