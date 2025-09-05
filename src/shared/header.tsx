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

export default function Header() {
  return (
    <header className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
      <Link href="/" className="flex max-w-6xl items-center justify-start px-1">
        <img
          src="/logo.ico"
          alt="Logo"
          className="inline-block size-10 rounded-full ring-2 ring-gray-900 outline -outline-offset-1 outline-white/10"
        />
        <h1 className="text-2xl font-bold tracking-tight text-balance px-3 hidden sm:inline-block">
          REST API Client
        </h1>
      </Link>
      <div className="flex gap-1.5">
        <Select defaultValue="en">
          <SelectTrigger>
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
