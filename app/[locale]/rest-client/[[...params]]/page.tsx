import { Request } from '@components';
import { Response } from '@components';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../api/auth/[...nextauth]/route';
import { redirect } from '@i18n';
import { getLocale } from 'next-intl/server';

export default async function RestClient() {
  const session = await getServerSession(authOptions);
  const locale = await getLocale();

  if (!session) {
    redirect({
      href: '/signin',
      locale,
    });
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-1">
        <Request />
      </div>
      <div>
        <Response />
      </div>
    </div>
  );
}
