'use client';

import { useEffect, useState } from 'react';
import { cva } from 'class-variance-authority';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@i18n';

import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@components';
import { usePathname, useRouter } from '@i18n';
import { signOut } from 'next-auth/react';

type Props = {
  status: 'notAuth' | 'auth';
};

const headerVariants = cva(
  'sticky top-0 z-50 flex w-full mx-auto items-center justify-between px-4 transition-all duration-300 border-b',
  {
    variants: {
      isScrolled: {
        true: 'bg-gray-200 py-2',
        false: 'bg-white py-3.5',
      },
    },
    defaultVariants: { isScrolled: false },
  }
);

type HeaderButton = {
  text: string;
  onClick?: () => void;
  link?: string;
};

const buttons: Record<'notAuth' | 'auth', HeaderButton[]> = {
  auth: [
    {
      text: 'header.buttonSignOut',
      onClick: () => signOut({ callbackUrl: '/welcome' }),
    },
  ],
  notAuth: [
    { text: 'buttonSignIn', link: '/signin' },
    { text: 'buttonSignUp', link: '/signup' },
  ],
};

export function Header({ status }: Props) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 1);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = useTranslations();

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitchLocale = (lang: string) =>
    router.push(pathname, { locale: lang });

  return (
    <header className={headerVariants({ isScrolled })}>
      <Link href="/" className="flex w-max items-center justify-start px-1">
        <Image
          src="/logo.ico"
          alt="Logo"
          className="inline-block rounded-full ring-2 ring-gray-900 outline -outline-offset-1 outline-white/10"
          height={40}
          width={40}
        />
        <h1 className="text-2xl font-bold tracking-tight text-balance px-3 hidden sm:inline-block">
          REST API Client
        </h1>
      </Link>
      <div className="flex gap-1.5">
        <Select defaultValue={locale} onValueChange={handleSwitchLocale}>
          <SelectTrigger className="border-gray-600">
            <SelectValue placeholder="Choose language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Languages</SelectLabel>
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="ru">РУ</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {buttons[status].map(({ text, link, onClick }) =>
          link ? (
            <Button key={link} className="cursor-pointer" asChild>
              <Link href={link}>{t(text)}</Link>
            </Button>
          ) : (
            <Button key={text} className="cursor-pointer" onClick={onClick}>
              {t(text)}
            </Button>
          )
        )}
      </div>
    </header>
  );
}
