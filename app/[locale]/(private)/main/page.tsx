import { Button } from '@components';
import { Link } from '@i18n';
import { getTranslations } from 'next-intl/server';

const buttons = [
  { href: '/rest-client', text: 'main.clientBtn' },
  { href: '/history', text: 'main.historyBtn' },
  { href: '/variables', text: 'main.variablesBtn' },
];

export default async function Main() {
  const t = await getTranslations();

  return (
    <div className="flex flex-col items-center justify-center text-center gap-5">
      <p className="text-5xl font-semibold tracking-tight">
        {t('main.textAuthorized')}
      </p>

      <div className="flex gap-1.5">
        {buttons.map(({ href, text }) => (
          <Button key={href} asChild>
            <Link href={href}>{t(text)}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
