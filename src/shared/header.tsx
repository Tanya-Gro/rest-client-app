'use client';

import { useEffect, useState } from 'react';
import { cva } from 'class-variance-authority';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

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

export function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 1);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = useTranslations('header');

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
        <Button className="cursor-pointer">
          <Link href="/signin">{t('buttonSignIn')}</Link>
        </Button>

        <Button className="cursor-pointer">
          <Link href="/signup">{t('buttonSignUp')}</Link>
        </Button>

        <Button>{t('buttonSignOut')}</Button>
      </div>
    </header>
  );
}
