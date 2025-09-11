import { redirect } from '@i18n';
import { getServerSession } from 'next-auth';
import { getLocale } from 'next-intl/server';
import { authOptions } from '../../../api/auth/[...nextauth]/route';

export default async function Variables() {
  const session = await getServerSession(authOptions);
  const locale = await getLocale();

  if (!session) {
    redirect({
      href: '/signin',
      locale,
    });
  }

  return <h1>Variables (private, lazy-loaded)</h1>;
}
