'use client';

import { useEffect, useState } from 'react';
import { cva } from 'class-variance-authority';
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
  'sticky top-0 z-50 flex w-full items-center justify-between p-1 transition-all duration-300',
  {
    variants: {
      isScrolled: {
        true: 'bg-gray-400 py-2',
        false: 'bg-gray-200 py-4',
      },
    },
    defaultVariants: { isScrolled: false },
  }
);

export default function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={headerVariants({ isScrolled })}>
      <Link href="/" className="flex max-w-6xl items-center justify-start px-1">
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
        <Select defaultValue="en">
          <SelectTrigger className="border-gray-600">
            <SelectValue placeholder="Lang" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Languages</SelectLabel>
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="ru">РУ</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button>Sing In</Button>
        <Button>Sing Up</Button>
        <Button>Sing Out</Button>
      </div>
    </header>
  );
}
