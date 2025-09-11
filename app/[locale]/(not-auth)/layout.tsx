import { Footer, Header } from '@/components';
import { redirect } from '@i18n';
import { getServerSession } from 'next-auth';
import { getLocale } from 'next-intl/server';
import { authOptions } from '../../api/auth/[...nextauth]/route';

export default async function NotAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const locale = await getLocale();

  if (session) {
    redirect({
      href: '/main',
      locale,
    });
  }

  return (
    <>
      <Header status="notAuth" />
      <main className="flex flex-1 px-4 py-2 justify-center">{children}</main>
      <Footer />
    </>
  );
}
