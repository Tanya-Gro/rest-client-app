import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@i18n';
import Header from '@/shared/header';
import Footer from '@/shared/footer';

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

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <NextIntlClientProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col max-w-[1200px] px-4 min-h-screen`}
        >
          <Header />
          <main className="grow-1 min-h-176">{children}</main>
          <Footer />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
