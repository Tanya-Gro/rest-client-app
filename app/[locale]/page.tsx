import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from '@i18n';
import { getLocale } from 'next-intl/server';

export default async function RootPage() {
  const session = await getServerSession(authOptions);
  const locale = await getLocale();

  if (session) {
    redirect({
      href: '/main',
      locale,
    });
  }

  redirect({
    href: '/welcome',
    locale,
  });
}
