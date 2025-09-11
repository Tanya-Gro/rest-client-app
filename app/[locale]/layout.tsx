import type { Metadata } from 'next';

import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@i18n';

import { Header, Footer, AuthProvider } from '@/components';

import './globals.css';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <NextIntlClientProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        >
          <AuthProvider session={session}>
            <Header />
          </AuthProvider>

          <main className="flex flex-1 px-4 py-2 justify-center">
            {children}
          </main>
          <Footer />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
