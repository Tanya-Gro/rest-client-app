import { VariablesContent } from '@components';
import { redirect } from '@i18n';
import { getServerSession } from 'next-auth';
import { getLocale } from 'next-intl/server';
import { authOptions } from '../../api/auth/[...nextauth]/route';

export default async function Variables() {
  const session = await getServerSession(authOptions);
  const locale = await getLocale();

  if (!session || !session.user.email) {
    redirect({
      href: '/signin',
      locale,
    });
    return;
  }

  return <VariablesContent userEmail={session.user.email} />;
}
