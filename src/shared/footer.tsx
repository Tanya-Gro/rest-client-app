import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@components';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type GitInfo = {
  name: string;
  link: string;
  image: string;
};

const GIT_LINKS: Record<string, GitInfo> = {
  Tanya: {
    name: 'Tatiana Grosul',
    link: 'https://github.com/Tanya-Gro',
    image: '/github/tanya.jpg',
  },
  Mariya: {
    name: 'Mariya Lezhebokova',
    link: 'https://github.com/koonukaame',
    image: '/github/masha.jpg',
  },
  Victor: {
    name: 'Viktor Vonyarkha',
    link: 'https://github.com/Viktor1905',
    image: '/github/victor.png',
  },
};
const DEVELOPMENT_YEAR = '2025';
const RS_LINK = 'https://rs.school/courses/reactjs';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="flex w-full items-center justify-between bg-gray-200 p-1 max-w-[1200px] mx-auto">
      <div className="flex gap-2 items-center">
        <h4 className="text-xl font-semibold">{t('title')}</h4>
        {Object.entries(GIT_LINKS).map(([key, { name, link, image }]) => (
          <HoverCard key={name}>
            <HoverCardTrigger asChild>
              <Link href={link} target="_blank" rel="noopener noreferrer">
                <Avatar>
                  <AvatarImage src={image} alt={name} />
                  <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-64">
              <div className="flex gap-1">
                <Image
                  src={image}
                  alt={name}
                  width={78}
                  height={78}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm text-muted-foreground">{t(key)}</p>
                  <a href={link} target="_blank" className="hover:underline">
                    GitHub
                  </a>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>

      <span>© {DEVELOPMENT_YEAR}</span>

      <Link
        href={RS_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-50"
      >
        <Image src="/rss-logo.svg" alt="RS School" width={40} height={40} />
      </Link>
    </footer>
  );
}
