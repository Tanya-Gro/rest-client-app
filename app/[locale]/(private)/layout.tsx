import { Footer, Header } from '@/components';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { redirect } from '@i18n';
import { getLocale } from 'next-intl/server';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default async function AuthLayout({ children }: Readonly<Props>) {
  const session = await getServerSession(authOptions);
  const locale = await getLocale();

  if (!session) {
    redirect({
      href: '/welcome',
      locale,
    });
  }

  return (
    <>
      <Header status="private" />
      <main className="flex flex-1 px-4 py-2 justify-center">{children}</main>
      <Footer />
    </>
  );
}
