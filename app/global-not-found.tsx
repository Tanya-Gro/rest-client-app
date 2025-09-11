import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Button } from '@components';
import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'REST Client',
  description:
    'A REST client with authorization, variables and request history',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function NotFoundPage({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations('notFound');

  return (
    <html lang={locale}>
      <NextIntlClientProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        >
          <div className="flex flex-col items-center justify-center flex-grow">
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
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
