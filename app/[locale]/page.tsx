import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { Button } from '@components';
import { Link } from '@i18n';
import { getTranslations } from 'next-intl/server';

const buttons = {
  notAuth: [
    { href: '/signin', text: 'buttonSignIn' },
    { href: '/signup', text: 'buttonSignUp' },
  ],
  auth: [
    { href: '/rest-client', text: 'main.clientBtn' },
    { href: '/history', text: 'main.historyBtn' },
    { href: '/variables', text: 'main.variablesBtn' },
  ],
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  const t = await getTranslations();

  const buttonsToRender = session ? buttons.auth : buttons.notAuth;

  return (
    <div className="flex flex-col items-center justify-center text-center gap-5">
      <p className="text-5xl font-semibold tracking-tight">
        {session ? t('main.textAuthorized') : t('main.textNotAuthorized')}
      </p>

      <div className="flex gap-1.5">
        {buttonsToRender.map(({ href, text }) => (
          <Button key={href} asChild>
            <Link href={href}>{t(text)}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
